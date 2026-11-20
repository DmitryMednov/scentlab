import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

// Wet, pebbly stone the bud lands on: a low lumpy
// dome plus a few hundred instanced grains, cut at the waterline by a clip plane.

export const STONE = { rx: 0.66, rz: 0.5, height: 0.13, y: -0.035 };

function hash(x, y, z) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

function noise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const fx = xf * xf * (3 - 2 * xf), fy = yf * yf * (3 - 2 * yf), fz = zf * zf * (3 - 2 * zf);
  let out = 0;
  for (let dz = 0; dz <= 1; dz++)
    for (let dy = 0; dy <= 1; dy++)
      for (let dx = 0; dx <= 1; dx++) {
        const w = (dx ? fx : 1 - fx) * (dy ? fy : 1 - fy) * (dz ? fz : 1 - fz);
        out += w * hash(xi + dx, yi + dy, zi + dz);
      }
  return out;
}

export function createStone({ envMap, clipPlanes }) {
  const group = new THREE.Group();
  group.name = 'stone';

  const ico = new THREE.IcosahedronGeometry(1, 14);
  ico.deleteAttribute('normal');
  ico.deleteAttribute('uv');
  const geo = mergeVertices(ico);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    const n = noise3(v.x * 3.1 + 7, v.y * 3.1, v.z * 3.1) * 0.6 + noise3(v.x * 9 + 1, v.y * 9, v.z * 9) * 0.4;
    const k = 1 + (n - 0.5) * 0.22;
    // flatten the top into a gentle dome
    const top = v.y > 0 ? Math.pow(v.y, 0.75) : v.y;
    pos.setXYZ(i, v.x * STONE.rx * k, top * STONE.height * (0.85 + n * 0.3), v.z * STONE.rz * k);
  }
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    color: '#3c3134', roughness: 0.3, metalness: 0.0, envMapIntensity: 1.1,
    clippingPlanes: clipPlanes,
  });
  if (envMap) mat.envMap = envMap;
  const dome = new THREE.Mesh(geo, mat);
  dome.position.y = STONE.y;
  dome.receiveShadow = true;
  dome.castShadow = true;
  group.add(dome);

  // grains / pebbles
  const count = 2600;
  const pg = new THREE.IcosahedronGeometry(1, 1);
  const pm = new THREE.MeshStandardMaterial({
    color: '#ffffff', roughness: 0.28, metalness: 0.0, envMapIntensity: 1.25,
    clippingPlanes: clipPlanes,
  });
  if (envMap) pm.envMap = envMap;
  const grains = new THREE.InstancedMesh(pg, pm, count);
  grains.receiveShadow = true;
  grains.castShadow = true;
  const ray = new THREE.Raycaster();
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const s = new THREE.Vector3();
  const p = new THREE.Vector3();
  const col = new THREE.Color();
  const palette = ['#2c2427', '#463a3d', '#5e5053', '#3a2f32', '#76686a', '#231c1f', '#54464a'];
  dome.updateMatrixWorld(true);
  let seed = 3;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  let placed = 0;
  for (let tries = 0; placed < count && tries < count * 4; tries++) {
    const a = rnd() * Math.PI * 2;
    const rr = Math.sqrt(rnd()) * 1.02;
    const x = Math.cos(a) * STONE.rx * rr;
    const z = Math.sin(a) * STONE.rz * rr;
    ray.set(new THREE.Vector3(x, 1, z), new THREE.Vector3(0, -1, 0));
    const hit = ray.intersectObject(dome, false)[0];
    if (!hit) continue;
    p.copy(hit.point);
    if (p.y < -0.01) continue;
    const r = 0.0045 + Math.pow(rnd(), 3.0) * 0.015;
    s.set(r * (0.8 + rnd() * 0.5), r * (0.35 + rnd() * 0.3), r * (0.8 + rnd() * 0.5));
    e.set(rnd() * 0.6, rnd() * Math.PI, rnd() * 0.6);
    q.setFromEuler(e);
    m.compose(p, q, s);
    grains.setMatrixAt(placed, m);
    col.set(palette[Math.floor(rnd() * palette.length)]);
    grains.setColorAt(placed, col);
    placed++;
  }
  grains.count = placed;
  group.add(grains);

  return { group, dome, grains };
}
