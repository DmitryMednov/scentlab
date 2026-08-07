(() => {
/* Single-screen hero: a 70/30 split poster. The right 70% carries the live
   fluid canvas and the glass flacon; the left 30% is a solid panel with the
   pitch and the CTAs. No scroll journey — one page, one job: book. */
const __DSJ = (n) => (props) => React.createElement((window.ScentLabDesignSystem_38c3c1 || {})[n] || 'span', props);
const Button = __DSJ('Button');
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

/* ── fallback bottle (shown only when WebGL init fails) ────────────────── */
function FallbackBottle({ narrow }) {
  return (
    <div aria-hidden="true" data-sl-bottle="" style={{ position:'absolute', left:'50%', top:'50%', pointerEvents:'none',
      transform:'translate(-50%,-50%)' }}>
      <div style={{ position:'absolute', left:'50%', top:'52%', transform:'translate(-50%,-50%)', width:'60vmin', height:'60vmin', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(140,190,150,.5) 0%, transparent 65%)', filter:'blur(24px)' }} />
      <img src={R().bottle} alt="" style={{ position:'relative', height:narrow ? '34vh' : '56vh', width:'auto', display:'block',
        filter:'drop-shadow(0 44px 54px rgba(10,8,5,.45))' }} />
    </div>
  );
}

function Hero({ onLearnMore }) {
  const narrow = useNarrow();

  /* solid panel: left 30% on desktop, bottom 42% on mobile */
  const panelStyle = narrow
    ? { position:'absolute', left:0, right:0, bottom:0, height:'44%', zIndex:12 }
    : { position:'absolute', left:0, top:0, bottom:0, width:'30%', zIndex:12 };

  return (
    <section aria-label="Scent Lab — perfume-making team building" style={{ position:'relative', height:'100vh', overflow:'hidden', background:'var(--ink-900)' }}>

      {/* live background canvas (full-bleed; the panel overlays its 30%) */}
      <div id="sl-fx-mount" style={{ position:'absolute', inset:0, zIndex:6 }} />
      {/* static fallback ground for no-WebGL clients */}
      <div data-sl-bg="" style={{ position:'absolute', inset:0, zIndex:5,
        background:'radial-gradient(120% 90% at 62% 40%, #C8E4C9 0%, #7FB9AE 45%, #2E4A52 100%)' }} />
      <FallbackBottle narrow={narrow} />

      {/* solid panel with the pitch */}
      <div style={{ ...panelStyle, background:'var(--bone-100)', display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow: narrow ? '0 -24px 60px rgba(16,12,9,.18)' : '24px 0 60px rgba(16,12,9,.14)' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'var(--space-lg)',
          padding: narrow ? '28px 24px' : '0 clamp(24px,3vw,56px)', maxWidth:420 }}>
          <div style={{ fontFamily:'var(--font-text)', fontSize:'var(--size-eyebrow)', fontWeight:500,
            letterSpacing:'var(--tracking-eyebrow-wide)', textTransform:'uppercase', color:'var(--gold-600)' }}>
            Tijon · West Palm Beach
          </div>
          <h1 style={{ margin:0, fontFamily:'var(--font-display)', fontWeight:300,
            fontSize: narrow ? 'clamp(1.9rem,7.5vw,2.6rem)' : 'clamp(2.2rem,2.9vw,3.4rem)',
            lineHeight:1.04, letterSpacing:'-.01em', color:'var(--ink-800)', textWrap:'balance' }}>
            A team experience<br /><i>they'll actually remember.</i>
          </h1>
          <div style={{ display:'flex', flexDirection: narrow ? 'row' : 'column', flexWrap:'wrap', gap:'var(--space-sm)',
            justifyContent:'center', marginTop:'var(--space-sm)' }}>
            <Button variant="primary" size={narrow ? 'md' : 'lg'} icon="arrow-right" iconBase={IB}
              href={BOOKING_URL} target="_blank" rel="noopener">Book a team session</Button>
            <Button variant="quiet" size={narrow ? 'md' : 'lg'} iconBase={IB} onClick={onLearnMore}>Learn more</Button>
          </div>
        </div>
      </div>

      {/* header: wordmark + tagline left, CTA right — no burger, no nav */}
      <header style={{ position:'absolute', top:0, left:0, right:0, zIndex:20, display:'flex', alignItems:'flex-start',
        justifyContent:'space-between', padding: narrow ? '18px 20px' : '26px clamp(24px,3vw,56px)' }}>
        <div style={{ color: narrow ? 'var(--ink-800)' : 'var(--ink-800)' }}>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:400, fontSize: narrow ? 20 : 24, letterSpacing:'.01em', lineHeight:1 }}>
            Scent <i>Lab</i>
          </div>
          <div style={{ fontFamily:'var(--font-text)', fontSize: narrow ? 8.5 : 10, fontWeight:500, letterSpacing:'.3em',
            textTransform:'uppercase', marginTop:6, color:'var(--gold-600)' }}>
            for team building
          </div>
        </div>
        {!narrow && (
          <Button variant="primary" icon="arrow-right" iconBase={IB} href={BOOKING_URL} target="_blank" rel="noopener">
            Book a team session
          </Button>
        )}
      </header>
    </section>
  );
}

window.__SL2 = Object.assign(window.__SL2 || {}, { Hero });

})();
