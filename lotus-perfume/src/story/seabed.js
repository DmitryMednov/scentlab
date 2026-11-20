import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { hash, CAUSTIC_GLSL } from './fx.js';
import { bakeAggregate } from './aggregate.js';

// The seabed the bottle comes to rest on: a speckled sandstone pedestal on a
// stepped stone floor, framed by a big sandstone arch, boulders, a branch of
// coral and a scallop shell, with rock spires and a second arch fading in the
// haze behind. Everything is procedural; the stone grain and the caustics live
// in one shader patch on MeshStandardMaterial, so it still takes the sun and
// the shadows.

const NOISE_GLSL = /* glsl */ `
float sbH(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float sbNoise(vec3 x) {
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(sbH(i), sbH(i + vec3(1, 0, 0)), f.x), mix(sbH(i + vec3(0, 1, 0)), sbH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(sbH(i + vec3(0, 0, 1)), sbH(i + vec3(1, 0, 1)), f.x), mix(sbH(i + vec3(0, 1, 1)), sbH(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
vec3 sbBump(vec3 surfPos, vec3 n, vec2 dHdxy, float faceDir) {
  vec3 sx = normalize(dFdx(surfPos)); vec3 sy = normalize(dFdy(surfPos));
  vec3 r1 = cross(sy, n); vec3 r2 = cross(n, sx);
  float det = dot(sx, r1) * faceDir;
  return normalize(abs(det) * n - sign(det) * (dHdxy.x * r1 + dHdxy.y * r2));
}
`;

// The direct sun is multiplied by the caustic network (sbCaus) inside the
// light loop, so the caustics are focused sunlight: they fall in the sun's
// shadow (no caustics under the bottle) and push past the bloom threshold.
// The sun is the only shadow-casting directional light, hence index 0.
const LIGHTS_CAUSTIC = THREE.ShaderChunk.lights_fragment_begin.replace(
  'getDirectionalLightInfo( directionalLight, directLight );',
  'getDirectionalLightInfo( directionalLight, directLight );\n\t\t#if UNROLLED_LOOP_INDEX == 0\n\t\tdirectLight.color *= sbCaus;\n\t\t#endif',
);

