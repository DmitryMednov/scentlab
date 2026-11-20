import * as THREE from 'three';

// Ruby perfume bottle: faceted octagonal body, gold
// collar and a gem-cut cap. Sizes are in flower-local units (the open flower is
// ~1.9 wide); y = 0 is the bottom of the bottle.

// Lathe with flat facets. Each profile row is [radius, y, twist]; a twist of 0.5
// rotates that ring by half a segment so the band above/below becomes triangles.
function facetedLathe(profile, segments) {
  const pos = [];
  const ring = (k, i) => {
    const [r, y, tw] = profile[k];
    const a = ((i + (tw || 0)) / segments) * Math.PI * 2;
    return [Math.sin(a) * r, y, Math.cos(a) * r];
  };
  for (let k = 0; k < profile.length - 1; k++) {
    for (let i = 0; i < segments; i++) {
      const a = ring(k, i);
      const b = ring(k, i + 1);
      const c = ring(k + 1, i);
      const d = ring(k + 1, i + 1);
      pos.push(...a, ...b, ...c, ...b, ...d, ...c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

const BODY = [
  [0.0, 0.0], [0.15, 0.0], [0.232, 0.075, 0.5], [0.245, 0.14], [0.245, 0.34],
  [0.222, 0.405, 0.5], [0.15, 0.462], [0.085, 0.48], [0.0, 0.48],
];
const CAP = [
  [0.0, 0.52], [0.07, 0.52], [0.118, 0.558], [0.14, 0.598], [0.14, 0.624],
  [0.122, 0.668, 0.5], [0.092, 0.712, 0.5], [0.074, 0.732, 0.5], [0.0, 0.732, 0.5],
];

// `glass` overrides physical params (e.g. real transmission for the modelled
// bottles); `glowScale` dims the fake inner light when real refraction carries it.
export function rubyMaterial(envMap, glow, core, { env = 1.25, coat = 1, flat = true, glass = null, glowScale = 1 } = {}) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: '#2a0006', roughness: 0.03, metalness: 0, ior: 1.77,
    // rose-tinted specular keeps grazing facets from reflecting the studio as grey
    specularIntensity: 1, specularColor: new THREE.Color('#ff9aa6'),
    clearcoat: coat, clearcoatRoughness: 0.02, envMapIntensity: env, flatShading: flat,
    ...glass,
  });
  if (envMap) mat.envMap = envMap;
  const uniforms = {
    uGlow: { value: new THREE.Color(glow) },
    uFire: { value: new THREE.Color('#ff4a52') },
    uCore: { value: new THREE.Vector2(...core) },
    uGlowScale: { value: glowScale },
    // tint of the dim studio reflections (the stone's colour; the showroom recolours it)
    uTint: { value: new THREE.Vector3(1.0, 0.32, 0.38) },
  };
  mat.userData.gem = uniforms;
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLocal;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLocal = mat3(modelMatrix) * position / length(modelMatrix[1].xyz); // rotated to world, local scale');
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <lights_fragment_end>',
        /* glsl */ `#include <lights_fragment_end>
        {
          // Dim studio reflections (walls, floor) pick up the stone's colour;
          // only the bright light panels stay white, so facets never read grey.
          vec3 ruby = uTint;
          float ls = dot(reflectedLight.indirectSpecular, vec3(0.299, 0.587, 0.114));
          reflectedLight.indirectSpecular *= mix(ruby, vec3(1.0), smoothstep(0.35, 0.9, ls));
          #ifdef USE_CLEARCOAT
          float lc = dot(clearcoatSpecularIndirect, vec3(0.299, 0.587, 0.114));
          clearcoatSpecularIndirect *= mix(ruby, vec3(1.0), smoothstep(0.35, 0.9, lc));
          #endif
        }`,
      )
      .replace('#include <common>', '#include <common>\nuniform vec3 uGlow;\nuniform vec3 uFire;\nuniform vec2 uCore;\nuniform float uGlowScale;\nuniform vec3 uTint;\nvarying vec3 vLocal;')
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `#include <emissivemap_fragment>
        {
          // Fake light trapped in the gem: facets facing the camera glow, the
          // silhouette stays deep crimson, a few facets flash with internal fire.
          vec3 V = normalize(vViewPosition);
          float facing = clamp(dot(normal, V), 0.0, 1.0);
          vec3 fk = floor(normal * 6.0 + 0.5);
          float h = fract(sin(dot(fk, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
          float h2 = fract(sin(dot(fk, vec3(39.346, 11.135, 83.155))) * 24634.6345);
          vec2 q = vec2(vLocal.x / uCore.x, (vLocal.y - uCore.y) / (uCore.x * 1.6));
          float core = exp(-dot(q, q) * 2.2);
          // internal reflection: the refracted ray bounces off the back facets
          vec3 rr = refract(-V, normal, 1.0 / 1.77);
          float bounce = pow(clamp(dot(reflect(rr, -normal), vec3(0.35, 0.8, 0.45)) * 0.5 + 0.5, 0.0, 1.0), 6.0);
          float fire = pow(h2, 5.0) * facing;
          vec3 glow = uGlow * (pow(facing, 1.8) * (0.2 + 0.35 * h) * (0.35 + 0.65 * core) + 0.8 * core * facing + 0.015);
          glow += uFire * (0.55 * fire + 0.35 * bounce * core);
          // darker toward grazing angles so the outline reads as thick glass
          glow *= mix(0.35, 1.0, smoothstep(0.05, 0.55, facing));
          totalEmissiveRadiance += glow * uGlowScale;
        }`,
      );
  };
  mat.customProgramCacheKey = () => 'ruby';
  return mat;
}

export function createBottle({ envMap } = {}) {
  const group = new THREE.Group();
  group.name = 'bottle';
  const inner = new THREE.Group(); // scaled/raised by the reveal
  group.add(inner);

  const body = new THREE.Mesh(facetedLathe(BODY, 8), rubyMaterial(envMap, '#b0021a', [0.25, 0.24], { env: 0.8, coat: 0.45 }));
  body.rotation.y = Math.PI / 8; // put a flat face toward the camera
  const cap = new THREE.Mesh(facetedLathe(CAP, 16), rubyMaterial(envMap, '#b8061c', [0.14, 0.63]));

  const gold = new THREE.MeshPhysicalMaterial({
    color: '#e3b26a', metalness: 1, roughness: 0.16, envMapIntensity: 1.5,
    clearcoat: 0.5, clearcoatRoughness: 0.1,
  });
  if (envMap) gold.envMap = envMap;
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.094, 0.094, 0.04, 40), gold);
  collar.position.y = 0.5;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.085, 0.03, 24), gold);
  neck.position.y = 0.475;

  for (const m of [body, cap, collar, neck]) {
    m.castShadow = true;
    inner.add(m);
  }

  // 0 = hidden inside the bud, 1 = standing in the open flower
  // rise: how far it has come up out of the petals (defaults to k)
  function setReveal(k, rise = k) {
    group.visible = k > 0.001;
    inner.scale.setScalar(0.3 + 0.7 * k);
    inner.position.y = 0.04 + 0.18 * rise;
  }
  setReveal(0);

  return { group, setReveal };
}
