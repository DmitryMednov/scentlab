// Fog Reveal, from the HorizonX tool of the same name, tuned for the entry
// screen: the particle halo is wine instead of deep blue for the pink fog, and
// `particleShape: "petal"` sheds tumbling lotus petals instead of motes.

// Frosted-glass reveal: a sharp photo sits under a canvas of fog. Moving the
// pointer wipes the fog away like a hand on a misted window; after a short
// hold the fog condenses back, unevenly, the way breath returns to glass.
//
// The fog amount lives in a coarse Float32 grid (one value per `cell` CSS px)
// instead of in canvas pixels: 8-bit alpha cannot accumulate the tiny per-frame
// increments needed for a slow re-fog, so it would stall before covering fully.
//
// No imports: `fogReveal.export.js` inlines this file verbatim into the
// one-file export.

export const ENGINE_DEFAULTS = {
  src: "",
  srcPortrait: "", // optional art for tall viewports, where a landscape photo crops to its empty middle
  alt: "",
  hazeColor: [221, 229, 244],
  restingHaze: 0.38, // milky veil over the blurred photo once the intro settles
  introHaze: 0.97, // nearly solid veil at load, so the photo emerges from it
  introMs: 3200,
  blurPx: 20, // fog blur, in CSS px
  brushRadius: 130, // CSS px; capped to a share of the shorter side on small screens
  holdMs: 650, // how long a wiped spot stays clear before re-fogging starts
  refogMs: 2400, // time for a fully clear spot to fog over again
  cell: 10, // fog grid resolution, CSS px
  fogScale: 0.5, // canvas resolution relative to CSS px; fog is blurry, so half is plenty
  // Idle "glimpses": every few seconds one spot of the subject clears by
  // itself, then fogs back. [min, max] ms between glimpses, or 0 to turn them off.
  ambientEveryMs: 2500,
  ambientRadius: 0, // CSS px; 0 means 1.25 × the brush radius
  ambientFadeMs: 1100, // how long a glimpse takes to clear
  ambientHoldMs: 1400, // how long it stays clear before re-fogging
  ambientSpots: null, // optional [[x, y], ...] in 0–1 of the host; otherwise found in the photo
  // Particle trail: fine motes of light scatter off the pointer's path, float
  // a little and fade.
  particles: true,
  particleEveryPx: 14, // pointer travel between bursts; higher is sparser
  particleMax: 120, // particles alive at once
  particleOpacity: 0.85,
  particleSize: [1.2, 3.2], // CSS px, radius of a particle's bright core
  particleLifeMs: [900, 1900],
  particleShape: "mote", // "petal": lotus petals that tumble and drift down; particleSize is then their length
  // Frosty whites and pale blues, picked to sit on the cobalt default photo.
  particleColors: [
    [238, 243, 252],
    [208, 222, 248],
    [176, 198, 244],
    [226, 222, 250],
  ],
  pointerTarget: null, // element that receives pointer events; defaults to the host
  onReady: null,
};

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const smoothstep = (t) => t * t * (3 - 2 * t);
const easeOutCubic = (t) => 1 - (1 - t) ** 3;
const easeInOutSine = (t) => 0.5 - Math.cos(Math.PI * t) / 2;
const between = ([min, max]) => min + Math.random() * (max - min);

