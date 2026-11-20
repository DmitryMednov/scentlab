import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import './styles.css';
import { createHero, createRitual, createMist, createShade, BEATS } from './hero.js';
import { createTimeline } from './timeline.js';
import { createSound } from './sound.js';
import { createGate } from './gate.js';
import { createFlower, createDew } from './scene/flower.js';
import { createStone } from './scene/stone.js';
import { createBackdrop } from './scene/backdrop.js';
import { createBottle } from './scene/bottle.js';
import { createDrips } from './scene/drips.js';
import { createSpritz } from './scene/spritz.js';
import { createSpray } from './scene/spray.js';

// VITE_SCENE_ONLY=1 builds the 3D animation alone: no menu, no copy, no showroom panels
const SCENE_ONLY = !!import.meta.env.VITE_SCENE_ONLY;
if (SCENE_ONLY) document.documentElement.classList.add('is-scene-only');

const REFLECT_LAYER = 1;
const params = new URLSearchParams(location.search);
const frozenT = params.has('t') ? parseFloat(params.get('t')) : null;
// The entry screen ("Welcome to Lotus" behind fogged glass) is the loading
// screen; its button starts the intro and the music's opening together. QA
// links (a frozen moment, a story position or ?entrada=0) skip it.
const useGate = !SCENE_ONLY && frozenT === null && !params.has('p') && params.get('entrada') !== '0';
let waiting = useGate; // the intro holds at its first frame until the visitor starts it
let sound = null;
const gate = useGate
  ? createGate({
      onStart({ sound: withSound }) {
        waiting = false;
        if (withSound) sound?.enter();
        document.body.classList.add('is-ready');
      },
    })
  : null;
if (gate) document.documentElement.classList.add('has-gate');
// The Blender bottle (HDRI studio light and bloom) is the default; ?producto=original brings back the procedural one
const requestedProduct = params.get('producto') ?? 'blender';
const productVariant = requestedProduct === 'original' ? null : requestedProduct;
// Scroll story after the intro. The main preview is AGUA (the bottle rises, then
// drops into the water); VITE_HISTORIA=aire builds the other one, =ninguna none.
const storyEnv = import.meta.env.VITE_HISTORIA || 'agua';
const storyName = productVariant && storyEnv !== 'ninguna' ? storyEnv : null;

// --- quality tiers: the glass refraction, bloom and water reflection are fill-rate
// heavy, so the canvas starts a notch below the screen density and steps down when
// frames run long (?calidad=0|1|2 pins a tier).
// prPhone: phones (narrow screens) have 3x screens but a third of a laptop's pixels
// in CSS terms, so a 1.25 canvas was stretched ~2.4x and looked soft. At 2 a phone
// still draws about half the pixels of a laptop on tier 0.
const TIERS = [
  { pr: 1.5, prPhone: 2.25, samples: 4, refl: 0.5, trans: 0.5 },
  { pr: 1.25, prPhone: 2, samples: 2, refl: 0.4, trans: 0.4 },
  { pr: 1, prPhone: 1.5, samples: 0, refl: 0.33, trans: 0.33 },
  // last resort for software WebGL (hardware acceleration off): no bloom, sub-native canvas
  { pr: 0.6, prPhone: 0.6, samples: 0, refl: 0.25, trans: 0.25, bloom: false },
];
const isPhone = () => window.innerWidth < 760;
const pixelRatio = (q) => Math.min(window.devicePixelRatio, isPhone() ? q.prPhone : q.pr);
const pinnedTier = params.has('calidad') ? Math.min(TIERS.length - 1, Math.max(0, parseInt(params.get('calidad'), 10) || 0)) : null;
let tier = pinnedTier ?? (isPhone() ? 1 : 0);

