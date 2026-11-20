import * as THREE from 'three';

// Underwater air bubbles, drawn as camera-facing sprites and moved entirely on the
// GPU. They look like real ones: mostly see-through, a bright silvery rim (total
// internal reflection), a specular dot up top and light focused at the bottom;
// many tiny ones and a few big ones, the big ones flattened and wobbling, all
// zig-zagging as they rise faster than they started.
//
// Three kinds share the look:
//   'ambient'  rising from vents in the sand and scattered, on the clock
//   'burst'    the air the bottle drags in when it plunges; scrubbed by the
//              story progress, so it plays backwards when the page scrolls up
//   'leak'     a thin stream escaping the bottle while it sinks, on the clock

const COMMON = /* glsl */ `
attribute vec4 aSeed;
attribute vec4 aSeed2;
uniform float uTime;
uniform float uFogDensity;
uniform float uSurface;
varying vec2 vUv;
varying float vAlpha;
varying float vFog;
varying float vBig;

float bubbleRadius(float h) {
  return 0.0025 + 0.019 * h * h * h; // mostly tiny, a few big
}

// zig-zag of a rising bubble (bigger ones spiral wider and slower)
vec3 wander(float age, float r, vec4 s) {
  float big = smoothstep(0.006, 0.016, r);
  float w = mix(9.0, 5.0, big) + s.y * 3.0;
  float amp = mix(0.004, 0.018, big) * (0.6 + s.z);
  return vec3(sin(age * w + s.x * 6.28) * amp, 0.0, cos(age * w * 0.8 + s.w * 6.28) * amp * 0.7);
}

void emit(vec3 c, float r, float alpha, float age) {
  vUv = position.xy + 0.5;
  // big bubbles are oblate and wobble
  float big = smoothstep(0.007, 0.018, r);
  float wob = sin(uTime * (14.0 + aSeed.y * 6.0) + aSeed.x * 40.0) * 0.12 * big;
  vec2 shape = vec2(1.0 + 0.22 * big + wob, 1.0 - 0.2 * big - wob);
  vec4 mv = viewMatrix * vec4(c, 1.0);
  mv.xy += position.xy * 2.0 * r * shape;
  gl_Position = projectionMatrix * mv;
  float d = length(mv.xyz);
  vFog = exp(-pow(uFogDensity * d, 2.0));
  // pop at the surface
  alpha *= 1.0 - smoothstep(uSurface - 0.04, uSurface, c.y);
  vAlpha = alpha;
  vBig = big;
  if (alpha <= 0.001) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
}
`;

const VERTEX = {
  ambient: /* glsl */ `
uniform float uFloor;
uniform vec4 uVents[4];
void main() {
  float r = bubbleRadius(aSeed.w);
  float span = uSurface - uFloor;
  float speed = 0.16 + 9.0 * r + aSeed2.x * 0.05;
  float life = span / speed;
  float age = mod(uTime + aSeed.x * 97.0, life);
  // accelerate off the bottom, then rise steady
  float y = uFloor + speed * (age - 0.35 * (1.0 - exp(-age * 2.8)));
  vec3 base;
  int v = int(floor(aSeed2.y * 7.0));
  if (v < 4) {
    vec4 vent = uVents[v];
    base = vec3(vent.x, 0.0, vent.z) + (aSeed2.zxw - 0.5) * vec3(0.05, 0.0, 0.05);
  } else {
    base = vec3((aSeed2.z - 0.5) * 4.4, 0.0, (aSeed2.w - 0.5) * 2.6 - 0.7);
  }
  vec3 c = base + wander(age, r, aSeed);
  c.y = y;
  float alpha = smoothstep(0.0, 0.25, age) * (0.7 + 0.3 * aSeed.z);
  emit(c, r, alpha, age);
}`,
  burst: /* glsl */ `
uniform float uP;
uniform float uPImp;
uniform vec3 uEntry;
uniform vec3 uVel;   // horizontal entry speed (per chapter)
uniform float uDive; // vertical entry speed (per chapter)
uniform float uDragH;
uniform float uDragV;
void main() {
  float r = bubbleRadius(aSeed.w * 0.92);
  // born along the bottle's plunge path, most of them right at the entry
  float u0 = 0.32 * aSeed2.x * aSeed2.x;
  float age = (uP - uPImp - u0) * 3.2; // seconds-ish, scrubbed by the scroll
  if (age <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); vAlpha = 0.0; return; }
  vec3 born = uEntry + uVel * (1.0 - exp(-u0 * uDragH)) / uDragH;
  born.y = -uDive * (1.0 - exp(-u0 * uDragV)) / uDragV;
  // a cloud around the bottle, wider the deeper it was dragged
  float ang = aSeed2.y * 6.2832;
  float rad = (0.03 + 0.12 * aSeed2.z) * (0.6 + 0.8 * u0 / 0.32);
  born += vec3(cos(ang) * rad, (aSeed2.w - 0.5) * 0.35 * (0.3 + u0), sin(ang) * rad * 0.8);
  float speed = 0.22 + 11.0 * r;
  // a short push down with the bottle, then the rise
  float y = born.y - 0.12 * (1.0 - exp(-age * 5.0)) * (1.0 - u0 * 2.0) + speed * max(0.0, age - 0.15);
  vec3 c = born + wander(age, r, aSeed) * (1.0 + age * 0.3);
  c.y = y;
  float alpha = smoothstep(0.0, 0.06, age);
  emit(c, r, alpha, age);
}`,
  leak: /* glsl */ `
uniform mat4 uEmit;
uniform float uLeak;
void main() {
  float r = bubbleRadius(aSeed.w * 0.75);
  float speed = 0.2 + 10.0 * r;
  float life = 1.6 + aSeed2.x * 1.4;
  float age = mod(uTime * (0.8 + aSeed2.y * 0.4) + aSeed.x * 31.0, life);
  // from the shoulder and the cap of the bottle
  float ang = aSeed2.z * 6.2832;
  vec3 local = vec3(cos(ang) * 0.055, 0.42 + 0.14 * aSeed2.w, sin(ang) * 0.055);
  vec3 born = (uEmit * vec4(local, 1.0)).xyz;
  vec3 c = born + wander(age, r, aSeed);
  c.y += speed * (age - 0.25 * (1.0 - exp(-age * 4.0)));
  float alpha = uLeak * smoothstep(0.0, 0.12, age) * (1.0 - smoothstep(life * 0.6, life, age));
  emit(c, r, alpha, age);
}`,
};

