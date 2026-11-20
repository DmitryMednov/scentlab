import * as THREE from 'three';
import { STONE } from './stone.js';
import { DRIP_SLOTS, RIPPLE_LIFE } from './drips.js';

// Full-screen sky + water in one pass. The sky is the color-matched plate
// (public/tex/sky.jpg, horizon at row 540 of 605) mapped "cover" and pinned to
// the 3D horizon. Water is ray-traced against y = 0: rippled normals reflect
// that same sky (which produces the sun-glitter column on its own) and sample
// a planar reflection of the flower + stone rendered from a mirrored camera.

const vertexShader = /* glsl */ `
varying vec2 vNdc;
void main() {
  vNdc = position.xy;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform sampler2D tSky;
uniform sampler2D tRefl;
uniform vec2 uRes;
uniform float uHorizonNdc;
uniform float uSkyScale;
uniform mat4 uInvProj;
uniform mat4 uCamWorld;
uniform mat4 uViewProj;
uniform mat4 uReflMat;
uniform float uTime;
uniform float uLand;
uniform vec3 uWaterDeep;
uniform vec3 uWaterTint;
uniform vec3 uReflTint;
uniform vec2 uStone;
uniform float uRipple;
uniform vec4 uDrips[DRIP_SLOTS]; // x, z, impact time, strength
uniform vec4 uSplash; // story drop/bottle: x, z, age (s), strength
uniform vec4 uSkyTint; // story mist in the clouds: rgb multiplier, amount
varying vec2 vNdc;

float texRowFor(float ndcY) {
  float py = (1.0 - (ndcY * 0.5 + 0.5)) * uRes.y;
  float hy = (1.0 - (uHorizonNdc * 0.5 + 0.5)) * uRes.y;
  return (py - hy) / uSkyScale + 540.0;
}

vec3 skyAt(vec2 ndc) {
  float px = (ndc.x * 0.5 + 0.5) * uRes.x;
  float tx = (px - uRes.x * 0.5) / uSkyScale + 960.0;
  float ty = clamp(texRowFor(ndc.y), 0.5, 604.5);
  vec3 c = texture2D(tSky, vec2(tx / 1920.0, 1.0 - ty / 605.0)).rgb;
  if (uSkyTint.w > 0.0) {
    // the essence soaks into the clouds in slow, uneven drifts
    float above = smoothstep(548.0, 360.0, ty);
    float n = 0.6 + 0.4 * sin(tx * 0.0061 + uTime * 0.05) * sin(ty * 0.013 - tx * 0.0023 + 1.7);
    float l = dot(c, vec3(0.299, 0.587, 0.114));
    c = mix(c, c * uSkyTint.rgb, uSkyTint.w * above * n * smoothstep(0.35, 0.8, l));
  }
  return c;
}

// returns (dh/dx, dh/dz)
vec2 waterSlope(vec2 p) {
  vec2 slope = vec2(0.0);
  vec2 q = p / uStone;
  float e = length(q);
  float r = length(p) + 1e-4;
  vec2 dir = p / r;
  float outside = smoothstep(0.92, 1.12, e);
  float decay = exp(-max(r - 0.7, 0.0) * 0.32);
  float d = 0.0;
  d += 0.02 * cos(r * 34.0 - uTime * 1.7);
  d += 0.009 * cos(r * 57.0 - uTime * 2.5 + 1.3);
  d *= outside * decay * uRipple;
  float dt = uTime - uLand;
  if (dt > 0.0) {
    float c = 0.62 + dt * 0.5;
    float g = exp(-pow((r - c) / 0.28, 2.0));
    d += 0.09 * g * cos((r - c) * 40.0) * exp(-dt * 0.3) * outside;
  }
  slope += dir * d;
  // faint rings where a drip from the petals hits the water
  for (int i = 0; i < DRIP_SLOTS; i++) {
    vec4 dp = uDrips[i];
    float age = uTime - dp.z;
    if (dp.w <= 0.0 || age < 0.0 || age > RIPPLE_LIFE) continue;
    vec2 o = p - dp.xy;
    float rr = length(o) + 1e-4;
    float c = 0.008 + age * 0.26;
    float env = exp(-pow((rr - c) / (0.018 + age * 0.03), 2.0));
    float fade = exp(-age * 0.95) * (1.0 - smoothstep(RIPPLE_LIFE - 0.8, RIPPLE_LIFE, age));
    slope += (o / rr) * dp.w * 0.1 * env * fade * sin((rr - c) * 110.0) / (1.0 + rr * 4.0);
  }
  // one big impact (the story's water drop or the falling bottle): a short train of rings
  if (uSplash.w > 0.0) {
    vec2 o = p - uSplash.xy;
    float rr = length(o) + 1e-4;
    float age = uSplash.z;
    for (int j = 0; j < 3; j++) {
      float c = age * (0.42 - float(j) * 0.11);
      float env = exp(-pow((rr - c) / (0.03 + age * 0.05), 2.0));
      slope += (o / rr) * uSplash.w * 0.14 * env * exp(-age * 0.4) * sin((rr - c) * 75.0 - uTime * 2.0) / (1.0 + rr * 2.0);
    }
  }
  // wind micro-waves, mostly across z, so reflections smear vertically
  slope.y += 0.010 * sin(p.y * 21.0 + uTime * 1.05 + sin(p.x * 2.7) * 1.6);
  slope.y += 0.006 * sin(p.y * 47.0 - uTime * 1.6 + p.x * 4.0);
  slope.x += 0.004 * sin(p.x * 15.0 + p.y * 7.0 + uTime * 0.7);
  return slope;
}

void main() {
  vec2 ndc = vNdc;
  vec4 vp = uInvProj * vec4(ndc, 1.0, 1.0);
  vp /= vp.w;
  vec3 dir = normalize((uCamWorld * vec4(vp.xyz, 0.0)).xyz);
  vec3 ro = cameraPosition;

  vec3 col;
  float row = texRowFor(ndc.y);
  if (dir.y > -1e-4) {
    col = skyAt(ndc);
  } else {
    float t = -ro.y / dir.y;
    vec3 P = ro + dir * t;
    vec2 s = waterSlope(P.xz);
    // flatten micro-detail with distance to avoid shimmering at the horizon
    s *= mix(1.0, 0.35, smoothstep(6.0, 30.0, t));
    vec3 n = normalize(vec3(-s.x, 1.0, -s.y));
    vec3 r = reflect(dir, n);
    r.y = max(r.y, 0.0015);
    vec4 qc = uViewProj * vec4(r, 0.0);
    vec2 ndcR = qc.xy / max(qc.w, 1e-4);
    vec3 sky = skyAt(ndcR);

    float cosT = clamp(dot(n, -dir), 0.0, 1.0);
    float F = 0.58 + 0.42 * pow(1.0 - cosT, 3.0);
    col = mix(uWaterDeep, sky * uWaterTint, F);

    // planar reflection of the flower and stone
    vec4 rp = uReflMat * vec4(P, 1.0);
    vec2 ruv = rp.xy / rp.w + vec2(s.x * 0.5, s.y * 1.2);
    vec4 refl = vec4(0.0);
    refl += texture2D(tRefl, ruv + vec2(0.0, -0.011)) * 0.2;
    refl += texture2D(tRefl, ruv + vec2(0.0, -0.005)) * 0.2;
    refl += texture2D(tRefl, ruv) * 0.2;
    refl += texture2D(tRefl, ruv + vec2(0.0, 0.005)) * 0.2;
    refl += texture2D(tRefl, ruv + vec2(0.0, 0.011)) * 0.2;
    col = mix(col, refl.rgb / max(refl.a, 1e-3) * uReflTint, clamp(refl.a, 0.0, 1.0) * 0.76);

    // thin bright meniscus where the water touches the stone
    float e = length(P.xz / uStone);
    col += vec3(0.05, 0.035, 0.04) * exp(-pow((e - 1.0) / 0.035, 2.0));
    col *= 1.0 - 0.18 * exp(-pow((e - 1.05) / 0.12, 2.0));

    // far water fades into the plate's own haze band
    float far = 1.0 - smoothstep(546.0, 600.0, row);
    col = mix(col, skyAt(ndc), far);
  }

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

export function createBackdrop({ skyTexture, reflTexture, drips }) {
  const uniforms = {
    tSky: { value: skyTexture },
    tRefl: { value: reflTexture },
    uRes: { value: new THREE.Vector2(1, 1) },
    uHorizonNdc: { value: 0 },
    uSkyScale: { value: 1 },
    uInvProj: { value: new THREE.Matrix4() },
    uCamWorld: { value: new THREE.Matrix4() },
    uViewProj: { value: new THREE.Matrix4() },
    uReflMat: { value: new THREE.Matrix4() },
    uTime: { value: 0 },
    uLand: { value: 1e6 },
    uWaterDeep: { value: new THREE.Color('#765262') },
    uWaterTint: { value: new THREE.Color('#f3e2e5') },
    uReflTint: { value: new THREE.Color('#dcc3c6') },
    uStone: { value: new THREE.Vector2(STONE.rx, STONE.rz) },
    uRipple: { value: 1 },
    uDrips: { value: drips },
    uSplash: { value: new THREE.Vector4() },
    uSkyTint: { value: new THREE.Vector4(1, 1, 1, 0) },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms, vertexShader, fragmentShader, depthWrite: false,
    defines: { DRIP_SLOTS, RIPPLE_LIFE: RIPPLE_LIFE.toFixed(2) }, depthTest: false, toneMapped: false,
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -1000;

  const vp = new THREE.Matrix4();
  const dirH = new THREE.Vector3();
  const tmp = new THREE.Vector4();

  function update(camera, width, height, reflMatrix) {
    uniforms.uRes.value.set(width, height);
    uniforms.uSkyScale.value = Math.max(width / 1920, height / 1080);
    uniforms.uInvProj.value.copy(camera.projectionMatrixInverse);
    uniforms.uCamWorld.value.copy(camera.matrixWorld);
    vp.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    uniforms.uViewProj.value.copy(vp);
    uniforms.uReflMat.value.copy(reflMatrix);
    // horizon: project the forward direction flattened onto the water plane
    camera.getWorldDirection(dirH);
    dirH.y = 0;
    dirH.normalize();
    tmp.set(dirH.x, 0, dirH.z, 0).applyMatrix4(vp);
    uniforms.uHorizonNdc.value = tmp.y / tmp.w;
  }

  return { mesh, uniforms, update };
}