// One sprite per colour, drawn once: a bright core inside a soft glow, over a
// faint wine halo that keeps pale motes visible on pale fog of the same
// hue. Particles are then stamped with drawImage, which stays cheap at a
// hundred per frame where a per-particle shadowBlur would not.
const SPRITE_PX = 64; // sprite edge; the core radius is SPRITE_PX / 8
function particleSprite(color) {
  const sprite = document.createElement("canvas");
  sprite.width = SPRITE_PX;
  sprite.height = SPRITE_PX;
  const sctx = sprite.getContext("2d");
  const c = SPRITE_PX / 2;
  const [r, g, b] = color;
  const halo = sctx.createRadialGradient(c, c, 0, c, c, c);
  halo.addColorStop(0, "rgba(107, 26, 46, 0.16)");
  halo.addColorStop(1, "rgba(107, 26, 46, 0)");
  sctx.fillStyle = halo;
  sctx.fillRect(0, 0, SPRITE_PX, SPRITE_PX);
  const glow = sctx.createRadialGradient(c, c, 0, c, c, c * 0.62);
  glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
  glow.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.95)`);
  glow.addColorStop(0.42, `rgba(${r}, ${g}, ${b}, 0.28)`);
  glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  sctx.fillStyle = glow;
  sctx.fillRect(0, 0, SPRITE_PX, SPRITE_PX);
  return sprite;
}

// A lotus petal, base at the bottom: cream at the base blushing to `color` at
// the pointed tip, a faint midrib and edge, and a soft wine shadow so a pale
// petal still reads on pale fog. Drawn once per colour, like the motes.
function petalSprite(color) {
  const sprite = document.createElement("canvas");
  sprite.width = SPRITE_PX;
  sprite.height = SPRITE_PX;
  const sctx = sprite.getContext("2d");
  const [r, g, b] = color;
  const shape = () => {
    sctx.beginPath();
    sctx.moveTo(32, 58);
    sctx.bezierCurveTo(15, 51, 12, 25, 32, 6);
    sctx.bezierCurveTo(52, 25, 49, 51, 32, 58);
    sctx.closePath();
  };
  const fill = sctx.createLinearGradient(32, 58, 32, 6);
  fill.addColorStop(0, "rgba(255, 248, 244, 1)");
  fill.addColorStop(0.45, `rgba(${Math.round((r + 255) / 2)}, ${Math.round((g + 244) / 2)}, ${Math.round((b + 240) / 2)}, 1)`);
  fill.addColorStop(1, `rgba(${r}, ${g}, ${b}, 1)`);
  sctx.save();
  sctx.shadowColor = "rgba(107, 26, 46, 0.3)";
  sctx.shadowBlur = 5;
  sctx.shadowOffsetY = 1.5;
  shape();
  sctx.fillStyle = fill;
  sctx.fill();
  sctx.restore();
  // a hint of curl: lighter down one side
  const sheen = sctx.createLinearGradient(16, 0, 48, 0);
  sheen.addColorStop(0, "rgba(255, 255, 255, 0.35)");
  sheen.addColorStop(0.5, "rgba(255, 255, 255, 0)");
  sheen.addColorStop(1, "rgba(107, 26, 46, 0.08)");
  shape();
  sctx.fillStyle = sheen;
  sctx.fill();
  sctx.strokeStyle = `rgba(${Math.round(r * 0.7)}, ${Math.round(g * 0.6)}, ${Math.round(b * 0.65)}, 0.28)`;
  sctx.lineWidth = 0.7;
  sctx.stroke();
  sctx.beginPath();
  sctx.moveTo(32, 54);
  sctx.quadraticCurveTo(31, 32, 32, 13);
  sctx.moveTo(30, 50);
  sctx.quadraticCurveTo(23, 36, 25, 20);
  sctx.moveTo(34, 50);
  sctx.quadraticCurveTo(41, 36, 39, 20);
  sctx.strokeStyle = `rgba(${Math.round(r * 0.75)}, ${Math.round(g * 0.6)}, ${Math.round(b * 0.7)}, 0.16)`;
  sctx.lineWidth = 0.6;
  sctx.stroke();
  return sprite;
}

export function coverRect(iw, ih, w, h) {
  const s = Math.max(w / iw, h / ih);
  const dw = iw * s;
  const dh = ih * s;
  return [(w - dw) / 2, (h - dh) / 2, dw, dh];
}

// Cheap smooth value field in roughly [0, 1]: decides which patches of glass
// fog over first, so the return is patchy instead of a uniform fade.
export function condensationField(x, y) {
  const v =
    Math.sin(x * 0.021 + 1.3) * Math.cos(y * 0.017 - 0.4) +
    0.6 * Math.sin((x + y) * 0.033 + 2.1) +
    0.4 * Math.cos((x - y) * 0.047 - 1.7);
  return clamp01(0.5 + v / 4);
}

// Finds where the subject is, in host CSS px, so idle glimpses land on it
// instead of on empty backdrop. Scores each sample by its colour
// distance from the backdrop (the per-channel median), smooths the scores to
// glimpse size, then keeps well-separated peaks.
function findSpots(source, width, height, radius) {
  const g = 8; // CSS px per sample
  const sw = Math.max(1, Math.ceil(width / g));
  const sh = Math.max(1, Math.ceil(height / g));
  const probe = document.createElement("canvas");
  probe.width = sw;
  probe.height = sh;
  const pctx = probe.getContext("2d", { willReadFrequently: true });
  pctx.imageSmoothingQuality = "high";
  const [x, y, dw, dh] = coverRect(source.naturalWidth, source.naturalHeight, sw, sh);
  pctx.drawImage(source, x, y, dw, dh);
  let pixels;
  try {
    pixels = pctx.getImageData(0, 0, sw, sh).data;
  } catch {
    return []; // cross-origin photo without CORS: fall back to scattered spots
  }

  const n = sw * sh;
  const median = (offset) => {
    const values = new Uint8Array(n);
    for (let k = 0; k < n; k++) values[k] = pixels[k * 4 + offset];
    return values.sort()[n >> 1];
  };
  const bg = [median(0), median(1), median(2)];
  let score = new Float32Array(n);
  for (let k = 0; k < n; k++) {
    const [r, gr, b] = [pixels[k * 4], pixels[k * 4 + 1], pixels[k * 4 + 2]];
    // Foliage differs from a backdrop as much as blooms do, so green-dominant
    // pixels do not count. Only green-dominant: a blue backdrop also has more
    // green than red, and skipping it hid the whole cobalt portrait.
    score[k] = gr > r && gr > b ? 0 : Math.hypot(r - bg[0], gr - bg[1], b - bg[2]);
  }

  // Two separable box blurs approximate a Gaussian about the size of a
  // glimpse, so peaks sit on the subject rather than between features.
  const r = Math.max(1, Math.round(radius / g / 4));
  const blurPass = (src, horizontal) => {
    const out = new Float32Array(n);
    const len = horizontal ? sw : sh;
    const lines = horizontal ? sh : sw;
    for (let line = 0; line < lines; line++) {
      for (let p = 0; p < len; p++) {
        let sum = 0;
        let count = 0;
        for (let q = Math.max(0, p - r); q <= Math.min(len - 1, p + r); q++) {
          sum += src[horizontal ? line * sw + q : q * sw + line];
          count++;
        }
        out[horizontal ? line * sw + p : p * sw + line] = sum / count;
      }
    }
    return out;
  };
  for (let pass = 0; pass < 2; pass++) score = blurPass(blurPass(score, true), false);

  const order = Array.from(score.keys()).sort((a, b) => score[b] - score[a]);
  const floor = Math.max(14, score[order[0]] * 0.35);
  const minGap = radius * 1.6;
  const margin = radius * 0.5; // a glimpse half off-screen shows mostly edge
  const spots = [];
  for (const k of order) {
    if (score[k] < floor || spots.length >= 24) break;
    const sx = ((k % sw) + 0.5) * g;
    const sy = (Math.floor(k / sw) + 0.5) * g;
    if (sx < margin || sy < margin || sx > width - margin || sy > height - margin) continue;
    if (spots.every(([px, py]) => Math.hypot(px - sx, py - sy) >= minGap)) spots.push([sx, sy]);
  }
  return spots;
}

export function createFogReveal(host, options = {}) {
  const o = { ...ENGINE_DEFAULTS };
  // An explicit `undefined` (an unset prop) keeps the default instead of erasing it.
  for (const [key, value] of Object.entries(options)) if (value !== undefined) o[key] = value;
  const pointerTarget = o.pointerTarget || host;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const img = new Image();
  img.className = "fr-image";
  img.alt = o.alt;
  img.decoding = "async";
  img.draggable = false;

  const canvas = document.createElement("canvas");
  canvas.className = "fr-fog";
  canvas.setAttribute("aria-hidden", "true");
  const ctx = canvas.getContext("2d");

  const particleCanvas = document.createElement("canvas");
  particleCanvas.className = "fr-particles";
  particleCanvas.setAttribute("aria-hidden", "true");
  const particleCtx = particleCanvas.getContext("2d");
  let particleScale = 1;
  let sprites = new Map(); // colour key -> sprite canvas, rebuilt when the palette changes

  const fogTexture = document.createElement("canvas");
  const maskCanvas = document.createElement("canvas");
  const maskCtx = maskCanvas.getContext("2d");

  host.classList.add("fr-layer");
  host.append(img, canvas, particleCanvas);

  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;
  let fog = new Float32Array(0);
  let wipedAt = new Float32Array(0);
  let refogRate = new Float32Array(0);
  let maskImage = null;

  let source = null; // decoded image the fog texture is built from
  let currentSrc = "";
  let ready = false;
  let destroyed = false;
  let visible = true;
  let raf = 0;
  let lastFrame = 0;
  let introStart = 0;
  let lastPoint = null;
  let spots = [];
  let recentSpots = [];
  let blooms = []; // glimpses still clearing: { x, y, start }
  let ambientTimer = 0;
  let particles = []; // { x, y, vx, vy, size, sprite, born, life, twinkle, twinkleSpeed }
  let particleTravel = 0;

  function brushRadius() {
    return Math.min(o.brushRadius, Math.min(width, height) * 0.24);
  }

  function ambientRadius() {
    return o.ambientRadius || brushRadius() * 1.25;
  }

  function ambientEnabled() {
    const every = [].concat(o.ambientEveryMs);
    return every[0] > 0 && !reducedMotion.matches;
  }

  // The photo or the crop changed, so the subject moved.
  function updateSpots() {
    if (o.ambientSpots) spots = o.ambientSpots.map(([sx, sy]) => [sx * width, sy * height]);
    else if (ambientEnabled()) spots = findSpots(source, width, height, ambientRadius());
    recentSpots = [];
  }

  function buildFogTexture() {
    const w = canvas.width;
    const h = canvas.height;
    fogTexture.width = w;
    fogTexture.height = h;
    const fctx = fogTexture.getContext("2d");
    const blur = o.blurPx * o.fogScale;
    // Overdraw past the edges so the blur does not fade the borders to transparent.
    const m = Math.ceil(blur * 3);
    const [x, y, dw, dh] = coverRect(source.naturalWidth, source.naturalHeight, w + m * 2, h + m * 2);

    if (typeof fctx.filter === "string") {
      fctx.filter = `blur(${blur}px)`;
      fctx.drawImage(source, x - m, y - m, dw, dh);
      fctx.filter = "none";
    } else {
      // No canvas filter (older Safari): downscale hard, then let bilinear
      // upscaling do the blurring.
      const small = document.createElement("canvas");
      small.width = Math.max(1, Math.round(w / 14));
      small.height = Math.max(1, Math.round(h / 14));
      const sctx = small.getContext("2d");
      sctx.imageSmoothingQuality = "high";
      sctx.drawImage(source, (x - m) / 14, (y - m) / 14, dw / 14, dh / 14);
      fctx.imageSmoothingQuality = "high";
      fctx.drawImage(small, 0, 0, w, h);
    }
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    width = rect.width;
    height = rect.height;
    canvas.width = Math.max(1, Math.round(width * o.fogScale));
    canvas.height = Math.max(1, Math.round(height * o.fogScale));
    particleScale = Math.min(2, window.devicePixelRatio || 1);
    particleCanvas.width = Math.max(1, Math.round(width * particleScale));
    particleCanvas.height = Math.max(1, Math.round(height * particleScale));
    particles = [];

    cols = Math.ceil(width / o.cell) + 1;
    rows = Math.ceil(height / o.cell) + 1;
    fog = new Float32Array(cols * rows).fill(1);
    wipedAt = new Float32Array(cols * rows).fill(-Infinity);
    refogRate = new Float32Array(cols * rows);
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        refogRate[j * cols + i] = 0.55 + 0.9 * condensationField(i * o.cell, j * o.cell);
      }
    }
    maskCanvas.width = cols;
    maskCanvas.height = rows;
    maskImage = maskCtx.createImageData(cols, rows);
    maskImage.data.fill(255);

    const wanted = pickSrc();
    if (wanted !== currentSrc) load(wanted);
    if (ready) {
      buildFogTexture();
      updateSpots();
      wake();
    }
  }

  function pickSrc() {
    return o.srcPortrait && height > width * 1.1 ? o.srcPortrait : o.src;
  }

  // Decodes off-screen first so the fog texture and the visible photo switch
  // together, without a frame of mismatched art.
  function load(src) {
    currentSrc = src;
    const next = new Image();
    next.src = src;
    next
      .decode()
      .catch(() => undefined)
      .then(() => {
        if (destroyed || src !== currentSrc) return;
        if (!next.naturalWidth) {
          host.classList.add("is-error");
          return;
        }
        source = next;
        img.src = src;
        host.classList.remove("is-error");
        if (ready) {
          buildFogTexture();
          updateSpots();
          wake();
          return;
        }
        ready = true;
        introStart = reducedMotion.matches ? 0 : performance.now();
        host.classList.add("is-ready");
        if (!reducedMotion.matches) host.classList.add("is-intro");
        resize(); // sizes the grid, builds the fog texture and starts the loop
        resizeObserver.observe(host);
        intersectionObserver.observe(host);
        // The first glimpse waits for the intro, so the two never compete.
        scheduleGlimpse(introStart ? o.introMs : 0);
        o.onReady?.();
      });
  }

  // Clears fog in a soft disc. A solid core plus a smooth falloff reads like a
  // finger-width wipe rather than a stamped circle. `amount` scales the clear
  // (glimpses ramp it up); `clearUntil` pushes back when re-fogging may start.
  function stamp(x, y, radius, now, amount = 1, clearUntil = now) {
    const c = o.cell;
    const i0 = Math.max(0, Math.floor((x - radius) / c));
    const i1 = Math.min(cols - 1, Math.ceil((x + radius) / c));
    const j0 = Math.max(0, Math.floor((y - radius) / c));
    const j1 = Math.min(rows - 1, Math.ceil((y + radius) / c));
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        const d = Math.hypot(i * c - x, j * c - y) / radius;
        if (d >= 1) continue;
        const strength = amount * (d < 0.42 ? 1 : 1 - smoothstep((d - 0.42) / 0.58));
        const k = j * cols + i;
        const target = 1 - strength;
        if (target < fog[k]) fog[k] = target;
        if (strength > 0.3 && clearUntil > wipedAt[k]) wipedAt[k] = clearUntil;
      }
    }
  }

  // Wipes along the segment since the last event so fast strokes leave a
  // continuous trail instead of a row of dots.
  function wipeTo(x, y) {
    if (!cols) return;
    const now = performance.now();
    const radius = brushRadius();
    if (lastPoint && now - lastPoint.t < 120) {
      const dx = x - lastPoint.x;
      const dy = y - lastPoint.y;
      const steps = Math.min(40, Math.ceil(Math.hypot(dx, dy) / (radius * 0.3)));
      for (let s = 1; s <= steps; s++) {
        stamp(lastPoint.x + (dx * s) / steps, lastPoint.y + (dy * s) / steps, radius, now);
      }
    } else {
      stamp(x, y, radius, now);
    }
    if (lastPoint && now - lastPoint.t < 120) shedParticles(lastPoint.x, lastPoint.y, x, y, now);
    lastPoint = { x, y, t: now };
    wake();
  }

  function spriteFor(color) {
    const key = color.join(",");
    let sprite = sprites.get(key);
    if (!sprite) sprites.set(key, (sprite = o.particleShape === "petal" ? petalSprite(color) : particleSprite(color)));
    return sprite;
  }

  // Every `particleEveryPx` of travel releases a small burst. Each mote takes
  // a little of the stroke's direction plus a random scatter, then slows like
  // dust in still air and rises slightly, so the trail spreads off the path
  // and thins out instead of hanging on it as a line.
  function shedParticles(x0, y0, x1, y1, now) {
    if (!o.particles || reducedMotion.matches) return;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const dist = Math.hypot(dx, dy);
    if (!dist) return;
    particleTravel += dist;
    const push = Math.min(0.08, dist / 700); // px per ms carried from the stroke
    while (particleTravel >= o.particleEveryPx) {
      particleTravel -= o.particleEveryPx;
      const t = clamp01(1 - particleTravel / dist); // where along this segment the burst sits
      const burst = 1 + Math.floor(Math.random() * 2);
      for (let k = 0; k < burst; k++) {
        if (particles.length >= o.particleMax) particles.shift();
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.008 + Math.random() * 0.04;
        if (o.particleShape === "petal") {
          // a petal is tossed a little along the stroke, then tumbles and falls
          particles.push({
            x: x0 + dx * t + (Math.random() - 0.5) * 22,
            y: y0 + dy * t + (Math.random() - 0.5) * 22,
            vx: (dx / dist) * push * (0.4 + Math.random()) + Math.cos(angle) * speed,
            vy: (dy / dist) * push * (0.4 + Math.random()) - 0.02 - Math.random() * 0.03,
            size: between(o.particleSize),
            sprite: spriteFor(o.particleColors[Math.floor(Math.random() * o.particleColors.length)]),
            born: now,
            life: between(o.particleLifeMs),
            rot: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.004,
            flip: Math.random() * Math.PI * 2,
            flipSpeed: 0.002 + Math.random() * 0.004,
            sway: Math.random() * Math.PI * 2,
          });
          continue;
        }
        particles.push({
          x: x0 + dx * t + (Math.random() - 0.5) * 18,
          y: y0 + dy * t + (Math.random() - 0.5) * 18,
          vx: (dx / dist) * push * Math.random() + Math.cos(angle) * speed,
          vy: (dy / dist) * push * Math.random() + Math.sin(angle) * speed,
          size: between(o.particleSize),
          sprite: spriteFor(o.particleColors[Math.floor(Math.random() * o.particleColors.length)]),
          born: now,
          life: between(o.particleLifeMs),
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.006 + Math.random() * 0.01,
        });
      }
    }
  }

  function drawParticles(now, dt) {
    const s = particleScale;
    particleCtx.setTransform(1, 0, 0, 1, 0, 0);
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles = particles.filter((p) => now - p.born < p.life);
    const drag = 0.994 ** dt; // frame-rate independent slow-down
    if (o.particleShape === "petal") {
      const airDrag = 0.997 ** dt;
      for (const p of particles) {
        const age = (now - p.born) / p.life;
        p.vx *= airDrag;
        p.vy = p.vy * airDrag + 0.00005 * dt; // falls, slowly, like a petal on still air
        p.sway += 0.0028 * dt;
        p.x += (p.vx + Math.sin(p.sway) * 0.018) * dt;
        p.y += p.vy * dt;
        p.rot += p.spin * dt + Math.cos(p.sway) * 0.0009 * dt;
        p.flip += p.flipSpeed * dt;
        const fade = Math.min(1, age / 0.1) * (1 - smoothstep(clamp01((age - 0.6) / 0.4)));
        // turning over shows the petal edge-on, a little darker
        const turn = Math.cos(p.flip);
        const k = (p.size * s) / (SPRITE_PX * 0.82);
        particleCtx.globalAlpha = clamp01(o.particleOpacity * fade * (0.8 + 0.2 * Math.abs(turn)));
        particleCtx.setTransform(1, 0, 0, 1, p.x * s, p.y * s);
        particleCtx.rotate(p.rot);
        particleCtx.scale(k * Math.max(0.18, Math.abs(turn)), k);
        particleCtx.drawImage(p.sprite, -SPRITE_PX / 2, -SPRITE_PX / 2);
      }
      particleCtx.setTransform(1, 0, 0, 1, 0, 0);
      particleCtx.globalAlpha = 1;
      return;
    }
    for (const p of particles) {
      const age = (now - p.born) / p.life;
      p.vx *= drag;
      p.vy = p.vy * drag - 0.000012 * dt; // a slight lift, like warm dust
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.twinkle += p.twinkleSpeed * dt;
      // Quick fade in, long fade out, with a soft shimmer on top.
      const fade = Math.min(1, age / 0.08) * (1 - smoothstep(clamp01((age - 0.3) / 0.7)));
      const shimmer = 0.72 + 0.28 * Math.sin(p.twinkle);
      particleCtx.globalAlpha = clamp01(o.particleOpacity * fade * shimmer);
      // The sprite's core is an eighth of its edge; motes shrink as they die.
      const edge = p.size * 8 * (1 - 0.45 * age) * s;
      particleCtx.drawImage(p.sprite, p.x * s - edge / 2, p.y * s - edge / 2, edge, edge);
    }
    particleCtx.globalAlpha = 1;
  }

  function fogAt(x, y) {
    const i = Math.min(cols - 1, Math.max(0, Math.round(x / o.cell)));
    const j = Math.min(rows - 1, Math.max(0, Math.round(y / o.cell)));
    return fog[j * cols + i];
  }

  // Picks a spot that is still fogged and was not shown in the last few
  // glimpses, so the same spot does not keep winking.
  function pickSpot() {
    if (!spots.length) {
      return [width * (0.1 + 0.8 * Math.random()), height * (0.1 + 0.8 * Math.random())];
    }
    const memory = Math.min(3, spots.length - 1);
    const fresh = spots.filter((spot) => !recentSpots.includes(spot) && fogAt(spot[0], spot[1]) > 0.6);
    const pool = fresh.length ? fresh : spots;
    const spot = pool[Math.floor(Math.random() * pool.length)];
    recentSpots = [spot, ...recentSpots].slice(0, memory);
    return spot;
  }

  function scheduleGlimpse(extraDelay = 0) {
    clearTimeout(ambientTimer);
    if (destroyed || !ambientEnabled()) return;
    const [min, max = min] = [].concat(o.ambientEveryMs);
    ambientTimer = setTimeout(glimpse, extraDelay + min + Math.random() * (max - min));
  }

  function glimpse() {
    // Hidden tabs and off-screen heroes skip a beat instead of queueing up.
    if (ready && visible && !document.hidden && cols) {
      const [x, y] = pickSpot();
      blooms.push({ x, y, start: performance.now() });
      wake();
    }
    scheduleGlimpse();
  }

  function onPointerMove(event) {
    if (!ready) return;
    const rect = host.getBoundingClientRect();
    wipeTo(event.clientX - rect.left, event.clientY - rect.top);
  }

  function onPointerLeave() {
    lastPoint = null;
  }

  function frame(now) {
    raf = 0;
    if (destroyed || !ready) return;
    const dt = Math.min(64, now - (lastFrame || now));
    lastFrame = now;

    const introT = introStart ? clamp01((now - introStart) / o.introMs) : 1;
    const haze = o.introHaze + (o.restingHaze - o.introHaze) * easeOutCubic(introT);
    let busy = introT < 1;

    if (blooms.length) {
      const radius = ambientRadius();
      const clearUntil = now + o.ambientHoldMs - o.holdMs;
      blooms = blooms.filter((bloom) => {
        const t = clamp01((now - bloom.start) / o.ambientFadeMs);
        stamp(bloom.x, bloom.y, radius, now, easeInOutSine(t), clearUntil);
        return t < 1;
      });
      busy = true;
    }

    const step = dt / o.refogMs;
    const data = maskImage.data;
    for (let k = 0, n = fog.length; k < n; k++) {
      let f = fog[k];
      if (f < 1) {
        busy = true;
        if (now - wipedAt[k] > o.holdMs) {
          f = Math.min(1, f + step * refogRate[k]);
          fog[k] = f;
        }
      }
      data[k * 4 + 3] = smoothstep(f) * 255;
    }
    maskCtx.putImageData(maskImage, 0, 0);

    const w = canvas.width;
    const h = canvas.height;
    const [r, g, b] = o.hazeColor;
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage(fogTexture, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${haze})`;
    ctx.fillRect(0, 0, w, h);
    // Keep the fog only where the mask says there is fog. Grid point i sits at
    // i * cell, so shift by half a cell to line pixel centres up with it.
    const s = o.cell * o.fogScale;
    ctx.globalCompositeOperation = "destination-in";
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(maskCanvas, -s / 2, -s / 2, cols * s, rows * s);
    ctx.globalCompositeOperation = "source-over";

    if (particles.length) {
      drawParticles(now, dt);
      busy = true;
    }

    // Idle glass costs nothing: the loop stops until the next wipe or resize.
    if (busy && visible) raf = requestAnimationFrame(frame);
  }

  function wake() {
    if (!raf && ready && visible && !destroyed) {
      lastFrame = 0;
      raf = requestAnimationFrame(frame);
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
  });

  pointerTarget.addEventListener("pointermove", onPointerMove, { passive: true });
  pointerTarget.addEventListener("pointerdown", onPointerMove, { passive: true });
  pointerTarget.addEventListener("pointerleave", onPointerLeave);
  pointerTarget.addEventListener("pointercancel", onPointerLeave);

  const initial = host.getBoundingClientRect();
  width = initial.width;
  height = initial.height;
  load(pickSrc());

  return {
    // Programmatic wipe in host-relative CSS px (touch hints, tours, tests).
    reveal(x, y) {
      if (ready) wipeTo(x, y);
    },
    // Live edits from the editor. Only what changed is rebuilt: a new photo
    // reloads, a new blur rebuilds the fog texture, a new brush or photo
    // re-finds the spots, a new glimpse rhythm reschedules the next one.
    // The fog grid itself is kept, so an edit never re-fogs a wiped spot.
    update(next = {}) {
      const before = { ...o };
      for (const [key, value] of Object.entries(next)) if (value !== undefined) o[key] = value;
      if (o.alt !== before.alt) img.alt = o.alt;
      if (o.src !== before.src || o.srcPortrait !== before.srcPortrait) {
        const wanted = pickSrc();
        if (wanted !== currentSrc) load(wanted);
      }
      if (!ready) return;
      if (o.blurPx !== before.blurPx) buildFogTexture();
      if (o.brushRadius !== before.brushRadius || o.ambientRadius !== before.ambientRadius || String(o.ambientEveryMs) !== String(before.ambientEveryMs)) {
        updateSpots();
      }
      if (String(o.ambientEveryMs) !== String(before.ambientEveryMs)) scheduleGlimpse();
      if (o.particleColors !== before.particleColors || o.particleShape !== before.particleShape) sprites = new Map();
      if (!o.particles) {
        particles = [];
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      }
      wake();
    },
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(ambientTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      pointerTarget.removeEventListener("pointermove", onPointerMove);
      pointerTarget.removeEventListener("pointerdown", onPointerMove);
      pointerTarget.removeEventListener("pointerleave", onPointerLeave);
      pointerTarget.removeEventListener("pointercancel", onPointerLeave);
      img.remove();
      canvas.remove();
      particleCanvas.remove();
      host.classList.remove("fr-layer", "is-ready", "is-intro", "is-error");
    },
  };
}
