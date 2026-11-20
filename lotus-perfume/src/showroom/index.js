import * as THREE from 'three';
import { createSpray } from '../scene/spray.js';
import { PERFUME, SIZES, money } from './collection.js';
import './showroom.css';

// The showroom on the plinth, once the bottle has come to rest under the arch.
// White type on rose frosted glass,
// a Bodoni display serif for titles and numbers, Jost for small caps and copy.
//   bottom   an orbit around the plinth with a handle that turns the bottle
//   right    the perfume (name, a short description, the notes), quantity and buy;
//            two square zoom buttons at the bottom right
//   left     the size and the scent curve (longevity, intensity, trail)
//   spray    a small glass tile with a ruby bottle: each click presses the pump
//            once and lets the mist go (the cap lifts first and returns when idle)
//
// Everything is scaled by `act` (0 while the story is still running, 1 on the
// plinth), so scrolling back up hands the scene back to the story untouched.

const ON_AT = 2.92; // story progress where the showroom takes over
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const easeInOut = (x) => x * x * (3 - 2 * x);
// eases v toward target at `rate` per second
const approach = (v, target, rate, dt) => v + (target - v) * (1 - Math.exp(-rate * dt));
const toward = (v, target, step) => (v < target ? Math.min(target, v + step) : Math.max(target, v - step));
// one press of the pump: down, a short hold, back up (seconds)
const PRESS = 0.42;
const pressCurve = (d) => (d < 0 ? 0 : d < 0.09 ? easeInOut(d / 0.09) : d < 0.2 ? 1 : 1 - easeInOut(clamp01((d - 0.2) / 0.22)));
const CAP_TIME = 0.6; // seconds to lift the cap off (or set it back)
const CAP_IDLE = 2.2; // the cap goes back after this long without a press
const BURST = 1.7; // a burst of mist lives this long
// camera steps: below 0 pulls back to the whole arch, 1 is close on the collar
const ZOOMS = [-0.32, 0, 0.38, 0.72, 1];
const ZOOM_HOME = 1;
const TAU = Math.PI * 2;

const MOVE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 4v16M4 12h16"/><path d="M9.5 6.5 12 4l2.5 2.5M9.5 17.5 12 20l2.5-2.5M6.5 9.5 4 12l2.5 2.5M17.5 9.5 20 12l-2.5 2.5"/></svg>`;

// the ruby bottle in miniature for the spray tile: the cap and collar press
// down together, the mist leaves from the side
const MINI = `<svg class="lx-mini" viewBox="0 0 32 40" aria-hidden="true">
  <defs>
    <linearGradient id="lx-ruby" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e2384c"/><stop offset=".55" stop-color="#a50f24"/><stop offset="1" stop-color="#5e0613"/>
    </linearGradient>
    <linearGradient id="lx-gilt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#a8742c"/><stop offset=".45" stop-color="#f4d99c"/><stop offset="1" stop-color="#8f5f22"/>
    </linearGradient>
  </defs>
  <g class="lx-mini__mist" fill="#fff">
    <circle cx="24" cy="8" r="1.1"/><circle cx="27.5" cy="6" r=".9"/><circle cx="28" cy="10" r="1"/><circle cx="30.6" cy="7.8" r=".7"/>
  </g>
  <g class="lx-mini__cap">
    <path d="M11 3.5h10l3 3.8-8 3.9-8-3.9z" fill="url(#lx-ruby)"/>
    <path d="M11 3.5h10l-5 3.6z" fill="#fff" opacity=".28"/>
    <rect x="12" y="11.2" width="8" height="3.2" rx=".6" fill="url(#lx-gilt)"/>
  </g>
  <path d="M8.5 15.5h15l4.5 5v11.5l-4.5 5h-15l-4.5-5V20.5z" fill="url(#lx-ruby)"/>
  <path d="M8.5 15.5 16 21l7.5-5.5M16 21v16M4 20.5l12 .5 12-.5" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width=".8"/>
</svg>`;

// a plain bottle outline for the size picker; the chosen one is filled
const BOTTLE = `<svg viewBox="0 0 24 34" aria-hidden="true">
  <rect class="lx-glyph__cap" x="9" y="2" width="6" height="5" rx="1.2"/>
  <path class="lx-glyph__neck" d="M10.5 7h3v3h-3z"/>
  <rect class="lx-glyph__body" x="4" y="10" width="16" height="21" rx="5"/>
</svg>`;

