import * as THREE from 'three';

// Procedural lotus: every petal is a bent, cupped parametric surface rebuilt on
// the CPU whenever its "open" amount changes. u runs across the petal (-1..1),
// v along it (0 at the base, 1 at the tip).

const SEG_U = 16;
const SEG_V = 34;

// Closed values shape the bud as a teardrop widest ~40% up, outer tips lower
// than the inner ones so the top comes to a point (closed.len shortens,
// closed.point narrows the upper blade). Open values give the full bloom.
const RINGS = [
  {
    name: 'sepal', count: 5, len: 0.22, wid: 0.15, r0: 0.085, y0: 0.03, phase: 0.31,
    closed: { tilt: 1.3, bend: 1.25, pow: 1.0, cup: 0.15 },
    open: { tilt: 1.45, bend: 0.45, pow: 1.5, cup: 0.2 },
    delay: 0.0, sepal: true,
  },
  {
    name: 'inner', count: 5, len: 0.92, wid: 0.29, r0: 0.1, y0: 0.065, phase: Math.PI / 5,
    closed: { tilt: 1.15, bend: 1.65, pow: 0.4, cup: 0.16, point: 0.3 },
    open: { tilt: 1.0, bend: 0.45, pow: 1.1, cup: 0.4 },
    front: { tilt: 0.26, bend: -0.55, cup: -0.16 },
    back: { tilt: -0.35 },
    delay: 0.7,
  },
  {
    name: 'middle', count: 6, len: 0.92, wid: 0.31, r0: 0.07, y0: 0.06, phase: Math.PI / 6,
    closed: { tilt: 1.65, bend: 2.3, pow: 0.4, cup: 0.18, len: 0.9, point: 0.4 },
    open: { tilt: 1.22, bend: 0.5, pow: 2.0, cup: 0.27 },
    front: { tilt: 0.3, bend: -0.25 },
    back: { tilt: -0.74, bend: 0.2, cup: 0.2, len: 0.12, wid: 0.15 },
    delay: 0.35,
  },
  {
    name: 'outer', count: 8, len: 0.92, wid: 0.34, r0: 0.095, y0: 0.055, phase: 0,
    closed: { tilt: 1.55, bend: 2.4, pow: 0.6, cup: 0.2, len: 0.8, point: 0.45 },
    open: { tilt: 1.42, bend: 0.72, pow: 2.2, cup: 0.28 },
    delay: 0.0,
  },
];

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const lerp = (a, b, t) => a + (b - a) * t;

function widthAt(v) {
  // broad ovate body (widest a little past the middle) closing to a short point
  const shape = Math.pow(Math.sin(Math.PI * Math.pow(v, 0.72)), 0.6);
  return shape * (1 - 0.35 * Math.pow(1 - v, 3)) + 0.22 * Math.pow(1 - v, 2.4);
}

// Builds positions for one petal into `pos` (Float32Array) given blended params.
function buildPetal(p, pos, spine) {
  const { len, wid, bend, pow, cup, point } = p;
  // spine: integrate the bend angle along the length (bend toward the inner side, -z)
  let y = 0;
  let z = 0;
  const ds = len / SEG_V;
  for (let j = 0; j <= SEG_V; j++) {
    const v = j / SEG_V;
    const th = bend * Math.pow(v, pow);
    spine[j * 4] = y;
    spine[j * 4 + 1] = z;
    spine[j * 4 + 2] = Math.sin(th); // normal toward the outer side
    spine[j * 4 + 3] = Math.cos(th);
    const thm = bend * Math.pow((j + 0.5) / SEG_V, pow);
    y += Math.cos(thm) * ds;
    z -= Math.sin(thm) * ds;
  }
  let k = 0;
  for (let j = 0; j <= SEG_V; j++) {
    const v = j / SEG_V;
    const tp = Math.min(1, Math.max(0, (v - 0.45) / 0.55));
    const w = wid * widthAt(v) * (1 - point * tp * tp * (3 - 2 * tp));
    const R = cup * (0.7 + 0.6 * v);
    const sy = spine[j * 4];
    const sz = spine[j * 4 + 1];
    const ny = spine[j * 4 + 2];
    const nz = spine[j * 4 + 3];
    for (let i = 0; i <= SEG_U; i++) {
      const u = (i / SEG_U) * 2 - 1;
      const a = (u * w) / R;
      const X = R * Math.sin(a);
      // cupping: edges curl toward the inner side; tip slightly pinched
      const off = -R * (1 - Math.cos(a)) - 0.012 * Math.pow(v, 6) * u * u;
      pos[k++] = X;
      pos[k++] = sy + ny * off;
      pos[k++] = sz + nz * off;
    }
  }
}

