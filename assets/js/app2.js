(() => {
/* Experience content — served inside the "Learn more" popup. */
const __DSS = (n) => (props) => React.createElement((window.ScentLabDesignSystem_38c3c1 || {})[n] || 'span', props);
const Button = __DSS('Button'), StatBlock = __DSS('StatBlock'), Divider = __DSS('Divider'), Icon = __DSS('Icon');
const IB2 = '../../assets/icons';
const BOOKING_URL = 'https://tijon.com/pages/class-sign-up-west-palm-beach?utm_source=ig&utm_medium=social&utm_content=link_in_bio';
const STUDIO_ADDRESS = '480 Hibiscus St Ste 103, West Palm Beach, FL 33401';

function ExperienceContent() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-xl)' }}>
      <div style={{ fontFamily:'var(--font-text)', fontSize:'var(--size-eyebrow)', fontWeight:500,
        letterSpacing:'var(--tracking-eyebrow-wide)', textTransform:'uppercase', color:'var(--gold-600)' }}>
        The experience
      </div>
      <p style={{ margin:0, fontFamily:'var(--font-display)', fontWeight:300, fontSize:'clamp(1.15rem,1.6vw,1.45rem)',
        lineHeight:1.45, color:'var(--ink-700)' }}>
        A luxury fragrance workshop that doubles as the best team building you've booked — one shared brief,
        a working perfumer, and every guest walks out with a bottle of their own unique perfume:
        blended by them, named by them, labeled <i>my perfume</i>.
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:'var(--space-lg)' }}>
        <StatBlock value="90 min" label="Guided master class" />
        <StatBlock value="8–40" label="Guests per session" />
        <StatBlock value="12" label="Raw materials" />
        <StatBlock value="50 ml" label="Your own perfume" />
      </div>
      <Divider />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:'var(--space-lg)' }}>
        {[['flask-conical','Led by a working perfumer','Not event staff with a script — a professional nose guides every blend.'],
          ['users','Built for teams','One brief, many answers. Quiet competition, loud debrief.'],
          ['map-pin','West Palm Beach studio — or yours', STUDIO_ADDRESS + ' — a daylight studio with a bar, or we bring the lab to your venue.'],
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
      </div>
    </div>
  );
}

window.__SL2 = Object.assign(window.__SL2 || {}, { ExperienceContent });

})();
