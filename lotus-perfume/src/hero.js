// Hero copy over the half-open flower: EIDOLON type in the Synex two-line layout.
// It rises in when the flower settles (T.heroAt) and fades out gently over about
// half a screen of scroll, both ways, because it follows the timeline t.

const clamp01 = (x) => Math.min(1, Math.max(0, x));

export function createHero() {
  const root = document.querySelector('[data-hero]');
  if (!root) return { update() {} };

  root.querySelectorAll('[data-rise]').forEach((n) => n.style.setProperty('--rise', n.dataset.rise));

  let shown = false;
  let lastOut = -1;
  let gone = null;

  function update(t, T) {
    const inAt = T.heroAt - 0.5;
    if (!shown && t >= inAt) {
      shown = true;
      root.classList.add('is-in');
    }
    // holds for the first bit of scroll, then eases out over about half a screen
    const x = clamp01((t - T.heroAt - 0.3) / 1.55); // gone just before the ritual copy (BEATS.ritual)
    const out = x * x * (3 - 2 * x);
    const rounded = Math.round(out * 1000) / 1000;
    if (rounded !== lastOut) {
      lastOut = rounded;
      root.style.setProperty('--hero-out', rounded);
    }
    const isGone = t < inAt || out >= 1;
    if (isGone !== gone) {
      gone = isGone;
      root.classList.toggle('is-gone', isGone);
      root.inert = isGone;
    }
  }

  return { update };
}

// Later beats, each an <aside> whose copy rises in for a window of the bottle's
// flourish, in seconds after landing like bottleFlourish() in main.js:
// - ritual, bottom-right: copy while the bottle rises and its cap comes off;
// - mist, bottom-left: copy for the three presses and the red spray they release.
// The windows never overlap, so the two are never on screen together (the CSS
// lets one finish leaving before the next comes in).
export const BEATS = {
  ritual: { sel: '[data-ritual]', from: 4.3, to: 7.1 },
  mist: { sel: '[data-mist]', from: 7.35, to: 10.3 },
};

function createBeat({ sel, from, to }) {
  const root = document.querySelector(sel);
  if (!root) return { update() {} };

  root.querySelectorAll('[data-rise]').forEach((n) => n.style.setProperty('--rise', n.dataset.rise));

  let on = null;

  function update(t, T) {
    const s = t - T.land;
    const show = s > from && s < to;
    if (show !== on) {
      on = show;
      root.classList.toggle('is-in', show);
      root.setAttribute('aria-hidden', String(!show));
    }
  }

  return { update };
}

export const createRitual = () => createBeat(BEATS.ritual);
export const createMist = () => createBeat(BEATS.mist);

// Plum shade behind the bottom-corner copy of the three beats above the water
// (hero, ritual, mist). It is a fixed layer of its own, so it never moves with
// the copy: it comes in with the hero and leaves once the mist copy has gone.
export function createShade() {
  const root = document.querySelector('[data-shade]');
  if (!root) return { update() {} };

  let on = null;

  function update(t, T) {
    const show = t >= T.heroAt - 0.5 && t - T.land < BEATS.mist.to;
    if (show !== on) {
      on = show;
      root.classList.toggle('is-in', show);
    }
  }

  return { update };
}
