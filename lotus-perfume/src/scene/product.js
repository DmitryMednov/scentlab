import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { rubyMaterial } from './bottle.js';

// Modelled perfume bottles (?producto=...) that replace the procedural one.
// Each is normalised to the procedural bottle's size (y = 0 at its base,
// centred on the stem) so the flower and the reveal timing stay the same.
const HEIGHT = 0.733;

// Studio-lit materials: real refraction through ruby glass (the flower shows
// through it), a dispersive gem cap and polished gold.
function blenderMaterials(envMap) {
  const body = rubyMaterial(envMap, '#b0021a', [0.25, 0.24], {
    env: 1.7, coat: 1, flat: false, glowScale: 0.25,
    glass: {
      color: '#ffe1e5', roughness: 0.01, ior: 1.57, transmission: 1, thickness: 0.34,
      attenuationColor: '#b8061c', attenuationDistance: 0.11,
    },
  });
  const cap = rubyMaterial(envMap, '#b8061c', [0.14, 0.66], {
    env: 1.6, coat: 1, flat: false, glowScale: 0.45,
    glass: {
      color: '#ffe1e5', roughness: 0.0, ior: 1.77, transmission: 1, thickness: 0.2, dispersion: 0.4,
      attenuationColor: '#d00c26', attenuationDistance: 0.1,
    },
  });
  const gold = new THREE.MeshPhysicalMaterial({
    color: '#efc07a', metalness: 1, roughness: 0.14, envMapIntensity: 1.35,
    clearcoat: 0.3, clearcoatRoughness: 0.08,
  });
  if (envMap) gold.envMap = envMap;
  return { Body: body, Cap: cap, Neck: gold, Collar: gold };
}

async function loadBlender(envMap) {
  const root = await new OBJLoader().loadAsync(`${import.meta.env.BASE_URL}models/bottle_blender_v1.obj`);
  const mats = blenderMaterials(envMap);
  // turn the studio so a softbox rakes the right shoulder and the gem table
  for (const m of new Set(Object.values(mats))) m.envMapRotation.set(0, Math.PI / 2, 0);
  root.traverse((o) => {
    if (!o.isMesh) return;
    o.material = mats[o.name] || mats.Body;
    o.castShadow = true;
  });
  return root;
}

function normalise(model) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const k = HEIGHT / size.y;
  model.scale.setScalar(k);
  const c = box.getCenter(new THREE.Vector3());
  model.position.set(-c.x * k, -box.min.y * k, -c.z * k);
}

const LOADERS = { blender: loadBlender };

// exploded view (world units at full reveal): the gold collar, neck and cap lift
// off the body in a column, each turned a little, like a product cut-away
const EXPLODE = { Collar: [0.07, 0.5], Neck: [0.14, -0.7], Cap: [0.27, 1.1] };

// the intro takes the cap off (world units at full reveal): first straight up,
// enough to clear the pump that springs out of the collar, then aside to the
// left and down a little, where it waits beside the neck
const CAP_LIFT = 0.14;
const CAP_ASIDE = 0.3;
const CAP_DROP = 0.11;

// The spray pump under the cap: a polished gold actuator with a small dark
// orifice on its side, on a short stem. Built in the reveal group's units (base
// of the bottle at y = 0). With the cap on it sits sunk in the collar, hidden;
// it rises as the cap comes off. `nozzle` marks the orifice, +z pointing out.
const PUMP = { y: 0.5406, sunk: 0.116, travel: 0.016, r: 0.062, h: 0.1, holeY: 0.058, angle: 1.0 };