// the wear curve over 12 hours: a quick bloom of top notes, a long heart that
// holds, then a soft fall that is nearly gone at `hours`; smoothed with Catmull-Rom
function wearCurve({ hours }, { x0, x1, top, base }) {
  const f = (h) => (1 - Math.exp(-h * 2.2)) * (0.76 + 0.24 * Math.exp(-h * 0.9)) / (1 + Math.exp((h - hours * 0.72) / 1.05));
  const n = 48;
  const raw = Array.from({ length: n + 1 }, (_, i) => f((i / n) * 12));
  const peak = Math.max(...raw);
  const X = (h) => x0 + (h / 12) * (x1 - x0);
  const Y = (v) => base - (v / peak) * (base - top);
  const pts = raw.map((v, i) => [X((i / n) * 12), Y(v)]);
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [pts[Math.max(0, i - 1)], pts[i], pts[i + 1], pts[Math.min(pts.length - 1, i + 2)]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1.map((v) => v.toFixed(1)).join(' ')} ${c2.map((v) => v.toFixed(1)).join(' ')} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  const at = (h) => [X(h), Y(f(h))];
  return { d, area: `${d}L${x1} ${base}L${x0} ${base}Z`, at, X };
}

// a white area under the curve, three dots for the phases, no grid
function chart(profile, id) {
  const box = { x0: 2, x1: 298, top: 24, base: 92 };
  const c = wearCurve(profile, box);
  const phases = [
    ['Top', 1, 'middle'],
    ['Heart', 3.4, 'middle'],
    ['Base', profile.hours * 0.92, 'middle'],
  ]
    .map(([name, h, anchor]) => {
      const [x, y] = c.at(h);
      return `<g class="lx-chart__phase"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6"/>
        <text x="${x.toFixed(1)}" y="${(y - 9).toFixed(1)}" text-anchor="${anchor}">${name}</text></g>`;
    })
    .join('');
  return `<svg class="lx-chart" viewBox="0 0 300 96" role="img" aria-label="Opens bright, holds through the heart and settles on the skin after about ${profile.hours} hours.">
    <defs>
      <linearGradient id="${id}-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".88"/><stop offset=".7" stop-color="#fff" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity=".08"/></linearGradient>
    </defs>
    <path class="lx-chart__area" d="${c.area}" fill="url(#${id}-area)"/>
    <path class="lx-chart__line" d="${c.d}" pathLength="1"/>
    <line class="lx-chart__base" x1="${box.x0}" y1="${box.base}" x2="${box.x1}" y2="${box.base}"/>
    ${phases}
  </svg>`;
}

function bar(value, label) {
  return `<div class="lx-bar">
    <p class="lx-bar__label">${label}<span class="sr-visually-hidden">: ${Math.round(value * 10)} out of 10</span></p>
    <span class="lx-bar__track" aria-hidden="true"><span class="lx-bar__fill" style="--v:${value}"></span></span>
  </div>`;
}

function curveCard(id, titleId) {
  const p = PERFUME.profile;
  return `<div class="lx-curve__head"><h3 class="lx-title" id="${titleId}">Longevity</h3>
    <p class="lx-curve__hours">${p.hours}<span>hours</span></p></div>
    ${chart(p, id)}
    <div class="lx-bars">${bar(p.intensity, 'Intensity')}${bar(p.trail, 'Trail')}</div>`;
}

function sizeButtons(cls) {
  return SIZES.map(
    (s, i) => `<button type="button" class="${cls}" data-size="${i}" aria-pressed="${i === 1}" aria-label="${s.ml} ml, ${money(s.price)}">
      <span class="lx-glyph" style="--h:${(0.62 + 0.38 * (s.ml / 100)).toFixed(2)}">${BOTTLE}</span><span class="lx-size__ml">${s.ml}<small>ml</small></span></button>`,
  ).join('');
}

// the last word in the serif italic, like the hero title's second line
function nameMarkup(name) {
  const cut = name.lastIndexOf(' ');
  return cut < 0 ? name : `${name.slice(0, cut)} <em>${name.slice(cut + 1)}</em>`;
}

