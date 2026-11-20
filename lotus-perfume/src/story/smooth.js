// Smooth wheel scrolling for the story track. A mouse wheel moves the page in
// notches (~100px at once), so every notch was a small jump. Here the wheel only
// moves a target, and the page glides to it each frame, driven from the story's
// own scroll(dt) so there is no second animation loop.
//
// Left native: touch (it already has momentum), keyboard and the scrollbar
// (picked up as they happen), pinch-zoom (ctrl+wheel), sideways wheels, panels
// that scroll inside (the showroom info card) and reduced motion.

const RATE = 7; // per second: how fast the page catches up with the wheel

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

// can this element (or one of its parents) scroll by dy itself?
function scrollsInside(target, dy) {
  for (let el = target instanceof Element ? target : null; el && el !== document.body; el = el.parentElement) {
    if (el.scrollHeight <= el.clientHeight + 1) continue;
    const oy = getComputedStyle(el).overflowY;
    if (oy !== 'auto' && oy !== 'scroll') continue;
    if (dy < 0 ? el.scrollTop > 0 : el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
  }
  return false;
}

export function createSmoothScroll({ isLocked }) {
  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clamp = (y) => Math.min(maxScroll(), Math.max(0, y));
  let target = window.scrollY;
  let current = window.scrollY;
  let gliding = false;

  function stop() {
    gliding = false;
    target = current = window.scrollY;
  }

  window.addEventListener(
    'wheel',
    (e) => {
      if (reduce.matches || isLocked() || e.ctrlKey) return;
      let dy = e.deltaY;
      if (Math.abs(e.deltaX) > Math.abs(dy)) return;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= window.innerHeight;
      if (scrollsInside(e.target, dy)) return;
      e.preventDefault();
      if (!gliding) target = current = window.scrollY;
      target = clamp(target + dy);
      gliding = true;
    },
    { passive: false },
  );
  // keys, touch and the scrollbar take over from a glide in progress
  window.addEventListener('keydown', stop);
  window.addEventListener('touchstart', stop, { passive: true });
  window.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.clientX >= document.documentElement.clientWidth) stop();
  });

  function update(dt) {
    if (!gliding) return;
    const k = 1 - Math.exp(-Math.min(Math.max(dt, 0), 0.1) * RATE);
    current += (target - current) * k;
    if (Math.abs(target - current) < 0.5) {
      current = target;
      gliding = false;
    }
    window.scrollTo(0, current);
  }

  // glide to a position (the nav links, the logo and the bag)
  function to(y) {
    if (reduce.matches) return window.scrollTo(0, clamp(y));
    if (!gliding) current = window.scrollY;
    target = clamp(y);
    gliding = true;
  }

  return { update, to, stop };
}
