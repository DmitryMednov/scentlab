(() => {
/* Landing sections after the cinematic journey. */
const __DSS = (n) => (props) => React.createElement((window.ScentLabDesignSystem_38c3c1 || {})[n] || 'span', props);
const SectionHeading = __DSS('SectionHeading'), Eyebrow = __DSS('Eyebrow'), Button = __DSS('Button'), StatBlock = __DSS('StatBlock'),
  Divider = __DSS('Divider'), Field = __DSS('Field'), Input = __DSS('Input'), Select = __DSS('Select'), Textarea = __DSS('Textarea'),
  Icon = __DSS('Icon'), Wordmark = __DSS('Wordmark'), Toast = __DSS('Toast');
const IB2 = '../../assets/icons';
const R2 = () => window.__resources || {};
const BOOKING_URL = 'https://tijon.com/pages/class-sign-up-west-palm-beach?utm_source=ig&utm_medium=social&utm_content=link_in_bio';
const STUDIO_ADDRESS = '480 Hibiscus St Ste 103, West Palm Beach, FL 33401';

function Section({ children, tone, style, id }) {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} data-theme={tone === 'dark' ? 'cinematic' : undefined} style={{ background:'var(--surface-page)', padding:'var(--section-y) var(--gutter)', ...style }}>
      <div ref={ref} style={{ maxWidth:'var(--container)', margin:'0 auto', opacity:vis?1:0, transform:vis?'none':'translateY(var(--reveal-distance))',
        transition:'opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)' }}>{children}</div>
    </section>
  );
}

function Experience() {
  return (
    <Section id="experience">
      <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-2xl)' }}>
        <SectionHeading eyebrow="Tijon · West Palm Beach" title={<>A team experience<br /><i>they'll actually remember.</i></>}
          lede="A luxury fragrance workshop that doubles as the best team building you've booked — one shared brief, a working perfumer, and every guest walks out with a bottle of their own unique perfume: blended by them, named by them, labeled my perfume." />
        <div style={{ display:'flex', gap:'var(--space-xl)', flexWrap:'wrap', alignItems:'stretch' }}>
          <StatBlock value="90 min" label="Guided master class" />
          <Divider vertical />
          <StatBlock value="8–40" label="Guests per session" />
          <Divider vertical />
          <StatBlock value="12" label="Raw materials" />
          <Divider vertical />
          <StatBlock value="50 ml" label="Take-home bottle" />
        </div>
        <Divider />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'var(--space-xl)' }}>
          {[['flask-conical','Led by a working perfumer','Not event staff with a script — a professional nose guides every blend.'],
            ['users','Built for teams','One brief, many answers. Quiet competition, loud debrief.'],
            ['map-pin','West Palm Beach studio — or yours','480 Hibiscus St Ste 103 — a daylight studio with a bar, or we bring the lab to your venue.'],
            ['gift','Your own perfume, to keep','Each guest blends, bottles and labels a one-of-one fragrance — my perfume, made by you.']].map(([ic, t, d]) => (
            <div key={t} style={{ display:'flex', gap:'var(--space-md)', alignItems:'flex-start' }}>
              <Icon name={ic} size={20} base={IB2} style={{ color:'var(--gold-600)', marginTop:3 }} />
              <div>
                <div style={{ fontWeight:400, color:'var(--text-primary)', fontSize:'var(--size-body)' }}>{t}</div>
                <div style={{ fontWeight:300, color:'var(--text-muted)', fontSize:'var(--size-body-sm)' }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:'var(--space-sm)', flexWrap:'wrap' }}>
          <Button variant="primary" size="lg" icon="arrow-right" iconBase={IB2} href={BOOKING_URL} target="_blank" rel="noopener">Book a team session</Button>
          <Button variant="secondary" size="lg" iconBase={IB2} href={BOOKING_URL} target="_blank" rel="noopener">Plan a corporate event</Button>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer data-theme="cinematic" style={{ background:'var(--ink-900)', padding:'var(--section-y-tight) var(--gutter) var(--space-2xl)' }}>
      <div style={{ maxWidth:'var(--container)', margin:'0 auto', display:'grid', gap:'var(--space-2xl)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'var(--space-xl)' }}>
          <Wordmark size={34} tone="inverse" lockup="with-locale" />
          <div style={{ display:'flex', alignItems:'center', gap:'var(--space-xl)', flexWrap:'wrap' }}>
            <nav style={{ display:'flex', gap:'var(--space-xl)', flexWrap:'wrap' }}>
              {[['instagram','Instagram','https://www.instagram.com/tijonparfumerie/'],['map-pin', STUDIO_ADDRESS, 'https://maps.google.com/?q=' + encodeURIComponent(STUDIO_ADDRESS)]].map(([ic, label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:8, border:'none', color:'rgba(247,243,236,.72)', fontSize:'var(--size-caption)', fontWeight:300, letterSpacing:'.04em' }}>
                  {ic !== 'instagram' && <Icon name={ic} size={14} base={IB2} />}{label}
                </a>
              ))}
            </nav>
            <Button variant="primary" icon="arrow-right" iconBase={IB2} href={BOOKING_URL} target="_blank" rel="noopener">Book a team session</Button>
          </div>
        </div>
        <Divider tone="inverse" />
        <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'var(--space-md)', fontSize:'var(--size-eyebrow)', fontWeight:400, letterSpacing:'var(--tracking-eyebrow)', textTransform:'uppercase', color:'rgba(247,243,236,.4)' }}>
          <span>{STUDIO_ADDRESS}</span>
          <span>© 2026 Tijon · Scent Lab</span>
        </div>
      </div>
    </footer>
  );
}

window.__SL2 = Object.assign(window.__SL2 || {}, { Experience, Footer });

})();