function petalGeometry() {
  const g = new THREE.BufferGeometry();
  const n = (SEG_U + 1) * (SEG_V + 1);
  const pos = new Float32Array(n * 3);
  const uv = new Float32Array(n * 2);
  let k = 0;
  for (let j = 0; j <= SEG_V; j++) {
    for (let i = 0; i <= SEG_U; i++) {
      uv[k++] = i / SEG_U;
      uv[k++] = j / SEG_V;
    }
  }
  const idx = [];
  for (let j = 0; j < SEG_V; j++) {
    for (let i = 0; i < SEG_U; i++) {
      const a = j * (SEG_U + 1) + i;
      const b = a + 1;
      const c = a + SEG_U + 1;
      const d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  g.setIndex(idx);
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
  return g;
}

const PETAL_GLSL_HEAD = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uMid;
uniform vec3 uEdge;
uniform vec3 uTip;
uniform vec3 uTrans;
uniform float uVein;
varying vec2 vPetalUv;
vec2 hash22(vec2 p){ p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453); }
float hash12(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), f.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), f.x), f.y);
}
float cellEdge(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float d1 = 8.0, d2 = 8.0;
  for (int y=-1; y<=1; y++) for (int x=-1; x<=1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 o = hash22(i + g);
    float d = length(g + o - f);
    if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
  }
  return 1.0 - smoothstep(0.0, 0.09, d2 - d1);
}
// Vein structure shared by color and relief: x = combined mask, y = relief height.
vec2 petalVeins(vec2 uv){
  float u = uv.x * 2.0 - 1.0;
  float v = uv.y;
  float au = abs(u);
  float fan = u * (5.0 + 2.5 * v);
  float vein = 1.0 - smoothstep(0.0, 0.11, abs(fract(fan + 0.5) - 0.5));
  // wide, soft profile of the same veins for the relief (sharp grooves alias into stipple)
  float groove = 1.0 - smoothstep(0.0, 0.3, abs(fract(fan + 0.5) - 0.5));
  float mid = 1.0 - smoothstep(0.0, 0.05, au);
  float midRidge = 1.0 - smoothstep(0.0, 0.14, au);
  float net = cellEdge(vec2(u * 7.0, v * 15.0));
  float fade = smoothstep(0.02, 0.2, v) * (1.0 - smoothstep(0.86, 0.97, v));
  float mask = (vein * 0.55 + net * 0.35 + mid * 0.6) * uVein * fade;
  // veins sit in shallow, rounded grooves either side of a raised midrib; a slow
  // undulation keeps the blade from looking machined
  float h = (-groove * 0.7 + midRidge * 0.6) * fade + vnoise(uv * vec2(4.0, 7.0)) * 0.5;
  return vec2(mask, h * uVein);
}
`;

function makePetalMaterial(colors, { sepal = false } = {}) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.44,
    metalness: 0,
    sheen: 0.7,
    sheenRoughness: 0.38,
    sheenColor: new THREE.Color('#ffd6da'),
    clearcoat: 0.3,
    clearcoatRoughness: 0.28,
    side: THREE.DoubleSide,
    envMapIntensity: 0.85,
  });
  mat.shadowSide = THREE.DoubleSide;
  const uniforms = {
    uBase: { value: new THREE.Color(colors.base) },
    uMid: { value: new THREE.Color(colors.mid) },
    uEdge: { value: new THREE.Color(colors.edge) },
    uTip: { value: new THREE.Color(colors.tip) },
    uTrans: { value: new THREE.Color(colors.trans) },
    uVein: { value: sepal ? 0.5 : 1.0 },
  };
  mat.userData.uniforms = uniforms;
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vPetalUv;')
      .replace('#include <uv_vertex>', '#include <uv_vertex>\nvPetalUv = uv;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${PETAL_GLSL_HEAD}`)
      .replace(
        '#include <color_fragment>',
        /* glsl */ `#include <color_fragment>
        {
          float u = vPetalUv.x * 2.0 - 1.0;
          float v = vPetalUv.y;
          float au = abs(u);
          vec2 vh = petalVeins(vPetalUv);
          vec3 c = mix(uBase, uMid, smoothstep(0.15, 0.85, v));
          // blush creeping in from the margins, strongest on the upper half
          float blush = smoothstep(0.4, 1.0, au) * smoothstep(0.1, 0.85, v);
          blush *= 0.75 + 0.5 * vnoise(vPetalUv * vec2(3.0, 5.0));
          c = mix(c, uEdge, blush * 0.5);
          // rose rim along the whole edge, widening toward the tip
          float rimW = mix(0.95, 0.86, smoothstep(0.5, 1.0, v));
          c = mix(c, uTip, smoothstep(rimW, 1.0, au) * smoothstep(0.3, 0.9, v) * 0.55);
          // magenta tip that bleeds down the centre line
          float tip = smoothstep(0.84, 0.995, v) * (1.0 - 0.55 * smoothstep(0.2, 0.85, au));
          c = mix(c, uTip, tip * 0.9);
          // veins: slightly darker and pinker than the blade
          c *= 1.0 - 0.08 * vh.x;
          c = mix(c, uEdge, vh.x * 0.12);
          // occlusion where the petal meets the receptacle
          c *= mix(0.8, 1.0, smoothstep(0.0, 0.3, v));
          diffuseColor.rgb *= c;
        }`,
      )
      .replace(
        '#include <normal_fragment_maps>',
        /* glsl */ `#include <normal_fragment_maps>
        {
          // bump from the vein relief (derivative bump, as in three's bumpmap)
          float hb = petalVeins(vPetalUv).y * 0.0008;
          vec3 dpx = dFdx(-vViewPosition);
          vec3 dpy = dFdy(-vViewPosition);
          float hx = dFdx(hb);
          float hy = dFdy(hb);
          vec3 r1 = cross(dpy, normal);
          vec3 r2 = cross(normal, dpx);
          float det = dot(dpx, r1);
          vec3 grad = sign(det) * (hx * r1 + hy * r2);
          normal = normalize(abs(det) * normal - grad);
        }`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `#include <emissivemap_fragment>
        {
          // soft pink halo where the petal turns away from the viewer
          float fres = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 3.0);
          totalEmissiveRadiance += uTrans * uEdge * fres * 0.1;
        }`,
      )
      .replace(
        '#include <lights_fragment_end>',
        /* glsl */ `#include <lights_fragment_end>
        #if NUM_DIR_LIGHTS > 0
        {
          // backlit translucency from the low sun, warmer and thicker toward the base
          vec3 L = directionalLights[ 0 ].direction;
          vec3 V = geometryViewDir;
          float back = pow(clamp(dot(-V, L), 0.0, 1.0), 2.0);
          float thru = clamp(-dot(normal, L), 0.0, 1.0);
          float thin = mix(0.55, 1.0, smoothstep(0.1, 0.8, vPetalUv.y));
          vec3 trans = uTrans * diffuseColor.rgb * directionalLights[ 0 ].color;
          reflectedLight.directDiffuse += trans * (0.45 * thru + 0.55 * back) * thin;
        }
        #endif`,
      );
  };
  mat.customProgramCacheKey = () => (sepal ? 'petal-sepal' : 'petal');
  return mat;
}

