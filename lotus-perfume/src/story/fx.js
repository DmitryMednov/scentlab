import * as THREE from 'three';

// Small shared pieces for the two stories.

export const clamp01 = (x) => Math.min(1, Math.max(0, x));
export const range = (a, b, x) => clamp01((x - a) / (b - a));
export const smooth = (x) => x * x * (3 - 2 * x);
export const easeOut = (x) => 1 - Math.pow(1 - x, 3);
export const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const lerp = (a, b, k) => a + (b - a) * k;

export function hash(k) {
  const s = Math.sin(k * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

// clear water, same look as the petal drips
export function waterMaterial(envMap, opacity = 0.7) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: '#fff7f5', roughness: 0.02, metalness: 0, transparent: true, opacity,
    clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 2.4, depthWrite: false,
  });
  if (envMap) mat.envMap = envMap;
  return mat;
}

// A crown of droplets thrown up where something hits the water. Scrubbed by
// age (seconds since impact), so it plays backwards when the page scrolls up.
export function createSplash({ count = 24, size = 0.006, speed = 0.9, envMap }) {
  const mesh = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 12, 8), waterMaterial(envMap, 0.75), count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  mesh.renderOrder = 2;
  const seeds = Array.from({ length: count }, (_, i) => [hash(i + 1), hash(i + 51), hash(i + 101)]);
  const m = new THREE.Matrix4();
  const v = new THREE.Vector3();
  const s = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const G = 2.6;

  function update(origin, age, power = 1) {
    for (let i = 0; i < count; i++) {
      const [a, b, c] = seeds[i];
      const ang = (i / count) * Math.PI * 2 + a * 0.4;
      const out = speed * power * (0.25 + 0.45 * b);
      const up = speed * power * (0.9 + 0.9 * c);
      const tt = age - c * 0.05;
      const y = up * tt - 0.5 * G * tt * tt;
      if (tt <= 0 || y < 0) {
        m.makeScale(0, 0, 0);
      } else {
        v.set(origin.x + Math.cos(ang) * out * tt, y, origin.z + Math.sin(ang) * out * tt);
        const r = size * (0.5 + b) * power;
        const vy = up - G * tt;
        s.set(r, r * (1 + Math.min(Math.abs(vy) * 0.6, 0.8)), r);
        m.compose(v, q, s);
      }
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }
  update(new THREE.Vector3(), -1);
  return { mesh, update };
}

// Bright water caustics (the classic iterated-sine pattern), 0..~1.
export const CAUSTIC_GLSL = /* glsl */ `
float caustic(vec2 p, float time) {
  vec2 i = p;
  float c = 1.0;
  float inten = 0.005;
  for (int n = 0; n < 4; n++) {
    float t = time * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
  }
  c /= 4.0;
  c = 1.17 - pow(c, 1.4);
  return clamp(pow(abs(c), 8.0), 0.0, 1.6);
}
`;
