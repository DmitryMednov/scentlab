import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import './story.css';
import { createSmoothScroll } from './smooth.js';

// Scroll story that continues the intro once the flower has opened. The scroll
// position q (in screens) drives everything after the intro, both ways: the
// first `lead` screens scrub the bottle's flourish (main.js reads lead01), the
// rest is the story progress p in chapters. ?p= freezes p for QA like ?t= does.
//
// A story module (aire.js / agua.js) owns its 3D beats and can bring a second
// scene (the showroom). The composite pass below cross-reveals that scene over
// the main one: an expanding ring (AIRE) or a rising water line (AGUA).

const CompositeShader = {
  uniforms: {
    tDiffuse: { value: null },
    tAlt: { value: null },
    uMode: { value: 0 },
    uCenter: { value: new THREE.Vector2(0.5, 0.5) },
    uRadius: { value: 0 },
    uLine: { value: -0.2 },
    uAspect: { value: 1 },
    uTime: { value: 0 },
    uGrade: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform sampler2D tAlt;
    uniform int uMode;
    uniform vec2 uCenter;
    uniform float uRadius;
    uniform float uLine;
    uniform float uAspect;
    uniform float uTime;
    uniform float uGrade;
    varying vec2 vUv;
    void main() {
      float k;
      float rim;
      vec2 off;
      if (uMode == 0) {
        // ring: the ripple keeps widening until it is the frame
        vec2 d = (vUv - uCenter) * vec2(uAspect, 1.0);
        float r = length(d);
        float e = r - uRadius;
        rim = exp(-pow(e / 0.03, 2.0));
        off = (d / max(r, 1e-4)) * vec2(1.0 / uAspect, 1.0) * rim * 0.018 * sin(e * 140.0 - uTime * 3.0);
        k = 1.0 - smoothstep(-0.01, 0.01, e);
      } else {
        // water line: the camera slips under the surface
        float wob = 0.012 * sin(vUv.x * 13.0 + uTime * 1.7) + 0.006 * sin(vUv.x * 31.0 - uTime * 2.3);
        float e = vUv.y - (uLine + wob);
        rim = exp(-pow(e / 0.012, 2.0));
        off = vec2(0.0, rim * 0.025);
        k = 1.0 - smoothstep(-0.004, 0.004, e);
      }
      vec3 base = texture2D(tDiffuse, vUv - off).rgb;
      // the second scene's lens: a faint chromatic fringe and a vignette
      vec2 dc = vUv - 0.5;
      vec2 ca = dc * 0.005 * uGrade;
      vec3 alt = vec3(texture2D(tAlt, vUv + off + ca).r, texture2D(tAlt, vUv + off).g, texture2D(tAlt, vUv + off - ca).b);
      float rn = length(dc * vec2(uAspect, 1.0)) / length(vec2(uAspect, 1.0) * 0.5);
      alt *= 1.0 - uGrade * 0.45 * smoothstep(0.3, 1.05, rn);
      vec3 c = mix(base, alt, k) + rim * vec3(1.0, 0.92, 0.94) * 0.32;
      gl_FragColor = vec4(c, 1.0);
    }`,
};

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html) n.innerHTML = html;
  return n;
}

export async function createStory(name, ctx) {
  const { renderer, composer } = ctx;
  const mod = name === 'agua' ? await import('./agua.js') : await import('./aire.js');
  const story = await mod.createChapters(ctx);
  const N = story.length;

  const lead = ctx.lead ?? 0;
  const Q = lead + N;

  const params = new URLSearchParams(location.search);
  const frozenP = params.has('p') ? parseFloat(params.get('p')) : null;

  // --- page: a tall empty track gives the scroll its length; no text on top
  const root = document.documentElement;
  root.classList.add('has-story', 'story-locked');
  root.dataset.story = name;
  const track = el('div', 'story-track');
  track.style.height = `${(Q + 1) * 100}vh`;
  track.setAttribute('aria-hidden', 'true');
  document.body.append(track);
  window.scrollTo(0, 0);

  let unlocked = frozenP !== null;
  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    root.classList.remove('story-locked');
  };
  if (unlocked) root.classList.remove('story-locked');

  const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const smooth = createSmoothScroll({ isLocked: () => !unlocked });
  const goTo = (q) => {
    unlock();
    requestAnimationFrame(() => smooth.to((q / Q) * maxScroll()));
  };
  const links = document.querySelectorAll('.nav__links a');
  story.nav.forEach((p, i) => {
    links[i]?.addEventListener('click', (e) => {
      e.preventDefault();
      goTo(p > 0 ? lead + p : 0);
    });
  });
  document.querySelector('.brand')?.addEventListener('click', (e) => {
    e.preventDefault();
    goTo(0);
  });
  // the bag opens the showroom, where the bottle can be added
  document.querySelector('.nav__bag')?.addEventListener('click', (e) => {
    e.preventDefault();
    goTo(Q);
  });

  // --- second scene + composite
  const altRT = new THREE.WebGLRenderTarget(2, 2, { type: THREE.HalfFloatType, samples: ctx.samples ?? 4 });
  const pass = new ShaderPass(CompositeShader);
  pass.uniforms.tAlt.value = altRT.texture;
  pass.uniforms.uMode.value = story.mode;
  pass.uniforms.uGrade.value = story.mode === 1 ? 1 : 0;
  pass.enabled = false;
  // right after the main render, so the bloom that follows lights both scenes
  composer.insertPass(pass, 1);

  let q = frozenP !== null ? lead + frozenP : 0;
  let p = frozenP ?? 0;
  let blend = { k: 0 };

  // Follows the scroll, eased, and never more than MAX_STEP screens per frame:
  // like the intro clock, a stalled frame slows the animation down instead of
  // jumping over beats (the cap, the presses, the plunge).
  const MAX_STEP = 0.08;
  function scroll(dt) {
    if (frozenP !== null) return;
    smooth.update(dt);
    const target = unlocked ? (window.scrollY / maxScroll()) * Q : 0;
    const k = 1 - Math.exp(-Math.min(Math.max(dt, 0), 0.1) * 5);
    let step = (target - q) * k;
    step = Math.max(-MAX_STEP, Math.min(MAX_STEP, step));
    q += step;
    if (Math.abs(target - q) < 1e-4) q = target;
    p = Math.max(0, q - lead);
  }

  function update(t, cam) {
    blend = story.update(p, t, cam);
    pass.uniforms.uTime.value = t;
  }

  // renders the second scene when it shows; returns whether the main scene does
  function prepare() {
    const k = blend.k;
    pass.enabled = k > 0;
    if (k > 0) {
      pass.uniforms.uRadius.value = blend.radius ?? 0;
      pass.uniforms.uLine.value = blend.line ?? -0.2;
      if (blend.center) pass.uniforms.uCenter.value.copy(blend.center);
      story.alt.camera.updateMatrixWorld();
      renderer.setRenderTarget(altRT);
      renderer.setClearColor(0x000000, 1);
      renderer.clear();
      renderer.render(story.alt.scene, story.alt.camera);
      renderer.setRenderTarget(null);
    }
    return k < 1;
  }

  function setSamples(n) {
    altRT.samples = n;
    altRT.dispose(); // reallocated with the new sample count on next use
  }

  // shader compile jobs for the second scene and the composite pass, against the
  // offscreen targets they render into (see precompile() in main.js)
  function precompile(reveal) {
    reveal(story.alt.scene);
    renderer.setRenderTarget(altRT);
    const a = renderer.compileAsync(story.alt.scene, story.alt.camera);
    const quad = new THREE.Scene();
    quad.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), pass.material));
    renderer.setRenderTarget(composer.renderTarget1);
    const b = renderer.compileAsync(quad, new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1));
    renderer.setRenderTarget(null);
    return [a, b];
  }

  function resize(w, h, pr) {
    altRT.setSize(Math.max(2, Math.round(w * pr)), Math.max(2, Math.round(h * pr)));
    pass.uniforms.uAspect.value = w / h;
    story.resize(w, h);
  }

  return {
    update,
    scroll,
    unlock,
    prepare,
    resize,
    setSamples,
    precompile,
    N,
    lead,
    showroom: story.showroom ?? null,
    get glow() {
      return blend.glow ?? 0;
    },
    get lead01() {
      return lead ? Math.min(1, Math.max(0, q / lead)) : 1;
    },
    get q() {
      return q;
    },
    get p() {
      return p;
    },
  };
}
