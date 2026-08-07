/* Scent Lab — cinematic WebGPU/WebGL scene backgrounds + glass bottle.
   One renderer drives the journey: per-scene shader environments swapped
   behind a fixed transmissive flacon (KHR_materials_transmission semantics:
   transmission / ior / thickness / attenuation), with gradient veils masking
   scene handovers. Falls back to the DOM art direction when init fails. */

import * as THREE from 'three/webgpu';
import {
  Fn, uniform, uv, vec2, vec3, vec4, float, color, time, texture,
  positionLocal, normalLocal, transformNormalToView, sin, cos, atan, min, max, mix, smoothstep, PI, TWO_PI,
  luminance, parallaxUV, blendOverlay, normalMap, pass,
  texture3D, textureStore, storageTexture, instanceIndex, uvec3, storage,
  screenCoordinate, fract, frameId, interleavedGradientNoise,
  mx_noise_float, If, floor,
} from 'three/tsl';
import { snoise, snoiseVec3 } from 'three/addons/tsl/math/curlNoise.js';
import { SkyMesh } from 'three/addons/objects/SkyMesh.js';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const ASSETS = 'assets/img/fx/';

/* Scene index -> effect. 6 (arrival) keeps its photographic plate. */
const SCENE_FX = ['fluid', 'sky-warm', 'tornado', 'ice', 'fire', 'sky-air', null];

const VEIL_GRADS = [
  ['rgba(140,190,150,.9)', 'rgba(12,23,27,.95)'],
  ['rgba(200,140,70,.9)', 'rgba(46,26,10,.95)'],
  ['rgba(240,170,60,.9)', 'rgba(32,25,25,.95)'],
  ['rgba(120,200,215,.9)', 'rgba(12,23,27,.95)'],
  ['rgba(244,150,60,.95)', 'rgba(15,5,3,.95)'],
  ['rgba(232,206,160,.9)', 'rgba(31,21,12,.95)'],
  ['rgba(240,180,80,.9)', 'rgba(20,14,8,.95)'],
];

let renderer, scene, camera, bgGroup, bottleGroup, veilEl, mountEl;
let bottleLiquidMat = null;
let bottleLiquidMesh = null;
let fluidPlane = null;
let fluidUvScale = null;

/* per-scene liquid tint — every slide presents a different fragrance */
const LIQUID_COLORS = [
  0x9FBE8E, // origin — vetiver green
  0xB5763A, // warmth — amber
  0xD9A441, // spark — golden citrus
  0x6FAFB8, // flow — marine aqua
  0xB0442E, // heat — spiced rouge
  0xE4D3AC, // air — pale champagne
  0xC79E5A, // arrival — the classic blend
];
const liquidTarget = new THREE.Color(LIQUID_COLORS[0]);
let isWebGPU = false;
let activeIdx = -1, pendingIdx = -1, veilT = -1;
let progress = 0, running = false, inView = true;
let envTexture = null;
const effects = {};
let currentFx = null;
let lastTime = 0;

/* ------------------------------------------------------------------ */
/* Effect helpers                                                      */
/* ------------------------------------------------------------------ */

const texLoader = new THREE.TextureLoader();

