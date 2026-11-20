import * as THREE from 'three';
import { range, easeOut, easeInOut, lerp, hash, createSplash, CAUSTIC_GLSL } from './fx.js';
import { createBubbles } from './bubbles.js';
import { buildSeabed } from './seabed.js';

// AGUA: the bottle tips out of the lotus and drops into the water; the camera
// chases it all the way: it dives in right behind the bottle and keeps it in
// frame while it brakes, drifts and sinks through light shafts and bubbles to a
// stone plinth: an underwater showroom.
//
// The intro leaves the bottle hovering ctx.hover above the flower (it rose, opened
// and misted); the story picks it up from that height.
//
// Progress p (chapters):
//   0–0.22    the bottle lifts out of the flower; the camera closes in
//   0.22–~0.59 it arcs out over the petals and plunges (splash); the camera follows
//   ~0.59–    the camera dives in behind it (the water line sweeps the frame)
//   ...–2.6   the bottle brakes, rights itself and sinks; 2.4–3 rest on the plinth
//
// The underwater scene is a separate scene (uw): its coordinates are the main
// ones shifted by D, so the plunge point lands at ENTRY_UW and the plinth sits at
// the origin there. The bottle and the camera follow one path in main
// coordinates; the underwater copies just add D.

const LAND = new THREE.Vector2(0.6, 1.6); // horizontal reach of the arc (x, z)
const LIFT = 0.38;
const UP = 0.95; // initial climb of the arc, enough to clear the petals
const SINK = 0.9; // how far below the surface the arc ends (clipped there)
const PLINTH_TOP = -1.85;
const FLOOR = -2.25;

const ENTRY_UW = new THREE.Vector3(0.35, 0, -0.35); // where the plunge lands in the uw scene
const DRAG_H = 9; // water brakes the sideways motion fast...
const DRAG_V = 6; // ...and the dive a bit slower
const LAG = 0.05; // the camera trails the bottle by this much progress

const FOG = new THREE.Color('#906078');
const DENSITY = 0.12;

function shaderSurface(uniforms, fragmentShader, opts = {}) {
  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: 'varying vec3 vW; varying vec2 vUv; void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader,
    fog: false,
    ...opts,
  });
}

const DOME_FRAG = 'uniform vec3 uDeep, uMid, uTop; varying vec3 vW; void main(){ vec3 d = normalize(vW - cameraPosition); vec3 c = mix(uDeep, uMid, smoothstep(-0.7, 0.05, d.y)); c = mix(c, uTop, smoothstep(0.05, 0.75, d.y)); gl_FragColor = vec4(c, 1.0); }';
const domeUniforms = () => ({ uDeep: { value: new THREE.Color('#3b1a2d') }, uMid: { value: FOG }, uTop: { value: new THREE.Color('#ecc4cf') } });
// where the sun glares through the surface: up and ahead, above the arch
const GLARE = new THREE.Vector3(0, 0.24, -1).normalize();

// Reflections for the seabed (shell, wet stone): the same depth gradient with
// a bright patch of surface overhead, prefiltered once
function underwaterEnvironment(renderer) {
  const env = new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), shaderSurface(domeUniforms(), DOME_FRAG, { side: THREE.BackSide, depthWrite: false })));
  const glow = new THREE.Mesh(new THREE.CircleGeometry(4, 32), new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffe6ea').multiplyScalar(1.6) }));
  glow.position.set(0, 6, -3);
  glow.lookAt(0, 0, 0);
  env.add(glow);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromScene(env, 0.02);
  pmrem.dispose();
  return rt.texture;
}

