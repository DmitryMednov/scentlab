import * as THREE from 'three';
import { range, smooth, easeOut, easeInOut, lerp, hash, createSplash } from './fx.js';

// AIRE: the bottle rises out of the lotus, comes apart, its essence drifts up
// and dissolves into the clouds; a single drop of clear water falls back, and
// its ring opens onto the showroom where the bottle puts itself back together.
//
// Progress p (chapters):
//   0.05–1.0  the bottle rises and turns
//   0.8–1.45  exploded view: collar, neck and cap lift off the body
//   1.05–2.3  ruby mist from the open neck climbs into the clouds, which take its tint
//   1.75–2.35 the pieces follow it up and out of frame
//   2.0–2.6   a clear water drop condenses under the clouds and falls
//   2.6–3.3   impact ring on the water
//   3.0–3.65  the ring opens onto the showroom; 3.05–3.7 the bottle reassembles

const DROP = new THREE.Vector3(0.72, 1.12, 1.05); // forms here, falls straight down (beside the flower)
const DROP_MOBILE_X = 0.4;
const IMPACT_P = 2.6;

const mistVertex = /* glsl */ `
attribute vec4 aSeed;
uniform float uM;
uniform float uTime;
uniform vec3 uOrigin;
uniform float uPx;
varying float vA;
varying float vAge;
void main() {
  float birth = aSeed.x * 0.55;
  float a = (uM - birth) / 0.55;
  vAge = a;
  if (a <= 0.0 || a >= 1.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vA = 0.0;
    return;
  }
  float ang = aSeed.y * 6.2832 + a * (1.4 + aSeed.w * 2.2) + uTime * 0.15 * (aSeed.w - 0.5);
  float rad = 0.012 + a * a * (0.35 + aSeed.z * 1.3);
  vec3 p = uOrigin;
  p.y += pow(a, 1.15) * (1.2 + aSeed.z * 1.1);
  p.x += cos(ang) * rad + sin(a * 3.0 + aSeed.y * 9.0) * 0.06 * a;
  p.z += sin(ang) * rad * 0.8 - a * a * (1.2 + aSeed.w * 2.4);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = 0.014 + a * a * (0.16 + aSeed.w * 0.22);
  gl_PointSize = clamp(size * uPx / -mv.z, 1.0, 200.0);
  vA = smoothstep(0.0, 0.05, a) * (1.0 - smoothstep(0.55, 1.5, a)) * (0.5 + 0.5 * aSeed.z);
}`;

// condensation: a little of the mist gathers into the drop
const gatherVertex = /* glsl */ `
attribute vec4 aSeed;
uniform float uG;
uniform vec3 uDrop;
uniform float uPx;
varying float vA;
varying float vAge;
void main() {
  vec3 dir = normalize(aSeed.xyz - 0.5);
  float f = smoothstep(0.0, 1.0, uG);
  vec3 p = uDrop + dir * (0.03 + aSeed.w * 0.22) * (1.0 - f) + vec3(0.0, 0.06 * (1.0 - f), 0.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp((0.02 + 0.05 * aSeed.w) * (1.0 - 0.6 * f) * uPx / -mv.z, 1.0, 80.0);
  vA = smoothstep(0.0, 0.25, uG) * (1.0 - smoothstep(0.7, 1.0, uG));
  vAge = 0.9;
}`;

const mistFragment = /* glsl */ `
uniform vec3 uColA;
uniform vec3 uColB;
varying float vA;
varying float vAge;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d) * 4.0;
  float g = exp(-r2 * 3.0) * (1.0 - smoothstep(0.7, 1.0, r2));
  vec3 c = mix(uColA, uColB, smoothstep(0.0, 0.9, vAge));
  float a = g * vA * mix(0.9, 0.4, smoothstep(0.0, 1.0, vAge));
  if (a < 0.003) discard;
  gl_FragColor = vec4(c, a);
}`;

function points(count, vertexShader, uniforms) {
  const geo = new THREE.BufferGeometry();
  const seeds = new Float32Array(count * 4);
  for (let i = 0; i < seeds.length; i++) seeds[i] = hash(i * 1.37 + 9.1);
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4));
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uColA: { value: new THREE.Color('#a90f2c') },
      uColB: { value: new THREE.Color('#f3b6c2') },
      ...uniforms,
    },
    vertexShader,
    fragmentShader: mistFragment,
    transparent: true,
    depthWrite: false,
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  pts.renderOrder = 3;
  return pts;
}

