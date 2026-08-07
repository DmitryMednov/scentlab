(() => {
/* Single-screen poster, split horizontally 50/50: the top half is the live
   fluid canvas, the bottom half a solid bone panel with the pitch. The
   flacon stands astride the seam — glass over both grounds (the canvas is
   transparent and layered above the panel; clicks fall through). */
const IB = '../../assets/icons';
const R = () => window.__resources || {};
const BOOKING_URL = 'https://tijon.com/pages/class-sign-up-west-palm-beach?utm_source=ig&utm_medium=social&utm_content=link_in_bio';

const NARROW_Q = '(max-width: 760px)';
function useNarrow() {
  const [narrow, setNarrow] = React.useState(() => window.matchMedia(NARROW_Q).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(NARROW_Q);
    const on = (e) => setNarrow(e.matches);
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on);
    return () => { mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on); };
  }, []);
  return narrow;
}

/* Refractive glass buttons, after drcmda's MeshTransmissionMaterial demo:
   clear (not frosted) fill, a bright lens rim, a specular streak, and true
   refraction of the backdrop via an SVG displacement filter where the
   engine supports url() in backdrop-filter (plain blur elsewhere). */
const GLASS_CSS = `
.sl-glass-btn{appearance:none;position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;gap:10px;
  padding:15px 30px;border-radius:999px;cursor:pointer;text-decoration:none;border:1px solid rgba(255,255,255,.6);
  font-family:var(--font-text);font-size:13px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
  background:linear-gradient(135deg, rgba(255,255,255,.26), rgba(255,255,255,.05) 42%, rgba(255,255,255,.12));
  -webkit-backdrop-filter:blur(9px) saturate(185%);
  backdrop-filter:blur(9px) saturate(185%);
  backdrop-filter:url(#sl-glass-warp) blur(5px) saturate(185%);
  box-shadow:0 14px 34px rgba(16,12,9,.20), 0 2px 6px rgba(16,12,9,.10),
    inset 0 1px 1px rgba(255,255,255,.75), inset 0 -7px 14px rgba(255,255,255,.16),
    inset 2px 0 6px rgba(255,255,255,.20), inset -2px 0 6px rgba(255,255,255,.20),
    inset 0 -1px 1px rgba(110,90,60,.22);
  transition:transform .18s ease, box-shadow .18s ease;color:var(--ink-800)}
.sl-glass-btn::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:linear-gradient(115deg, transparent 22%, rgba(255,255,255,.5) 38%, rgba(255,255,255,.14) 45%, transparent 58%);
  mix-blend-mode:screen}
.sl-glass-btn::after{content:'';position:absolute;left:10%;right:10%;bottom:1px;height:45%;border-radius:inherit;pointer-events:none;
  background:radial-gradient(100% 140% at 50% 140%, rgba(255,255,255,.42), transparent 62%);filter:blur(3px)}
.sl-glass-btn>*{position:relative;z-index:1}
.sl-glass-btn:hover{transform:translateY(-1px);
  box-shadow:0 18px 40px rgba(16,12,9,.26), 0 2px 6px rgba(16,12,9,.10),
    inset 0 1px 1px rgba(255,255,255,.9), inset 0 -8px 16px rgba(255,255,255,.22),
    inset 2px 0 6px rgba(255,255,255,.26), inset -2px 0 6px rgba(255,255,255,.26),
    inset 0 -1px 1px rgba(110,90,60,.22)}
.sl-glass-btn:active{transform:translateY(0)}
.sl-glass-btn:focus-visible{outline:2px solid var(--gold-500);outline-offset:2px}
.sl-glass-btn--gold{border-color:rgba(255,238,205,.65);color:var(--ink-800);
  background:linear-gradient(135deg, rgba(214,168,92,.6), rgba(184,135,59,.34) 45%, rgba(206,158,80,.52));
  text-shadow:0 1px 0 rgba(255,244,220,.4)}
.sl-glass-btn .arr{font-family:var(--font-text)}
@media (max-width:760px){.sl-glass-btn{padding:13px 22px;font-size:12px}}
`;
if (!document.getElementById('sl-glass-css')) {
  const st = document.createElement('style');
  st.id = 'sl-glass-css';
  st.textContent = GLASS_CSS;
  document.head.appendChild(st);
}
if (!document.getElementById('sl-glass-svg')) {
  const holder = document.createElement('div');
  holder.id = 'sl-glass-svg';
  holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  holder.innerHTML = '<svg width="0" height="0" aria-hidden="true"><filter id="sl-glass-warp" x="-20%" y="-20%" width="140%" height="140%">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="1" seed="7" result="n"/>' +
    '<feDisplacementMap in="SourceGraphic" in2="n" scale="24" xChannelSelector="R" yChannelSelector="G"/>' +
    '</filter></svg>';
  document.body.appendChild(holder);
}