function markup() {
  const notes = PERFUME.notes.map((n) => `<li><small>${n.tier}</small><span>${n.name}</span></li>`).join('');
  const pyramid = PERFUME.notes.map((n) => `<li><small>${n.tier}</small><span>${n.more}</span></li>`).join('');
  return `
  <div class="lx-left">
    <section class="lx-card lx-glass lx-size" aria-labelledby="lx-size-title">
      <h3 class="lx-title" id="lx-size-title">Size</h3>
      <div class="lx-size__row" role="group" aria-labelledby="lx-size-title">${sizeButtons('lx-size__btn')}</div>
    </section>
    <section class="lx-card lx-glass lx-curve" aria-labelledby="lxc-title">${curveCard('lxc', 'lxc-title')}</section>
  </div>

  <aside class="lx-info lx-glass" aria-labelledby="lx-name"><div class="lx-info__in">
    <p class="lx-title lx-info__no">No. ${PERFUME.no}</p>
    <h2 class="lx-info__name" id="lx-name">${nameMarkup(PERFUME.name)}</h2>
    <p class="lx-info__desc">${PERFUME.description}</p>
    <ul class="lx-notes" aria-label="Notes">${notes}</ul>
    <div class="lx-sizes-inline" role="group" aria-label="Size">${sizeButtons('lx-chip')}</div>
    <p class="lx-price"><span data-f="price"></span><small data-f="ml"></small></p>
    <div class="lx-buy__row">
      <div class="lx-qty" role="group" aria-label="Quantity">
        <button type="button" data-act="less" aria-label="One bottle less"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 8h8"/></svg></button>
        <output data-f="qty" aria-live="polite">1</output>
        <button type="button" data-act="more" aria-label="One bottle more"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 4v8M4 8h8"/></svg></button>
      </div>
      <button type="button" class="lx-add pill" data-act="buy"><span class="pill__label"><span class="lx-add__text">Add to bag</span></span><svg class="pill__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 12.5l9-9M5 3.5h7.5V11"/></svg></button>
    </div>
    <button type="button" class="lx-more" data-act="details" aria-expanded="false" aria-controls="lx-details">All notes</button>
    <div class="lx-details" id="lx-details">
      <ul class="lx-pyramid">${pyramid}</ul>
      <div class="lx-details__curve" aria-labelledby="lxm-title" role="group">${curveCard('lxm', 'lxm-title')}</div>
    </div>
  </div></aside>

  <div class="lx-orbit">
    <svg class="lx-orbit__ring" viewBox="0 0 560 96" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <!-- the far side of the orbit fades out behind the bottle, the near side stays lit -->
        <linearGradient id="lx-orbit-fade" gradientUnits="userSpaceOnUse" x1="0" y1="4" x2="0" y2="92">
          <stop offset="0" stop-color="#fff" stop-opacity="0"/>
          <stop offset="0.22" stop-color="#fff" stop-opacity="0.1"/>
          <stop offset="0.55" stop-color="#fff" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#fff" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <ellipse class="lx-orbit__line" cx="280" cy="48" rx="276" ry="44"/>
    </svg>
    <div class="lx-orbit__handle lx-glass" role="slider" tabindex="0" aria-label="Turn the bottle" aria-valuemin="0" aria-valuemax="359" aria-valuenow="0" aria-valuetext="Front">${MOVE_ICON}</div>
    <p class="lx-orbit__label" aria-hidden="true">Drag to rotate</p>
  </div>

  <button type="button" class="lx-spray lx-glass" data-act="spray" aria-label="Spray it">${MINI}<span class="lx-hint" aria-hidden="true">Spray it</span></button>

  <div class="lx-zoom" role="group" aria-label="Zoom">
    <button type="button" class="lx-glass" data-act="zoom-in" aria-label="Zoom in"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg><span class="lx-hint" aria-hidden="true">Zoom in</span></button>
    <button type="button" class="lx-glass" data-act="zoom-out" aria-label="Zoom out"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12"/></svg><span class="lx-hint" aria-hidden="true">Zoom out</span></button>
  </div>

  <p class="sr-visually-hidden" role="status" data-f="status"></p>`;
}