function loadTex(file, srgb) {
  const t = texLoader.load(ASSETS + file);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/* fbm over 3D simplex noise (curlNoise.js exports snoise) */
const fbm = Fn(([p]) => {
  const sum = float(0).toVar();
  const amp = float(0.5).toVar();
  const q = vec3(p).toVar();
  for (let i = 0; i < 4; i++) {
    sum.addAssign(snoise(q).mul(amp));
    q.mulAssign(2.13);
    amp.mulAssign(0.5);
  }
  return sum;
});

/* ------------------------------------------------------------------ */
/* 0 — Fluid flow (original shader in the spirit of multiscale fluids) */
/* ------------------------------------------------------------------ */

function buildFluid(group) {
  const mat = new THREE.MeshBasicNodeMaterial();
  /* pattern density per WORLD unit, so the flow stays isotropic no matter
     how the plane is sized to the split (a fixed uv scale squashes it) */
  fluidUvScale = uniform(new THREE.Vector2(3.0, 2.0));
  mat.colorNode = Fn(() => {
    /* slow, unhurried drift */
    const t = time.mul(0.02);
    const p = vec3(uv().mul(fluidUvScale), t);

    /* two rounds of domain warping = advected, self-folding flow */
    const w1 = vec3(fbm(p), fbm(p.add(vec3(5.2, 1.3, 2.1))), 0);
    const w2p = p.add(w1.mul(1.6)).add(vec3(0, t.mul(2.0), 0));
    const w2 = vec3(fbm(w2p), fbm(w2p.add(vec3(8.3, 2.8, 4.2))), 0);
    const f = fbm(p.add(w2.mul(2.2))).mul(0.5).add(0.5);

    /* palette: abyss -> sea glass -> sage light (origin scene) */
    const deep = color('#0C171B');
    const mid = color('#2E4A52');
    const glass = color('#7FB9AE');
    const light = color('#C8E4C9');

    const c = mix(deep, mid, smoothstep(0.15, 0.5, f)).toVar();
    c.assign(mix(c, glass, smoothstep(0.5, 0.78, f)));
    c.assign(mix(c, light, smoothstep(0.78, 0.97, f).mul(luminance(w1).abs().oneMinus())));

    /* filament highlights along the warp shear */
    const shear = w1.sub(w2).length();
    c.addAssign(color('#E8F4E4').mul(smoothstep(0.9, 1.35, shear).mul(0.25)));

    /* iridescent sheen — a slow pearl gradient folded through the flow */
    const ph = f.mul(6.28318).add(time.mul(0.12)).add(uv().x.mul(2.5)).toVar();
    const pearl = vec3(
      sin(ph).mul(0.5).add(0.5),
      sin(ph.add(2.094)).mul(0.5).add(0.5),
      sin(ph.add(4.188)).mul(0.5).add(0.5),
    );
    const sheenMask = smoothstep(0.35, 0.75, f).mul(smoothstep(0.95, 0.55, f));
    c.addAssign(pearl.mul(vec3(0.10, 0.07, 0.12)).mul(sheenMask));

    /* corner vignette keeps the type readable */
    const d = uv().sub(0.5).length();
    c.mulAssign(smoothstep(0.95, 0.35, d).mul(0.75).add(0.25));
    return c;
  })();

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
  plane.position.set(0, 0, -5);
  group.add(plane);
  fluidPlane = plane; /* sized every frame to cover only the top split */
  return { exposure: 1.0, toneMapping: THREE.ACESFilmicToneMapping };
}

/* ------------------------------------------------------------------ */
/* Sky (warm sunset for “Warmth”, high light air for “Air”)            */
/* ------------------------------------------------------------------ */

function buildSky(group, variant) {
  const sky = new SkyMesh();
  sky.scale.setScalar(450000);
  group.add(sky);

  const sun = new THREE.Vector3();
  const cfg = variant === 'warm'
    ? { turbidity: 10, rayleigh: 3, mieCoefficient: 0.005, mieDirectionalG: 0.8, elevation: 9, azimuth: 12, exposure: 0.6, cloudCoverage: 0.45, cloudDensity: 0.5, cloudElevation: 0.45 }
    : { turbidity: 3.6, rayleigh: 1.6, mieCoefficient: 0.003, mieDirectionalG: 0.65, elevation: 24, azimuth: -95, exposure: 0.34, cloudCoverage: 0.3, cloudDensity: 0.34, cloudElevation: 0.62 };

  sky.turbidity.value = cfg.turbidity;
  sky.rayleigh.value = cfg.rayleigh;
  sky.mieCoefficient.value = cfg.mieCoefficient;
  sky.mieDirectionalG.value = cfg.mieDirectionalG;
  sky.cloudCoverage.value = cfg.cloudCoverage;
  sky.cloudDensity.value = cfg.cloudDensity;
  sky.cloudElevation.value = cfg.cloudElevation;
  sky.showSunDisc.value = true;

  const phi = THREE.MathUtils.degToRad(90 - cfg.elevation);
  const theta = THREE.MathUtils.degToRad(cfg.azimuth);
  sun.setFromSphericalCoords(1, phi, theta);
  sky.sunPosition.value.copy(sun);

  return { exposure: cfg.exposure, toneMapping: THREE.ACESFilmicToneMapping };
}

/* ------------------------------------------------------------------ */
/* Tornado of light (adapted from the three.js VFX tornado example)    */
/* ------------------------------------------------------------------ */

function buildTornado(group) {
  const perlinTexture = loadTex('perlin-rgb.png', false);

  const toRadialUv = Fn(([uvIn, multiplier, rotation, offset]) => {
    const centeredUv = uvIn.sub(0.5).toVar();
    const distanceToCenter = centeredUv.length();
    const angle = atan(centeredUv.y, centeredUv.x);
    const radialUv = vec2(angle.add(PI).div(TWO_PI), distanceToCenter).toVar();
    radialUv.mulAssign(multiplier);
    radialUv.x.addAssign(rotation);
    radialUv.y.addAssign(offset);
    return radialUv;
  });

  const toSkewedUv = Fn(([uvIn, skew]) => vec2(
    uvIn.x.add(uvIn.y.mul(skew.x)),
    uvIn.y.add(uvIn.x.mul(skew.y)),
  ));

  const twistedCylinder = Fn(([position, parabolStrength, parabolOffset, parabolAmplitude, t]) => {
    const angle = atan(position.z, position.x).toVar();
    const elevation = position.y;
    const radius = parabolStrength.mul(position.y.sub(parabolOffset)).pow(2).add(parabolAmplitude).toVar();
    radius.addAssign(sin(elevation.sub(t).mul(20).add(angle.mul(2))).mul(0.05));
    return vec3(cos(angle).mul(radius), elevation, sin(angle).mul(radius));
  });

  const emissiveColor = uniform(color('#ffb14d'));
  const timeScale = uniform(0.2);
  const parabolStrength = uniform(1);
  const parabolOffset = uniform(0.3);
  const parabolAmplitude = uniform(0.2);

  const floorMaterial = new THREE.MeshBasicNodeMaterial({ transparent: true });
  floorMaterial.outputNode = Fn(() => {
    const scaledTime = time.mul(timeScale);
    const noise1Uv = toRadialUv(uv(), vec2(0.5, 0.5), scaledTime, scaledTime).toVar();
    noise1Uv.assign(toSkewedUv(noise1Uv, vec2(-1, 0)));
    noise1Uv.mulAssign(vec2(4, 1));
    const noise1 = texture(perlinTexture, noise1Uv, 1).r.remap(0.45, 0.7);

    const noise2Uv = toRadialUv(uv(), vec2(2, 8), scaledTime.mul(2), scaledTime.mul(8)).toVar();
    noise2Uv.assign(toSkewedUv(noise2Uv, vec2(-0.25, 0)));
    noise2Uv.mulAssign(vec2(2, 0.25));
    const noise2 = texture(perlinTexture, noise2Uv, 1).b.remap(0.45, 0.7);

    const distanceToCenter = uv().sub(0.5).toVar();
    const outerFade = min(
      distanceToCenter.length().oneMinus().smoothstep(0.5, 0.9),
      distanceToCenter.length().smoothstep(0, 0.2),
    );
    const effect = noise1.mul(noise2).mul(outerFade).toVar();
    return vec4(emissiveColor.mul(effect.step(0.2)).mul(3), effect.smoothstep(0, 0.01));
  })();

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), floorMaterial);
  floor.rotation.x = -Math.PI * 0.5;
  group.add(floor);

  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 20, 20, true);
  cylinderGeometry.translate(0, 0.5, 0);

  const emissiveMaterial = new THREE.MeshBasicNodeMaterial({ transparent: true, side: THREE.DoubleSide });
  emissiveMaterial.positionNode = twistedCylinder(positionLocal, parabolStrength, parabolOffset, parabolAmplitude.sub(0.05), time.mul(timeScale));
  emissiveMaterial.outputNode = Fn(() => {
    const scaledTime = time.mul(timeScale);
    const noise1Uv = uv().add(vec2(scaledTime, scaledTime.negate())).toVar();
    noise1Uv.assign(toSkewedUv(noise1Uv, vec2(-1, 0)));
    noise1Uv.mulAssign(vec2(2, 0.25));
    const noise1 = texture(perlinTexture, noise1Uv, 1).r.remap(0.45, 0.7);

    const noise2Uv = uv().add(vec2(scaledTime.mul(0.5), scaledTime.negate())).toVar();
    noise2Uv.assign(toSkewedUv(noise2Uv, vec2(-1, 0)));
    noise2Uv.mulAssign(vec2(5, 1));
    const noise2 = texture(perlinTexture, noise2Uv, 1).g.remap(0.45, 0.7);

    const outerFade = min(uv().y.smoothstep(0, 0.1), uv().y.oneMinus().smoothstep(0, 0.4));
    const effect = noise1.mul(noise2).mul(outerFade);
    const emissiveColorLuminance = luminance(emissiveColor);
    return vec4(emissiveColor.mul(1.2).div(emissiveColorLuminance), effect.smoothstep(0, 0.1));
  })();

  const emissive = new THREE.Mesh(cylinderGeometry, emissiveMaterial);
  group.add(emissive);

  const darkMaterial = new THREE.MeshBasicNodeMaterial({ transparent: true, side: THREE.DoubleSide });
  darkMaterial.positionNode = twistedCylinder(positionLocal, parabolStrength, parabolOffset, parabolAmplitude, time.mul(timeScale));
  darkMaterial.outputNode = Fn(() => {
    const scaledTime = time.mul(timeScale).add(123.4);
    const noise1Uv = uv().add(vec2(scaledTime, scaledTime.negate())).toVar();
    noise1Uv.assign(toSkewedUv(noise1Uv, vec2(-1, 0)));
    noise1Uv.mulAssign(vec2(2, 0.25));
    const noise1 = texture(perlinTexture, noise1Uv, 1).g.remap(0.45, 0.7);

    const noise2Uv = uv().add(vec2(scaledTime.mul(0.5), scaledTime.negate())).toVar();
    noise2Uv.assign(toSkewedUv(noise2Uv, vec2(-1, 0)));
    noise2Uv.mulAssign(vec2(5, 1));
    const noise2 = texture(perlinTexture, noise2Uv, 1).b.remap(0.45, 0.7);

    const outerFade = min(uv().y.smoothstep(0, 0.2), uv().y.oneMinus().smoothstep(0, 0.4));
    const effect = noise1.mul(noise2).mul(outerFade);
    return vec4(vec3(0), effect.smoothstep(0, 0.01));
  })();

  const dark = new THREE.Mesh(cylinderGeometry, darkMaterial);
  group.add(dark);

  /* place the vortex behind and to the side of the bottle */
  group.scale.setScalar(4.2);
  group.position.set(-1.6, -3.2, -6);

  return { exposure: 1.0, toneMapping: THREE.ACESFilmicToneMapping, bloom: true, clearColor: 0x201919 };
}