const GlassBtn = ({ gold, href, onClick, children }) => {
  const cls = 'sl-glass-btn' + (gold ? ' sl-glass-btn--gold' : '');
  const arrow = gold ? <span className="arr" aria-hidden="true">→</span> : null;
  return href
    ? <a className={cls} href={href} target="_blank" rel="noopener">{children}{arrow}</a>
    : <button className={cls} type="button" onClick={onClick}>{children}{arrow}</button>;
};

/* fallback bottle (shown only when WebGL init fails) */
function FallbackBottle({ narrow }) {
  return (
    <div aria-hidden="true" data-sl-bottle="" style={{ position:'absolute', left:'50%', top:'38%', pointerEvents:'none',
      transform:'translate(-50%,-50%)', zIndex:11 }}>
      <img src={R().bottle} alt="" style={{ position:'relative', height:narrow ? '34vh' : '50vh', width:'auto', display:'block',
        filter:'drop-shadow(0 44px 54px rgba(10,8,5,.45))' }} />
    </div>
  );
}

function Hero({ onLearnMore }) {
  const narrow = useNarrow();
  const panelH = '50%';

  return (
    <section aria-label="Scent Lab — perfume-making team building" style={{ position:'relative', height:'100vh', overflow:'hidden', background:'var(--ink-900)' }}>

      {/* static fallback ground for no-WebGL clients (top zone) */}
      <div data-sl-bg="" style={{ position:'absolute', left:0, right:0, top:0, bottom:panelH, zIndex:5,
        background:'radial-gradient(120% 100% at 50% 35%, #C8E4C9 0%, #7FB9AE 45%, #2E4A52 100%)' }} />

      {/* solid panel with the pitch */}
      <div style={{ position:'absolute', left:0, right:0, bottom:0, height:panelH, zIndex:8, background:'var(--bone-100)',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 -30px 70px rgba(16,12,9,.16)' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
          gap: narrow ? 14 : 'var(--space-md)', padding:'20px 24px', maxWidth:720, marginTop: narrow ? 0 : 26 }}>
          <div style={{ fontFamily:'var(--font-text)', fontSize:'var(--size-eyebrow)', fontWeight:500,
            letterSpacing:'var(--tracking-eyebrow-wide)', textTransform:'uppercase', color:'var(--gold-600)' }}>
            Tijon · West Palm Beach
          </div>
          <h1 style={{ margin:0, fontFamily:'var(--font-display)', fontWeight:300,
            fontSize: narrow ? 'clamp(1.7rem,6.8vw,2.3rem)' : 'clamp(2rem,2.6vw,3rem)',
            lineHeight:1.06, letterSpacing:'-.01em', color:'var(--ink-800)', textWrap:'balance' }}>
            A team experience <i>they'll actually remember.</i>
          </h1>
          <p style={{ margin:0, fontFamily:'var(--font-text)', fontWeight:300,
            fontSize: narrow ? 14 : 16, lineHeight:1.5, color:'var(--ink-600)' }}>
            Create your own unique perfume.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center', marginTop: narrow ? 4 : 8 }}>
            <GlassBtn gold href={BOOKING_URL}>Book a team session</GlassBtn>
            <GlassBtn onClick={onLearnMore}>Learn more</GlassBtn>
          </div>
        </div>
      </div>

      {/* live transparent canvas above the panel — the bottle rides the seam */}
      <div id="sl-fx-mount" style={{ position:'absolute', inset:0, zIndex:10, pointerEvents:'none' }} />
      <FallbackBottle narrow={narrow} />

      {/* header: wordmark + tagline left, glass CTA right — no burger */}
      <header style={{ position:'absolute', top:0, left:0, right:0, zIndex:20, display:'flex', alignItems:'flex-start',
        justifyContent:'space-between', padding: narrow ? '18px 20px' : '26px clamp(24px,3vw,56px)' }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:400, fontSize: narrow ? 20 : 24, letterSpacing:'.01em', lineHeight:1, color:'var(--ink-800)' }}>
            Scent <i>Lab</i>
          </div>
          <div style={{ fontFamily:'var(--font-text)', fontSize: narrow ? 8.5 : 10, fontWeight:500, letterSpacing:'.3em',
            textTransform:'uppercase', marginTop:6, color:'var(--gold-700)' }}>
            for team building
          </div>
        </div>
        {!narrow && <GlassBtn gold href={BOOKING_URL}>Book a team session</GlassBtn>}
      </header>
    </section>
  );
}

window.__SL2 = Object.assign(window.__SL2 || {}, { Hero });

})();
