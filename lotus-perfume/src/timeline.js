// Story timeline on the right edge: a hairline that fills in wine with the
// scroll, one dot per chapter and the current chapter's name beside it. The
// line ends at the last chapter's dot. It comes in with the
// hero copy and fades out just before the showroom takes over (it would sit on
// the shop's glass panels otherwise).
//
// Marks and the end are in scroll screens q (see story/index.js): the first
// `lead` screens scrub the bottle's flourish, the rest is the story progress p.

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (a, b, x) => {
  const k = clamp01((x - a) / (b - a));
  return k * k * (3 - 2 * k);
};

export function createTimeline({ marks, end }) {
  // the line's length in scroll screens: from the first dot to the last one
  const span = marks[marks.length - 1].q || end;
  const root = document.createElement('nav');
  root.className = 'tl';
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = `<div class="tl__track"><div class="tl__fill"></div>${marks
    .map(
      (m) =>
        `<div class="tl__mark" style="--at:${(m.q / span).toFixed(4)}"><span class="tl__dot"></span><span class="tl__label">${m.label}</span></div>`,
    )
    .join('')}</div>`;
  document.body.append(root);

  const fill = root.querySelector('.tl__fill');
  const dots = [...root.querySelectorAll('.tl__mark')];
  let shown = { in: null, k: -1, fade: -1, current: -1 };

  // fully gone a little before the showroom starts coming in at `end`
  const fadeFrom = end - 0.6;
  const fadeTo = end - 0.25;

  function update(q, visible) {
    if (visible !== shown.in) {
      shown.in = visible;
      root.classList.toggle('is-in', visible);
    }
    const k = Math.round(clamp01(q / span) * 1000) / 1000;
    if (k !== shown.k) {
      shown.k = k;
      fill.style.transform = `scaleY(${k})`;
    }
    const fade = Math.round((1 - smooth(fadeFrom, fadeTo, q)) * 100) / 100;
    if (fade !== shown.fade) {
      shown.fade = fade;
      root.style.setProperty('--tl-fade', fade);
      root.classList.toggle('is-gone', fade <= 0);
    }
    let current = 0;
    marks.forEach((m, i) => {
      if (q >= m.q - 0.02) current = i;
    });
    if (current !== shown.current) {
      shown.current = current;
      dots.forEach((d, i) => {
        d.classList.toggle('is-past', i < current);
        d.classList.toggle('is-current', i === current);
      });
    }
  }

  return { update };
}