/* ------------------------------------------------------------------ */
/* Ice parallax depth (adapted from the parallax UV example)           */
/* ------------------------------------------------------------------ */

function buildIce(group) {
  const topTexture = loadTex('ice-color.jpg', true);
  const roughnessTexture = loadTex('ice-rough.jpg', false);
  const normalTexture = loadTex('ice-normal.jpg', false);
  const displaceTexture = loadTex('ice-disp.jpg', false);
  const bottomTexture = loadTex('ice-deep.jpg', true);

  const scaleUV = uniform(3);
  const scaledUV = uv().mul(scaleUV);
  const parallaxScale = uniform(0.5);
  const offsetUV = texture(displaceTexture, scaledUV).mul(parallaxScale);
  const parallaxUVOffset = parallaxUV(scaledUV, offsetUV);
  const parallaxResult = texture(bottomTexture, parallaxUVOffset);
  const iceNode = blendOverlay(texture(topTexture, scaledUV), parallaxResult);

  const material = new THREE.MeshStandardNodeMaterial();
  material.colorNode = iceNode.mul(5);
  material.roughnessNode = texture(roughnessTexture, scaledUV);
  material.normalNode = normalMap(texture(normalTexture, scaledUV));
  material.metalness = 0;

  const ground = new THREE.Mesh(new THREE.CircleGeometry(25, 64), material);
  ground.rotateX(-Math.PI / 2);
  ground.position.y = -2.6;
  group.add(ground);

  /* cold light + aquatic backdrop gradient */
  const hemi = new THREE.HemisphereLight(0xbfe6ea, 0x0c171b, 1.6);
  group.add(hemi);
  const key = new THREE.DirectionalLight(0xdff4f2, 2.4);
  key.position.set(6, 8, 4);
  group.add(key);

  const bgMat = new THREE.MeshBasicNodeMaterial();
  bgMat.colorNode = Fn(() => {
    const g = uv().y;
    return mix(color('#0C171B'), color('#45707D'), smoothstep(0.1, 0.9, g));
  })();
  const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), bgMat);
  backdrop.position.set(0, 6, -18);
  group.add(backdrop);

  return { exposure: 2.2, toneMapping: THREE.ReinhardToneMapping, orbit: true };
}

/* ------------------------------------------------------------------ */
/* Fire — WebGPU volumetric sim (adapted volume fire), WebGL fallback  */
/* ------------------------------------------------------------------ */

function buildFire(group) {
  if (!isWebGPU) return buildFlame2D(group);
  try {
    return buildVolumeFire(group);
  } catch (e) {
    console.warn('[fx] volume fire failed, using 2D flame', e);
    return buildFlame2D(group);
  }
}

function buildFlame2D(group) {
  const mat = new THREE.MeshBasicNodeMaterial({ transparent: true });
  mat.outputNode = Fn(() => {
    const p = uv().toVar();
    const x = p.x.sub(0.5).mul(2.4);
    const y = p.y;

    /* rising fbm noise, sharpened into a flame silhouette */
    const n = fbm(vec3(p.x.mul(3.5), p.y.mul(5.0).sub(time.mul(1.9)), time.mul(0.35))).mul(0.5).add(0.5);
    const flameWidth = smoothstep(0.0, 0.25, y).oneMinus().mul(0.55).add(0.18);
    const core = smoothstep(flameWidth, flameWidth.mul(0.25), x.abs().add(n.mul(0.42).sub(0.21)));
    const shape = core.mul(smoothstep(1.05, 0.42, y.add(n.mul(0.3))));

    const heat = shape.mul(n.mul(0.7).add(0.5));
    const c = vec3(0).toVar();
    c.assign(mix(vec3(0), color('#ff0000'), smoothstep(0.05, 0.35, heat)));
    c.assign(mix(c, color('#ff7305'), smoothstep(0.35, 0.65, heat)));
    c.assign(mix(c, color('#ffe68c'), smoothstep(0.65, 1.0, heat)));
    return vec4(c.mul(3.2), shape.smoothstep(0.02, 0.35));
  })();

  const flame = new THREE.Mesh(new THREE.PlaneGeometry(10, 13), mat);
  flame.position.set(0, 2.6, -6);
  group.add(flame);

  const bgMat = new THREE.MeshBasicNodeMaterial();
  bgMat.colorNode = Fn(() => {
    const d = uv().sub(vec2(0.5, 0.28)).length();
    return mix(color('#A8451A'), color('#0F0503'), smoothstep(0.12, 0.75, d));
  })();
  const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), bgMat);
  backdrop.position.set(0, 2, -16);
  group.add(backdrop);

  return { exposure: 1.15, toneMapping: THREE.ACESFilmicToneMapping, bloom: true };
}

