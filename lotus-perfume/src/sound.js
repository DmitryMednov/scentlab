// Soundtrack behind the whole page, switched by the bars icon in the menu.
// The track opens with the flower: a falling glissando, then a soft chord that
// lands with it and the bloom. Browsers only let a page make sound after a
// click, tap or key press, so the entry screen (see .gate) is that click: the
// intro clock and the music start together and the chord meets the landing.
// Without the entry screen (QA links) it starts with the first gesture anywhere.
// After the opening it loops the calm body of the track as overlapping copies
// that crossfade, so the seam is never heard; it fades in and out, pauses while
// the tab is hidden, and the menu button's choice is remembered.

// The track (public/audio):
//   intro  track second where the landing chord hits
//   from   the loop replays the track from here on (the calm body, past the bloom)
//   xfade  seconds each loop copy overlaps the next (covers the track's own fade at the end)
const TRACK = { file: 'lotus-ambient.mp3', intro: 3.0, from: 14, xfade: 6 };
const SRC = `${import.meta.env.BASE_URL}audio/${TRACK.file}`;
const VOLUME = 0.3;
const FADE_IN = 2.5;
const FADE_OUT = 0.8;
const XFADE = TRACK.xfade;
const INTRO_AT = TRACK.intro;
const LOOP_FROM = TRACK.from;
const KEY = 'lotus-sound';

// land: seconds from entering to the flower touching the water (T.land)
export function createSound({ gate = false, land = 2.85 } = {}) {
  const btn = document.querySelector('.nav__sound');
  if (!btn) return null;

  let wanted = true;
  try {
    wanted = localStorage.getItem(KEY) !== 'off';
  } catch {}

  let ctx = null;
  let master = null;
  let buffer = null;
  let loading = null;
  let playing = false;
  let next = 0; // context time the next loop copy starts
  let idle = null;

  const show = (on) => {
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', String(on));
  };

  function ensureContext() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
  }

  function load() {
    ensureContext();
    loading ||= fetch(SRC)
      .then((r) => {
        if (!r.ok) throw new Error(`sound ${r.status}`);
        return r.arrayBuffer();
      })
      .then((data) => ctx.decodeAudioData(data))
      .then((b) => (buffer = b));
    return loading;
  }

  // one copy of the track from `offset` to the end; `fade` softens its start
  function queue(at, offset, fade) {
    const d = buffer.duration - offset;
    const src = ctx.createBufferSource();
    const gain = ctx.createGain();
    src.buffer = buffer;
    src.connect(gain).connect(master);
    gain.gain.setValueAtTime(fade ? 0 : 1, at);
    if (fade) gain.gain.linearRampToValueAtTime(1, at + XFADE);
    gain.gain.setValueAtTime(1, at + d - XFADE);
    gain.gain.linearRampToValueAtTime(0, at + d);
    src.start(at, offset);
    src.stop(at + d);
    next = at + d - XFADE;
  }

  // the next loop copy is queued a couple of seconds before it is due
  setInterval(() => {
    if (playing && buffer && next && ctx.state === 'running' && ctx.currentTime > next - 3) queue(next, LOOP_FROM, true);
  }, 1000);

  function rampTo(v, s) {
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(v, now + s);
  }

  // intro: true plays the opening so the chord meets the landing, counted from
  // `since` (performance.now() of the entering click), even if loading ran late
  async function start(intro = false, since = performance.now()) {
    ensureContext();
    playing = true;
    show(true);
    clearTimeout(idle);
    ctx.resume();
    try {
      await load();
    } catch {
      playing = false;
      show(false);
      return;
    }
    if (!playing) return;
    if (!next) {
      const late = (performance.now() - since) / 1000;
      const lead = land - INTRO_AT - late; // > 0: wait, < 0: skip into the track
      if (intro && lead > -INTRO_AT) {
        queue(ctx.currentTime + Math.max(0.02, lead), Math.max(0, -lead), false);
        rampTo(VOLUME, 0.05);
        return;
      }
      queue(ctx.currentTime + 0.05, LOOP_FROM, true);
    }
    rampTo(VOLUME, FADE_IN);
  }

  function stop() {
    playing = false;
    show(false);
    if (!ctx) return;
    rampTo(0, FADE_OUT);
    idle = setTimeout(() => {
      if (!playing) ctx.suspend();
    }, FADE_OUT * 1000 + 100);
  }

  btn.addEventListener('click', () => {
    wanted = !playing;
    try {
      localStorage.setItem(KEY, wanted ? 'on' : 'off');
    } catch {}
    if (wanted) start();
    else stop();
  });

  if (gate) {
    // fetched and decoded while the entry screen waits, so the opening is on time
    load().catch(() => {});
  } else {
    // the first click, tap or key press anywhere else starts it
    const first = (e) => {
      if (btn.contains(e.target)) return;
      off();
      if (wanted && !playing) start();
    };
    const events = ['pointerdown', 'keydown', 'touchend'];
    const off = () => events.forEach((n) => window.removeEventListener(n, first, true));
    events.forEach((n) => window.addEventListener(n, first, true));
    btn.addEventListener('click', off);
  }

  document.addEventListener('visibilitychange', () => {
    if (!ctx || !playing) return;
    if (document.hidden) ctx.suspend();
    else ctx.resume();
  });

  return {
    // the entry screen's button: the opening plays with the fall, unless the
    // visitor muted the sound on an earlier visit
    enter() {
      if (wanted) start(true);
    },
    start,
    stop,
    get playing() {
      return playing;
    },
  };
}
