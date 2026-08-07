(() => {
/* Single-screen poster, split horizontally: the top ~70% is the live fluid
   canvas, the bottom ~30% a solid bone panel with the pitch. The flacon
   stands astride the seam — glass over both grounds (the canvas is
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

/* Apple-style liquid-glass buttons */
const GLASS_CSS = `
.sl-glass-btn{appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:10px;
  padding:15px 30px;border-radius:999px;cursor:pointer;text-decoration:none;border:1px solid rgba(255,255,255,.42);
  font-family:var(--font-text);font-size:13px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
  background:rgba(255,255,255,.14);
  -webkit-backdrop-filter:blur(18px) saturate(170%);backdrop-filter:blur(18px) saturate(170%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(255,255,255,.08), 0 10px 30px rgba(16,12,9,.16);
  transition:transform .18s ease, box-shadow .18s ease, background .18s ease;color:var(--ink-800)}
.sl-glass-btn:hover{transform:translateY(-1px);background:rgba(255,255,255,.24);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.65), inset 0 -1px 0 rgba(255,255,255,.1), 0 14px 36px rgba(16,12,9,.22)}
.sl-glass-btn:active{transform:translateY(0)}
.sl-glass-btn:focus-visible{outline:2px solid var(--gold-500);outline-offset:2px}
.sl-glass-btn--gold{background:rgba(184,135,59,.66);border-color:rgba(255,236,200,.5);color:var(--bone-050);
  box-shadow:inset 0 1px 0 rgba(255,244,220,.6), inset 0 -1px 0 rgba(120,80,20,.25), 0 10px 30px rgba(120,80,20,.28)}
.sl-glass-btn--gold:hover{background:rgba(184,135,59,.8)}
.sl-glass-btn .arr{font-family:var(--font-text)}
@media (max-width:760px){.sl-glass-btn{padding:13px 22px;font-size:12px}}
`;
if (!document.getElementById('sl-glass-css')) {
  const st = document.createElement('style');
  st.id = 'sl-glass-css';
  st.textContent = GLASS_CSS;
  document.head.appendChild(st);
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
    <div aria-hidden="true" data-sl-bottle="" style={{ position:'absolute', left:'50%', top: narrow ? '38%' : '42%', pointerEvents:'none',
      transform:'translate(-50%,-50%)', zIndex:11 }}>
      <img src={R().bottle} alt="" style={{ position:'relative', height:narrow ? '34vh' : '50vh', width:'auto', display:'block',
        filter:'drop-shadow(0 44px 54px rgba(10,8,5,.45))' }} />
    </div>
  );
}

function Hero({ onLearnMore }) {
  const narrow = useNarrow();
  const panelH = narrow ? '44%' : '30%';

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
          gap: narrow ? 14 : 'var(--space-md)', padding:'20px 24px', maxWidth:720 }}>
          <div style={{ fontFamily:'var(--font-text)', fontSize:'var(--size-eyebrow)', fontWeight:500,
            letterSpacing:'var(--tracking-eyebrow-wide)', textTransform:'uppercase', color:'var(--gold-600)' }}>
            Tijon · West Palm Beach
          </div>
          <h1 style={{ margin:0, fontFamily:'var(--font-display)', fontWeight:300,
            fontSize: narrow ? 'clamp(1.7rem,6.8vw,2.3rem)' : 'clamp(2rem,2.6vw,3rem)',
            lineHeight:1.06, letterSpacing:'-.01em', color:'var(--ink-800)', textWrap:'balance' }}>
            A team experience <i>they'll actually remember.</i>
          </h1>
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