function buildShowroom({ studioEnv }) {
  const scene = new THREE.Scene();
  const horizon = new THREE.Color('#e7cfd0');
  scene.background = horizon.clone();
  scene.fog = new THREE.Fog(horizon, 6, 15);
  scene.environment = studioEnv;
  scene.environmentIntensity = 0.55;

  // soft cyclorama: warm ivory above, blush at the horizon
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(40, 32, 16),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: { uTop: { value: new THREE.Color('#f8eeec') }, uHorizon: { value: horizon } },
      vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform vec3 uTop, uHorizon; varying vec3 vDir; void main(){ gl_FragColor = vec4(mix(uHorizon, uTop, smoothstep(0.0, 0.45, vDir.y)), 1.0); }',
    }),
  );
  scene.add(sky);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(30, 64),
    new THREE.MeshStandardMaterial({ color: '#e9d3d2', roughness: 0.92 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const porcelain = new THREE.MeshPhysicalMaterial({ color: '#f3e3e0', roughness: 0.34, clearcoat: 0.6, clearcoatRoughness: 0.25 });
  const gold = new THREE.MeshPhysicalMaterial({ color: '#efc07a', metalness: 1, roughness: 0.18, envMapIntensity: 1.2 });
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.44, 0.62, 96), porcelain);
  plinth.position.y = 0.31;
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.53, 0.035, 96), porcelain);
  base.position.y = 0.0175;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.421, 0.005, 12, 160), gold);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.6;
  for (const o of [plinth, base]) {
    o.castShadow = true;
    o.receiveShadow = true;
  }
  scene.add(plinth, base, ring);

  scene.add(new THREE.HemisphereLight('#fff4f0', '#c9a3a6', 0.9));
  const key = new THREE.DirectionalLight('#fff1ea', 2.1);
  key.position.set(-2.2, 4.2, 2.6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -1.5, right: 1.5, top: 2, bottom: -1, near: 0.5, far: 10 });
  key.shadow.radius = 8;
  key.shadow.blurSamples = 16;
  key.shadow.bias = -0.0004;
  const rim = new THREE.DirectionalLight('#ffd6de', 1.3);
  rim.position.set(2.6, 2.2, -3);
  const fill = new THREE.DirectionalLight('#f7dcd2', 0.35);
  fill.position.set(2.5, 0.8, 2.5);
  scene.add(key, rim, fill);

  return { scene, top: 0.62 };
}

