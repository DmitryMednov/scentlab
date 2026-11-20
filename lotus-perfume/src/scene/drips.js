import * as THREE from 'three';

// Occasional drips once the flower is open: a bead swells under a petal tip,
// lets go, falls and leaves a faint ring on the water. Fully driven by the
// timeline (no state), so a frozen ?t= renders the same frame every time.

// Petal tips that hang over open water and face the camera (checked with the
// flower fully open: all sit well outside the stone ellipse).
const TIPS = [
  ['outer', 7], ['outer', 1], ['middle', 4], ['outer', 2],
  ['inner', 0], ['outer', 6], ['middle', 1], ['inner', 4],
];

const FIRST = 7.8; // s; after the inner petals have finished opening
const PERIOD = 3.4;
const JITTER = 1.2;
const SWELL = 1.5; // bead grows under the tip before it lets go
const GRAVITY = 2.4; // scene units/s^2, slowed so the fall stays readable
const RADIUS = 0.0058;
export const DRIP_SLOTS = 4;
export const RIPPLE_LIFE = 3.6;

function hash(k) {
  const s = Math.sin(k * 91.17 + 4.3) * 43758.5453;
  return s - Math.floor(s);
}

function dripStart(k) {
  return FIRST + k * PERIOD + (hash(k) - 0.5) * JITTER;
}

export function createDrips(flower, { envMap } = {}) {
  const tips = TIPS.map(([name, index]) => flower.petals.find((p) => p.ring.name === name && p.index === index)).filter(Boolean);
  const tipIndex = flower.SEG_V * (flower.SEG_U + 1) + flower.SEG_U / 2;

  const geo = new THREE.SphereGeometry(1, 20, 14);
  const mat = new THREE.MeshPhysicalMaterial({
    color: '#fff7f5', roughness: 0.02, metalness: 0, transparent: true, opacity: 0.68,
    clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 2.4, depthWrite: false,
  });
  if (envMap) mat.envMap = envMap;
  const mesh = new THREE.InstancedMesh(geo, mat, 2);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  mesh.renderOrder = 2;

  // ripple impacts for the water shader: (x, z, impact time, strength)
  const impacts = Array.from({ length: DRIP_SLOTS }, () => new THREE.Vector4());

  const m = new THREE.Matrix4();
  const v = new THREE.Vector3();
  const s = new THREE.Vector3();
  const q = new THREE.Quaternion();

  function tipOf(k, out) {
    const p = tips[(k * 3 + Math.floor(hash(k + 17) * 2)) % tips.length];
    return out.fromBufferAttribute(p.geo.attributes.position, tipIndex).applyMatrix4(p.mesh.matrixWorld);
  }

  function update(t) {
    const last = Math.floor((t - FIRST) / PERIOD) + 1;
    let slot = 0;
    for (let k = last; k >= Math.max(0, last - 3); k--) {
      const start = dripStart(k);
      if (t < start) continue;
      tipOf(k, v);
      const fallTime = Math.sqrt((2 * Math.max(v.y, 0.05)) / GRAVITY);
      const release = start + SWELL;
      const impact = release + fallTime;
      if (t < impact && slot < 2) {
        if (t < release) {
          // swelling bead, sagging a little as it fills
          const g = (t - start) / SWELL;
          const r = RADIUS * (0.35 + 0.65 * g * g);
          v.y -= 0.006 + r * (0.6 + 0.5 * g);
          s.set(r, r * (1.05 + 0.2 * g), r);
        } else {
          const ft = t - release;
          const speed = GRAVITY * ft;
          v.y -= 0.006 + RADIUS * 1.1 + 0.5 * GRAVITY * ft * ft;
          const stretch = 1.15 + Math.min(speed * 0.35, 0.55);
          s.set(RADIUS * 0.88, RADIUS * stretch, RADIUS * 0.88);
        }
        m.compose(v, q, s);
        mesh.setMatrixAt(slot++, m);
      } else if (t >= impact && t - impact < RIPPLE_LIFE) {
        const i = k % DRIP_SLOTS;
        impacts[i].set(v.x, v.z, impact, 1);
      }
    }
    for (let i = slot; i < 2; i++) {
      m.makeScale(0, 0, 0);
      mesh.setMatrixAt(i, m);
    }
    for (const imp of impacts) if (t - imp.z >= RIPPLE_LIFE || t < imp.z) imp.w = 0;
    mesh.instanceMatrix.needsUpdate = true;
  }

  return { mesh, impacts, update };
}