export const PETAL_COLORS = {
  base: '#fff7f0',
  mid: '#fbe7df',
  edge: '#efc0b9',
  tip: '#c64a68',
  trans: '#ffd9cf',
};

const SEPAL_COLORS = {
  base: '#d7b2ad',
  mid: '#c49a98',
  edge: '#b0827f',
  tip: '#9a636b',
  trans: '#e2b4ad',
};

export function createFlower({ envMap } = {}) {
  const group = new THREE.Group();
  group.name = 'flower';
  const rand = mulberry32(20261009);

  const petalMat = makePetalMaterial(PETAL_COLORS);
  const sepalMat = makePetalMaterial(SEPAL_COLORS, { sepal: true });
  if (envMap) {
    petalMat.envMap = envMap;
    sepalMat.envMap = envMap;
  }

  // Receptacle: the rounded base the petals grow from.
  const prof = [
    [0.0, -0.035], [0.035, -0.032], [0.07, -0.015], [0.098, 0.012], [0.112, 0.042],
    [0.106, 0.068], [0.085, 0.085], [0.05, 0.094], [0.0, 0.097],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const recGeo = new THREE.LatheGeometry(prof, 40);
  const recMat = new THREE.MeshPhysicalMaterial({
    color: '#b47c84', roughness: 0.42, sheen: 0.5, sheenColor: new THREE.Color('#f3c3c8'),
    clearcoat: 0.3, clearcoatRoughness: 0.3, envMapIntensity: 0.7,
  });
  if (envMap) recMat.envMap = envMap;
  const receptacle = new THREE.Mesh(recGeo, recMat);
  receptacle.castShadow = true;
  receptacle.receiveShadow = true;
  group.add(receptacle);

  const petals = [];
  for (const ring of RINGS) {
    for (let i = 0; i < ring.count; i++) {
      const az = ring.phase + (i / ring.count) * Math.PI * 2 + (rand() - 0.5) * 0.08;
      const pivot = new THREE.Group();
      pivot.rotation.y = az;
      pivot.position.set(Math.sin(az) * ring.r0, ring.y0, Math.cos(az) * ring.r0);
      const tiltGroup = new THREE.Group();
      pivot.add(tiltGroup);
      const geo = petalGeometry();
      const mesh = new THREE.Mesh(geo, ring.sepal ? sepalMat : petalMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      tiltGroup.add(mesh);
      group.add(pivot);
      const jitter = {
        len: 1 + (rand() - 0.5) * 0.08,
        wid: 1 + (rand() - 0.5) * 0.1,
        tilt: (rand() - 0.5) * 0.06,
        bend: (rand() - 0.5) * 0.08,
      };
      petals.push({
        ring, index: i, az, pivot, tiltGroup, mesh, geo, jitter,
        spine: new Float32Array((SEG_V + 1) * 4),
        open: -1,
        // stagger around the ring so the opening ripples instead of popping
        stagger: ((i * 3) % ring.count) / ring.count,
      });
    }
  }

  const params = { len: 0, wid: 0, tilt: 0, bend: 0, pow: 0, cup: 0, point: 0 };

  function setPetalOpen(p, o) {
    if (Math.abs(p.open - o) < 1e-5) return false;
    p.open = o;
    const { closed, open } = p.ring;
    const oc = Math.min(Math.max(o, 0), 1);
    params.len = p.ring.len * p.jitter.len * lerp(closed.len ?? 1, 1, oc);
    params.point = lerp(closed.point ?? 0, 0, oc);
    params.wid = p.ring.wid * p.jitter.wid;
    // Petals facing the camera (+z) open further so the bottle stays in view;
    // the ones behind it stand up as broad spoons that frame it.
    const c = Math.cos(p.az);
    const fr = Math.max(0, c) ** 2 * oc;
    const bk = Math.max(0, -c) ** 1.5 * oc;
    const side = (key) => (p.ring.front?.[key] ?? 0) * fr + (p.ring.back?.[key] ?? 0) * bk;
    params.len *= 1 + side('len');
    params.wid *= 1 + side('wid');
    params.bend = lerp(closed.bend, open.bend, o) + p.jitter.bend + side('bend');
    params.pow = lerp(closed.pow, open.pow, oc);
    params.cup = lerp(closed.cup, open.cup, oc) + side('cup');
    params.tilt = lerp(closed.tilt, open.tilt, o) + p.jitter.tilt * o + side('tilt');
    p.tiltGroup.rotation.x = params.tilt;
    buildPetal(params, p.geo.attributes.position.array, p.spine);
    p.geo.attributes.position.needsUpdate = true;
    p.geo.computeVertexNormals();
    p.geo.computeBoundingSphere();
    return true;
  }

  // per-ring open amounts are driven by the timeline
  function setOpen(fnByPetal) {
    let changed = false;
    for (const p of petals) changed = setPetalOpen(p, fnByPetal(p)) || changed;
    return changed;
  }

  setOpen(() => 0);

  return { group, petals, setOpen, petalMat, sepalMat, receptacle, SEG_U, SEG_V };
}

// Dew: one instanced mesh, positions re-derived from the petal surfaces.
export function createDew(flower, { envMap } = {}) {
  const rand = mulberry32(77);
  const drops = [];
  for (const p of flower.petals) {
    const isSepal = !!p.ring.sepal;
    const nEdge = isSepal ? 2 : p.ring.name === 'core' ? 4 : 12;
    for (let k = 0; k < nEdge; k++) {
      const side = rand() < 0.5 ? 0 : flower.SEG_U;
      const j = Math.round((0.3 + rand() * 0.62) * flower.SEG_V);
      drops.push({ p, i: side, j, side: rand() < 0.5 ? 1 : -1, r: 0.0035 + rand() * 0.0042 });
    }
    const nFace = isSepal ? 1 : p.ring.name === 'core' ? 3 : 8;
    for (let k = 0; k < nFace; k++) {
      const i = Math.round((0.15 + rand() * 0.7) * flower.SEG_U);
      const j = Math.round((0.25 + rand() * 0.6) * flower.SEG_V);
      drops.push({ p, i, j, side: rand() < 0.5 ? 1 : -1, r: 0.0022 + rand() * 0.0026 });
    }
    if (!isSepal) drops.push({ p, i: flower.SEG_U / 2, j: flower.SEG_V, side: 1, r: 0.0075 + rand() * 0.0035, tip: true });
  }

  const geo = new THREE.IcosahedronGeometry(1, 2);
  const mat = new THREE.MeshPhysicalMaterial({
    color: '#fff6f4', roughness: 0.03, metalness: 0, transparent: true, opacity: 0.6,
    clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 2.2, depthWrite: false,
  });
  if (envMap) mat.envMap = envMap;
  const mesh = new THREE.InstancedMesh(geo, mat, drops.length);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  mesh.renderOrder = 2;

  const m = new THREE.Matrix4();
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const nm = new THREE.Matrix3();
  const up = new THREE.Vector3(0, 1, 0);

  function update(visibility = 1) {
    for (let d = 0; d < drops.length; d++) {
      const dr = drops[d];
      const { mesh: pm, geo: pg } = dr.p;
      const idx = dr.j * (flower.SEG_U + 1) + dr.i;
      v.fromBufferAttribute(pg.attributes.position, idx);
      n.fromBufferAttribute(pg.attributes.normal, idx);
      v.applyMatrix4(pm.matrixWorld);
      nm.getNormalMatrix(pm.matrixWorld);
      n.applyMatrix3(nm).normalize().multiplyScalar(dr.side);
      const r = dr.r * visibility;
      if (dr.tip) {
        // hanging bead at the tip, pulled down a touch by gravity
        v.y -= r * 0.55;
        s.set(r, r * 1.15, r);
        q.identity();
      } else {
        v.addScaledVector(n, r * 0.45);
        s.set(r, r * 0.7, r);
        q.setFromUnitVectors(up, n);
      }
      m.compose(v, q, s);
      mesh.setMatrixAt(d, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  return { mesh, update };
}