export async function createChapters(ctx) {
  const { scene, camera, flowerRoot, bottle, backdrop, envMap, isMobile } = ctx;

  // --- mist
  const mist = points(isMobile() ? 900 : 1800, mistVertex, {
    uM: { value: 0 },
    uTime: { value: 0 },
    uOrigin: { value: new THREE.Vector3() },
    uPx: { value: 1 },
  });
  const gather = points(60, gatherVertex, {
    uG: { value: 0 },
    uDrop: { value: DROP.clone() },
    uPx: { value: 1 },
  });
  scene.add(mist, gather);

  // --- the water drop
  const dropMat = new THREE.MeshPhysicalMaterial({
    color: '#ffffff', roughness: 0, metalness: 0, transmission: 1, ior: 1.33, thickness: 0.05,
    specularIntensity: 1, envMapIntensity: 1.8, clearcoat: 1, clearcoatRoughness: 0,
  });
  dropMat.envMap = envMap;
  const drop = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), dropMat);
  drop.visible = false;
  drop.renderOrder = 2;
  scene.add(drop);
  // a clear drop disappears against the petals; a thin bright rim and a glint keep it readable
  const rimMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.2); float g = pow(max(dot(vN, normalize(vV + vec3(-0.4, 0.6, 0.2))), 0.0), 60.0); gl_FragColor = vec4(vec3(1.0, 0.97, 0.98) * (f * 0.85 + g * 1.6), 1.0); }',
  });
  const rimShell = new THREE.Mesh(drop.geometry, rimMat);
  rimShell.renderOrder = 3;
  drop.add(rimShell);
  const splash = createSplash({ count: 18, size: 0.006, speed: 0.75, envMap });
  scene.add(splash.mesh);
  const impact = new THREE.Vector3(DROP.x, 0, DROP.z);
  const dropAt = DROP.clone();

  // --- showroom
  const show = buildShowroom(ctx);
  const showBottle = await ctx.makeProduct();
  showBottle.setReveal(1);
  showBottle.inner.position.y = 0;
  showBottle.group.position.y = show.top;
  show.scene.add(showBottle.group);
  const showCam = new THREE.PerspectiveCamera(30, 16 / 9, 0.05, 100);

  const bodyBox = new THREE.Box3();
  const origin = new THREE.Vector3();
  const ndc = new THREE.Vector3();
  const center = new THREE.Vector2();
  let aspect = 16 / 9;

  function update(p, t, cam) {
    // --- the bottle leaves the flower
    const L = easeInOut(range(0.05, 1.0, p));
    const E = easeInOut(range(0.8, 1.45, p));
    const F = range(1.75, 2.35, p);
    bottle.group.position.y = 0.55 * L + 2.6 * F * F;
    bottle.group.rotation.y = 0.9 * L + 0.8 * F;
    bottle.setExplode(E + 0.35 * F);
    bottle.group.visible = bottle.group.visible && F < 0.999;

    // --- mist from the opened neck
    const m = range(1.05, 2.3, p) * 1.4;
    bottle.group.updateMatrixWorld(true);
    bodyBox.setFromObject(bottle.parts.Body.mesh);
    bodyBox.getCenter(origin);
    origin.y = bodyBox.max.y - 0.005;
    mist.material.uniforms.uM.value = m;
    mist.material.uniforms.uTime.value = t;
    mist.material.uniforms.uOrigin.value.copy(origin);
    mist.visible = m > 0 && m < 1.85;
    const tint = 0.85 * smooth(range(0.25, 1.1, m));
    backdrop.uniforms.uSkyTint.value.set(1.13, 0.8, 0.88, tint);

    // --- one drop of water condenses and falls
    const form = range(2.0, 2.27, p);
    const fall = range(2.27, IMPACT_P, p);
    gather.material.uniforms.uG.value = form;
    gather.visible = form > 0 && form < 1;
    dropAt.x = isMobile() ? DROP_MOBILE_X : DROP.x;
    impact.x = dropAt.x;
    gather.material.uniforms.uDrop.value.copy(dropAt);
    const r = (isMobile() ? 0.05 : 0.04) * easeOut(form);
    drop.visible = form > 0 && fall < 1;
    if (drop.visible) {
      const y = DROP.y * (1 - fall * fall) + (1 - form) * 0.04;
      const stretch = 1 + 0.45 * fall;
      drop.position.set(dropAt.x, Math.max(y, r), dropAt.z);
      drop.scale.set(r / Math.sqrt(stretch), r * stretch, r / Math.sqrt(stretch));
    }
    const age = (p - IMPACT_P) * 4;
    splash.update(impact, age, 1);
    backdrop.uniforms.uSplash.value.set(impact.x, impact.z, Math.max(age, 0), age > 0 && age < 9 ? 1.4 : 0);

    // --- camera: follow the bottle up, rise into the clouds, come back down to the water
    const c1 = easeInOut(range(0.0, 1.0, p));
    const c2 = easeInOut(range(1.0, 1.9, p));
    const c3 = easeInOut(range(1.95, 2.45, p));
    const c4 = easeInOut(range(2.6, 3.4, p));
    const lift = lerp(0.42 * c1 + 0.5 * c2, 0, c3);
    cam.pos.y += lift;
    cam.look.y += lift - 0.14 * c3;
    cam.pos.z *= 1 + (0.1 * c1 + 0.08 * c2) * (1 - c3) - 0.1 * c4;
    cam.pos.x += impact.x * 0.25 * c4;
    cam.look.x += impact.x * 0.4 * c4;
    cam.look.y -= 0.05 * c4;

    // --- showroom
    const rA = easeOut(range(3.05, 3.7, p));
    showBottle.setExplode(1 - rA);
    showBottle.group.position.y = show.top + 0.12 * (1 - rA);
    showBottle.group.rotation.y = t * 0.22 + 1.2 * (1 - rA);
    const mobile = isMobile();
    const dist = mobile ? 4.6 : 4.0;
    const panX = mobile ? 0 : -0.62;
    const sway = Math.sin(t * 0.13) * 0.05;
    showCam.position.set(panX + sway, mobile ? 0.98 : 1.02, dist * (0.9 + 0.1 * rA));
    showCam.lookAt(panX, mobile ? 0.6 : 0.86, 0);

    // --- the ring opens onto the showroom
    camera.position.copy(cam.pos);
    camera.lookAt(cam.look);
    camera.updateMatrixWorld();
    ndc.copy(impact).project(camera);
    center.set(ndc.x * 0.5 + 0.5, ndc.y * 0.5 + 0.5);
    const far = Math.max(
      Math.hypot(center.x * aspect, center.y), Math.hypot((1 - center.x) * aspect, center.y),
      Math.hypot(center.x * aspect, 1 - center.y), Math.hypot((1 - center.x) * aspect, 1 - center.y),
    );
    const w = range(3.0, 3.65, p);
    const radius = (far + 0.06) * w * w;
    return { k: w <= 0 ? 0 : w >= 1 ? 1 : 0.5, center, radius };
  }

  function resize(w, h) {
    aspect = w / h;
    showCam.aspect = aspect;
    showCam.updateProjectionMatrix();
    const px = (h * Math.min(window.devicePixelRatio, 1.75)) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    mist.material.uniforms.uPx.value = px;
    gather.material.uniforms.uPx.value = px;
  }

  return {
    length: 4,
    mode: 0,
    alt: { scene: show.scene, camera: showCam },
    nav: [0, 1.35, 4],
    card: 3.8,
    captions: [
      { from: -1, to: 0.55, eyebrow: 'Capítulo uno', title: 'La flor', text: 'Nace del agua y se abre al cielo.' },
      { from: 0.85, to: 1.9, eyebrow: 'Capítulo dos', title: 'La esencia', text: 'El frasco se abre y su perfume se vuelve nube.' },
      { from: 2.05, to: 2.95, eyebrow: 'Capítulo tres', title: 'La gota', text: 'De la bruma nace una sola gota de agua, que vuelve a la superficie.' },
    ],
    update,
    resize,
  };
}