// Seabed stone. Options:
//   agg       baked pebble aggregate ({ albedo, normal }, see aggregate.js),
//             sampled triplanar in world space; without it, speckled grain
//   crag      ridged, craggy rock (the far spires)
//   polyps    coral polyp pits
//   ao        contact shadows on the floor: [x, z, radius, strength] (max 8)
//   foot      darkens the base where a piece meets the ground at this height
export function stoneMaterial(time, {
  color = '#d9b0a3', grain = 1, bump = 0.012, caustic = 1, scale = 1, roughness = 0.88,
  agg = null, texScale = 2.2, normK = 1, crag = false, polyps = false, sss = 0, ao = null, foot = null,
} = {}) {
  const mat = new THREE.MeshStandardMaterial({ color, roughness });
  const defines = {};
  if (agg) defines.SB_AGG = '';
  if (crag) defines.SB_CRAG = '';
  if (polyps) defines.SB_POLYP = '';
  if (ao) defines.SB_AO = '';
  if (foot !== null) defines.SB_FOOT = '';
  mat.defines = { ...mat.defines, ...defines };
  const aoList = Array.from({ length: 8 }, (_, i) => new THREE.Vector4(...(ao?.[i] ?? [0, 0, 0, 0])));
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, {
      uTime: time,
      uGrain: { value: grain },
      uBumpK: { value: bump },
      uCaustic: { value: caustic },
      uScale: { value: scale },
      uAggA: { value: agg?.albedo ?? null },
      uAggN: { value: agg?.normal ?? null },
      uTexScale: { value: texScale },
      uNormK: { value: normK },
      uSSS: { value: sss },
      uAO: { value: aoList },
      uFoot: { value: foot ?? 0 },
    });
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vCW;\nvarying vec3 vCN;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvCW = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvCN = normalize(mat3(modelMatrix) * objectNormal);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uTime, uGrain, uBumpK, uCaustic, uScale, uTexScale, uNormK, uSSS, uFoot;
uniform sampler2D uAggA, uAggN;
uniform vec4 uAO[8];
varying vec3 vCW;
varying vec3 vCN;
${CAUSTIC_GLSL}
${NOISE_GLSL}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
        vec3 sbN = normalize(vCN);
        vec3 sp = vCW * uScale;
        float mottle = sbNoise(sp * 2.5) * 0.6 + sbNoise(sp * 7.0) * 0.4;
        float tone = 0.88 + 0.2 * mottle;
        #ifdef SB_AGG
          // triplanar pebble aggregate, mirrored per axis so the pebbles bulge out on every face
          vec3 sbW = pow(abs(sbN), vec3(4.0));
          sbW /= sbW.x + sbW.y + sbW.z;
          vec3 sbS = sign(sbN);
          sbS += 1.0 - abs(sbS);
          vec3 tp = vCW * uTexScale;
          vec2 uvX = vec2(tp.z * sbS.x, tp.y);
          vec2 uvY = vec2(tp.x * sbS.y, tp.z);
          vec2 uvZ = vec2(-tp.x * sbS.z, tp.y);
          vec4 agg = texture2D(uAggA, uvX) * sbW.x + texture2D(uAggA, uvY) * sbW.y + texture2D(uAggA, uvZ) * sbW.z;
          diffuseColor.rgb *= pow(agg.rgb, vec3(2.2)) * 1.3;
          // crevices between the pebbles
          tone *= mix(0.6, 1.0, smoothstep(0.0, 0.32, agg.a));
        #else
          float gr = sbNoise(sp * 34.0);
          float fleck = sbNoise(sp * 70.0 + 7.0);
          tone += (0.16 * (gr - 0.5) + 0.2 * (sbNoise(sp * 16.0) - 0.5)) * uGrain;
          tone *= 1.0 - 0.5 * uGrain * smoothstep(0.74, 0.9, fleck);
          tone += 0.1 * uGrain * smoothstep(0.82, 0.97, gr);
        #endif
        #ifdef SB_CRAG
          float cr = sbNoise(sp * 1.3) * 0.6 + sbNoise(sp * 3.1) * 0.3 + sbNoise(sp * 9.0) * 0.1;
          float ridge = 1.0 - abs(2.0 * cr - 1.0);
          tone *= 0.62 + 0.55 * ridge;
        #endif
        #ifdef SB_POLYP
          // fade the pits out where they get smaller than a pixel (no moire)
          float pitF = 1.0 - smoothstep(0.25, 0.8, fwidth(vCW.x * 140.0) + fwidth(vCW.y * 140.0));
          float pit = smoothstep(0.6, 0.78, sbNoise(vCW * 140.0)) * pitF;
          tone *= 1.0 - 0.3 * pit;
        #endif
        #ifdef SB_AO
          float occ = 1.0;
          for (int i = 0; i < 8; i++) {
            vec4 o = uAO[i];
            float d = max(length(vCW.xz - o.xy) - o.z, 0.0);
            occ *= 1.0 - o.w * exp(-d * d / 0.03);
          }
          tone *= occ;
        #endif
        #ifdef SB_FOOT
          tone *= mix(0.55, 1.0, smoothstep(0.0, 0.2, vCW.y - uFoot));
        #endif
        diffuseColor.rgb *= tone;
        // caustics: two samples a hair apart give the lines a chromatic fringe.
        // The pattern saturates near its own origin, hence the -250 offset
        // (as in the original shader)
        vec2 cp = vCW.xz * 4.6 + vCW.y * 0.6 - 250.0;
        float cA = caustic(cp, uTime * 0.8);
        float cB = caustic(cp + vec2(0.05, 0.03), uTime * 0.8);
        vec3 cc = pow(vec3(cB, cA, mix(cA, cB, 0.3)), vec3(1.3));
        // full strength on what faces up, still there on the sides
        float causK = smoothstep(-0.6, 0.6, sbN.y) * uCaustic;
        vec3 sbCaus = mix(vec3(1.0), vec3(0.25) + 4.0 * cc, min(causK, 1.0));`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        #ifdef SB_AGG
          vec3 tX = texture2D(uAggN, uvX).xyz * 2.0 - 1.0;
          vec3 tY = texture2D(uAggN, uvY).xyz * 2.0 - 1.0;
          vec3 tZ = texture2D(uAggN, uvZ).xyz * 2.0 - 1.0;
          tX.xy *= uNormK; tY.xy *= uNormK; tZ.xy *= uNormK;
          tX.x *= sbS.x; tY.x *= sbS.y; tZ.x *= -sbS.z;
          // whiteout blend onto the surface normal
          tX = vec3(tX.xy + sbN.zy, abs(tX.z) * sbN.x);
          tY = vec3(tY.xy + sbN.xz, abs(tY.z) * sbN.y);
          tZ = vec3(tZ.xy + sbN.xy, abs(tZ.z) * sbN.z);
          vec3 wn = normalize(tX.zyx * sbW.x + tY.xzy * sbW.y + tZ.xyz * sbW.z);
          normal = normalize(mat3(viewMatrix) * wn);
        #endif
        float hB = sbNoise(vCW * uScale * 34.0) + 0.5 * sbNoise(vCW * uScale * 80.0);
        #ifdef SB_AGG
          // the baked pebbles carry the relief; the fine grain only adds sparkle
          hB *= 0.2;
        #endif
        #ifdef SB_CRAG
          hB = hB * 0.25 + cr * 6.0;
        #endif
        #ifdef SB_POLYP
          hB = hB * 0.3 - 1.4 * pit;
        #endif
        normal = sbBump(-vViewPosition, normal, vec2(dFdx(hB), dFdy(hB)) * uBumpK * 60.0, faceDirection);`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance += diffuseColor.rgb * (cc * 0.1 * causK + uSSS);`)
      .replace('#include <lights_fragment_begin>', LIGHTS_CAUSTIC);
  };
  return mat;
}

// lumpy displacement shared by the organic shapes
function lump(v, f, a, seed) {
  const n =
    Math.sin(v.x * f + seed) * Math.sin(v.y * f * 1.3 + seed * 1.7) * Math.sin(v.z * f * 0.9 + seed * 2.3) +
    0.5 * Math.sin(v.x * f * 2.7 + seed * 3.1) * Math.sin(v.z * f * 2.3 + v.y * f * 1.9);
  return 1 + a * n;
}

function boulder(r, seed, detail = 4) {
  const g = mergeVertices(new THREE.IcosahedronGeometry(r, detail));
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = v.clone().normalize();
    v.multiplyScalar(lump(n, 2.2, 0.12, seed) * lump(n, 6.5, 0.03, seed + 4));
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

// a tube of varying radius along a curve, with lumps: the arches
function lumpyTube(curve, radius, seed, tubular = 160, radial = 28) {
  const frames = curve.computeFrenetFrames(tubular, false);
  const pos = [];
  const idx = [];
  const c = new THREE.Vector3();
  const v = new THREE.Vector3();
  for (let i = 0; i <= tubular; i++) {
    const u = i / tubular;
    curve.getPointAt(u, c);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const dir = v.set(0, 0, 0).addScaledVector(N, Math.cos(a)).addScaledVector(B, Math.sin(a));
      const r = radius(u) * lump(new THREE.Vector3(Math.cos(a) * 1.3, u * 9, Math.sin(a) * 1.3), 1.4, 0.13, seed) * lump(dir.clone().add(c), 9, 0.025, seed + 2);
      pos.push(c.x + dir.x * r, c.y + dir.y * r, c.z + dir.z * r);
    }
  }
  for (let i = 0; i < tubular; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * (radial + 1) + j;
      const b = a + radial + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function archGeometry({ half, base, top, foot, crown, seed, tubular, radial }) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-half - 0.25, base - 0.3, 0.05),
    new THREE.Vector3(-half - 0.1, base + (top - base) * 0.3, 0),
    new THREE.Vector3(-half * 0.82, base + (top - base) * 0.72, -0.03),
    new THREE.Vector3(-half * 0.45, top - 0.04, 0),
    new THREE.Vector3(0, top, 0.02),
    new THREE.Vector3(half * 0.45, top - 0.05, 0),
    new THREE.Vector3(half * 0.84, base + (top - base) * 0.7, 0.03),
    new THREE.Vector3(half + 0.12, base + (top - base) * 0.28, 0),
    new THREE.Vector3(half + 0.28, base - 0.3, -0.05),
  ]);
  // thick, splayed feet; a slimmer crown
  const radius = (u) => crown + (foot - crown) * Math.pow(Math.abs(u - 0.5) * 2, 3.2);
  return lumpyTube(curve, radius, seed, tubular, radial);
}

function spireGeometry(h, r, seed) {
  const g = new THREE.CylinderGeometry(r * 0.35, r, h, 18, 30);
  g.translate(0, h / 2, 0);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const y = v.y / h;
    const k =
      lump(new THREE.Vector3(v.x / r, y * 5, v.z / r), 1.8, 0.32, seed) *
      lump(new THREE.Vector3(v.x / r, y * 14, v.z / r), 2.6, 0.12, seed + 1) *
      lump(new THREE.Vector3(v.x / r, y * 30, v.z / r), 3.4, 0.05, seed + 2) *
      // eroded ledges
      (1 + 0.07 * Math.sin(y * h * 7 + seed * 3) + 0.04 * Math.sin(y * h * 17 + seed));
    // craggy, leaning a little
    p.setXYZ(i, v.x * k + Math.sin(seed) * 0.12 * y * h, v.y, v.z * k);
  }
  g.computeVertexNormals();
  return g;
}

// branching coral: tapered cylinders with round tips, merged into one mesh
function coralGeometry(seed) {
  const parts = [];
  const up = new THREE.Vector3(0, 1, 0);
  const q = new THREE.Quaternion();
  const m = new THREE.Matrix4();
  let n = 0;
  const branch = (start, dir, len, r, depth) => {
    const g = new THREE.CylinderGeometry(r * 0.78, r, len, 8, 2);
    g.translate(0, len / 2, 0);
    q.setFromUnitVectors(up, dir);
    m.compose(start, q, new THREE.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    parts.push(g);
    const end = start.clone().addScaledVector(dir, len);
    if (depth === 0) {
      const tip = new THREE.SphereGeometry(r * 0.82, 8, 6);
      tip.translate(end.x, end.y, end.z);
      parts.push(tip);
      return;
    }
    const kids = 2 + (hash(seed + n++) > 0.3 ? 1 : 0);
    for (let k = 0; k < kids; k++) {
      const h1 = hash(seed + n++);
      const h2 = hash(seed + n++);
      const d = dir.clone();
      d.x += (h1 - 0.5) * 1.3 + (k - (kids - 1) / 2) * 0.55;
      d.z += (h2 - 0.5) * 0.7;
      d.y += 0.35;
      d.normalize();
      branch(end, d, len * (0.74 + 0.15 * h2), r * 0.74, depth - 1);
    }
  };
  branch(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.05, 1, 0).normalize(), 0.08, 0.024, 5);
  const g = mergeGeometries(parts.map((p) => p.toNonIndexed()));
  g.computeVertexNormals();
  return g;
}

// a scallop: a ribbed fan with a scalloped rim, hinge at the back
function shellGeometry(R) {
  const g = new THREE.PlaneGeometry(1, 1, 64, 18);
  const p = g.attributes.position;
  const colors = [];
  const ribs = 17;
  const cream = new THREE.Color('#f8e2d4');
  const coral = new THREE.Color('#e79a86');
  const c = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const u = p.getX(i) + 0.5;
    const v = p.getY(i) + 0.5;
    const th = (u - 0.5) * 2.3;
    const rib = Math.cos(th * ribs);
    const r = (0.1 + 0.9 * v) * (1 + 0.035 * rib * v);
    const x = Math.sin(th) * r * R;
    const z = Math.cos(th) * r * R;
    const y = R * (0.36 * (1 - r * r) * Math.pow(Math.cos(th * 0.75), 0.6) + 0.035 * (0.5 + 0.5 * rib) * r);
    p.setXYZ(i, x, y, z);
    c.copy(cream).lerp(coral, 0.35 + 0.35 * (0.5 - 0.5 * rib) + 0.2 * Math.sin(v * 26) * v);
    colors.push(c.r, c.g, c.b);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

export function buildSeabed(scene, { time, floor, plinthTop, mobile, renderer, texSize = 1024 }) {
  const agg = bakeAggregate(renderer, texSize);
  const PR = 0.64;
  const rocks = [
    [-1.62, floor + 0.12, 0.05, 0.36, [1.25, 0.82, 0.9], 2.1],
    [1.78, floor + 0.17, -0.42, 0.4, [1.3, 0.75, 0.85], 5.4],
    [-2.25, floor + 0.12, -0.7, 0.3, [1, 0.9, 1], 8.2],
    [2.35, floor + 0.12, 0.2, 0.28, [1.2, 0.7, 1], 3.3],
  ];
  // contact shadows on the floor: the pedestal, the boulders, coral and shell
  const ao = [
    [0, 0, PR, 0.5],
    ...rocks.map(([x, , z, r, s]) => [x, z, r * s[0] * 0.8, 0.45]),
    [-1.22, 0.02, 0.08, 0.35],
    [1.12, 0.22, 0.1, 0.4],
  ];
  // polished terrazzo floor, rougher pebbly stone for the pieces
  const sand = stoneMaterial(time, { color: '#e8c3b8', bump: 0.003, caustic: 1, roughness: 0.62, agg, texScale: 1.7, normK: 0.35, ao });
  const stone = stoneMaterial(time, { color: '#f6d9cf', bump: 0.005, caustic: 0.9, agg, texScale: 1.5, normK: 0.6, foot: floor });
  const archStone = stoneMaterial(time, { color: '#f6d9cf', bump: 0.005, caustic: 0.8, agg, texScale: 1.0, normK: 0.7, foot: floor + 0.14 });
  const rock = stoneMaterial(time, { color: '#a26f84', grain: 0.3, bump: 0.02, caustic: 0.35, scale: 0.6, crag: true });
  const coralMat = stoneMaterial(time, { color: '#ffae98', grain: 0.2, bump: 0.004, caustic: 0.55, scale: 1.6, roughness: 0.72, polyps: true, sss: 0.05 });
  const add = (geo, mat, x, y, z, shadow = true) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.receiveShadow = shadow;
    scene.add(mesh);
    return mesh;
  };

  // the floor, with the pedestal's soft contact shadow coming from the sun
  const ground = add(new THREE.PlaneGeometry(40, 40), sand, 0, floor, 0);
  ground.rotation.x = -Math.PI / 2;

  // the pedestal: a low, wide drum of speckled stone with a softened edge
  const ped = new THREE.LatheGeometry(
    // profile from the bottom up, so the faces point outwards
    [
      new THREE.Vector2(0, floor - 0.02),
      new THREE.Vector2(PR + 0.02, floor - 0.02),
      new THREE.Vector2(PR + 0.01, floor + 0.02),
      new THREE.Vector2(PR, plinthTop - 0.03),
      new THREE.Vector2(PR - 0.008, plinthTop - 0.008),
      new THREE.Vector2(PR - 0.03, plinthTop),
      new THREE.Vector2(0, plinthTop),
    ],
    96,
  );
  const pedestal = add(ped, stone, 0, 0, 0);
  pedestal.castShadow = true;

  // two shallow steps up to a stone terrace behind the pedestal
  const steps = [
    [0.07, -0.78, 0.28],
    [0.14, -1.06, 2.6],
  ];
  for (const [h, z0, depth] of steps) {
    const slab = add(new THREE.BoxGeometry(9, h + 0.04, depth), stone, 0, floor + (h - 0.04) / 2, z0 - depth / 2);
    slab.castShadow = false;
  }
  const terrace = floor + 0.14;

  // the big arch framing the view
  const archSeg = mobile ? [110, 20] : [170, 28];
  const arch = add(
    archGeometry({ half: 1.62, base: terrace, top: -0.32, foot: 0.55, crown: 0.2, seed: 1.3, tubular: archSeg[0], radial: archSeg[1] }),
    archStone, 0, 0, -1.5,
  );
  arch.castShadow = false;

  // boulders at the feet of the arch, coral and a shell
  for (const [x, y, z, r, s, seed] of rocks) {
    const b = add(boulder(r, seed, mobile ? 3 : 4), stone, x, y, z);
    b.scale.set(...s);
    b.rotation.y = seed;
  }
  const coral = add(coralGeometry(17), coralMat, -1.18, floor - 0.01, 0.08);
  coral.scale.setScalar(1.25);
  coral.rotation.y = 0.5;
  const coral2 = add(coralGeometry(41), coralMat, -1.32, floor + 0.05, -0.12);
  coral2.scale.setScalar(0.85);
  coral2.rotation.y = 2.1;
  const coral3 = add(coralGeometry(73), coralMat, -1.05, floor - 0.01, 0.3);
  coral3.scale.setScalar(0.6);
  coral3.rotation.y = 4;
  const shell = add(
    shellGeometry(0.17),
    new THREE.MeshPhysicalMaterial({
      vertexColors: true, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.12,
      iridescence: 1, iridescenceIOR: 1.5, iridescenceThicknessRange: [250, 650],
      sheen: 0.6, sheenColor: new THREE.Color('#ffd9e2'), sheenRoughness: 0.35, side: THREE.DoubleSide,
    }),
    1.12, floor + 0.04, 0.22,
  );
  shell.rotation.set(0.75, -0.45, 0.08);
  shell.castShadow = true;

  // behind the arch, in the haze: rock spires and a second, smaller arch
  for (let i = 0; i < (mobile ? 10 : 16); i++) {
    const side = i % 2 ? 1 : -1;
    const x = side * (0.9 + hash(i + 7) * 3.4);
    const z = -3.2 - hash(i + 13) * 6.5;
    const h = 1.2 + hash(i + 29) * 2.4;
    const r = 0.3 + hash(i + 31) * 0.45;
    add(spireGeometry(h, r, i * 1.7 + 0.4), rock, x, floor - 0.1, z, false);
  }
  add(archGeometry({ half: 1.15, base: floor, top: -1.05, foot: 0.4, crown: 0.2, seed: 4.1, tubular: 90, radial: 16 }), rock, 0.25, 0, -6.2, false);
  for (let i = 0; i < 6; i++) {
    const x = (hash(i + 90) - 0.5) * 9;
    add(boulder(0.9 + hash(i + 95) * 0.8, i + 20, 2), rock, x, floor - 0.35, -3.6 - hash(i + 99) * 3, false).scale.y = 0.7;
  }
}