function buildVolumeFire(group) {
  const GX = 64, GY = 128, GZ = 64;
  const CELLS = GX * GY * GZ;
  const WORLD = new THREE.Vector3(10, 20, 10);
  const uVolumeWorldSize = uniform(WORLD);
  const TX = 1 / GX, TY = 1 / GY, TZ = 1 / GZ;

  const uDt = uniform(1 / 60);
  const uTime = uniform(0);
  const uBuoyancy = uniform(3.0);
  const uWeight = uniform(0.15);
  const uTurbulence = uniform(3.2);
  const uTurbulenceDecay = uniform(0.1);
  const uTurbFrequency = uniform(10.0);
  const uVelDamping = uniform(0.25);
  const uCooling = uniform(1.0);
  const uDissipation = uniform(0.4);
  const uEmitDensity = uniform(7.0);
  const uEmitTemperature = uniform(5.5);
  const uFireIntensity = uniform(40.0);
  const uFireStartColor = uniform(new THREE.Color(0xffe68c));
  const uFireMidColor = uniform(new THREE.Color(0xff7305));
  const uFireEndColor = uniform(new THREE.Color(0xff0000));

  const storage3D = (name) => {
    const t = new THREE.Storage3DTexture(GX, GY, GZ);
    t.name = name;
    t.format = THREE.RGBAFormat;
    t.type = THREE.HalfFloatType;
    t.minFilter = t.magFilter = THREE.LinearFilter;
    return t;
  };

  const velTexA = storage3D('velA'), velTexB = storage3D('velB');
  const dyeTexA = storage3D('dyeA'), dyeTexB = storage3D('dyeB');
  const divTex = storage3D('div');
  const pressTexA = storage3D('pressA'), pressTexB = storage3D('pressB');
  const curlNoiseTex = storage3D('curl');
  curlNoiseTex.wrapS = curlNoiseTex.wrapT = curlNoiseTex.wrapR = THREE.RepeatWrapping;

  const dyeTexNode = texture3D(dyeTexA);
  const dyeTexWriteNode = storageTexture(dyeTexB).toWriteOnly();
  const curlNoiseTexNode = texture3D(curlNoiseTex);

  const getVoxelCoord = (id) => uvec3(id.mod(GX), id.div(GX).mod(GY), id.div(GX * GY));
  const coordToUVW = (coord) => vec3(coord).add(0.5).div(vec3(GX, GY, GZ));

  const computeCurlNoisePass = Fn(() => {
    const coord = getVoxelCoord(instanceIndex);
    const uvw = coordToUVW(coord);
    const freq = uTurbFrequency;
    const e = float(0.1).div(freq);
    const dx = vec3(e, 0, 0), dy = vec3(0, e, 0), dz = vec3(0, 0, e);
    const p = uvw.mul(vec3(WORLD.x / WORLD.y, 1, WORLD.z / WORLD.y));
    const px0 = snoiseVec3(p.sub(dx).mul(freq)), px1 = snoiseVec3(p.add(dx).mul(freq));
    const py0 = snoiseVec3(p.sub(dy).mul(freq)), py1 = snoiseVec3(p.add(dy).mul(freq));
    const pz0 = snoiseVec3(p.sub(dz).mul(freq)), pz1 = snoiseVec3(p.add(dz).mul(freq));
    const x = py1.z.sub(py0.z).sub(pz1.y).add(pz0.y);
    const y = pz1.x.sub(pz0.x).sub(px1.z).add(px0.z);
    const z = px1.y.sub(px0.y).sub(py1.x).add(py0.x);
    textureStore(curlNoiseTex, coord, vec4(vec3(x, y, z).mul(5), 0)).toWriteOnly();
  })().compute(CELLS);

  const advectVelocityPass = Fn(() => {
    const coord = getVoxelCoord(instanceIndex);
    const uvw = coordToUVW(coord);
    const vel = texture3D(velTexA, uvw, 0).xyz;
    const prevPos = uvw.sub(vel.div(uVolumeWorldSize).mul(uDt));
    const newVel = texture3D(velTexA, prevPos, 0).xyz.toVar();

    const dye = dyeTexNode.sample(uvw).level(0);
    const density = dye.r, temperature = dye.g, age = dye.b;

    const buoyancyForce = temperature.mul(uBuoyancy).sub(density.mul(uWeight)).mul(WORLD.y);
    newVel.addAssign(vec3(0, buoyancyForce, 0).mul(uDt));

    const thermalNoisePos = uvw.add(vec3(0, age.negate().mul(0.6), age.mul(0.13)).div(uTurbFrequency));
    const decay = age.mul(uTurbulenceDecay.negate()).exp();
    const thermal = curlNoiseTexNode.sample(thermalNoisePos).level(0).xyz.mul(uTurbulence).mul(temperature).mul(decay);
    const ambientNoisePos = uvw.mul(0.5).add(vec3(0, uTime.mul(0.25), uTime.mul(0.06)).div(uTurbFrequency));
    const ambient = curlNoiseTexNode.sample(ambientNoisePos).level(0).xyz.mul(uTurbulence.mul(0.2)).mul(density);
    newVel.addAssign(thermal.add(ambient).mul(WORLD.y).mul(uDt));

    newVel.mulAssign(max(float(1).sub(uVelDamping.mul(uDt)), 0));

    const edge = min(uvw, vec3(1).sub(uvw));
    newVel.mulAssign(smoothstep(0.0, 0.08, min(edge.x, min(edge.y, edge.z))));
    textureStore(velTexB, coord, vec4(newVel, 0)).toWriteOnly();
  })().compute(CELLS);

  const divergencePass = Fn(() => {
    const coord = getVoxelCoord(instanceIndex);
    const uvw = coordToUVW(coord);
    const vR = texture3D(velTexB, uvw.add(vec3(TX, 0, 0)), 0).x;
    const vL = texture3D(velTexB, uvw.sub(vec3(TX, 0, 0)), 0).x;
    const vU = texture3D(velTexB, uvw.add(vec3(0, TY, 0)), 0).y;
    const vD = texture3D(velTexB, uvw.sub(vec3(0, TY, 0)), 0).y;
    const vF = texture3D(velTexB, uvw.add(vec3(0, 0, TZ)), 0).z;
    const vB = texture3D(velTexB, uvw.sub(vec3(0, 0, TZ)), 0).z;
    const div = vR.sub(vL).add(vU.sub(vD)).add(vF.sub(vB)).mul(0.5);
    textureStore(divTex, coord, vec4(div, 0, 0, 0)).toWriteOnly();
  })().compute(CELLS);

  const jacobi = (readTex, writeTex) => Fn(() => {
    const coord = getVoxelCoord(instanceIndex);
    const uvw = coordToUVW(coord);
    const pR = texture3D(readTex, uvw.add(vec3(TX, 0, 0)), 0).x;
    const pL = texture3D(readTex, uvw.sub(vec3(TX, 0, 0)), 0).x;
    const pU = texture3D(readTex, uvw.add(vec3(0, TY, 0)), 0).x;
    const pD = texture3D(readTex, uvw.sub(vec3(0, TY, 0)), 0).x;
    const pF = texture3D(readTex, uvw.add(vec3(0, 0, TZ)), 0).x;
    const pB = texture3D(readTex, uvw.sub(vec3(0, 0, TZ)), 0).x;
    const div = texture3D(divTex, uvw, 0).x;
    const pressure = pR.add(pL).add(pU).add(pD).add(pF).add(pB).sub(div).div(6);
    textureStore(writeTex, coord, vec4(pressure, 0, 0, 0)).toWriteOnly();
  })().compute(CELLS);

  const jacobiPassAB = jacobi(pressTexA, pressTexB);
  const jacobiPassBA = jacobi(pressTexB, pressTexA);

  const projectPass = Fn(() => {
    const coord = getVoxelCoord(instanceIndex);
    const uvw = coordToUVW(coord);
    const pR = texture3D(pressTexA, uvw.add(vec3(TX, 0, 0)), 0).x;
    const pL = texture3D(pressTexA, uvw.sub(vec3(TX, 0, 0)), 0).x;
    const pU = texture3D(pressTexA, uvw.add(vec3(0, TY, 0)), 0).x;
    const pD = texture3D(pressTexA, uvw.sub(vec3(0, TY, 0)), 0).x;
    const pF = texture3D(pressTexA, uvw.add(vec3(0, 0, TZ)), 0).x;
    const pB = texture3D(pressTexA, uvw.sub(vec3(0, 0, TZ)), 0).x;
    const gradient = vec3(pR.sub(pL), pU.sub(pD), pF.sub(pB)).mul(0.5);
    const vel = texture3D(velTexB, uvw, 0).xyz.sub(gradient);
    textureStore(velTexA, coord, vec4(vel, 0)).toWriteOnly();
  })().compute(CELLS);

  const advectDyePass = Fn(() => {
    const coord = getVoxelCoord(instanceIndex);
    const uvw = coordToUVW(coord);
    const vel = texture3D(velTexA, uvw, 0).xyz;
    const prevPos = uvw.sub(vel.div(uVolumeWorldSize).mul(uDt));
    const dye = dyeTexNode.sample(prevPos).level(0);
    const density = dye.r.mul(max(float(1).sub(uDissipation.mul(uDt)), 0)).toVar();
    const temperature = dye.g.mul(max(float(1).sub(uCooling.mul(uDt)), 0)).toVar();
    const gridDims = vec3(GX, GY, GZ);
    const nearestUVW = floor(prevPos.mul(gridDims)).add(0.5).div(gridDims);
    const age = dyeTexNode.sample(nearestUVW).level(0).b.add(uDt).toVar();
    temperature.assign(temperature.clamp(0, 12));
    If(density.lessThanEqual(0.01), () => { age.assign(0.0); });
    textureStore(dyeTexWriteNode, coord, vec4(density, temperature, age, 1)).toWriteOnly();
  })().compute(CELLS);

  /* emitter: ring of points low in the volume, in place of the teapot */
  const EMIT_COUNT = 1024;
  const emitArray = new Float32Array(EMIT_COUNT * 3);
  for (let i = 0; i < EMIT_COUNT; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 1.15;
    emitArray[i * 3] = Math.cos(a) * r;
    emitArray[i * 3 + 1] = Math.random() * 0.5;
    emitArray[i * 3 + 2] = Math.sin(a) * r;
  }
  const emitAttr = new THREE.StorageBufferAttribute(emitArray, 3);
  const emitBuffer = storage(emitAttr, 'vec3', EMIT_COUNT).toReadOnly();

  const emitPass = Fn(() => {
    const vertexPos = emitBuffer.element(instanceIndex);
    const worldPos = vertexPos.add(vec3(0, 0.6, 0));
    const uvw = worldPos.sub(vec3(0, WORLD.y / 2, 0)).div(uVolumeWorldSize).add(0.5);
    If(uvw.x.greaterThanEqual(0).and(uvw.x.lessThanEqual(1))
      .and(uvw.y.greaterThanEqual(0)).and(uvw.y.lessThanEqual(1))
      .and(uvw.z.greaterThanEqual(0)).and(uvw.z.lessThanEqual(1)), () => {
      const coord = uvec3(uvw.mul(vec3(GX, GY, GZ)));
      const flicker = mx_noise_float(vertexPos.mul(9).add(vec3(0, uTime.negate().mul(2.5), uTime.mul(0.7)))).mul(0.5).add(0.5);
      const densityVal = uEmitDensity.mul(1 / 120).mul(flicker.mul(0.85).add(0.15));
      const tempVal = uEmitTemperature.mul(1 / 120).mul(flicker.mul(0.85).add(0.15));
      const currentDye = dyeTexNode.sample(uvw).level(0);
      const newDensity = currentDye.r.add(densityVal);
      const newTemp = currentDye.g.add(tempVal).clamp(0, 12);
      const newAge = mix(currentDye.b, float(0), densityVal.div(max(newDensity, 0.001)));
      textureStore(dyeTexWriteNode, coord, vec4(newDensity, newTemp, newAge, 1)).toWriteOnly();
    });
  })().compute(EMIT_COUNT);

  renderer.computeAsync(computeCurlNoisePass);

  /* volumetric raymarch material */
  const volumetricMaterial = new THREE.VolumeNodeMaterial();
  volumetricMaterial.steps = 14;
  volumetricMaterial.transparent = true;
  volumetricMaterial.blending = THREE.AdditiveBlending;
  volumetricMaterial.depthWrite = false;
  volumetricMaterial.offsetNode = fract(interleavedGradientNoise(screenCoordinate).add(float(frameId).mul(0.618033988749895)));

  const fireRamp = Fn(([t]) => {
    const c = vec3(0).toVar();
    c.assign(mix(vec3(0), uFireEndColor, smoothstep(0.05, 0.35, t)));
    c.assign(mix(c, uFireMidColor, smoothstep(0.35, 0.65, t)));
    c.assign(mix(c, uFireStartColor, smoothstep(0.65, 1.0, t)));
    return c;
  });

  const sampleVolume = (positionRay) => {
    const uvw = positionRay.sub(vec3(0, WORLD.y / 2, 0)).div(uVolumeWorldSize).add(0.5).toVar();
    const distortion = texture3D(velTexA, uvw, 0).xyz.div(uVolumeWorldSize).mul(0.15);
    const distorted = uvw.add(distortion).clamp(0, 1).toVar();
    const s = dyeTexNode.sample(distorted).level(0);
    const density = s.r.toVar();
    const temperature = s.g;
    const edge = min(distorted, vec3(1).sub(distorted));
    density.mulAssign(smoothstep(0.0, 0.06, min(edge.x, min(edge.y, edge.z))));
    return { density, temperature };
  };

  volumetricMaterial.scatteringNode = Fn(({ positionRay }) => {
    const { density } = sampleVolume(positionRay);
    return vec3(density).mul(0.55);
  });

  volumetricMaterial.scatteringEmissiveNode = Fn(({ positionRay }) => {
    const { density, temperature } = sampleVolume(positionRay);
    const fire = fireRamp(temperature.clamp(0, 1)).mul(temperature.pow(2.0)).mul(uFireIntensity);
    return fire.mul(density.add(0.15)).mul(0.12);
  });

  const volume = new THREE.Mesh(new THREE.BoxGeometry(WORLD.x, WORLD.y, WORLD.z), volumetricMaterial);
  volume.position.set(0, WORLD.y / 2 - 4.4, -9);
  group.add(volume);

  const bgMat = new THREE.MeshBasicNodeMaterial();
  bgMat.colorNode = Fn(() => {
    const d = uv().sub(vec2(0.5, 0.3)).length();
    return mix(color('#5E250D'), color('#0F0503'), smoothstep(0.1, 0.7, d));
  })();
  const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(80, 40), bgMat);
  backdrop.position.set(0, 4, -24);
  group.add(backdrop);

  let simTime = 0;
  const sim = () => {
    simTime += 1 / 60;
    uTime.value = simTime;
    renderer.compute(advectVelocityPass);
    renderer.compute(divergencePass);
    renderer.compute(jacobiPassAB);
    renderer.compute(jacobiPassBA);
    renderer.compute(projectPass);
    renderer.compute(advectDyePass);
    renderer.compute(emitPass);
    const tmp = dyeTexNode.value;
    dyeTexNode.value = dyeTexWriteNode.value;
    dyeTexWriteNode.value = tmp;
  };

  return { exposure: 1.6, toneMapping: THREE.ACESFilmicToneMapping, bloom: true, update: sim };
}