function createPump(gold) {
  const pump = new THREE.Group();
  pump.name = 'pump';
  const { r, h } = PUMP;
  const profile = [
    [0, 0], [r - 0.003, 0], [r, 0.004], [r, h - 0.009], [r - 0.004, h - 0.002], [r - 0.012, h], [0, h],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const head = new THREE.Mesh(new THREE.LatheGeometry(profile, 48), gold);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.034, 20), gold);
  stem.position.y = -0.015;
  pump.add(head, stem);

  const nozzle = new THREE.Object3D();
  nozzle.position.set(Math.sin(PUMP.angle) * r, PUMP.holeY, Math.cos(PUMP.angle) * r);
  nozzle.rotation.y = PUMP.angle;
  const hole = new THREE.Mesh(
    new THREE.CircleGeometry(0.0105, 28),
    new THREE.MeshStandardMaterial({ color: '#120805', roughness: 0.55, metalness: 0.3 }),
  );
  hole.position.z = 0.0006;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.0118, 0.002, 8, 32), gold);
  rim.position.z = 0.0002;
  nozzle.add(hole, rim);
  pump.add(nozzle);
  pump.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });
  return { pump, nozzle };
}

export async function createProduct({ variant, envMap }) {
  const load = LOADERS[variant];
  if (!load) throw new Error(`unknown product variant: ${variant}`);
  const model = await load(envMap);
  normalise(model);

  const group = new THREE.Group();
  group.name = `product-${variant}`;
  const inner = new THREE.Group(); // scaled/raised by the reveal
  inner.add(model);
  group.add(inner);

  // 0 = hidden inside the bud, 1 = standing in the open flower (same as the procedural bottle)
  // rise: how far it has come up out of the petals (defaults to k)
  function setReveal(k, rise = k) {
    group.visible = k > 0.001;
    inner.scale.setScalar(0.3 + 0.7 * k);
    inner.position.y = 0.04 + 0.18 * rise;
  }
  setReveal(0);

  const parts = {};
  model.traverse((o) => {
    if (o.isMesh) parts[o.name] = { mesh: o, x: o.position.x, y: o.position.y };
  });
  const gold = parts.Neck?.mesh.material;
  const { pump, nozzle } = gold ? createPump(gold) : {};
  if (pump) inner.add(pump);

  // the exploded view and the intro's cap lift add up, so either can run alone
  let explode = 0;
  let capOff = 0;
  let press = 0;
  let capUp = 0;
  let capX = 0;
  let capY = 0;
  function apply() {
    // first half of capOff: straight up; second half: aside, then down beside the neck
    const k = (x) => x * x * (3 - 2 * x);
    const side = Math.max(0, capOff * 2 - 1);
    capUp = k(Math.min(1, capOff * 2));
    capX = -CAP_ASIDE * k(Math.min(1, side / 0.8));
    capY = CAP_LIFT * capUp - CAP_DROP * k(Math.max(0, (side - 0.6) / 0.4));
    for (const [name, [lift, turn]] of Object.entries(EXPLODE)) {
      const part = parts[name];
      if (!part) continue;
      const cap = name === 'Cap' ? capOff : 0;
      part.mesh.position.y = part.y + (lift * explode + (name === 'Cap' ? capY : 0)) / model.scale.y;
      part.mesh.position.x = part.x + (name === 'Cap' ? capX : 0) / model.scale.x;
      part.mesh.rotation.y = turn * explode + 0.6 * cap;
    }
    if (!pump) return;
    // the pump's top never passes the cap's rim while it springs up
    const up = Math.min(1, (CAP_LIFT * capUp) / (PUMP.sunk + 0.005));
    pump.visible = capOff > 0.001 && explode < 0.001;
    pump.position.y = PUMP.y - PUMP.sunk * (1 - up) - PUMP.travel * press;
  }
  function setExplode(e) {
    explode = e;
    apply();
  }
  // 0 = cap on, 1 = lifted off the neck (world units at full reveal)
  function setCapOff(k) {
    capOff = k;
    apply();
  }

  // 0 = actuator up, 1 = pressed all the way down
  function setPress(k) {
    press = k;
    apply();
  }
  apply();

  return { group, inner, model, parts, nozzle, setReveal, setExplode, setCapOff, setPress };
}