export function createShowroom({ ctrl, deep, scene, camera, plinthTop, isMobile }) {
  // --- the collar's height on the bottle at rest: the close-up looks at it
  deep.group.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(deep.inner.matrixWorld).invert();
  const collar = deep.parts.Collar?.mesh;
  const collarY = collar ? new THREE.Box3().setFromObject(collar).applyMatrix4(inv).getCenter(new THREE.Vector3()).y : 0.5;

  // three bursts of mist that take turns, so quick presses do not cut each other off
  const bursts = Array.from({ length: 3 }, () => {
    const s = createSpray({ count: isMobile() ? 220 : 340 });
    s.uniforms.uStrength.value = 1;
    s.uniforms.uColA.value.set(PERFUME.spray[0]);
    s.uniforms.uColB.value.set(PERFUME.spray[1]);
    scene.add(s.mesh);
    return { s, start: null };
  });
  let nextBurst = 0;

  // the ruby the showroom has always given the deep bottle
  for (const [part, mat] of Object.entries({ body: deep.parts.Body?.mesh.material, cap: deep.parts.Cap?.mesh.material })) {
    if (!mat) continue;
    const { gem } = PERFUME;
    const u = mat.userData.gem;
    u.uGlow.value.set(gem[part].glow);
    u.uFire.value.set(gem.fire);
    u.uTint.value.fromArray(gem.refl);
    mat.attenuationColor.set(gem[part].att);
    mat.specularColor.set(gem.spec);
    mat.color.set(gem.glass);
  }

  // --- DOM
  const root = document.createElement('section');
  root.className = 'sr';
  root.setAttribute('aria-label', 'The showroom');
  root.innerHTML = markup();
  root.inert = true;
  root.setAttribute('aria-hidden', 'true');
  document.body.append(root);
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => [...root.querySelectorAll(s)];
  const setText = (name, v) => $$(`[data-f="${name}"]`).forEach((n) => (n.textContent = v));
  const btn = (act) => $(`[data-act="${act}"]`);
  const canvas = document.querySelector('#scene');
  const bagLink = document.querySelector('.nav__bag');
  const badge = document.querySelector('.nav__badge');
  const handle = $('.lx-orbit__handle');
  const orbit = $('.lx-orbit');
  const sheet = $('.lx-info');

  // --- state
  const state = { size: 1, qty: 1, zoom: ZOOM_HOME, details: false, bag: 0 };
  const anim = {
    act: 0, zoom: 0, still: 0, scale: SIZES[1].scale, pan: 0,
    yawVel: 0, yawTarget: null, clock: 0,
    // the pump: cap 0..1 (lifted), queued presses, the running press, idle time
    cap: 0, capTarget: 0, queue: 0, press: null, idle: 0, presses: 0,
  };
  let on = false;
  let dragging = null;
  let addedTimer = 0;

  function renderCopy() {
    const s = SIZES[state.size];
    setText('price', money(s.price));
    setText('ml', `${s.ml} ml`);
    setText('qty', String(state.qty));
    $$('[data-size]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.size) === state.size)));
    btn('less').disabled = state.qty <= 1;
    btn('more').disabled = state.qty >= 9;
    btn('zoom-in').disabled = state.zoom >= ZOOMS.length - 1;
    btn('zoom-out').disabled = state.zoom <= 0;
    btn('details').setAttribute('aria-expanded', String(state.details));
    btn('details').textContent = state.details ? 'Fewer notes' : 'All notes';
    root.classList.toggle('is-details', state.details);
  }

  function addToBag() {
    const s = SIZES[state.size];
    state.bag += state.qty;
    if (badge) badge.textContent = String(state.bag);
    bagLink?.setAttribute('aria-label', `Bag, ${state.bag} ${state.bag === 1 ? 'item' : 'items'}`);
    const n = state.qty;
    setText('status', `${n} × ${PERFUME.name} ${s.ml} ml added to your bag.`);
    const add = btn('buy');
    add.classList.add('is-added');
    add.querySelector('.lx-add__text').textContent = 'Added';
    clearTimeout(addedTimer);
    addedTimer = setTimeout(() => {
      add.classList.remove('is-added');
      add.querySelector('.lx-add__text').textContent = 'Add to bag';
    }, 1800);
  }

  root.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    if (b.dataset.size) {
      state.size = Number(b.dataset.size);
      renderCopy();
      return;
    }
    switch (b.dataset.act) {
      case 'less':
        state.qty = Math.max(1, state.qty - 1);
        break;
      case 'more':
        state.qty = Math.min(9, state.qty + 1);
        break;
      case 'zoom-in':
        state.zoom = Math.min(ZOOMS.length - 1, state.zoom + 1);
        break;
      case 'zoom-out':
        state.zoom = Math.max(0, state.zoom - 1);
        break;
      case 'details':
        state.details = !state.details;
        break;
      case 'spray':
        // one press per click; a second click during a press waits its turn
        anim.queue = Math.min(anim.queue + 1, 2);
        anim.capTarget = 1;
        anim.idle = 0;
        return;
      case 'buy':
        addToBag();
        return;
      default:
        return;
    }
    renderCopy();
  });

  // --- turning: drag the orbit handle (or the bottle itself), with inertia
  function startDrag(e, perPx) {
    dragging = { id: e.pointerId, x: e.clientX, t: performance.now(), k: perPx, moved: false };
    anim.yawTarget = null;
    anim.yawVel = 0;
  }
  canvas.addEventListener('pointerdown', (e) => {
    if (!on || e.button > 0) return;
    startDrag(e, 0.009);
  });
  orbit.addEventListener('pointerdown', (e) => {
    if (!on || e.button > 0) return;
    e.preventDefault();
    handle.focus({ preventScroll: true });
    orbit.setPointerCapture?.(e.pointerId);
    // the handle travels the ellipse: half its width is a quarter turn
    startDrag(e, Math.PI / 2 / Math.max(80, orbit.clientWidth / 2));
    orbit.classList.add('is-grabbed');
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging || e.pointerId !== dragging.id) return;
    const dx = e.clientX - dragging.x;
    const now = performance.now();
    const dt = Math.max(1, now - dragging.t) / 1000;
    ctrl.yaw += dx * dragging.k;
    anim.yawVel = (dx * dragging.k) / dt;
    dragging.x = e.clientX;
    dragging.t = now;
    if (Math.abs(dx) > 1 && !dragging.moved) {
      dragging.moved = true;
      root.classList.add('has-turned');
    }
  });
  const endDrag = (e) => {
    if (!dragging || e.pointerId !== dragging.id) return;
    dragging = null;
    orbit.classList.remove('is-grabbed');
  };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  handle.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 3, PageDown: -3 }[e.key];
    if (step === undefined && e.key !== 'Home') return;
    e.preventDefault();
    const from = anim.yawTarget ?? ctrl.yaw;
    anim.yawTarget = e.key === 'Home' ? TAU * Math.round(from / TAU) : from + (step * Math.PI) / 12;
    anim.yawVel = 0;
    root.classList.add('has-turned');
  });

  // phones: the orbit and the round tools sit above the sheet, however tall it is
  new ResizeObserver(() => root.style.setProperty('--sheet-h', `${sheet.offsetHeight}px`)).observe(sheet);

  renderCopy();

  // --- per frame, before the story poses the bottle
  let shown = { x: null, y: null, deg: null, behind: null, press: null };
  function update(a, dt, p, lite) {
    dt = Math.min(Math.max(dt, 0), 0.1);
    anim.clock += dt;
    const want = p >= ON_AT ? 1 : 0;
    anim.act = approach(anim.act, want, 3.2, dt);
    if (Math.abs(anim.act - want) < 0.002) anim.act = want;
    const act = anim.act;
    const nowOn = act > 0.5;
    if (nowOn !== on) {
      on = nowOn;
      root.classList.toggle('is-on', on);
      root.inert = !on;
      root.setAttribute('aria-hidden', String(!on));
      document.documentElement.classList.toggle('has-showroom', on);
      if (!on) dragging = null;
    }
    root.classList.toggle('is-lite', !!lite);
    // same breakpoint as the CSS: the panels become a sheet at the bottom
    const compact = window.innerWidth <= 900;

    // yaw: drag inertia, or easing to a target (keyboard, Home)
    if (!dragging) {
      if (anim.yawTarget !== null) {
        ctrl.yaw = approach(ctrl.yaw, anim.yawTarget, 4, dt);
        if (Math.abs(ctrl.yaw - anim.yawTarget) < 0.002) {
          ctrl.yaw = anim.yawTarget;
          anim.yawTarget = null;
        }
      } else {
        anim.yawVel *= Math.exp(-dt * 3);
        if (Math.abs(anim.yawVel) < 0.002) anim.yawVel = 0;
        ctrl.yaw += anim.yawVel * dt;
      }
    }

    // the pump: lift the cap, press once per click, set the cap back when idle
    if (!on) {
      anim.queue = 0;
      anim.capTarget = 0;
      anim.press = null;
      anim.cap = 0;
    }
    anim.cap = toward(anim.cap, anim.capTarget, dt / CAP_TIME);
    if (anim.press !== null) {
      anim.press += dt;
      if (anim.press >= PRESS) anim.press = null;
    } else if (anim.queue > 0 && anim.cap >= 1) {
      anim.queue--;
      anim.press = 0;
      anim.presses++;
      const b = bursts[nextBurst];
      nextBurst = (nextBurst + 1) % bursts.length;
      b.start = anim.clock + 0.05;
    } else if (anim.cap > 0 && anim.queue === 0) {
      anim.idle += dt;
      if (anim.idle > CAP_IDLE) anim.capTarget = 0;
    }
    deep.setCapOff(easeInOut(anim.cap) * act);
    deep.setPress(anim.press === null ? 0 : pressCurve(anim.press));
    const pressing = anim.press !== null;
    if (pressing !== shown.press) {
      shown.press = pressing;
      btn('spray').classList.toggle('is-press', pressing);
    }

    const sprayBusy = anim.cap > 0 || anim.queue > 0;
    anim.zoom = approach(anim.zoom, ZOOMS[state.zoom], 3, dt);
    anim.still = approach(anim.still, dragging || sprayBusy || anim.yawTarget !== null ? 1 : 0, 3, dt);
    anim.scale = approach(anim.scale, SIZES[state.size].scale, 4, dt);
    anim.pan = approach(anim.pan, compact && !state.details ? 0.15 : 0, 3, dt);

    ctrl.offset.set(0, 0, 0);
    ctrl.zoom = anim.zoom * act;
    ctrl.still = anim.still * act;
    ctrl.pan = anim.pan * act;
    ctrl.scale = anim.scale;
    ctrl.focusY = plinthTop + collarY * anim.scale;

    // the handle rides the ellipse with the bottle's turn (front = bottom of the ring)
    if (on) {
      const w = orbit.clientWidth;
      const h = orbit.querySelector('.lx-orbit__ring').clientHeight;
      const yaw = ((ctrl.yaw % TAU) + TAU) % TAU;
      const x = w / 2 + (w / 2 - 2) * (276 / 280) * Math.sin(yaw);
      const y = h / 2 + (h / 2) * (44 / 48) * Math.cos(yaw);
      if (Math.abs(x - shown.x) > 0.3 || Math.abs(y - shown.y) > 0.3 || shown.x === null) {
        shown.x = x;
        shown.y = y;
        handle.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      }
      const behind = Math.cos(yaw) < 0;
      if (behind !== shown.behind) {
        shown.behind = behind;
        handle.classList.toggle('is-behind', behind);
      }
      const deg = Math.round(THREE.MathUtils.radToDeg(yaw)) % 360;
      if (deg !== shown.deg) {
        shown.deg = deg;
        handle.setAttribute('aria-valuenow', String(deg));
        handle.setAttribute('aria-valuetext', deg === 0 ? 'Front' : `${deg} degrees`);
      }
    }
  }

  // --- after the story has posed the bottle and the camera
  const _o = new THREE.Vector3();
  const _d = new THREE.Vector3();
  function post() {
    let live = false;
    for (const b of bursts) {
      if (b.start === null) continue;
      if (anim.clock > b.start + BURST || !on) {
        b.start = null;
        b.s.mesh.visible = false;
        continue;
      }
      if (!live) {
        deep.nozzle.getWorldPosition(_o);
        deep.nozzle.getWorldDirection(_d);
        _o.addScaledVector(_d, 0.006 * anim.scale);
        live = true;
      }
      b.s.update(anim.clock, [b.start, b.start, b.start], _o, _d);
    }
  }

  function resize(w, h, pr) {
    const px = (h * pr) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    for (const b of bursts) b.s.uniforms.uPx.value = px;
    shown = { x: null, y: null, deg: null, behind: null, press: shown.press };
  }

  return {
    update,
    post,
    resize,
    onAt: ON_AT,
    get on() {
      return on;
    },
    // QA
    state,
    anim,
    ctrl,
  };
}