const FRAGMENT = /* glsl */ `
uniform vec3 uLight;
uniform vec3 uDark;
uniform vec3 uFog;
varying vec2 vUv;
varying float vAlpha;
varying float vFog;
varying float vBig;
void main() {
  vec2 q = vUv * 2.0 - 1.0;
  float r = length(q);
  if (r > 1.0) discard;
  float edge = 1.0 - smoothstep(0.9, 1.0, r);
  // silvery rim: thin and bright on big bubbles, the whole disc on tiny ones
  float rim = pow(smoothstep(mix(0.2, 0.6, vBig), 0.97, r), 1.5);
  float spec = exp(-pow(length(q - vec2(-0.34, 0.4)) / mix(0.32, 0.2, vBig), 2.0));
  float focus = exp(-pow(length(q - vec2(0.08, -0.52)) / 0.36, 2.0)) * 0.45;
  float lit = clamp(rim * 0.8 + spec + focus, 0.0, 1.0);
  vec3 col = mix(uDark, uLight, lit);
  col += uLight * spec * 0.6;
  float a = (0.07 + rim * 0.62 + spec * 0.85 + focus * 0.6) * edge * vAlpha;
  col = mix(uFog, col, vFog);
  a *= mix(0.25, 1.0, vFog);
  if (a < 0.004) discard;
  gl_FragColor = vec4(col, a);
}`;

const hash = (n) => {
  const x = Math.sin(n * 78.233 + 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export function createBubbles(kind, { count, fog, density, surface = 0, extra = {} }) {
  const quad = new THREE.PlaneGeometry(1, 1);
  const geo = new THREE.InstancedBufferGeometry();
  geo.index = quad.index;
  geo.setAttribute('position', quad.getAttribute('position'));
  const s1 = new Float32Array(count * 4);
  const s2 = new Float32Array(count * 4);
  const off = kind.length * 101;
  for (let i = 0; i < s1.length; i++) {
    s1[i] = hash(i * 1.37 + off);
    s2[i] = hash(i * 2.71 + off + 7.7);
  }
  geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(s1, 4));
  geo.setAttribute('aSeed2', new THREE.InstancedBufferAttribute(s2, 4));
  geo.instanceCount = count;

  const uniforms = {
    uTime: { value: 0 },
    uFogDensity: { value: density },
    uSurface: { value: surface },
    uFog: { value: new THREE.Color(fog) },
    uLight: { value: new THREE.Color('#fff4f6') },
    uDark: { value: new THREE.Color('#5b2a3b') },
    ...extra,
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: COMMON + VERTEX[kind],
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 2;
  return { mesh, uniforms };
}