/* ------------------------------------------------------------------ */
/* The flacon — glass per KHR_materials_transmission                   */
/* ------------------------------------------------------------------ */

function buildBottle(group) {
  /* proportions matched to the photographed flacon: slim tall slab,
     liquid fill ~62%, brushed gold cap */
  const H = 2.6, W = 0.86, D = 0.44, R = 0.07;

  /* white frosted glass — milky, glossy, clearly present on any ground;
     the champagne water reads against it from inside */
  const glassMat = new THREE.MeshPhysicalNodeMaterial({
    transmission: 0.7,          // KHR_materials_transmission: transmissionFactor
    ior: 1.45,                  // KHR_materials_ior
    thickness: 0.5,             // KHR_materials_volume: thicknessFactor
    attenuationColor: new THREE.Color(0xF2ECE0),
    attenuationDistance: 1.2,
    roughness: 0.42,
    metalness: 0,
    color: 0xffffff,
    clearcoat: 0.7,
    clearcoatRoughness: 0.12,
  });

  const body = new THREE.Mesh(new RoundedBoxGeometry(W, H, D, 3, R), glassMat);
  body.position.y = 0;
  group.add(body);

  /* liquid: simple tinted body (no nested transmission — stacked refractive
     shells read as ghost layers), recolored per scene in animate() */
  /* opaque: three's transmission pass only refracts opaque geometry, so a
     transparent liquid would vanish behind the glass */
  const liquidMat = new THREE.MeshPhysicalNodeMaterial({
    roughness: 0.12,
    metalness: 0,
    color: 0xffffff,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transparent: true,
  });
  /* the liquid alpha-blends in the transparent pass, after the glass — the
     glass must not write depth or it would cull the liquid behind its front
     face (three's transmission pass only refracts opaque geometry, so the
     liquid can't live inside the refraction path at all) */
  glassMat.depthWrite = false;
  /* fully clear water: no body tint at all — the read comes from the rippled
     heightfield surface (exact analytic normals: the sines are the height,
     their cosines the derivatives) catching specular light. Body walls are a
     whisper of alpha so the fill level stays legible from the side. */
  /* nearly flush with the walls: a visible side gap makes the water read as
     a floating slab whose volume "jumps" as the bottle turns */
  const LW = W * 0.94, LH = H * 0.52, LD = D * 0.85;
  {
    const px = positionLocal.x, pz = positionLocal.z;
    const A1 = 0.020, K1 = 9.0, A2 = 0.014, K2 = 13.0, A3 = 0.011, K3 = 5.0, K3z = 6.0;
    const p1 = px.mul(K1).add(time.mul(2.4));
    const p2 = pz.mul(K2).sub(time.mul(1.7));
    const p3 = px.mul(K3).add(pz.mul(K3z)).add(time.mul(1.1));
    const f = sin(p1).mul(A1).add(sin(p2).mul(A2)).add(sin(p3).mul(A3));
    const topness = smoothstep(float(LH * 0.02), float(LH * 0.5), positionLocal.y);
    liquidMat.positionNode = positionLocal.add(vec3(0, f.mul(topness), 0));

    const dfdx = cos(p1).mul(A1 * K1).add(cos(p3).mul(A3 * K3));
    const dfdz = cos(p2).mul(A2 * K2).negate().add(cos(p3).mul(A3 * K3z));
    const waveN = vec3(dfdx.negate(), 1.0, dfdz.negate()).normalize();
    const topFace = smoothstep(float(0.55), float(0.9), normalLocal.y);
    liquidMat.normalNode = transformNormalToView(mix(normalLocal, waveN, topFace).normalize());

    /* amber, sitting between the two grounds in tone: lighter than the sea
       backdrop, darker than the bone panel — so the SAME body of water stays
       visible across the seam. A pale near-panel tint vanished against the
       panel and made the visible volume "jump" with every sway. */
    liquidMat.colorNode = vec3(0.82, 0.58, 0.22);
    liquidMat.opacityNode = mix(float(0.45), float(0.66), topFace);
  }
  const liquid = new THREE.Mesh(new RoundedBoxGeometry(LW, LH, LD, 5, R * 0.5), liquidMat);
  /* sit the water on the bottom of the glass — a floating slab with an empty
     band underneath reads as a bug */
  liquid.position.y = -H * 0.22;
  group.add(liquid);
  bottleLiquidMat = liquidMat;
  bottleLiquidMesh = liquid;

  const goldMat = new THREE.MeshStandardNodeMaterial({ color: 0xB8873B, metalness: 1.0, roughness: 0.32 });
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.1, 24), goldMat);
  neck.position.y = H / 2 + 0.05;
  group.add(neck);
  /* round cap: a gold cylinder — circular in plan, flat on top */
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.175, 0.175, 0.42, 48), goldMat);
  cap.position.y = H / 2 + 0.31;
  group.add(cap);

  group.position.y = 0.02; /* bottle center sits near 47% viewport height */
  group.scale.setScalar(0.94);
}

