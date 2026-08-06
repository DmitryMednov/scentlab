(() => {
/* Landing sections after the cinematic journey. */
const __DSS = (n) => (props) => React.createElement((window.ScentLabDesignSystem_38c3c1 || {})[n] || 'span', props);
const SectionHeading = __DSS('SectionHeading'), Eyebrow = __DSS('Eyebrow'), Button = __DSS('Button'), StatBlock = __DSS('StatBlock'),
  Divider = __DSS('Divider'), Field = __DSS('Field'), Input = __DSS('Input'), Select = __DSS('Select'), Textarea = __DSS('Textarea'),
  Icon = __DSS('Icon'), Wordmark = __DSS('Wordmark'), Toast = __DSS('Toast');
const IB2 = '../../assets/icons';
const R2 = () => window.__resources || {};

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
        <SectionHeading eyebrow="Scent Lab · Miami" title={<>A team experience<br /><i>they'll actually remember.</i></>}
          lede="A luxury fragrance workshop that doubles as the best team building you've booked — one shared brief, a working perfumer, and a bottle each guest blends, names and takes home." />
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
            ['map-pin','Wynwood studio — or yours','A daylight studio with a bar, or we bring the lab to your office or venue.'],
            ['gift','Everyone leaves with proof','Each guest bottles and labels their own fragrance on the spot.']].map(([ic, t, d]) => (
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
          <Button variant="primary" size="lg" icon="arrow-right" iconBase={IB2} href="#booking">Book a workshop</Button>
          <Button variant="secondary" size="lg" iconBase={IB2} href="#booking">Plan a corporate event</Button>
        </div>
      </div>
    </Section>
  );
}

function Booking() {
  const [sent, setSent] = React.useState(false);
  return (
    <Section id="booking" tone="dark" style={{ position:'relative', overflow:'hidden' }}>
      <img src={R2().scene7} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.28 }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(16,12,9,.92) 0%,rgba(16,12,9,.65) 100%)' }} />
      <div style={{ position:'relative', maxWidth:'var(--container)', margin:'0 auto', display:'grid', gridTemplateColumns:'minmax(280px,1fr) minmax(320px,1fr)', gap:'var(--space-3xl)', alignItems:'center' }}>
        <SectionHeading tone="inverse" eyebrow="Booking" title={<>Begin with<br /><i>a conversation.</i></>} lede="Tell us the occasion. A perfumer designs the session around it and replies within one business day." />
        {sent ? (
          <div style={{ display:'grid', gap:'var(--space-lg)', justifyItems:'start' }}>
            <Toast iconBase={IB2} tone="positive" message="Enquiry sent. We reply within one business day." />
            <Button variant="quiet" iconBase={IB2} onClick={() => setSent(false)}>Send another</Button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display:'grid', gap:'var(--space-lg)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-lg)' }}>
              <Field tone="inverse" label="Name" htmlFor="bn"><Input tone="inverse" id="bn" placeholder="Alex Moreau" /></Field>
              <Field tone="inverse" label="Work email" htmlFor="be" required><Input tone="inverse" id="be" type="email" placeholder="you@company.com" /></Field>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-lg)' }}>
              <Field tone="inverse" label="Occasion" htmlFor="bo"><Select tone="inverse" id="bo" iconBase={IB2} options={['Team building','Corporate event','Private party','Client appreciation','Brand activation']} /></Field>
              <Field tone="inverse" label="Headcount" htmlFor="bh"><Input tone="inverse" id="bh" placeholder="18" /></Field>
            </div>
            <Field tone="inverse" label="Anything else" htmlFor="bb"><Textarea tone="inverse" id="bb" rows={2} placeholder="Dates, venue, the mood you're after." /></Field>
            <div style={{ display:'flex', gap:'var(--space-sm)', flexWrap:'wrap', marginTop:'var(--space-sm)' }}>
              <Button variant="primary" size="lg" icon="arrow-right" iconBase={IB2}>Book your workshop</Button>
              <Button variant="quiet" size="lg" iconBase={IB2}>Plan a private event</Button>
              <Button variant="ghost" size="lg" iconBase={IB2} style={{ color:'var(--bone-100)' }}>Request a quote</Button>
            </div>
          </form>
        )}
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
          <nav style={{ display:'flex', gap:'var(--space-xl)', flexWrap:'wrap' }}>
            {[['instagram','Instagram','#'],['phone','+1 (305) 555-0114','tel:+13055550114'],['mail','hello@scentlab.miami','mailto:hello@scentlab.miami']].map(([ic, label, href]) => (
              <a key={label} href={href} style={{ display:'inline-flex', alignItems:'center', gap:8, border:'none', color:'rgba(247,243,236,.72)', fontSize:'var(--size-caption)', fontWeight:300, letterSpacing:'.04em' }}>
                {ic !== 'instagram' && <Icon name={ic} size={14} base={IB2} />}{label}
              </a>
            ))}
          </nav>
        </div>
        <Divider tone="inverse" />
        <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'var(--space-md)', fontSize:'var(--size-eyebrow)', fontWeight:400, letterSpacing:'var(--tracking-eyebrow)', textTransform:'uppercase', color:'rgba(247,243,236,.4)' }}>
          <span>Miami, Florida</span>
          <span>© 2026 Scent Lab</span>
        </div>
      </div>
    </footer>
  );
}

window.__SL2 = Object.assign(window.__SL2 || {}, { Experience, Booking, Footer });

})();