const canvas = document.querySelector('#scene');
// with the post-processing chain the multisampled offscreen target does the
// antialiasing; a multisampled canvas on top of it is pure cost
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !productVariant, powerPreference: 'high-performance' });
renderer.setPixelRatio(pixelRatio(TIERS[tier]));
renderer.transmissionResolutionScale = TIERS[tier].trans;
// a software rasteriser (browser GPU acceleration off or blocklisted) goes straight to the last tier
if (pinnedTier === null) {
  const gl = renderer.getContext();
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  const gpu = String(gl.getParameter(dbg ? dbg.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || '');
  if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(gpu)) {
    tier = TIERS.length - 1;
    renderer.setPixelRatio(pixelRatio(TIERS[tier]));
    renderer.transmissionResolutionScale = TIERS[tier].trans;
  }
}
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.06;
renderer.shadowMap.enabled = true;
// VSM with the modelled bottles: with PCF depth-compare shadows, rendering into the
// multisampled transmission/bloom targets drops every shadow-receiving mesh
// ("Mismatch between texture format and sampler type", three 0.186).
renderer.shadowMap.type = productVariant ? THREE.VSMShadowMap : THREE.PCFShadowMap;
renderer.localClippingEnabled = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.05, 400);

// --- environment: soft dusk gradient, used for petal sheen, wet stone and dew
function buildEnvironment() {
  const envScene = new THREE.Scene();
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uZenith: { value: new THREE.Color('#c4a0ab') },
      uHorizon: { value: new THREE.Color('#ecccc9') },
      uWater: { value: new THREE.Color('#a17987') },
      uSun: { value: new THREE.Color('#fff1e8') },
      uSunDir: { value: new THREE.Vector3(-1, 0.32, -1.1).normalize() },
    },
    vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `
      uniform vec3 uZenith, uHorizon, uWater, uSun, uSunDir; varying vec3 vDir;
      void main(){
        vec3 d = normalize(vDir);
        vec3 c = d.y > 0.0 ? mix(uHorizon, uZenith, pow(d.y, 0.6)) : mix(uHorizon, uWater, pow(-d.y, 0.4));
        float s = max(dot(d, uSunDir), 0.0);
        c += uSun * (pow(s, 24.0) * 1.6 + pow(s, 4.0) * 0.25);
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  envScene.add(new THREE.Mesh(new THREE.SphereGeometry(10, 48, 24), mat));
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromScene(envScene, 0.02);
  pmrem.dispose();
  return rt.texture;
}
const envMap = buildEnvironment();

// Studio softboxes for the glass and gold only: crisp white facet highlights the
// soft dusk sky can't give.
function buildStudioEnvironment() {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const rt = pmrem.fromScene(room, 0.03);
  room.dispose();
  pmrem.dispose();
  return rt.texture;
}
const studioEnv = buildStudioEnvironment();

// Real photographed studio (Poly Haven "Studio Small 09", CC0) for the modelled bottles.
async function loadProductEnvironment() {
  const hdr = await new HDRLoader().loadAsync(`${import.meta.env.BASE_URL}hdr/studio_small_09_1k.hdr`);
  hdr.mapping = THREE.EquirectangularReflectionMapping;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromEquirectangular(hdr);
  hdr.dispose();
  pmrem.dispose();
  return rt.texture;
}

// --- lights
const hemi = new THREE.HemisphereLight('#faeae0', '#94706f', 1.15);
const sun = new THREE.DirectionalLight('#ffe4da', 2.1); // low, behind-left: rims + translucency
sun.position.set(-3.2, 2.0, -2.6);
const key = new THREE.DirectionalLight('#fff2e8', 1.45); // soft front-left key, casts the shadows
key.position.set(-1.6, 3.4, 2.4);
key.castShadow = true;
key.shadow.mapSize.set(1024, 1024);
key.shadow.camera.left = -1.4;
key.shadow.camera.right = 1.4;
key.shadow.camera.top = 1.6;
key.shadow.camera.bottom = -1.0;
key.shadow.camera.near = 0.5;
key.shadow.camera.far = 9;
key.shadow.bias = -0.0004;
key.shadow.normalBias = 0.015;
key.shadow.radius = 4;
const fill = new THREE.DirectionalLight('#f6d8cc', 0.45);
fill.position.set(2.5, 0.6, 2.0);
for (const l of [hemi, sun, key, fill]) {
  l.layers.enable(REFLECT_LAYER);
  scene.add(l);
}

// --- objects
const clipPlanes = [new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)];
const stone = createStone({ envMap, clipPlanes });
scene.add(stone.group);

const flower = createFlower({ envMap });
const flowerRoot = new THREE.Group(); // falls, sways and lands
flowerRoot.add(flower.group);
let bottle;
let makeProduct = null;
if (productVariant) {
  const { createProduct } = await import('./scene/product.js');
  const productEnv = await loadProductEnvironment();
  makeProduct = () => createProduct({ variant: productVariant, envMap: productEnv });
  bottle = await makeProduct();
} else {
  bottle = createBottle({ envMap: studioEnv });
}
flowerRoot.add(bottle.group);
scene.add(flowerRoot);
const dew = createDew(flower, { envMap });
scene.add(dew.mesh);
const drips = createDrips(flower, { envMap });
scene.add(drips.mesh);
const spritz = createSpritz({ count: window.innerWidth < 760 ? 180 : 260 });
scene.add(spritz.mesh);
const spray = createSpray({ count: window.innerWidth < 760 ? 420 : 660 });
scene.add(spray.mesh);

const STONE_TOP = 0.088;
for (const o of [stone.group, flowerRoot, dew.mesh, drips.mesh]) o.traverse((c) => c.layers.enable(REFLECT_LAYER));

// --- planar reflection (mirror camera, same math as three's Reflector)
const reflRT = new THREE.WebGLRenderTarget(2, 2, { type: THREE.HalfFloatType });
const reflCam = new THREE.PerspectiveCamera();
reflCam.layers.set(REFLECT_LAYER);
const reflMatrix = new THREE.Matrix4();
const _camPos = new THREE.Vector3();
const _look = new THREE.Vector3();
const _rot = new THREE.Matrix4();

function renderReflection() {
  camera.updateMatrixWorld();
  _camPos.setFromMatrixPosition(camera.matrixWorld);
  _rot.extractRotation(camera.matrixWorld);
  _look.set(0, 0, -1).applyMatrix4(_rot).add(_camPos);
  reflCam.position.set(_camPos.x, -_camPos.y, _camPos.z);
  reflCam.up.set(0, 1, 0).applyMatrix4(_rot);
  reflCam.up.y *= -1;
  reflCam.lookAt(_look.x, -_look.y, _look.z);
  reflCam.updateMatrixWorld();
  reflCam.projectionMatrix.copy(camera.projectionMatrix);
  reflCam.projectionMatrixInverse.copy(camera.projectionMatrixInverse);
  reflMatrix.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
  reflMatrix.multiply(reflCam.projectionMatrix).multiply(reflCam.matrixWorldInverse);

  const prevAuto = renderer.shadowMap.autoUpdate;
  renderer.shadowMap.autoUpdate = false;
  renderer.setRenderTarget(reflRT);
  renderer.setClearColor(0x000000, 0);
  renderer.clear();
  renderer.render(scene, reflCam);
  renderer.setRenderTarget(null);
  renderer.setClearColor(0x000000, 1);
  renderer.shadowMap.autoUpdate = prevAuto;
}

// --- sky + water
const skyTexture = await new THREE.TextureLoader().loadAsync(`${import.meta.env.BASE_URL}tex/sky.jpg`);
skyTexture.colorSpace = THREE.SRGBColorSpace;
skyTexture.wrapS = THREE.ClampToEdgeWrapping;
skyTexture.wrapT = THREE.ClampToEdgeWrapping;
skyTexture.generateMipmaps = false;
skyTexture.minFilter = THREE.LinearFilter;
const backdrop = createBackdrop({ skyTexture, reflTexture: reflRT.texture, drips: drips.impacts });
scene.add(backdrop.mesh);

// --- post: bloom on the glass/gold glints only (threshold above the lit petals and sky)
let composer = null;
let renderPass = null;
let bloomPass = null;
if (productVariant) {
  composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(2, 2, { type: THREE.HalfFloatType, samples: TIERS[tier].samples }));
  renderPass = new RenderPass(scene, camera);
  bloomPass = new UnrealBloomPass(new THREE.Vector2(2, 2), 0.45, 0.25, 1.5);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());
}

// --- layout
const view = { w: 1, h: 1, dist: 4.0, height: 0.5, top: 1.6 };
function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  // a phone turned sideways crosses the narrow-screen line, so the density follows
  renderer.setPixelRatio(pixelRatio(TIERS[tier]));
  renderer.setSize(w, h, false);
  const aspect = w / h;
  camera.aspect = aspect;
  // keep the open flower (~2 units wide) framed the same on any aspect
  view.dist = 4.0 * Math.max(1, Math.pow(1.62 / aspect, 0.78));
  view.height = view.dist * 0.125;
  // world height of the top edge of the frame at the flower; the bud starts just above it
  view.top = view.height + view.dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  camera.updateProjectionMatrix();
  const pr = renderer.getPixelRatio();
  const rs = TIERS[tier].refl;
  reflRT.setSize(Math.max(2, Math.round(w * pr * rs)), Math.max(2, Math.round(h * pr * rs)));
  view.w = Math.round(w * pr);
  if (composer) {
    composer.setPixelRatio(pr);
    composer.setSize(w, h);
  }
  view.h = Math.round(h * pr);
  spritz.uniforms.uPx.value = (h * pr) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
  spray.uniforms.uPx.value = spritz.uniforms.uPx.value;
  story?.resize(w, h, pr);
  showroom?.resize(w, h, pr);
}
let story = null;
let showroom = null;
let timeline = null;
window.addEventListener('resize', resize);
resize();

// the scroll drives the timeline, so a reload starts from the top
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
window.addEventListener('pointermove', (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
});

// --- intro timeline (seconds)
const T = {
  fallStart: 0.35,
  fallDur: 2.5,
  get land() {
    return this.fallStart + this.fallDur;
  },
  openDur: 3.0,
  // seconds after landing: the flower is half open with the bottle nestled inside
  // (the intro plays by itself up to here; from here on the scroll drives the
  // timeline: it finishes opening the flower, lifts the bottle, then the flourish)
  hero: 2.4,
  // seconds after landing: the flower is fully open and the bottle stands in it
  bloomEnd: 4.0,
  // the bottle's flourish ends here (seconds after landing); the story follows
  flourishEnd: 10.4,
  get heroAt() {
    return this.land + this.hero;
  },
  get introEnd() {
    return this.land + this.flourishEnd;
  },
};

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const easeOutBack = (x, s = 1.15) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
const easeInOut = (x) => x * x * (3 - 2 * x);
const range = (a, b, x) => clamp01((x - a) / (b - a));

// How far each ring opens by itself before the scroll takes over: the outer
// petals are almost flat, the inner ones still stand up and cup the bottle.
const HALF = { outer: 0.88, middle: 0.66, inner: 0.56 };
// the scroll then finishes the opening ring by ring, outer first
const BLOOM_LAG = { outer: 0, middle: 0.12, inner: 0.25 };

// t drives the opening (timeline); a only drives the breathing (ambient time)
function ringOpen(p, t, a) {
  const sinceLand = t - T.land;
  // the outer petals already loosen a little in the last stretch of the fall
  const pre = p.ring.name === 'outer' ? 0.07 * easeInOut(clamp01((t - (T.fallStart + T.fallDur * 0.72)) / (T.fallDur * 0.28))) : 0;
  if (p.ring.sepal) return pre + 0.9 * easeInOut(clamp01((sinceLand - 0.05) / 2.2));
  const half = HALF[p.ring.name] ?? 1;
  // by itself: up to `half`, done just before the scroll unlocks
  const start = 0.12 + p.ring.delay * 0.6 + p.stagger * 0.18;
  const x = clamp01((sinceLand - start) / (T.hero - 0.1 - start));
  let o = x <= 0 ? 0 : half * (1 - Math.pow(1 - x, 3));
  // on scroll: from `half` to fully open
  const from = T.hero + (BLOOM_LAG[p.ring.name] ?? 0) + p.stagger * 0.12;
  const x2 = clamp01((sinceLand - from) / (T.bloomEnd - 0.1 - from));
  if (x2 > 0) o = half + (1 - half) * easeOutBack(x2);
  o = pre + (1 - pre) * o;
  // gentle breathing once the intro has settled
  const settled = clamp01((a - T.land - T.hero) / 1.5);
  o += settled * 0.018 * Math.sin(a * 0.9 + p.az * 2.0 + p.index);
  return o;
}

// the perfume grows out of the centre while the petals part, nestled low inside
// the cupped inner petals...
function bottleReveal(t) {
  const x = clamp01((t - T.land - 0.5) / (T.hero - 0.6));
  return x <= 0 ? 0 : 1 - Math.pow(1 - x, 3);
}
// ...and the scroll lifts it to stand in the open flower
const NEST = 0.55; // rise while nestled (1 = standing in the open flower)
function bottleRise(t) {
  const x = easeInOut(range(T.hero + 0.25, T.bloomEnd, t - T.land));
  return NEST + (1 - NEST) * x;
}

// As the petals finish opening the bottle floats up a little, its cap lifts off,
// the whole bottle turns once on its own axis while breathing out a faint mist,
// then it rises higher and the gold pump presses three times, each press
// shooting a red spray out of the side; then the cap goes back on. In AGUA it
// stays up there, hovering, and the story takes it from that height into the
// water; otherwise it settles into the flower.
const HOVER = 0.22;
const PRESSES = [7.5, 8.15, 8.8]; // seconds after landing
const holdUp = storyName === 'agua';
const neckBox = new THREE.Box3();
const nozzle = new THREE.Vector3();
const sprayAt = new THREE.Vector3();
const sprayDir = new THREE.Vector3();
// actuator travel for one press d seconds in: quick down, short hold, spring back
const pressCurve = (d) => (d < 0 ? 0 : d < 0.09 ? easeInOut(d / 0.09) : d < 0.2 ? 1 : 1 - easeInOut(range(0.2, 0.42, d)));
function bottleFlourish(t) {
  if (!bottle.setCapOff) return;
  const s = t - T.land;
  const rise = 0.5 * easeInOut(range(4.2, 5.7, s)) + 0.5 * easeInOut(range(6.7, 7.35, s));
  const settle = holdUp ? 0 : easeInOut(range(9.8, T.flourishEnd, s));
  const up = rise * (1 - settle);
  bottle.inner.position.y += HOVER * up + 0.006 * Math.sin((s - 5.7) * 2.4) * up;
  bottle.inner.rotation.y = Math.PI * 2 * easeInOut(range(4.6, 7.1, s));
  bottle.setCapOff(range(4.8, 5.8, s) * (1 - range(9.1, 9.9, s)));
  bottle.setPress(Math.max(...PRESSES.map((p) => pressCurve(s - p))));

  const u = (s - 5.3) / 1.4;
  if (u > 0 && u < 1.3) {
    bottle.group.updateMatrixWorld(true);
    neckBox.setFromObject(bottle.parts.Neck.mesh);
    neckBox.getCenter(nozzle);
    nozzle.y = neckBox.max.y;
  }
  spritz.update(u, nozzle);

  // the spray leaves the orifice where it rests between presses
  const sprayOn = s > PRESSES[0] && s < PRESSES[PRESSES.length - 1] + 1.7;
  if (sprayOn) {
    bottle.group.updateMatrixWorld(true);
    bottle.nozzle.getWorldPosition(sprayAt);
    bottle.nozzle.getWorldDirection(sprayDir);
    sprayAt.addScaledVector(sprayDir, 0.006);
  }
  spray.update(s, PRESSES.map((p) => p + 0.05), sprayAt, sprayDir);
}

function flowerPose(t) {
  const f = clamp01((t - T.fallStart) / T.fallDur);
  // drifting fall from just above the frame: enters right away, keeps some speed into the landing
  const e = 0.55 * f + 0.45 * f * f;
  const from = view.top + 0.04;
  let y = from + (STONE_TOP - from) * e;
  let sx = 1;
  let sy = 1;
  const sinceLand = t - T.land;
  if (sinceLand > 0) {
    y = STONE_TOP;
    const k = Math.exp(-sinceLand * 6.5) * Math.sin(sinceLand * 22);
    sy = 1 - 0.06 * k;
    sx = 1 + 0.03 * k;
  }
  const sway = (1 - f) * (1 - f);
  flowerRoot.position.set(Math.sin(f * 5.2) * 0.05 * sway, y, Math.cos(f * 4.1) * 0.03 * sway);
  flowerRoot.rotation.set(Math.sin(f * 6.0 + 0.4) * 0.12 * sway, -0.9 + 0.9 * easeInOut(f), Math.sin(f * 5.1) * 0.1 * sway);
  flowerRoot.scale.set(sx, sy, sx);
}

if (storyName) {
  const { createStory } = await import('./story/index.js');
  story = await createStory(storyName, {
    renderer, composer, scene, camera, view, T, flower, flowerRoot, bottle, backdrop,
    envMap, studioEnv, makeProduct, isMobile: isPhone,
    hover: holdUp ? HOVER : 0, samples: TIERS[tier].samples, lowGpu: tier === TIERS.length - 1,
    // scroll chapters spent on the bottle's flourish before the story itself
    lead: bottle.setCapOff ? 2.6 : 0,
  });
  // the showroom on the plinth at the end of AGUA (its objects must exist before precompile)
  if (story.showroom && !SCENE_ONLY) {
    const { createShowroom } = await import('./showroom/index.js');
    showroom = createShowroom({ ...story.showroom, isMobile: isPhone });
  }
  // the chapter timeline on the right edge, gone just before the showroom
  if (showroom && story.lead) {
    const atLand = (s) => story.lead * clamp01((s - T.hero) / (T.flourishEnd - T.hero));
    timeline = createTimeline({
      end: story.lead + showroom.onAt,
      marks: [
        { q: 0, label: 'The bloom' },
        { q: atLand(BEATS.ritual.from), label: 'The ritual' },
        { q: atLand(BEATS.mist.from), label: 'The mist' },
        { q: story.lead + 0.15, label: 'The dive' },
        { q: story.lead + 1.6, label: 'The depths' },
      ],
    });
  }
  resize();
}

function applyTier() {
  const q = TIERS[tier];
  renderer.setPixelRatio(pixelRatio(q));
  renderer.transmissionResolutionScale = q.trans;
  pace.frames = 0;
  if (composer) {
    for (const rt of [composer.renderTarget1, composer.renderTarget2]) {
      rt.samples = q.samples;
      rt.dispose(); // reallocated with the new sample count on next use
    }
  }
  story?.setSamples(q.samples);
  resize();
}

// Judge the frame rate about once a second; two slow judgements in a row drop a
// tier. Hidden-tab gaps never reach here (the timer is connected to the page
// visibility), so even multi-second frames count: that is the frozen-page case.
// Frozen QA frames and pinned tiers never adapt.
const pace = { acc: 0, n: 0, slow: 0, frames: 0 };
function watchPace(dt) {
  if (pinnedTier !== null || frozen !== null || tier >= TIERS.length - 1) return;
  if (!(dt > 0) || ++pace.frames <= 3) return; // the first frames upload textures
  pace.acc += dt;
  pace.n++;
  if (pace.acc < 1) return;
  const avg = pace.acc / pace.n;
  pace.acc = 0;
  pace.n = 0;
  pace.slow = avg > 1 / 45 ? pace.slow + 1 : 0;
  if (pace.slow >= 2) {
    pace.slow = 0;
    tier++;
    applyTier();
  }
}

// Compile every shader before the first frame (in parallel where the browser
// allows) so nothing stalls mid-animation, including objects that only appear
// later (the mist, the splash, the underwater showroom). Programs differ for
// offscreen targets, so they are compiled against the target they render into.
async function precompile() {
  const hidden = [];
  const reveal = (root) => root.traverse((o) => {
    if (!o.visible) {
      hidden.push(o);
      o.visible = true;
    }
  });
  reveal(scene);
  const jobs = [];
  renderer.setRenderTarget(composer ? composer.renderTarget1 : null);
  jobs.push(renderer.compileAsync(scene, camera));
  renderer.setRenderTarget(null);
  if (story) jobs.push(...story.precompile(reveal));
  try {
    await Promise.all(jobs);
  } catch (e) {
    console.warn('precompile', e);
  } finally {
    for (const o of hidden) o.visible = false;
  }
}
await precompile();

// The clock advances by frame, never more than a tenth of a second at a time: a
// stalled frame pauses the animation instead of skipping ahead, so short beats
// are never jumped over. It plays the intro (fall, opening, the bottle coming
// out) and keeps the ambient motion alive (water, breathing petals). From
// T.heroAt on, the scroll drives the timeline forwards and backwards; the story
// rate-limits that too (see scroll() in story/index.js).
let clock = 0;
let capOffFrames = 0; // QA: frames actually drawn with the cap lifted
let sprayFrames = 0; // QA: frames actually drawn with the red spray out
let frozen = frozenT;
const timer = new THREE.Timer();
timer.connect(document);
const cam = { pos: new THREE.Vector3(), look: new THREE.Vector3() };
let lastOpenT = -1;
let lastOpenA = -1;
let lastT = 0;

function frame() {
  timer.update();
  const dt = timer.getDelta();
  watchPace(dt);
  if (frozen === null && !waiting) clock += Math.min(Math.max(dt, 0), 0.1);
  // a: ambient time, always running; t: the timeline (scroll-driven after the intro)
  const a = frozen !== null ? frozen : clock;
  let t = a;
  if (story?.lead && frozen === null) {
    if (clock >= T.heroAt) story.unlock();
    story.scroll(dt);
    if (clock >= T.heroAt) t = T.heroAt + story.lead01 * (T.introEnd - T.heroAt);
  } else if (story) {
    if (frozen !== null || clock > T.introEnd) story.unlock();
    story.scroll(dt);
  }
  if (frozen === null && t - T.land > 4.8 && t - T.land < 9.8) capOffFrames++;
  if (frozen === null && spray.mesh.visible) sprayFrames++;

  lastT = t;
  hero.update(t, T);
  ritual.update(t, T);
  mist.update(t, T);
  shade.update(t, T);
  flowerPose(t);
  bottle.setReveal(bottleReveal(t), bottleRise(t));
  bottleFlourish(t);
  if (a !== lastOpenA || t !== lastOpenT) {
    flower.setOpen((p) => ringOpen(p, t, a));
    lastOpenA = a;
    lastOpenT = t;
  }

  // camera: fixed framing + light pointer parallax
  pointer.sx += (pointer.x - pointer.sx) * 0.04;
  pointer.sy += (pointer.y - pointer.sy) * 0.04;
  const px = frozen !== null ? 0 : pointer.sx;
  const py = frozen !== null ? 0 : pointer.sy;
  cam.pos.set(px * 0.14 * (view.dist / 4), view.height - py * 0.04, view.dist);
  cam.look.set(px * 0.04, view.height - py * 0.04, 0);
  showroom?.update(a, dt, story.p, tier >= 2);
  timeline?.update(story.q, a >= T.heroAt - 0.5);
  story?.update(a, cam);
  showroom?.post();
  camera.position.copy(cam.pos);
  camera.lookAt(cam.look);
  camera.updateMatrixWorld();

  scene.updateMatrixWorld();
  dew.update(1);
  drips.update(a);

  backdrop.uniforms.uTime.value = a;
  backdrop.uniforms.uLand.value = T.land;
  // once the story's second scene covers the frame, the lotus scene is skipped
  const mainVisible = story ? story.prepare() : true;
  if (mainVisible) renderReflection();
  backdrop.update(camera, view.w, view.h, reflMatrix);
  if (composer) {
    renderPass.enabled = mainVisible;
    // the bloom runs after the composite, so it also lights the second scene;
    // under water it opens up into a softer, wider glow
    bloomPass.enabled = TIERS[tier].bloom !== false;
    const glow = story?.glow ?? 0;
    bloomPass.threshold = 1.5 - 0.3 * glow;
    bloomPass.strength = 0.45 + 0.05 * glow;
    bloomPass.radius = 0.25 + 0.15 * glow;
    composer.render();
  }
  else renderer.render(scene, camera);
}

const hero = createHero();
const ritual = createRitual();
const mist = createMist();
const shade = createShade();

renderer.setAnimationLoop(frame);
sound = SCENE_ONLY ? null : createSound({ gate: !!gate, land: T.land });

// reveal page chrome
if (gate) gate.ready();
else {
  requestAnimationFrame(() => {
    document.body.classList.add('is-ready');
  });
}

// QA hook: freeze the timeline at a given second
window.__lotus = {
  setTime(t) {
    frozen = t;
  },
  play() {
    frozen = null;
    clock = 0;
  },
  // jump the intro clock (QA of the scroll-driven part on slow browsers)
  seek(t) {
    frozen = null;
    clock = t;
  },
  T,
  get tier() {
    return tier;
  },
  get clock() {
    return clock;
  },
  get timeline() {
    return lastT;
  },
  get capOffFrames() {
    return capOffFrames;
  },
  get sprayFrames() {
    return sprayFrames;
  },
  pace,
  info: renderer.info,
  get story() {
    return story;
  },
  get showroom() {
    return showroom;
  },
};