/* ------------------------------------------------------------------ */
/* Orchestration                                                       */
/* ------------------------------------------------------------------ */

function applyFxConfig(cfg) {
  renderer.toneMapping = cfg.toneMapping ?? THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = cfg.exposure ?? 1;
}

function activateEffect(idx) {
  const name = SCENE_FX[idx];
  if (currentFx && currentFx.group) currentFx.group.visible = false;
  mountEl.style.opacity = name === null ? '0' : '1';
  document.body.classList.toggle('sl-fx-bottle', name !== null);
  if (name === null) { currentFx = null; return; }

  if (!effects[name]) {
    const group = new THREE.Group();
    bgGroup.add(group);
    let cfg;
    if (name === 'fluid') cfg = buildFluid(group);
    else if (name === 'sky-warm') cfg = buildSky(group, 'warm');
    else if (name === 'sky-air') cfg = buildSky(group, 'air');
    else if (name === 'tornado') cfg = buildTornado(group);
    else if (name === 'ice') cfg = buildIce(group);
    else if (name === 'fire') cfg = buildFire(group);
    effects[name] = { group, cfg };
  }
  currentFx = effects[name];
  currentFx.group.visible = true;
  applyFxConfig(currentFx.cfg);
}

function veilDown() {
  veilEl.style.transition = 'opacity 780ms ease-out';
  veilEl.style.opacity = '0';
}