function buildUnderwater({ isMobile, renderer, lowGpu }) {
  const scene = new THREE.Scene();
  scene.background = FOG.clone();
  scene.fog = new THREE.FogExp2(FOG, DENSITY);
  scene.environment = underwaterEnvironment(renderer);
  scene.environmentIntensity = 0.42;
  const time = { value: 0 };

  // depth gradient: light coming down from the surface, plum in the deep
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(30, 32, 16),
    shaderSurface(domeUniforms(), DOME_FRAG, { side: THREE.BackSide, depthWrite: false }),
  );
  scene.add(dome);

  // the surface seen from below: rippled, bright through Snell's window, a
  // mirror of the deep outside it, with the sun's glare broken up by the waves
  const surface = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    shaderSurface(
      {
        uTime: time, uBright: { value: new THREE.Color('#f7d6dc') }, uFog: { value: FOG }, uDeep: { value: new THREE.Color('#5a2a44') },
        uDensity: { value: DENSITY }, uGlare: { value: GLARE },
      },
      `uniform float uTime; uniform vec3 uBright, uFog, uDeep, uGlare; uniform float uDensity; varying vec3 vW;
       ${CAUSTIC_GLSL}
       void main(){
         vec3 d = normalize(vW - cameraPosition);
         vec2 q = vW.xz;
         float t = uTime;
         // wave slopes
         vec2 g = vec2(
           sin(q.x * 2.3 + q.y * 0.9 + t * 0.9) + 0.5 * sin(q.x * 5.1 - q.y * 3.7 + t * 1.4) + 0.25 * sin(q.x * 11.0 + q.y * 7.0 - t * 2.1),
           cos(q.y * 2.0 - q.x * 1.1 + t * 0.8) + 0.5 * cos(q.y * 4.7 + q.x * 3.3 - t * 1.2) + 0.25 * cos(q.y * 12.0 - q.x * 6.0 + t * 1.8));
         float c = caustic(q * 1.4 + g * 0.08 - 250.0, t * 0.6);
         float up = d.y + 0.06 * (g.x * d.x + g.y * d.z);
         float win = smoothstep(0.55, 0.85, up);
         vec3 mirror = mix(uDeep, uFog, 0.6) * (0.75 + 0.5 * c) + uBright * 0.45 * c * c;
         vec3 sky = uBright * (0.95 + 0.6 * c);
         vec3 col = mix(mirror, sky, win);
         float f = 1.0 - exp(-pow(uDensity * 0.95 * length(vW - cameraPosition), 2.0));
         col = mix(col, uFog, f);
         float gl = max(dot(normalize(d + vec3(g.x, 0.0, g.y) * 0.04), uGlare), 0.0);
         col += uBright * (pow(gl, 70.0) * (2.4 + 2.0 * c) + pow(gl, 14.0) * 0.35) * (1.0 - 0.5 * f);
         gl_FragColor = vec4(col, 1.0);
       }`,
      { side: THREE.DoubleSide },
    ),
  );
  surface.rotation.x = Math.PI / 2;
  scene.add(surface);

  // the seabed: stepped stone floor, pedestal, arch, boulders, coral, shell
  buildSeabed(scene, { time, floor: FLOOR, plinthTop: PLINTH_TOP, mobile: isMobile(), renderer, texSize: lowGpu ? 512 : 1024 });

  // light shafts from the surface: soft streaked beams that always turn to face
  // the camera around their own axis, fading out before they reach the floor
  const shaftMat = (seed) =>
    new THREE.ShaderMaterial({
      uniforms: { uTime: time, uSeed: { value: seed }, uColor: { value: new THREE.Color('#ffe2e8') }, uDensity: { value: DENSITY } },
      vertexShader: `uniform float uDensity; varying vec2 vUv; varying float vFade;
        void main(){
          vUv = uv;
          vec3 c = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
          vec3 ax = (modelMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz;
          vec3 side = normalize(cross(normalize(ax), cameraPosition - c));
          float sx = length((modelMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz);
          vec3 w = c + side * position.x * sx + ax * position.y;
          float dist = length(w - cameraPosition);
          vFade = exp(-pow(uDensity * 0.7 * dist, 2.0));
          gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
        }`,
      fragmentShader: `uniform float uTime; uniform float uSeed; uniform vec3 uColor; varying vec2 vUv; varying float vFade;
        void main(){
          float x = vUv.x * 2.0 - 1.0;
          float core = exp(-x * x * 3.5);
          float streak = 0.62 + 0.38 * sin(vUv.x * 9.0 + uSeed * 40.0 + uTime * 0.25) * sin(vUv.x * 23.0 - uTime * 0.4 + uSeed * 13.0);
          float along = smoothstep(0.45, 0.97, vUv.y);
          float pulse = 0.6 + 0.4 * sin(uTime * 0.5 + uSeed * 6.283);
          gl_FragColor = vec4(uColor * core * streak * along * pulse * vFade * 0.26, 1.0);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      fog: false,
    });
  for (let i = 0; i < 11; i++) {
    const w = 0.3 + hash(i + 40) * 0.7;
    const shaft = new THREE.Mesh(new THREE.PlaneGeometry(w, 5), shaftMat(hash(i + 60)));
    shaft.frustumCulled = false;
    // most of them fall through the arch, behind the pedestal, fanning out
    // from the glare above it
    const x = -2.4 + i * 0.48 + hash(i + 70) * 0.3;
    shaft.position.set(x, -2.3, -0.9 - hash(i + 80) * 3);
    shaft.rotation.z = x * 0.08;
    scene.add(shaft);
  }

  // ambient bubbles: streams from vents in the sand, and strays
  const ambient = createBubbles('ambient', {
    count: isMobile() ? 110 : 190,
    fog: FOG,
    density: DENSITY,
    extra: {
      uFloor: { value: FLOOR },
      // streams rising along the inside of the arch
      uVents: { value: [new THREE.Vector4(-1.2, 0, -1.25, 0), new THREE.Vector4(1.22, 0, -1.3, 0), new THREE.Vector4(-0.45, 0, -2.6, 0), new THREE.Vector4(1.55, 0, -0.1, 0)] },
    },
  });
  scene.add(ambient.mesh);

  scene.add(new THREE.HemisphereLight('#f7d6dc', '#4a2234', 1.05));
  // the sun carries the caustics (see stoneMaterial in seabed.js)
  const sun = new THREE.DirectionalLight('#ffe6de', 2.5);
  sun.position.set(0.9, 6, 1.6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -1.9, right: 1.9, top: 1.9, bottom: -1.9, near: 2, far: 10 });
  sun.shadow.radius = 6;
  sun.shadow.blurSamples = 12;
  scene.add(sun);
  // warm fill from the viewer's side, so the pedestal and the arch read as sandstone
  const fill = new THREE.DirectionalLight('#ffd8cc', 0.75);
  fill.position.set(0.6, 1.2, 4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight('#ffc9d5', 1);
  rim.position.set(-2.5, 1.5, -3);
  scene.add(rim);

  return { scene, time, ambient, lights: { hemi: scene.children.find((o) => o.isHemisphereLight), sun, fill, rim } };
}

// Showroom controls (see src/showroom): set from outside, read every frame here.
// yaw: extra turn of the bottle on the plinth; zoom: 0 = whole scene, 1 = close on
// the collar at focusY; still: 1 stops the idle sway; offset/scale move the bottle
// (size choice, the swap through the arch); pan lowers the view so the bottle
// sits higher in the frame (phone panels).
function showroomControls() {
  return { yaw: 0, zoom: 0, focusY: PLINTH_TOP + 0.5, still: 0, pan: 0, offset: new THREE.Vector3(), scale: 1, baseYaw: 0, rest: 0 };
}

export async function createChapters(ctx) {
  const { scene, flowerRoot, bottle, backdrop, envMap, isMobile, view } = ctx;
  const hover = ctx.hover ?? 0; // carried by bottle.inner, so the group offset leaves it out

  // the main bottle disappears under the surface as it goes in
  const surfaceClip = [new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)];
  bottle.group.traverse((o) => {
    if (o.isMesh) o.material.clippingPlanes = surfaceClip;
  });

  const splash = createSplash({ count: 30, size: 0.006, speed: 0.75, envMap });
  scene.add(splash.mesh);

  const uw = buildUnderwater(ctx);
  const deep = await ctx.makeProduct();
  deep.setReveal(1);
  deep.inner.position.y = 0;
  uw.scene.add(deep.group);
  const uwCam = new THREE.PerspectiveCamera(30, 16 / 9, 0.05, 100);
  const ctrl = showroomControls();

  // scene light per perfume: the haze, the sky dome and the lights lean toward a
  // tint (k = 0 is the original pink water)
  const mood0 = {
    fog: FOG.clone(),
    hemi: uw.lights.hemi.color.clone(),
    hemiG: uw.lights.hemi.groundColor.clone(),
    sun: uw.lights.sun.color.clone(),
    fill: uw.lights.fill.color.clone(),
    rim: uw.lights.rim.color.clone(),
  };
  function setMood(tint, k) {
    FOG.copy(mood0.fog).lerp(tint, 0.3 * k);
    uw.scene.fog.color.copy(FOG);
    uw.scene.background.copy(FOG);
    uw.lights.hemi.color.copy(mood0.hemi).lerp(tint, 0.22 * k);
    uw.lights.hemi.groundColor.copy(mood0.hemiG).lerp(tint, 0.3 * k);
    uw.lights.sun.color.copy(mood0.sun).lerp(tint, 0.12 * k);
    uw.lights.fill.color.copy(mood0.fill).lerp(tint, 0.25 * k);
    uw.lights.rim.color.copy(mood0.rim).lerp(tint, 0.6 * k);
  }

  // the air the bottle drags in, and a thin stream escaping it while it sinks
  const burst = createBubbles('burst', {
    count: isMobile() ? 170 : 280,
    fog: FOG,
    density: DENSITY,
    extra: {
      uP: { value: 0 },
      uPImp: { value: 1 },
      uEntry: { value: ENTRY_UW.clone() },
      uVel: { value: new THREE.Vector3() },
      uDive: { value: 1 },
      uDragH: { value: DRAG_H },
      uDragV: { value: DRAG_V },
    },
  });
  uw.scene.add(burst.mesh);
  const leak = createBubbles('leak', {
    count: isMobile() ? 36 : 56,
    fog: FOG,
    density: DENSITY,
    extra: { uEmit: { value: deep.inner.matrixWorld }, uLeak: { value: 0 } },
  });
  uw.scene.add(leak.mesh);

  // bottle base height (world) along the arc, k in 0..1
  const arc = (y0, k) => y0 + UP * k - (y0 + UP + SINK) * k * k;

  // --- the path, in main-scene coordinates. Fixed once the flower has landed.
  const reveal = 0.22; // inner lift from setReveal(1)
  const y0 = () => flowerRoot.position.y + reveal + LIFT;
  const A = () => y0() + UP + SINK;
  const kImp = () => (UP + Math.sqrt(UP * UP + 4 * A() * y0())) / (2 * A());
  const impact = new THREE.Vector3();
  const D = new THREE.Vector3(); // main -> underwater offset
  const vel = new THREE.Vector3(); // horizontal entry speed per chapter
  const rotImp = new THREE.Euler();
  let pImp = 0.6;
  let dive = 5; // vertical entry speed per chapter
  function frame() {
    const ki = kImp();
    pImp = 0.22 + 0.5 * ki;
    impact.set(LAND.x * ki, 0, LAND.y * ki);
    D.copy(ENTRY_UW).sub(impact);
    vel.set(LAND.x / 0.5, 0, LAND.y / 0.5);
    dive = -(UP - 2 * A() * ki) / 0.5;
    rotImp.set(0.55 * ki, 0.6 + 1.2 * ki, -1.05 * easeOut(ki));
  }

  // pose of the bottle base (world position + rotation) at progress p
  function pathAt(p, t, pos, rot) {
    if (p < 0.22) {
      const a = easeInOut(range(0, 0.22, Math.max(0, p)));
      // the intro's own lift (nestled, standing, hovering: reveal + hover once the
      // flourish is over) holds until the story takes the bottle up
      pos.set(0, flowerRoot.position.y + bottle.inner.position.y + (LIFT - hover) * a, 0);
      rot.set(0, 0.6 * a, 0);
      return;
    }
    if (p < pImp) {
      const k = range(0.22, 0.72, p);
      pos.set(LAND.x * k, arc(y0(), k), LAND.y * k);
      rot.set(0.55 * k, 0.6 + 1.2 * k, -1.05 * easeOut(k));
      return;
    }
    // in the water: it brakes, drifts on, then glides down onto the plinth
    const u = p - pImp;
    const h = (1 - Math.exp(-u * DRAG_H)) / DRAG_H;
    const v = (1 - Math.exp(-u * DRAG_V)) / DRAG_V;
    pos.set(impact.x + vel.x * h, -dive * v, impact.z + vel.z * h);
    const g = easeInOut(range(pImp + 0.12, 2.6, p));
    pos.x = lerp(pos.x, -D.x, g);
    pos.z = lerp(pos.z, -D.z, g);
    pos.y = lerp(pos.y, PLINTH_TOP, g);
    // keeps tumbling a little, then rights itself and turns slowly on the plinth
    const spin = 1.6 * v * DRAG_V;
    const up = easeInOut(range(pImp + 0.04, 2.45, p));
    const rest = easeInOut(range(2.3, 3.0, p));
    rot.set(
      lerp(rotImp.x + 0.25 * spin, 0, up),
      rotImp.y + 0.8 * spin + 1.6 * up + (0.3 * Math.sin(t * 0.25) * (1 - ctrl.still) + ctrl.yaw) * rest,
      lerp(rotImp.z - 0.35 * spin, 0, up),
    );
  }

  const pos = new THREE.Vector3();
  const lagPos = new THREE.Vector3();
  const rot = new THREE.Euler();
  const lagRot = new THREE.Euler();
  const quat = new THREE.Quaternion();
  const off = new THREE.Vector3();
  const chasePos = new THREE.Vector3();
  const chaseLook = new THREE.Vector3();
  const restPos = new THREE.Vector3();
  const restLook = new THREE.Vector3();

  function update(p, t, cam) {
    frame();

    // --- the bottle: main copy above water, deep copy below (same path + D)
    pathAt(p, t, pos, rot);
    quat.setFromEuler(rot);
    // the group pivots at the base: take the inner lift out along the tilt
    off.set(0, bottle.inner.position.y, 0).applyQuaternion(quat);
    bottle.group.position.copy(pos).sub(off).sub(flowerRoot.position);
    bottle.group.rotation.copy(rot);
    bottle.group.visible = bottle.group.visible && p < pImp + 0.45;

    ctrl.rest = easeInOut(range(2.3, 3.0, p));
    ctrl.baseYaw = rot.y - ctrl.yaw * ctrl.rest;
    deep.group.position.copy(pos).add(D).addScaledVector(ctrl.offset, ctrl.rest);
    deep.group.rotation.copy(rot);
    deep.group.scale.setScalar(lerp(1, ctrl.scale, ctrl.rest));
    deep.group.visible = p > pImp - 0.02;
    deep.group.updateMatrixWorld(true);

    const age = (p - pImp) * 3;
    splash.update(impact, age, 1);
    backdrop.uniforms.uSplash.value.set(impact.x, impact.z, Math.max(age, 0), age > 0 && age < 9 ? 1.7 : 0);

    // --- the chase camera: a little behind and above the bottle, trailing it by
    // LAG; right at the plunge it drops to the bottle's height so it slips under
    // the surface right behind it
    const fz = view.dist / 4;
    pathAt(p - LAG, t, lagPos, lagRot);
    const near = range(pImp - 0.12, pImp, p) * (1 - range(pImp + 0.15, 1.3, p));
    const dist = (2.15 + 0.6 * range(pImp + 0.2, 2.0, p)) * fz;
    const side = isMobile() ? 0.05 : 0.18;
    chasePos.set(lagPos.x + side * fz, lagPos.y + lerp(0.34, 0.06, near), lagPos.z + dist);
    chaseLook.copy(pos);
    chaseLook.y += 0.26;

    const w = easeInOut(range(0.1, 0.5, p));
    cam.pos.lerp(chasePos, w);
    cam.look.lerp(chaseLook, w);
    const camY = cam.pos.y;

    // --- under the surface: the same camera, shifted by D, easing into the
    // showroom framing once the bottle is down
    uw.time.value = t;
    const mobile = isMobile();
    const settle = easeInOut(range(2.1, 2.95, p));
    // centred, eye just above the pedestal top, so the arch frames the bottle
    // the showroom's zoom closes in on the collar
    const z = ctrl.zoom;
    const restDist = lerp(mobile ? 4.6 : 3.75, mobile ? 1.9 : 1.3, z);
    restPos.set(Math.sin(t * 0.11) * 0.04 * (1 - z), lerp(PLINTH_TOP + (mobile ? 0.55 : 0.42), ctrl.focusY + 0.05, z), restDist);
    restLook.set(0, lerp(PLINTH_TOP + (mobile ? 0.1 : 0.42), ctrl.focusY - (mobile ? 0.12 : 0), z), 0);
    restPos.y -= ctrl.pan;
    restLook.y -= ctrl.pan;
    uwCam.position.copy(cam.pos).add(D).lerp(restPos, settle);
    uwCam.lookAt(chaseLook.add(D).lerp(restLook, settle));
    // the view above the line must stay above the surface, or it shows the sky
    // dome from under the water plane (a flat pink band)
    if (cam.pos.y < 0.03) cam.pos.y = 0.03;

    // --- bubbles
    burst.uniforms.uTime.value = t;
    burst.uniforms.uP.value = p;
    burst.uniforms.uPImp.value = pImp;
    burst.uniforms.uEntry.value.copy(ENTRY_UW);
    burst.uniforms.uVel.value.copy(vel);
    burst.uniforms.uDive.value = dive;
    burst.mesh.visible = p > pImp && p < pImp + 2.2;
    leak.uniforms.uTime.value = t;
    leak.uniforms.uLeak.value = range(pImp + 0.05, pImp + 0.25, p) * (1 - range(2.35, 2.7, p));
    leak.mesh.visible = leak.uniforms.uLeak.value > 0;
    uw.ambient.uniforms.uTime.value = t;

    // --- the water line sweeps the frame as the camera dips through the surface
    const k = range(0.06, -0.06, camY);
    // glow: the underwater look (softer, wider bloom) eases in once below
    return { k: k <= 0 ? 0 : k >= 1 ? 1 : 0.5, line: -0.03 + 1.1 * easeInOut(k), glow: range(pImp + 0.15, pImp + 0.6, p) };
  }

  function resize(w, h) {
    uwCam.aspect = w / h;
    uwCam.updateProjectionMatrix();
  }

  return {
    length: 3,
    mode: 1,
    alt: { scene: uw.scene, camera: uwCam },
    showroom: { ctrl, deep, scene: uw.scene, camera: uwCam, plinthTop: PLINTH_TOP, floor: FLOOR, setMood },
    nav: [0, 1.6, 3],
    update,
    resize,
  };
}
