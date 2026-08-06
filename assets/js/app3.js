(() => {
/* The seven-scene cinematic opening — v2.
   One fixed, always-in-focus bottle (cut from the citrus plate) holds the
   center while environments transform behind it (brief: "the bottle should
   always stay in focus while the world around it changes").
   Three transition modes (dissolve / sweep / push) exposed as Tweaks. */
/* Standalone build: bundled scripts can execute in any order, so DS components
   and resources are resolved lazily at render time. */
const __DSJ = (n) => (props) => React.createElement((window.ScentLabDesignSystem_38c3c1 || {})[n] || 'span', props);
const Eyebrow = __DSJ('Eyebrow'), Button = __DSJ('Button'), SceneProgress = __DSJ('SceneProgress');
const IB = '../../assets/icons';
const R = () => window.__resources || {};
const BOOKING_URL = 'https://tijon.com/pages/class-sign-up-west-palm-beach?utm_source=ig&utm_medium=social&utm_content=link_in_bio';

const SCENES = [
  { id:'origin', label:'Origin', title:'A clean beginning', feelings:['Freshness.','Purity.','Anticipation.'], img:'scene1', pos:'100% 22%', zoom:2.0, light:true,
    glow:'rgba(140,190,150,.5)', tint:'sepia(.3) hue-rotate(60deg) saturate(1.6) brightness(1.12)' },
  { id:'warmth', label:'Warmth', title:'Warmth, rising', feelings:['Deep.','Slow.','Comfortable.'], img:'scene2', pos:'2% 72%', zoom:1.9, light:false,
    glow:'rgba(200,140,70,.55)', tint:'sepia(.9) hue-rotate(-10deg) saturate(1.8) brightness(1.05)' },
  { id:'spark', label:'Spark', title:'A brighter pulse', feelings:['Energy.','Creativity.','Joy.'], img:'scene3', pos:'100% 62%', zoom:2.05, light:false,
    glow:'rgba(240,170,60,.5)', tint:'sepia(.8) hue-rotate(-25deg) saturate(2) brightness(1.12)' },
  { id:'flow', label:'Flow', title:'Let it move you', feelings:['Freedom.','Clarity.','Motion.'], atmosphere:'water', light:false,
    glow:'rgba(120,200,215,.5)', tint:'sepia(.5) hue-rotate(140deg) saturate(1.8) brightness(1.1)' },
  { id:'heat', label:'Heat', title:'The heat of it', feelings:['Passion.','Intensity.','Glow.'], atmosphere:'fire', light:false,
    glow:'rgba(244,150,60,.65)', tint:'sepia(1) hue-rotate(-30deg) saturate(2.4) brightness(1.08)' },
  { id:'air', label:'Air', title:'Lighter than air', feelings:['Ease.','Nature.','Elegance.'], atmosphere:'wind', light:false,
    glow:'rgba(232,206,160,.45)', tint:'sepia(.5) hue-rotate(10deg) saturate(1.2) brightness(1.1)' },
  { id:'arrival', label:'Arrival', title:'Florida, at last', feelings:['Harmony.','Beauty.','Memory.'], img:'scene7', pos:'0% 42%', zoom:1.65, light:false,
    glow:'rgba(240,180,80,.55)', tint:'sepia(.9) hue-rotate(-15deg) saturate(2) brightness(1.12)' },
];

function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
function seeded(n){ let s=n*9301+49297; return ()=>{ s=(s*233280+9301)%233280; return s/233280; }; }

/* ── CSS atmospheres for the three unphotographed scenes ───────────────── */
function Atmosphere({ kind }) {
  if (kind === 'water') return (<>
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(120% 90% at 50% 26%, #45707D 0%, #2E4A52 44%, #0C171B 100%)' }} />
    <div style={{ position:'absolute', inset:0, opacity:.5, mixBlendMode:'screen', animation:'sl-caustic 16s linear infinite alternate',
      background:'radial-gradient(60px 46px at 30% 35%, rgba(140,210,220,.28), transparent 70%), radial-gradient(90px 70px at 68% 60%, rgba(120,190,205,.22), transparent 70%)',
      backgroundSize:'340px 260px, 420px 340px' }} />
    <div style={{ position:'absolute', inset:'-10% 20%', background:'linear-gradient(178deg, rgba(190,235,240,.16), transparent 55%)', transform:'skewX(-12deg)', filter:'blur(6px)' }} />
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(90% 70% at 50% 55%, transparent 55%, rgba(6,12,14,.6) 100%)' }} />
  </>);
  if (kind === 'fire') return (<>
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(115% 85% at 50% 72%, #A8451A 0%, #5E250D 40%, #0F0503 100%)' }} />
    <div style={{ position:'absolute', left:'50%', top:'56%', width:'62vmin', height:'62vmin', borderRadius:'50%', filter:'blur(30px)',
      background:'radial-gradient(circle, rgba(255,166,70,.55) 0%, rgba(196,82,28,.28) 45%, transparent 72%)', animation:'sl-glow 3.2s ease-in-out infinite alternate' }} />
    <div style={{ position:'absolute', left:0, right:0, bottom:0, height:'26%', background:'linear-gradient(to top, rgba(64,20,6,.85), transparent)' }} />
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(95% 75% at 50% 55%, transparent 50%, rgba(8,3,1,.72) 100%)' }} />
  </>);
  return (<>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(166deg, #C3A377 0%, #8F704A 44%, #1F150C 100%)' }} />
    {[0,1,2].map((i) => (
      <div key={i} style={{ position:'absolute', left:'-15%', right:'-15%', top:(22+i*20)+'%', height:'16%', borderRadius:'50%', filter:'blur(18px)',
        background:'linear-gradient(90deg, transparent, rgba(248,236,214,'+(0.1-i*0.02)+') 45%, transparent)',
        animation:'sl-band '+(11+i*4)+'s ease-in-out '+(-i*3)+'s infinite alternate' }} />
    ))}
    <div style={{ position:'absolute', left:0, right:0, bottom:0, height:'30%', background:'linear-gradient(to top, rgba(38,26,14,.8), transparent)', filter:'blur(2px)' }} />
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(95% 80% at 50% 50%, transparent 55%, rgba(12,8,4,.55) 100%)' }} />
  </>);
}

/* ── per-mode environment motion ───────────────────────────────────────── */
function envMotion(mode, t) {
  const at = Math.abs(t);
  if (mode === 'sweep') return {
    opacity: clamp(1 - Math.max(0, at - 0.62) * 3.2, 0, 1),
    transform: 'translateX(' + (t * -68) + 'vw) scale(1.1)',
    extraBlur: 0, z: 10,
  };
  if (mode === 'push') return t >= 0
    ? { opacity: clamp(1 - Math.max(0, t - 0.38) * 2.4, 0, 1), transform: 'scale(' + (1 + t * 0.6) + ')', extraBlur: t * 9, z: 20 }
    : { opacity: clamp(1 - Math.max(0, at - 0.55) * 3, 0, 1), transform: 'scale(' + Math.max(0.86, 1 + t * 0.16) + ')', extraBlur: at * 5, z: 10 };
  return {
    opacity: clamp(1 - Math.max(0, at - 0.3) * 2.2, 0, 1),
    transform: 'scale(' + (1.08 - t * 0.05) + ') translateY(' + (t * -3) + '%)',
    extraBlur: 0, z: 10,
  };
}

function Scene({ scene, index, progress, mode }) {
  const t = progress - index;
  if ((t <= -1 || t >= 1) && !(index === 0 && progress <= 0)) return null;
  const m = index === 0 && t < 0 ? envMotion(mode, 0) : envMotion(mode, t);
  const ink = scene.light;
  /* backgrounds run sharp (client direction); the ocean still resolves the
     journey by fading the hero bottle out over the real plate */
  const blur = 0;
  const active = Math.abs(t) < 0.45;
  const imgUrl = scene.img && R()[scene.img];
  return (
    <div style={{ position:'absolute', inset:0, opacity:m.opacity, zIndex:m.z, pointerEvents: active ? 'auto' : 'none' }}>
      <div style={{ position:'absolute', inset:'-6%', transform:m.transform }}>
        {scene.img
          ? <img src={imgUrl} alt="" data-sl-bg={index === 6 ? undefined : ''} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:scene.pos,
              filter: m.extraBlur > 0.2 ? 'blur(' + m.extraBlur + 'px)' : 'none', transform:'scale(' + (scene.zoom || 1.04) + ')', transformOrigin: scene.pos }} />
          : <div data-sl-bg="" style={{ position:'absolute', inset:0 }}><Atmosphere kind={scene.atmosphere} /></div>}
        {!scene.light && <div style={{ position:'absolute', inset:0, background:'var(--scrim-full)' }} />}
        {scene.img && scene.light && <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(252,250,246,.6) 0%,rgba(252,250,246,.06) 45%)' }} />}
      </div>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 var(--gutter) 9vh',
        transform:'translateY(' + (t * 30) + 'px)', transition:'none' }}>
        <div style={{ maxWidth:680, display:'flex', flexDirection:'column', gap:'var(--space-lg)' }}>
          <div style={{ opacity: active ? 1 : 0, transform: active ? 'none' : 'translateY(14px)', transition:'opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)' }}>
            <Eyebrow index={index + 1} tone={ink ? 'accent' : 'inverse'} wide>{scene.label}</Eyebrow>
          </div>
          <h1 style={{ margin:0, fontFamily:'var(--font-display)', fontWeight:300, fontSize:'clamp(3.2rem,7.5vw,7rem)', lineHeight:.96, letterSpacing:'-.02em',
            color: ink ? 'var(--ink-800)' : 'var(--bone-100)', textWrap:'balance',
            opacity: active ? 1 : 0, transform: active ? 'none' : 'translateY(20px)', transition:'opacity var(--dur-slow) var(--ease-out) 80ms, transform var(--dur-slow) var(--ease-out) 80ms' }}>{scene.title}</h1>
          <div style={{ display:'flex', gap:'var(--space-lg)', fontFamily:'var(--font-display)', fontStyle:'italic', fontWeight:300,
            fontSize:'clamp(1.05rem,1.5vw,1.4rem)', color: ink ? 'var(--ink-600)' : 'rgba(247,243,236,.78)' }}>
            {scene.feelings.map((w, i) => (
              <span key={w} style={{ opacity: active ? 1 : 0, transform: active ? 'none' : 'translateY(12px)',
                transition:'opacity var(--dur-slow) var(--ease-out) ' + (180 + i * 140) + 'ms, transform var(--dur-slow) var(--ease-out) ' + (180 + i * 140) + 'ms' }}>{w}</span>
            ))}
          </div>
          <div style={{ display:'flex', gap:'var(--space-sm)', marginTop:'var(--space-sm)', flexWrap:'wrap',
            opacity: active ? 1 : 0, transition:'opacity var(--dur-slow) var(--ease-out) 300ms' }}>
            <Button variant="primary" size={index === 0 ? 'lg' : 'md'} icon="arrow-right" iconBase={IB} href={BOOKING_URL} target="_blank" rel="noopener">Book a team session</Button>
            {index === 0 && <Button variant="quiet" size="lg" iconBase={IB} onClick={() => window.scrollTo({ top: window.innerHeight * 1.3, behavior:'smooth' })}>Learn more</Button>}
          </div>
          {index === 6 && (
            <div style={{ display:'flex', alignItems:'center', gap:'var(--space-md)', marginTop:'var(--space-sm)', opacity: active ? 1 : 0, transition:'opacity var(--dur-slow) var(--ease-out) 300ms' }}>
              <span style={{ width:44, height:1, background:'var(--gold-400)' }} />
              <span style={{ fontFamily:'var(--font-text)', fontSize:'var(--size-eyebrow)', fontWeight:500, letterSpacing:'var(--tracking-eyebrow-wide)', textTransform:'uppercase', color:'rgba(247,243,236,.72)' }}>The scent of memorable moments</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── the fixed hero bottle ─────────────────────────────────────────────── */
const IS_NARROW = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
function HeroBottle({ progress }) {
  const opacity = 1;
  const idx = clamp(Math.round(progress), 0, 6);
  const scene = SCENES[idx];
  const rot = Math.sin(progress * 1.9) * 1.6;
  const dy = Math.sin(progress * 2.6) * 12;
  const scale = 1 + Math.sin(progress * 1.3) * 0.02;
  const bottleH = IS_NARROW ? '42vh' : '64vh';
  return (
    <div aria-hidden="true" style={{ position:'absolute', left:'50%', top:IS_NARROW ? '40%' : '47%', zIndex:15, opacity, pointerEvents:'none',
      transform:'translate(-50%,-50%) translateY(' + dy + 'px) rotate(' + rot + 'deg) scale(' + scale + ')' }}>
      <div style={{ position:'absolute', left:'50%', top:'52%', transform:'translate(-50%,-50%)', width:'70vmin', height:'70vmin', borderRadius:'50%',
        background:'radial-gradient(circle,' + scene.glow + ' 0%, transparent 65%)', filter:'blur(24px)', transition:'background var(--dur-scene) var(--ease-in-out)' }} />
      <div style={{ position:'relative', height:bottleH }}>
        {/* live liquid, behind the glass */}
        <div data-sl-bottle="" style={{ position:'absolute', left:'27%', width:'46.4%', top:'30.5%', height:'61.5%', overflow:'hidden', borderRadius:'3px 3px 8px 8px' }}>
          <div style={{ position:'absolute', left:'-8%', right:'-8%', top:'12%', bottom:'-2%', transformOrigin:'50% 100%', animation:'sl-slosh 5.6s var(--ease-in-out) infinite alternate' }}>
            <div style={{ position:'absolute', inset:0, overflow:'hidden', background:'linear-gradient(rgba(214,186,133,.16) 0%, rgba(199,158,90,.28) 55%, rgba(154,110,44,.40) 100%)' }}>
              {[18, 44, 66, 82].map((lx, i) => (
                <span key={i} style={{ position:'absolute', left:lx+'%', bottom:'3%', width:3+i%2*2, height:3+i%2*2, borderRadius:'50%',
                  background:'rgba(255,250,236,.7)', animation:'sl-bubble '+(5+i*2.3)+'s ease-in '+(-i*2.9)+'s infinite' }} />
              ))}
            </div>
            <div style={{ position:'absolute', top:0, left:'-55%', width:'210%', aspectRatio:'1', borderRadius:'38% 42% 40% 44%', transform:'translateY(-50%)',
              background:'rgba(255,246,222,.14)', animation:'sl-spin 13s linear infinite' }} />
            <div style={{ position:'absolute', top:0, left:'-52%', width:'204%', aspectRatio:'1', borderRadius:'44% 38% 46% 40%', transform:'translateY(-50%)',
              background:'rgba(214,186,133,.16)', animation:'sl-spin 21s linear infinite reverse' }} />
          </div>
        </div>
        <img src={R().bottle} alt="" data-sl-bottle="" style={{ position:'relative', height:'100%', width:'auto', display:'block', filter:'drop-shadow(0 44px 54px rgba(10,8,5,.45))' }} />
        <img src={R().bottle} alt="" data-sl-bottle="" style={{ position:'absolute', inset:0, height:'100%', width:'auto', mixBlendMode:'screen', opacity:.24,
          filter:scene.tint, transition:'filter var(--dur-scene) var(--ease-in-out)' }} />
        <div style={{ position:'absolute', left:'50%', top:'56%', transform:'translateX(-50%)', textAlign:'center', whiteSpace:'nowrap',
          fontFamily:'var(--font-display)', fontWeight:300, fontSize:'2.6vh', letterSpacing:'.3em',
          color: scene.light ? 'rgba(74,58,32,.78)' : 'rgba(252,250,246,.94)',
          textShadow: scene.light ? 'none' : '0 0 1px rgba(80,60,30,.9), 0 1px 3px rgba(40,30,15,.45)',
          transition:'color var(--dur-scene) var(--ease-in-out)' }}>
          TIJON
          <div style={{ fontFamily:'var(--font-text)', fontSize:'.85vh', fontWeight:500, letterSpacing:'.22em', textTransform:'uppercase', marginTop:'.8vh', opacity:.8 }}>Eau de parfum · West Palm Beach</div>
          <div style={{ display:'inline-block', marginTop:'1.6vh', padding:'.5vh 1.6vh', border:'1px solid currentColor', borderRadius:2, opacity:.85,
            fontFamily:'var(--font-display)', fontStyle:'italic', fontWeight:300, fontSize:'1.7vh', letterSpacing:'.06em', textTransform:'none' }}>my perfume</div>
        </div>
      </div>
      <div style={{ position:'absolute', left:'50%', bottom:'-7vh', transform:'translateX(-50%)', width:'34vh', height:'5vh', borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(10,8,5,.4) 0%, transparent 70%)', filter:'blur(10px)' }} />
    </div>
  );
}

function Journey({ onProgress, mode = 'sweep', grain = true }) {
  const dbgMatch = (typeof location !== 'undefined' && location.hash.match(/p=([\d.]+)/)) || null;
  const dbg = dbgMatch ? parseFloat(dbgMatch[1]) : NaN;
  const [progress, setProgress] = React.useState(isNaN(dbg) ? 0 : dbg);
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    if (!isNaN(dbg)) { // pinned via #p= for previews
      window.__SL2.__journeyProgress = dbg;
      window.dispatchEvent(new CustomEvent('sl:progress', { detail: dbg }));
      return;
    }
    /* smoothed, snapping progress: raw scroll is eased every frame so the type
       never jitters, and after the wheel settles the runway snaps to the
       nearest whole scene — no stopping mid-transition. */
    let raf = 0, snapT = 0, cur = NaN;
    const compute = () => {
      const el = wrapRef.current; if (!el) return 0;
      const runway = el.offsetHeight - window.innerHeight;
      return clamp((-el.getBoundingClientRect().top) / (runway / SCENES.length), 0, SCENES.length - 1);
    };
    let prevT = 0;
    const tick = (now) => {
      const dt = prevT ? Math.min((now - prevT) / 1000, 0.1) : 1 / 60;
      prevT = now;
      const target = compute();
      if (isNaN(cur)) cur = target;
      cur += (target - cur) * Math.min(1, dt * 11);
      if (Math.abs(target - cur) < 0.002) cur = target;
      setProgress((prev) => (prev === cur ? prev : cur));
      onProgress?.(cur);
      window.__SL2.__journeyProgress = cur;
      window.dispatchEvent(new CustomEvent('sl:progress', { detail: cur }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    /* rAF-driven snap — native smooth scrollTo is silently dropped by some
       engines, so the glide to the nearest whole scene is animated by hand
       and cancelled the moment the user takes over. */
    let snapRaf = 0, snapping = false;
    const cancelSnap = () => { snapping = false; cancelAnimationFrame(snapRaf); };
    const snap = () => {
      const el = wrapRef.current; if (!el) return;
      const p = compute();
      if (p <= 0.02 || p >= SCENES.length - 1.02) return;
      const nearest = Math.round(p);
      if (Math.abs(p - nearest) < 0.02) return;
      const runway = el.offsetHeight - window.innerHeight;
      const from = window.scrollY;
      const to = el.offsetTop + (runway / SCENES.length) * nearest;
      const t0 = performance.now(), dur = Math.min(650, 250 + Math.abs(to - from) * 0.4);
      snapping = true;
      const step = (now) => {
        if (!snapping) return;
        const k = clamp((now - t0) / dur, 0, 1);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        window.scrollTo(0, from + (to - from) * e);
        if (k < 1) snapRaf = requestAnimationFrame(step);
        else snapping = false;
      };
      snapRaf = requestAnimationFrame(step);
    };
    const onScroll = () => { if (snapping) return; clearTimeout(snapT); snapT = setTimeout(snap, 170); };
    const onUserScroll = () => { cancelSnap(); clearTimeout(snapT); snapT = setTimeout(snap, 170); };
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('wheel', onUserScroll, { passive:true });
    window.addEventListener('touchmove', onUserScroll, { passive:true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchmove', onUserScroll);
      cancelAnimationFrame(raf); cancelSnap(); clearTimeout(snapT);
    };
  }, []);
  const active = clamp(Math.round(progress), 0, 6);
  const goTo = (i) => {
    const el = wrapRef.current;
    const runway = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (runway / SCENES.length) * i, behavior:'smooth' });
  };
  return (
    <div ref={wrapRef} style={{ height:(SCENES.length * 120) + 'vh', position:'relative', background:'var(--ink-900)' }}>
      <div style={{ position:'sticky', top:0, height:'100vh', overflow:'hidden' }}>
        <div id="sl-fx-mount" style={{ position:'absolute', inset:0, zIndex:8, transition:'opacity .8s ease' }} />
        {SCENES.map((s, i) => <Scene key={s.id} scene={s} index={i} progress={progress} mode={mode} />)}
        <HeroBottle progress={progress} />
        {grain && <div style={{ position:'absolute', inset:0, zIndex:25, opacity:'var(--grain-opacity)', backgroundImage:'repeating-conic-gradient(#fff 0% 25%,#000 0% 50%)', backgroundSize:'3px 3px', pointerEvents:'none' }} />}
        <div style={{ position:'absolute', inset:0, zIndex:30, pointerEvents:'none' }}>
          <SceneProgress scenes={SCENES.map((s) => s.label)} active={active} onSelect={goTo} style={{ position:'absolute', pointerEvents:'auto' }} />
        </div>
        {progress < 0.08 && (
          <div style={{ position:'absolute', right:'var(--gutter)', bottom:18, zIndex:30, display:'flex', flexDirection:'column', alignItems:'center', gap:6, color:'var(--ink-600)', opacity:.7 }}>
            <span style={{ fontFamily:'var(--font-text)', fontSize:10, fontWeight:500, letterSpacing:'.28em', textTransform:'uppercase' }}>Scroll</span>
            <span style={{ width:1, height:34, background:'currentColor', animation:'sl-pulse 2.4s var(--ease-in-out) infinite' }} />
          </div>
        )}
      </div>
    </div>
  );
}

window.__SL2 = Object.assign(window.__SL2 || {}, { Journey, JOURNEY_SCENES: SCENES });

})();