function startVeil(fromIdx, toIdx) {
  const [a] = VEIL_GRADS[Math.max(fromIdx, 0)];
  const [b, bg] = VEIL_GRADS[toIdx];
  veilEl.style.background = 'linear-gradient(24deg, ' + a + ' 0%, ' + bg + ' 48%, ' + b + ' 100%)';
  veilEl.style.transition = 'opacity 420ms ease-in';
  veilEl.style.opacity = '0.92';
  pendingIdx = toIdx;
  clearTimeout(startVeil._t);
  clearTimeout(startVeil._safety);
  startVeil._t = setTimeout(() => {
    try {
      activateEffect(pendingIdx);
    } catch (e) {
      /* a failed effect build must never leave the veil parked over the
         page — fall back to the DOM art direction for this scene */
      console.warn('[fx] effect activation failed', e);
      document.body.classList.remove('sl-fx-on', 'sl-fx-bottle');
      mountEl.style.opacity = '0';
      currentFx = null;
    }
    activeIdx = pendingIdx;
    veilDown();
  }, 430);
  /* belt and braces: whatever happens, the veil clears */
  startVeil._safety = setTimeout(veilDown, 1800);
}

function onProgress(p) {
  progress = p;
  const idx = Math.max(0, Math.min(6, Math.round(p)));
  if (idx !== activeIdx && idx !== pendingIdx) {
    if (activeIdx === -1) { activateEffect(idx); activeIdx = idx; pendingIdx = idx; }
    else startVeil(activeIdx, idx);
  }
}

let renderFailures = 0;
let frameNo = 0;

/* React occasionally recreates the mount node (its children list around the
   canvas is dynamic) — adopt the fresh node and re-attach our layers */
function reattachLayers() {
  const m = document.getElementById('sl-fx-mount');
  if (!m) { inView = false; return; }
  if (renderer.domElement.parentElement !== m) {
    mountEl = m;
    m.appendChild(renderer.domElement);
    m.style.opacity = currentFx === null && activeIdx === 6 ? '0' : '1';
  }
  if (veilEl && !veilEl.isConnected && m.parentElement) m.parentElement.appendChild(veilEl);
}

function animate() {
  frameNo++;
  if (frameNo % 15 === 0) {
    reattachLayers();
    if (mountEl && mountEl.isConnected) {
      const r = mountEl.getBoundingClientRect();
      inView = r.bottom > 40 && r.top < window.innerHeight - 40;
    }
  }
  if (!running || !inView || document.hidden) return;
  try {
    animateInner();
    renderFailures = 0;
  } catch (e) {
    /* a backend that passed init() can still die per-frame on older
       browsers (e.g. WebGPU texture-view API drift) — rebuild on WebGL */
    renderFailures++;
    if (renderFailures === 8) {
      console.warn('[fx] renderer unstable, rebuilding with WebGL', e);
      rebuildWithWebGL();
    }
  }
}

async function rebuildWithWebGL() {
  running = false;
  try { renderer.setAnimationLoop(null); renderer.domElement.remove(); renderer.dispose(); } catch (_) { /* already gone */ }
  for (const k of Object.keys(effects)) delete effects[k];
  currentFx = null; bloomPipeline = null; activeIdx = -1; pendingIdx = -1;
  while (bgGroup.children.length) bgGroup.remove(bgGroup.children[0]);
  try {
    renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true, forceWebGL: true });
    await renderer.init();
  } catch (e) {
    console.warn('[fx] WebGL rebuild failed — DOM art direction restored', e);
    document.body.classList.remove('sl-fx-on', 'sl-fx-bottle');
    mountEl.style.opacity = '0';
    return;
  }
  isWebGPU = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
  mountEl.appendChild(renderer.domElement);
  scene.environment = null;
  try {
    const pmrem = new THREE.PMREMGenerator(renderer);
    envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
  } catch (e) {
    scene.add(new THREE.HemisphereLight(0xfff4e0, 0x202020, 2.2));
  }
  buildBloomPipeline();
  onProgress(progress);
  running = true;
  renderFailures = 0;
  lastTime = performance.now();
  renderer.setAnimationLoop(animate);
  console.info('[fx] backgrounds live — WebGL2 (rebuilt)');
}

