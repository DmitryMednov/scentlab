(() => {
/* App shell: the one-screen hero + the "Learn more" popup. */
const SL2 = new Proxy({}, { get: (t, k) => t[k] || (t[k] = (props) => React.createElement(window.__SL2[k], props)) });

function LearnMoreModal({ onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label="About the experience" onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:80, display:'flex', alignItems:'center', justifyContent:'center',
        background:'rgba(16,12,9,.55)', backdropFilter:'blur(6px)', padding:'clamp(12px,3vw,40px)' }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ position:'relative', background:'var(--bone-050)', borderRadius:14, maxWidth:760, width:'100%',
          maxHeight:'86vh', overflowY:'auto', padding:'clamp(24px,4vw,48px)', boxShadow:'0 30px 90px rgba(16,12,9,.45)' }}>
        <button onClick={onClose} aria-label="Close"
          style={{ position:'absolute', top:14, right:14, width:36, height:36, border:'none', borderRadius:'50%',
            background:'var(--bone-200)', color:'var(--ink-700)', fontSize:16, cursor:'pointer', lineHeight:1 }}>✕</button>
        <SL2.ExperienceContent />
      </div>
    </div>
  );
}

function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <SL2.Hero onLearnMore={() => setOpen(true)} />
      {open && <LearnMoreModal onClose={() => setOpen(false)} />}
    </div>
  );
}

/* Boot only once everything the page needs exists (bundled script order varies). */
const boot = () => {
  const r = window.__SL2 || {};
  const ready = window.ScentLabDesignSystem_38c3c1 && r.Hero && r.ExperienceContent && window.__resources;
  if (!ready) { setTimeout(boot, 120); return; }
  if (!window.__slRoot) window.__slRoot = ReactDOM.createRoot(document.getElementById('sl-root'));
  window.__slRoot.render(<App />);
};
boot();

})();
