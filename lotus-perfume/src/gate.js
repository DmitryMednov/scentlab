// Entry screen: "Welcome to Lotus" behind fogged glass (the fog reveal in
// src/fog.js) over a still of the scene's first frame. It shows while the
// scene loads; the pointer wipes the glass, leaving falling petals, and the fog
// comes back. Once the scene is ready the button reads "Click to start". That click is the one that lets the page play
// sound, so the intro (the falling flower) and the music's opening start
// together, while the logo flies up into its place at the centre of the menu.
// "Continue without sound" at the bottom does the same with the music off; the
// menu's sound button can still turn it on later.

import { createFogReveal } from './fog.js';

const BASE = import.meta.env.BASE_URL;
const FLIGHT_MS = 1300;
const LEAVE_MS = 1200;

export function createGate({ onStart }) {
  const root = document.querySelector('.gate');
  if (!root) return null;
  root.hidden = false;

  const glass = root.querySelector('.gate__glass');
  const mark = root.querySelector('.gate__mark');
  const button = root.querySelector('.gate__start');
  const mute = root.querySelector('.gate__mute');
  const brandMark = document.querySelector('.brand__mark');

  const fog = createFogReveal(glass, {
    // the scene itself at its first frame (sky, sea and the stone the flower
    // lands on), so lifting the fog uncovers exactly what plays next
    src: `${BASE}img/gate-scene.webp`,
    srcPortrait: `${BASE}img/gate-scene-portrait.webp`,
    alt: '',
    hazeColor: [243, 221, 226],
    restingHaze: 0.46,
    introHaze: 0.98,
    blurPx: 22,
    // a wiped spot fogs back over quickly, so a fast sweep of the mouse never
    // leaves much of the scene showing
    holdMs: 180,
    refogMs: 1000,
    // the pointer leaves a trail of lotus petals instead of motes of light
    particleShape: 'petal',
    particleEveryPx: 42,
    particleMax: 50,
    particleOpacity: 0.95,
    particleSize: [20, 32],
    particleLifeMs: [2200, 3600],
    particleColors: [
      [236, 140, 168],
      [226, 118, 150],
      [244, 172, 192],
      [214, 98, 132],
    ],
    pointerTarget: root,
  });

  let started = false;

  // the logo travels from the middle of the screen to the menu's own mark,
  // which only appears when it lands
  function fly() {
    if (!brandMark) return;
    const nav = document.querySelector('.nav');
    const from = mark.getBoundingClientRect();
    const to = brandMark.getBoundingClientRect();
    // the menu still sits 10px up before it comes in (see .nav)
    const lift = nav ? new DOMMatrixReadOnly(getComputedStyle(nav).transform).m42 : 0;
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top - lift + to.height / 2 - (from.top + from.height / 2);
    const k = to.width / from.width;
    document.documentElement.classList.add('is-docking');
    mark.animate(
      [{ transform: 'none' }, { transform: `translate(${dx}px, ${dy}px) scale(${k})` }],
      { duration: FLIGHT_MS, easing: 'cubic-bezier(0.65, 0, 0.25, 1)', fill: 'forwards' },
    ).finished.then(() => {
      document.documentElement.classList.remove('is-docking');
      document.documentElement.classList.add('is-docked');
    });
  }

  function start(withSound) {
    if (started || button.disabled) return;
    started = true;
    onStart({ sound: withSound });
    root.classList.add('is-leaving');
    fly();
    setTimeout(() => {
      fog.destroy();
      root.remove();
    }, Math.max(FLIGHT_MS, LEAVE_MS) + 100);
  }

  button.addEventListener('click', () => start(true));
  mute?.addEventListener('click', () => start(false));

  return {
    // the scene is compiled: the button can start it
    ready() {
      button.disabled = false;
      if (mute) mute.disabled = false;
      root.classList.add('is-ready');
    },
  };
}