function animateInner() {
  window.__fxFrames = (window.__fxFrames || 0) + 1;
  const now = performance.now();
  const dt = Math.min((now - lastTime) / 1000, 1 / 30);
  lastTime = now;

  /* poster layout: horizontal 50/50 split — the fluid fills the top half
     and the bottle stands astride the seam, glass over both grounds */
  const narrow = camera.aspect < 0.9;
  const split = 0.50;                               /* animated share, from the top */
  const halfH0 = 6.7 * Math.tan((35 * Math.PI / 180) / 2);
  const lineY = (1 - 2 * split) * halfH0;           /* seam in world units at z=0 */
  const baseS = narrow ? 0.62 : 0.79;
  const baseX = 0;
  const dip = narrow ? 0.26 : 0.55;                 /* how far the glass reaches below the seam */
  const baseY = lineY + 1.3 * baseS - dip;

  if (fluidPlane) {
    const halfH5 = (6.7 + 5) * Math.tan((35 * Math.PI / 180) / 2);
    const halfW5 = halfH5 * camera.aspect;
    const bottomY = (1 - 2 * split) * halfH5;
    const topY = halfH5 * 1.03;
    const pw = 2 * halfW5 * 1.05, phh = topY - bottomY;
    fluidPlane.scale.set(pw, phh, 1);
    fluidPlane.position.y = (topY + bottomY) / 2;
    /* ~0.26 pattern repeats per world unit = the original full-screen density */
    if (fluidUvScale) fluidUvScale.value.set(pw * 0.26, phh * 0.26);
  }
  const t = now * 0.001;
  bottleGroup.rotation.z = Math.sin(t * 1.1) * 2.6 * (Math.PI / 180);
  /* keep the yaw gentle — wide swings change the water's projected volume */
  bottleGroup.rotation.y = Math.sin(t * 0.42) * 0.14;
  bottleGroup.position.x = baseX;
  bottleGroup.position.y = baseY + Math.sin(t * 1.5) * 0.05;
  bottleGroup.scale.setScalar(baseS * (1 + Math.sin(t * 0.8) * 0.012));

  /* liquid slosh: lags the bottle tilt and breathes against it */
  if (bottleLiquidMesh) {
    bottleLiquidMesh.rotation.z = Math.sin(t * 1.1 - 0.9) * 1.5 * (Math.PI / 180);
    bottleLiquidMesh.rotation.x = Math.sin(t * 1.35 - 0.5) * 1.0 * (Math.PI / 180);
    bottleLiquidMesh.position.y = -2.6 * 0.22; /* the level itself must not drift */
  }

  if (currentFx) {
    if (currentFx.cfg.update) currentFx.cfg.update(dt);
    if (currentFx.cfg.orbit) {
      const t = performance.now() * 0.00004;
      camera.position.x = Math.sin(t) * 1.2;
      camera.lookAt(0, 0.2, 0);
    } else {
      camera.position.x = 0;
      camera.lookAt(0, 0, 0);
    }
    if (currentFx.cfg.bloom && bloomPipeline) { bloomPipeline.render(); return; }
  }
  renderer.render(scene, camera);
}

let bloomPipeline = null;

function buildBloomPipeline() {
  try {
    bloomPipeline = new THREE.RenderPipeline(renderer);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, 0.6, 0.2, 0.9);
    bloomPipeline.outputNode = scenePassColor.add(bloomPass);
  } catch (e) {
    console.warn('[fx] bloom unavailable', e);
    bloomPipeline = null;
  }
}

async function init() {
  mountEl = document.getElementById('sl-fx-mount');
  if (!mountEl) return;

  try {
    renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
    await renderer.init();
  } catch (e) {
    console.warn('[fx] renderer init failed — DOM art direction stays', e);
    return;
  }
  isWebGPU = !!(renderer.backend && renderer.backend.isWebGPUBackend);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
  mountEl.appendChild(renderer.domElement);

  veilEl = document.createElement('div');
  veilEl.style.cssText = 'position:absolute;inset:0;z-index:24;opacity:0;pointer-events:none';
  mountEl.parentElement.appendChild(veilEl);

  const style = document.createElement('style');
  style.textContent =
    'body.sl-fx-on [data-sl-bg]{opacity:0 !important;transition:opacity .8s ease}' +
    'body.sl-fx-bottle [data-sl-bottle]{opacity:0 !important;transition:opacity .6s ease}';
  document.head.appendChild(style);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(35, mountEl.clientWidth / mountEl.clientHeight, 0.1, 1000000);
  camera.position.set(0, 0, 6.7);

  bgGroup = new THREE.Group();
  scene.add(bgGroup);
  bottleGroup = new THREE.Group();
  scene.add(bottleGroup);

  try {
    const pmrem = new THREE.PMREMGenerator(renderer);
    envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.9;
  } catch (e) {
    console.warn('[fx] environment unavailable', e);
    scene.add(new THREE.HemisphereLight(0xfff4e0, 0x202020, 2.2));
  }

  buildBottle(bottleGroup);
  buildBloomPipeline();

  document.body.classList.add('sl-fx-on');

  /* single-poster mode: the fluid environment is the one and only scene */
  activateEffect(0);
  activeIdx = 0;
  pendingIdx = 0;

  const onResize = () => {
    const w = mountEl.clientWidth, h = mountEl.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', onResize);

  /* visibility is recomputed from live geometry inside the render loop —
     IntersectionObserver misreports for sticky subtrees and dies with
     React-recreated nodes */

  running = true;
  lastTime = performance.now();
  renderer.setAnimationLoop(animate);
  window.__fxDebug = {
    get state() {
      return {
        activeIdx, pendingIdx, running, inView, frames: window.__fxFrames || 0,
        failures: renderFailures,
        fx: currentFx ? Object.keys(effects).find(k => effects[k] === currentFx) : null,
        groups: Object.keys(effects).map(k => k + ':' + (effects[k].group.visible ? 'v' : 'h')).join(','),
        exposure: renderer.toneMappingExposure,
      };
    },
  };
  console.info('[fx] backgrounds live —', isWebGPU ? 'WebGPU' : 'WebGL2 fallback');
}

const boot = () => {
  if (document.getElementById('sl-fx-mount')) init();
  else setTimeout(boot, 150);
};
boot();
