import * as THREE from 'three';

// A faint breath of perfume from the open neck: a few hundred soft points that
// leave the nozzle upward, swirl with the turning bottle, widen and fade.
// Pure function of the emission progress u (0 = none yet, 1 = last one out).

const vertexShader = /* glsl */ `
attribute vec4 aSeed;
uniform float uU;
uniform vec3 uOrigin;
uniform float uPx;
varying float vA;
varying float vAge;
void main() {
  float birth = aSeed.x * 0.7;
  float a = (uU - birth) / 0.6;
  vAge = a;
  if (a <= 0.0 || a >= 1.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vA = 0.0;
    return;
  }
  float e = 1.0 - pow(1.0 - a, 2.2); // fast out of the nozzle, then drifting
  float ang = aSeed.y * 6.2832 + a * (1.8 + aSeed.w * 1.4);
  float rad = 0.004 + e * (0.05 + aSeed.z * 0.13);
  vec3 p = uOrigin;
  p.y += e * (0.12 + aSeed.w * 0.2);
  p.x += cos(ang) * rad;
  p.z += sin(ang) * rad;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = 0.008 + e * (0.045 + aSeed.z * 0.05);
  gl_PointSize = clamp(size * uPx / -mv.z, 1.0, 60.0);
  vA = smoothstep(0.0, 0.08, a) * (1.0 - smoothstep(0.35, 1.0, a)) * (0.45 + 0.55 * aSeed.w);
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
  float g = exp(-r2 * 3.0) * (1.0 - smoothstep(0.7, 1.0, r2));
  vec3 c = mix(uColA, uColB, smoothstep(0.0, 0.7, vAge));
  float a = g * vA * uStrength;
  if (a < 0.003) discard;
  gl_FragColor = vec4(c, a);
}`;

const hash = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function createSpritz({ count = 260 } = {}) {
  const geo = new THREE.BufferGeometry();
  const seeds = new Float32Array(count * 4);
  for (let i = 0; i < seeds.length; i++) seeds[i] = hash(i * 1.91 + 4.3);
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4));
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uU: { value: 0 },
      uOrigin: { value: new THREE.Vector3() },
      uPx: { value: 1 },
      uStrength: { value: 0.65 },
      uColA: { value: new THREE.Color('#c0233f') },
      uColB: { value: new THREE.Color('#fff1f4') },
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

  function update(u, origin) {
    material.uniforms.uU.value = u;
    material.uniforms.uOrigin.value.copy(origin);
    mesh.visible = u > 0 && u < 1.3;
  }

  return { mesh, update, uniforms: material.uniforms };
}
