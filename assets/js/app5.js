(() => {
const NavBar = (props) => React.createElement((window.ScentLabDesignSystem_38c3c1 || {}).NavBar || 'div', props);
const BOOKING_URL = 'https://tijon.com/pages/class-sign-up-west-palm-beach?utm_source=ig&utm_medium=social&utm_content=link_in_bio';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "transition": "sweep",
  "grain": true
}/*EDITMODE-END*/;

/* cache wrapper components — a fresh function identity per render makes React
   remount the whole subtree on every App state change */
const SL2 = new Proxy({}, { get: (t, k) => t[k] || (t[k] = (props) => React.createElement(window.__SL2[k], props)) });
function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [pastJourney, setPastJourney] = React.useState(false);
  const [lightScene, setLightScene] = React.useState(true); // scene 1 is light
  const onProgress = (p) => {
    setPastJourney(p >= 6.4);
    const s = window.__SL2.JOURNEY_SCENES[Math.max(0, Math.min(6, Math.round(p)))];
    setLightScene(!!(s && s.light));
  };
  const isNarrow = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
  const nav = { links: isNarrow ? [] : ['Experience'], iconBase: '../../assets/icons', cta: isNarrow ? 'Book now' : 'Book a team session' };
  const goTo = (id) => {
    const map = { 'Experience':'experience' };
    const el = document.getElementById(map[id]);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };
  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
        background: pastJourney ? 'rgba(252,250,246,.9)' : 'transparent',
        backdropFilter: pastJourney ? 'blur(14px)' : 'none',
        boxShadow: pastJourney ? '0 1px 0 rgba(16,12,9,.08)' : 'none',
        transition: 'background .4s ease, box-shadow .4s ease' }}>
        <NavBar {...nav} tone={pastJourney || lightScene ? 'default' : 'inverse'} condensed={pastJourney}
          onNavigate={goTo} onCta={() => window.open(BOOKING_URL, '_blank', 'noopener')} style={{ position: 'static' }} />
      </div>
      <SL2.Journey onProgress={onProgress} mode={tw.transition} grain={tw.grain} />
      <SL2.Experience />
      <SL2.Footer />
      <TweaksPanel>
        <TweakSection label="Cinematic journey" />
        <TweakRadio label="Scene transition" value={tw.transition} options={['dissolve', 'sweep', 'push']}
          onChange={(v) => setTweak('transition', v)} />
        <TweakToggle label="Film grain" value={tw.grain} onChange={(v) => setTweak('grain', v)} />
      </TweaksPanel>
    </div>
  );
}

/* Boot only once everything the page needs exists (bundled script order varies). */
const boot = () => {
  const r = window.__SL2 || {};
  const ready = window.ScentLabDesignSystem_38c3c1 && r.Journey && r.Experience && r.Footer && window.TweaksPanel && !window.TweaksPanel.__stub && window.__resources;
  if (!ready) { setTimeout(boot, 120); return; }
  if (!window.__slRoot) window.__slRoot = ReactDOM.createRoot(document.getElementById('sl-root'));
  window.__slRoot.render(<App />);
};
boot();

})();
