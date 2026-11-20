import * as THREE from 'three';

// The pump's red atomisation: each press of the actuator shoots a short burst of
// fine droplets sideways out of the orifice. They leave fast in a narrow cone,
// brake in the air, widen into a cloud, sink a little and fade.
// Pure function of the time s and the press start times (seconds).

const PULSES = 3;

const vertexShader = /* glsl */ `
attribute vec4 aSeed;
uniform float uT;
uniform vec3 uStarts;
uniform vec3 uOrigin;
uniform vec3 uDir;
uniform float uPx;
varying float vA;
varying float vAge;
void main() {
  float slot = floor(aSeed.x * ${PULSES}.0);
  float start = slot < 0.5 ? uStarts.x : (slot < 1.5 ? uStarts.y : uStarts.z);
  float birth = fract(aSeed.x * ${PULSES}.0) * 0.24; // each burst lasts a quarter of a second
  float life = 0.8 + aSeed.w * 0.6;
  float a = (uT - start - birth) / life;
  vAge = a;
  if (a <= 0.0 || a >= 1.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vA = 0.0;
    return;
  }
  vec3 side = normalize(cross(uDir, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(side, uDir);
  float e = (1.0 - exp(-a * 6.0)) / (1.0 - exp(-6.0)); // air drag: fast out, then hanging
  float dist = e * (0.32 + 0.3 * aSeed.z);
  float ang = aSeed.y * 6.2832;
  float rad = sqrt(fract(aSeed.z * 7.31)) * (dist * 0.16 + e * e * 0.06);
  vec3 p = uOrigin + uDir * dist + (side * cos(ang) + up * sin(ang)) * rad;
  p.y -= 0.06 * a * a;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = 0.009 + e * (0.016 + aSeed.w * 0.026);
  gl_PointSize = clamp(size * uPx / -mv.z, 1.0, 48.0);
  vA = smoothstep(0.0, 0.02, a) * (1.0 - smoothstep(0.3, 1.0, a)) * (0.5 + 0.5 * aSeed.w);
}`;

const fragmentShader = /* glsl */ `
uniform vec3 uColA;
uniform vec3 uColB;
uniform float uStrength;
varying float vA;
varying float vAge;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d) * 4.0;
  float g = exp(-r2 * 2.5) * (1.0 - smoothstep(0.7, 1.0, r2));
  vec3 c = mix(uColA, uColB, smoothstep(0.1, 0.9, vAge));
  float a = g * vA * uStrength;
  if (a < 0.003) discard;
  gl_FragColor = vec4(c, a);
}`;

const hash = (n) => {
  const x = Math.sin(n * 91.7 + 17.3) * 43758.5453;
  return x - Math.floor(x);
};

export function createSpray({ count = 660 } = {}) {
  const geo = new THREE.BufferGeometry();
  const seeds = new Float32Array(count * 4);
  for (let i = 0; i < seeds.length; i++) seeds[i] = hash(i * 2.37 + 1.1);
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4));
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uT: { value: -1 },
      uStarts: { value: new THREE.Vector3() },
      uOrigin: { value: new THREE.Vector3() },
      uDir: { value: new THREE.Vector3(1, 0, 0) },
      uPx: { value: 1 },
      uStrength: { value: 0.9 },
      uColA: { value: new THREE.Color('#d40f35') },
      uColB: { value: new THREE.Color('#ff8da3') },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Points(geo, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 3;
  mesh.visible = false;

  // starts: the PULSES press times; s: the time on the same clock
  function update(s, starts, origin, dir) {
    const u = material.uniforms;
    u.uT.value = s;
    u.uStarts.value.fromArray(starts);
    u.uOrigin.value.copy(origin);
    u.uDir.value.copy(dir);
    mesh.visible = s > starts[0] && s < starts[PULSES - 1] + 1.7;
  }

  return { mesh, update, uniforms: material.uniforms, pulses: PULSES };
}
