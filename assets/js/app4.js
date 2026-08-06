/* @ds-bundle: {"format":4,"namespace":"ScentLabDesignSystem_38c3c1","components":[{"name":"Badge","sourcePath":"components/content/Badge.jsx"},{"name":"Divider","sourcePath":"components/content/Divider.jsx"},{"name":"Eyebrow","sourcePath":"components/content/Eyebrow.jsx"},{"name":"SectionHeading","sourcePath":"components/content/SectionHeading.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"Tag","sourcePath":"components/content/Tag.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"SceneProgress","sourcePath":"components/navigation/SceneProgress.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"ExperienceCard","sourcePath":"components/surfaces/ExperienceCard.jsx"},{"name":"GalleryTile","sourcePath":"components/surfaces/GalleryTile.jsx"},{"name":"Testimonial","sourcePath":"components/surfaces/Testimonial.jsx"}],"sourceHashes":{"components/content/Badge.jsx":"20887170c50b","components/content/Divider.jsx":"09448c66cecf","components/content/Eyebrow.jsx":"32c130af16ad","components/content/SectionHeading.jsx":"ed83e81e53e7","components/content/StatBlock.jsx":"c868582d8a2f","components/content/Tag.jsx":"eead61b6f9ce","components/core/Button.jsx":"7f5b8879dd1b","components/core/Icon.jsx":"f2ce2d5c303f","components/core/IconButton.jsx":"a5fa63bde2b5","components/core/Wordmark.jsx":"18004434ad06","components/feedback/Dialog.jsx":"43deb70a3905","components/feedback/Toast.jsx":"71d14cb15a88","components/feedback/Tooltip.jsx":"53353f5c7c1a","components/forms/Checkbox.jsx":"ac4c088f04b2","components/forms/Field.jsx":"b86e44cc0830","components/forms/Input.jsx":"3488c51c4217","components/forms/Radio.jsx":"e56dbaeb002d","components/forms/Select.jsx":"02ab0f7f93fd","components/forms/Switch.jsx":"00c762ab860a","components/forms/Textarea.jsx":"0a346623b695","components/navigation/NavBar.jsx":"e4ab3e28b299","components/navigation/SceneProgress.jsx":"180e01d4eb78","components/navigation/Tabs.jsx":"a11ca47cd7d5","components/surfaces/Card.jsx":"e92a07255404","components/surfaces/ExperienceCard.jsx":"7ea03d3bb4c8","components/surfaces/GalleryTile.jsx":"3332913c961a","components/surfaces/Testimonial.jsx":"a34ca35dbd91","ui_kits/website/app.jsx":"374b0caadfd8","ui_kits/website/journey.jsx":"0ee86fbf4bba","ui_kits/website/sections.jsx":"cc22dd43d758","ui_kits/website/tweaks-panel.jsx":"d259e3a86f73"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ScentLabDesignSystem_38c3c1 = window.ScentLabDesignSystem_38c3c1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  children,
  tone = 'neutral',
  style,
  ...rest
}) {
  const map = {
    neutral: {
      background: 'var(--bone-200)',
      color: 'var(--ink-700)',
      border: '1px solid transparent'
    },
    accent: {
      background: 'var(--gold-500)',
      color: 'var(--ink-900)',
      border: '1px solid var(--gold-500)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid var(--border-subtle)'
    },
    glass: {
      background: 'rgba(252,250,246,.16)',
      color: 'var(--bone-100)',
      border: '1px solid rgba(247,243,236,.28)',
      backdropFilter: 'blur(var(--blur-glass))'
    },
    positive: {
      background: 'rgba(79,107,74,.14)',
      color: 'var(--status-positive)',
      border: '1px solid transparent'
    },
    critical: {
      background: 'rgba(160,61,38,.12)',
      color: 'var(--status-critical)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '5px 11px 4px',
      borderRadius: 'var(--radius-badge)',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      ...map[tone],
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Badge.jsx", error: String((e && e.message) || e) }); }

// components/content/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Divider({
  tone = 'default',
  inset = 0,
  vertical = false,
  style,
  ...rest
}) {
  const color = tone === 'inverse' ? 'var(--border-inverse)' : tone === 'accent' ? 'var(--gold-500)' : 'var(--border-hairline)';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator"
  }, rest, {
    style: {
      flex: '0 0 auto',
      background: color,
      ...(vertical ? {
        width: 1,
        alignSelf: 'stretch',
        marginBlock: inset
      } : {
        height: 1,
        width: '100%',
        marginInline: inset
      }),
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Divider.jsx", error: String((e && e.message) || e) }); }

// components/content/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The small uppercase label above every section heading. Numbered form is used
   for the seven cinematic scenes ("01 — ORIGIN"). */
function Eyebrow({
  children,
  index,
  tone = 'accent',
  wide = false,
  style,
  ...rest
}) {
  const color = tone === 'accent' ? 'var(--text-accent)' : tone === 'muted' ? 'var(--text-muted)' : tone === 'inverse' ? 'rgba(247,243,236,.66)' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: wide ? 'var(--tracking-eyebrow-wide)' : 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      lineHeight: 1,
      color,
      ...style
    }
  }), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.9em',
      fontWeight: 300,
      letterSpacing: 0,
      textTransform: 'none',
      lineHeight: 1
    }
  }, String(index).padStart(2, '0')), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 1,
      background: 'currentColor',
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeading({
  eyebrow,
  index,
  title,
  lede,
  align = 'left',
  level = 2,
  tone = 'default',
  maxWidth,
  style,
  ...rest
}) {
  const H = 'h' + level;
  const inverse = tone === 'inverse';
  const size = level === 1 ? 'var(--size-display-1)' : level === 2 ? 'var(--size-display-2)' : 'var(--size-display-3)';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      maxWidth: maxWidth || (align === 'center' ? 'var(--container-narrow)' : undefined),
      marginInline: align === 'center' ? 'auto' : undefined,
      ...style
    }
  }), eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    index: index,
    tone: inverse ? 'inverse' : 'accent'
  }, eyebrow), React.createElement(H, {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: size,
      lineHeight: level === 1 ? 'var(--leading-display)' : 'var(--leading-display-loose)',
      letterSpacing: 'var(--tracking-display)',
      color: inverse ? 'var(--bone-100)' : 'var(--text-primary)',
      textWrap: 'balance'
    }
  }, title), lede && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--size-body-lg)',
      fontWeight: 300,
      lineHeight: 'var(--leading-body)',
      color: inverse ? 'rgba(247,243,236,.72)' : 'var(--text-body)',
      maxWidth: 'var(--measure-prose)'
    }
  }, lede));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/content/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Large serif numeral + label. Used in "Why us" and the workshop spec strip. */
function StatBlock({
  value,
  label,
  detail,
  tone = 'default',
  align = 'left',
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xs)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: 'clamp(2.5rem,4.5vw,4rem)',
      lineHeight: 0.94,
      letterSpacing: 'var(--tracking-display)',
      color: inverse ? 'var(--bone-100)' : 'var(--text-primary)'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'rgba(247,243,236,.62)' : 'var(--text-muted)'
    }
  }, label), detail && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 'var(--size-body-sm)',
      fontWeight: 300,
      lineHeight: 'var(--leading-tight)',
      color: inverse ? 'rgba(247,243,236,.72)' : 'var(--text-body)',
      maxWidth: 'var(--measure-caption)'
    }
  }, detail));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Scent Lab uses the Lucide line set (2px stroke, 24px grid), self-hosted in
   assets/icons. The SVG markup is fetched once, cached, and inlined so strokes
   inherit currentColor. */
const _iconCache = {};
function Icon({
  name,
  size = 20,
  base = 'assets/icons',
  strokeAlign = true,
  style,
  ...rest
}) {
  const url = base + '/' + name + '.svg';
  const [svg, setSvg] = React.useState(_iconCache[url] || null);
  React.useEffect(() => {
    let alive = true;
    if (_iconCache[url]) {
      setSvg(_iconCache[url]);
      return;
    }
    fetch(url).then(r => r.ok ? r.text() : Promise.reject(r.status)).then(t => {
      const cleaned = t.replace('<svg ', '<svg style="width:100%;height:100%;display:block" ');
      _iconCache[url] = cleaned;
      if (alive) setSvg(cleaned);
    }).catch(() => {});
    return () => {
      alive = false;
    };
  }, [url]);
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'inline-block',
      flex: '0 0 auto',
      width: size,
      height: size,
      color: 'inherit',
      verticalAlign: strokeAlign ? '-0.15em' : 'baseline',
      ...style
    },
    dangerouslySetInnerHTML: svg ? {
      __html: svg
    } : undefined
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Selectable scent-note / experience-type chip. Interactive sibling of Badge. */
function Tag({
  children,
  selected = false,
  icon,
  iconBase = 'assets/icons',
  onClick,
  tone = 'default',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!onClick;
  const inverse = tone === 'inverse';
  const idle = inverse ? {
    background: 'transparent',
    color: 'rgba(247,243,236,.78)',
    borderColor: 'rgba(247,243,236,.24)'
  } : {
    background: 'transparent',
    color: 'var(--text-body)',
    borderColor: 'var(--border-subtle)'
  };
  const on = inverse ? {
    background: 'var(--bone-100)',
    color: 'var(--ink-900)',
    borderColor: 'var(--bone-100)'
  } : {
    background: 'var(--ink-800)',
    color: 'var(--bone-100)',
    borderColor: 'var(--ink-800)'
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    "aria-pressed": interactive ? selected : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '9px 16px',
      borderRadius: 'var(--radius-pill)',
      borderWidth: 1,
      borderStyle: 'solid',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-caption)',
      fontWeight: 400,
      letterSpacing: '0.02em',
      lineHeight: 1,
      cursor: interactive ? 'pointer' : 'default',
      transition: 'background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)',
      ...(selected ? on : idle),
      ...(hover && !selected && interactive ? {
        borderColor: 'var(--gold-500)',
        color: 'var(--text-accent)'
      } : null),
      ...style
    }
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14,
    base: iconBase,
    strokeAlign: false
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PAD = {
  sm: '9px 20px',
  md: '13px 28px',
  lg: '17px 40px'
};
const FS = {
  sm: 11,
  md: 12,
  lg: 13
};
function surface(variant) {
  switch (variant) {
    case 'primary':
      return {
        background: 'var(--gold-500)',
        color: 'var(--ink-900)',
        border: '1px solid var(--gold-500)'
      };
    case 'secondary':
      return {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-strong)'
      };
    case 'inverse':
      return {
        background: 'var(--bone-100)',
        color: 'var(--ink-900)',
        border: '1px solid var(--bone-100)'
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid transparent'
      };
    case 'quiet':
      return {
        background: 'var(--surface-glass)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-hairline)',
        backdropFilter: 'blur(var(--blur-glass))'
      };
    default:
      return {};
  }
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  iconBase = 'assets/icons',
  fullWidth = false,
  disabled = false,
  href,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const As = href ? 'a' : 'button';
  const base = surface(variant);
  const lift = variant === 'ghost' || variant === 'secondary';
  return /*#__PURE__*/React.createElement(As, _extends({
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: As === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest, {
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: PAD[size],
      fontFamily: 'var(--font-text)',
      fontSize: FS[size],
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      lineHeight: 1,
      borderRadius: 'var(--radius-button)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      transition: 'background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out),opacity var(--dur-fast) var(--ease-out)',
      opacity: disabled ? 0.38 : 1,
      transform: press ? 'scale(var(--press-scale))' : 'none',
      ...base,
      ...(hover && !disabled ? variant === 'primary' ? {
        background: 'var(--gold-600)',
        borderColor: 'var(--gold-600)'
      } : variant === 'inverse' ? {
        background: '#fff',
        borderColor: '#fff'
      } : lift ? {
        borderColor: 'var(--gold-500)',
        color: 'var(--text-accent)'
      } : {
        background: 'var(--surface-raised)'
      } : null),
      ...style
    }
  }), icon && iconPosition === 'left' && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 14 : 16,
    base: iconBase
  }), /*#__PURE__*/React.createElement("span", null, children), icon && iconPosition === 'right' && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 14 : 16,
    base: iconBase,
    style: {
      transform: hover ? 'translateX(3px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BOX = {
  sm: 32,
  md: 40,
  lg: 48
};
function IconButton({
  icon,
  label,
  variant = 'quiet',
  size = 'md',
  iconBase = 'assets/icons',
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const skin = variant === 'solid' ? {
    background: 'var(--ink-800)',
    color: 'var(--bone-100)',
    border: '1px solid var(--ink-800)'
  } : variant === 'outline' ? {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)'
  } : variant === 'bare' ? {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid transparent'
  } : {
    background: 'var(--surface-glass)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-hairline)',
    backdropFilter: 'blur(var(--blur-glass))'
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: 'inline-grid',
      placeItems: 'center',
      width: BOX[size],
      height: BOX[size],
      borderRadius: 'var(--radius-circle)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.38 : 1,
      transition: 'background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)',
      ...skin,
      ...(hover && !disabled ? {
        borderColor: 'var(--gold-500)',
        color: variant === 'solid' ? 'var(--gold-300)' : 'var(--text-accent)'
      } : null),
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 15 : size === 'lg' ? 20 : 17,
    base: iconBase,
    strokeAlign: false
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Scent Lab has no supplied logotype — the wordmark IS the brand name set in
   Cormorant Garamond Light. Do not draw a mark. */
function Wordmark({
  size = 22,
  tone = 'primary',
  lockup = 'inline',
  style,
  ...rest
}) {
  const color = tone === 'inverse' ? 'var(--bone-100)' : tone === 'accent' ? 'var(--gold-500)' : 'var(--text-primary)';
  const stacked = lockup === 'stacked';
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      flexDirection: stacked ? 'column' : 'row',
      alignItems: stacked ? 'center' : 'baseline',
      gap: stacked ? 4 : '0.28em',
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: '0.01em',
      color,
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", null, "Scent"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Lab"), lockup === 'with-locale' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: Math.max(9, size * 0.32),
      fontWeight: 400,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      opacity: 0.66,
      marginLeft: '0.4em'
    }
  }, "Miami"));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Centred sheet over a warm scrim with a light blur. 4px radius. */
function Dialog({
  open = true,
  title,
  eyebrow,
  children,
  footer,
  onClose,
  width = 560,
  iconBase = 'assets/icons',
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--space-lg)',
      background: 'var(--surface-scrim)',
      backdropFilter: 'blur(var(--blur-scrim))'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, rest, {
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: width,
      maxHeight: '86vh',
      overflowY: 'auto',
      padding: 'var(--space-2xl)',
      background: 'var(--bone-050)',
      borderRadius: 'var(--radius-dialog)',
      boxShadow: 'var(--shadow-lg)',
      ...style
    }
  }), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    variant: "bare",
    size: "sm",
    iconBase: iconBase,
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 14,
      right: 14
    }
  }), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)',
      marginBottom: 'var(--space-sm)'
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 var(--space-lg)',
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: '2rem',
      lineHeight: 1.12,
      letterSpacing: 'var(--tracking-heading)',
      color: 'var(--text-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--size-body)',
      fontWeight: 300,
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-body)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)',
      justifyContent: 'flex-end',
      marginTop: 'var(--space-2xl)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Bottom-centred confirmation. Dark, hairline, one line of text. */
function Toast({
  message,
  tone = 'neutral',
  icon,
  action,
  onDismiss,
  iconBase = 'assets/icons',
  style,
  ...rest
}) {
  const glyph = icon || (tone === 'positive' ? 'circle-check' : tone === 'critical' ? 'circle-alert' : 'info');
  const accent = tone === 'positive' ? 'var(--gold-300)' : tone === 'critical' ? '#E08C74' : 'rgba(247,243,236,.7)';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status"
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-sm)',
      padding: '13px 18px',
      background: 'var(--ink-800)',
      border: '1px solid var(--border-inverse)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-lg)',
      color: 'var(--bone-100)',
      fontSize: 'var(--size-body-sm)',
      fontWeight: 300,
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: glyph,
    size: 16,
    base: iconBase,
    strokeAlign: false,
    style: {
      color: accent
    }
  }), /*#__PURE__*/React.createElement("span", null, message), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: action.onClick,
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      marginLeft: 6,
      cursor: 'pointer',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-300)'
    }
  }, action.label), onDismiss && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      marginLeft: 4,
      cursor: 'pointer',
      color: 'rgba(247,243,236,.5)',
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14,
    base: iconBase,
    strokeAlign: false
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Hover label for icon-only controls and scent-note glyphs. */
function Tooltip({
  label,
  side = 'top',
  children,
  style,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%,-8px)'
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translate(-50%,8px)'
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translate(-8px,-50%)'
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translate(8px,-50%)'
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, rest, {
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }), children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 50,
      padding: '6px 10px',
      background: 'var(--ink-800)',
      color: 'var(--bone-100)',
      borderRadius: 'var(--radius-hair)',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      opacity: show ? 1 : 0,
      transition: 'opacity var(--dur-fast) var(--ease-out)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Square, 2px radius, ink fill when checked. */
function Checkbox({
  label,
  description,
  checked = false,
  disabled = false,
  tone = 'default',
  iconBase = 'assets/icons',
  onChange,
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("label", _extends({}, rest, {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)',
      alignItems: description ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      width: 18,
      height: 18,
      marginTop: description ? 3 : 0,
      borderRadius: 'var(--radius-hair)',
      border: '1px solid ' + (checked ? 'var(--ink-800)' : inverse ? 'rgba(247,243,236,.32)' : 'var(--border-strong)'),
      background: checked ? inverse ? 'var(--bone-100)' : 'var(--ink-800)' : 'transparent',
      color: checked ? inverse ? 'var(--ink-900)' : 'var(--bone-100)' : 'transparent',
      transition: 'background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 12,
    base: iconBase,
    strokeAlign: false
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-body-sm)',
      fontWeight: 300,
      color: inverse ? 'var(--bone-100)' : 'var(--text-primary)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-caption)',
      fontWeight: 300,
      lineHeight: 'var(--leading-tight)',
      color: inverse ? 'rgba(247,243,236,.52)' : 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Label + control + help/error wrapper. Labels are uppercase micro-type. */
function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  tone = 'default',
  children,
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xs)',
      ...style
    }
  }), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'rgba(247,243,236,.62)' : 'var(--text-muted)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-500)',
      marginLeft: 4
    }
  }, "*")), children, (error || hint) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--size-caption)',
      fontWeight: 300,
      lineHeight: 'var(--leading-tight)',
      color: error ? 'var(--status-critical)' : inverse ? 'rgba(247,243,236,.52)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Underline-only input. No filled boxes anywhere in this brand. */
function Input({
  tone = 'default',
  invalid = false,
  style,
  onFocus,
  onBlur,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inverse = tone === 'inverse';
  const line = invalid ? 'var(--status-critical)' : focus ? 'var(--gold-500)' : inverse ? 'rgba(247,243,236,.24)' : 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("input", _extends({
    "aria-invalid": invalid || undefined,
    onFocus: e => {
      setFocus(true);
      onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      onBlur?.(e);
    }
  }, rest, {
    style: {
      width: '100%',
      padding: '13px 0 12px',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid ' + line,
      borderRadius: 0,
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-body)',
      fontWeight: 300,
      color: inverse ? 'var(--bone-100)' : 'var(--text-primary)',
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease-out)',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  description,
  checked = false,
  disabled = false,
  name,
  value,
  tone = 'default',
  onChange,
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("label", _extends({}, rest, {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)',
      alignItems: description ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      width: 18,
      height: 18,
      marginTop: description ? 3 : 0,
      borderRadius: 'var(--radius-circle)',
      border: '1px solid ' + (checked ? 'var(--ink-800)' : inverse ? 'rgba(247,243,236,.32)' : 'var(--border-strong)'),
      transition: 'border-color var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 'var(--radius-circle)',
      background: inverse ? 'var(--bone-100)' : 'var(--ink-800)',
      transform: checked ? 'scale(1)' : 'scale(0)',
      transition: 'transform var(--dur-fast) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-body-sm)',
      fontWeight: 300,
      color: inverse ? 'var(--bone-100)' : 'var(--text-primary)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-caption)',
      fontWeight: 300,
      lineHeight: 'var(--leading-tight)',
      color: inverse ? 'rgba(247,243,236,.52)' : 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  options = [],
  tone = 'default',
  invalid = false,
  iconBase = 'assets/icons',
  style,
  onFocus,
  onBlur,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inverse = tone === 'inverse';
  const line = invalid ? 'var(--status-critical)' : focus ? 'var(--gold-500)' : inverse ? 'rgba(247,243,236,.24)' : 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: e => {
      setFocus(true);
      onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      onBlur?.(e);
    }
  }, rest, {
    style: {
      appearance: 'none',
      width: '100%',
      padding: '13px 28px 12px 0',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid ' + line,
      borderRadius: 0,
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-body)',
      fontWeight: 300,
      color: inverse ? 'var(--bone-100)' : 'var(--text-primary)',
      outline: 'none',
      cursor: 'pointer',
      transition: 'border-color var(--dur-base) var(--ease-out)'
    }
  }), options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, label);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    base: iconBase,
    strokeAlign: false,
    style: {
      position: 'absolute',
      right: 2,
      pointerEvents: 'none',
      color: inverse ? 'rgba(247,243,236,.62)' : 'var(--text-muted)'
    }
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked = false,
  disabled = false,
  tone = 'default',
  onChange,
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("label", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: '0 0 auto',
      width: 40,
      height: 22,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--ink-800)' : inverse ? 'rgba(247,243,236,.16)' : 'var(--bone-300)',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 21 : 3,
      width: 16,
      height: 16,
      borderRadius: 'var(--radius-circle)',
      background: 'var(--bone-050)',
      boxShadow: 'var(--shadow-xs)',
      transition: 'left var(--dur-base) var(--ease-out)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-body-sm)',
      fontWeight: 300,
      color: inverse ? 'var(--bone-100)' : 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  tone = 'default',
  invalid = false,
  rows = 4,
  style,
  onFocus,
  onBlur,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inverse = tone === 'inverse';
  const line = invalid ? 'var(--status-critical)' : focus ? 'var(--gold-500)' : inverse ? 'rgba(247,243,236,.24)' : 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    "aria-invalid": invalid || undefined,
    onFocus: e => {
      setFocus(true);
      onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      onBlur?.(e);
    }
  }, rest, {
    style: {
      width: '100%',
      padding: '13px 0 12px',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid ' + line,
      borderRadius: 0,
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-body)',
      fontWeight: 300,
      lineHeight: 'var(--leading-body)',
      color: inverse ? 'var(--bone-100)' : 'var(--text-primary)',
      outline: 'none',
      resize: 'vertical',
      transition: 'border-color var(--dur-base) var(--ease-out)',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Fixed, transparent over the cinematic scenes; condenses into a glass bar once
   the page scrolls past the first viewport. */
function NavBar({
  links = [],
  active,
  tone = 'inverse',
  condensed = false,
  cta = 'Book a workshop',
  onCta,
  onNavigate,
  iconBase = 'assets/icons',
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  const text = inverse ? 'rgba(247,243,236,.82)' : 'var(--text-body)';
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-xl)',
      height: condensed ? 'var(--nav-height-compact)' : 'var(--nav-height)',
      paddingInline: 'var(--gutter)',
      background: condensed ? inverse ? 'var(--surface-glass-dark)' : 'var(--surface-glass)' : 'transparent',
      backdropFilter: condensed ? 'blur(var(--blur-glass))' : 'none',
      borderBottom: '1px solid ' + (condensed ? inverse ? 'var(--border-inverse)' : 'var(--border-hairline)' : 'transparent'),
      transition: 'height var(--dur-base) var(--ease-out),background var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: condensed ? 19 : 22,
    tone: inverse ? 'inverse' : 'primary'
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-xl)'
    }
  }, links.map(l => {
    const label = typeof l === 'string' ? l : l.label;
    const id = typeof l === 'string' ? l : l.id || l.label;
    const on = active === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      onClick: () => onNavigate?.(id),
      style: {
        background: 'none',
        border: 'none',
        padding: '4px 0',
        cursor: 'pointer',
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--size-eyebrow)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: on ? inverse ? 'var(--bone-100)' : 'var(--text-primary)' : text,
        borderBottom: '1px solid ' + (on ? 'var(--gold-500)' : 'transparent'),
        transition: 'color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)'
      }
    }, label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "menu",
    label: "Menu",
    variant: "bare",
    size: "sm",
    iconBase: iconBase,
    style: {
      color: text
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: inverse ? 'inverse' : 'primary',
    size: "sm",
    onClick: onCta,
    iconBase: iconBase
  }, cta)));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SceneProgress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Fixed right-edge rail marking the seven cinematic scenes. The active scene
   shows its name; the rest are hairline ticks. */
function SceneProgress({
  scenes = [],
  active = 0,
  onSelect,
  position = 'right',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      position: 'fixed',
      top: '50%',
      transform: 'translateY(-50%)',
      [position]: 'var(--gutter)',
      zIndex: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      alignItems: position === 'right' ? 'flex-end' : 'flex-start',
      ...style
    }
  }), scenes.map((s, i) => {
    const on = i === active;
    const label = typeof s === 'string' ? s : s.label;
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      type: "button",
      onClick: () => onSelect?.(i),
      style: {
        display: 'flex',
        flexDirection: position === 'right' ? 'row' : 'row-reverse',
        alignItems: 'center',
        gap: 10,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        color: on ? 'var(--bone-100)' : 'rgba(247,243,236,.42)',
        transition: 'color var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--size-eyebrow)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateX(6px)',
        transition: 'opacity var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)',
        whiteSpace: 'nowrap'
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        width: on ? 28 : 14,
        height: 1,
        background: on ? 'var(--gold-400)' : 'currentColor',
        transition: 'width var(--dur-base) var(--ease-out),background var(--dur-base) var(--ease-out)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { SceneProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SceneProgress.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Underline tabs. Uppercase micro-type; the active rule is gold. */
function Tabs({
  items = [],
  value,
  onChange,
  tone = 'default',
  align = 'left',
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist"
  }, rest, {
    style: {
      display: 'flex',
      gap: 'var(--space-xl)',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      borderBottom: '1px solid ' + (inverse ? 'var(--border-inverse)' : 'var(--border-hairline)'),
      ...style
    }
  }), items.map(it => {
    const id = typeof it === 'string' ? it : it.id;
    const label = typeof it === 'string' ? it : it.label;
    const on = value === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => onChange?.(id),
      style: {
        background: 'none',
        border: 'none',
        padding: '0 0 14px',
        marginBottom: -1,
        cursor: 'pointer',
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--size-eyebrow)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        color: on ? inverse ? 'var(--bone-100)' : 'var(--text-primary)' : inverse ? 'rgba(247,243,236,.52)' : 'var(--text-muted)',
        borderBottom: '1px solid ' + (on ? 'var(--gold-500)' : 'transparent'),
        transition: 'color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The base surface. Near-square corners (2px), hairline border, no shadow at
   rest — shadow only appears on the "raised" variant while hovered. */
function Card({
  children,
  variant = 'plain',
  padding = 'var(--space-xl)',
  interactive = false,
  href,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const As = href ? 'a' : onClick ? 'button' : 'div';
  const skin = {
    plain: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)'
    },
    bare: {
      background: 'transparent',
      border: '1px solid var(--border-hairline)'
    },
    sunken: {
      background: 'var(--surface-sunken)',
      border: '1px solid transparent'
    },
    raised: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      boxShadow: 'var(--shadow-sm)'
    },
    inverse: {
      background: 'var(--ink-700)',
      border: '1px solid var(--border-inverse)'
    },
    glass: {
      background: 'var(--surface-glass)',
      border: '1px solid var(--border-hairline)',
      backdropFilter: 'blur(var(--blur-glass))'
    }
  }[variant];
  const on = interactive || href || onClick;
  return /*#__PURE__*/React.createElement(As, _extends({
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'inherit',
      padding,
      borderRadius: 'var(--radius-card)',
      color: variant === 'inverse' ? 'var(--bone-100)' : 'var(--text-body)',
      textDecoration: 'none',
      cursor: on ? 'pointer' : 'default',
      transition: 'box-shadow var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)',
      ...skin,
      ...(on && hover ? {
        boxShadow: 'var(--shadow-md)',
        borderColor: 'var(--border-subtle)',
        transform: 'translateY(var(--hover-lift))'
      } : null),
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ExperienceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The primary marketing card: full-bleed photograph, protection gradient,
   uppercase title and one-line promise. Ken-Burns scale on hover. */
function ExperienceCard({
  title,
  blurb,
  image,
  icon,
  meta,
  iconBase = 'assets/icons',
  ratio = '3 / 4',
  href,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const As = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(As, _extends({
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      position: 'relative',
      display: 'block',
      aspectRatio: ratio,
      overflow: 'hidden',
      borderRadius: 'var(--radius-image)',
      background: 'var(--ink-800)',
      textDecoration: 'none',
      cursor: href || onClick ? 'pointer' : 'default',
      ...style
    }
  }), image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(var(--hover-image-scale))' : 'scale(1)',
      transition: 'transform var(--dur-cinematic) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-full)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'rgba(247,243,236,.82)'
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 26,
    base: iconBase,
    strokeAlign: false
  }) : /*#__PURE__*/React.createElement("span", null), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase'
    }
  }, meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xs)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'clamp(1.5rem,2.2vw,2rem)',
      lineHeight: 1.08,
      letterSpacing: 'var(--tracking-heading)',
      color: 'var(--bone-100)'
    }
  }, title), blurb && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--size-body-sm)',
      fontWeight: 300,
      lineHeight: 'var(--leading-tight)',
      color: 'rgba(247,243,236,.74)',
      maxWidth: 'var(--measure-caption)'
    }
  }, blurb), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 'var(--space-xs)',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-300)',
      opacity: hover ? 1 : 0.72,
      transition: 'opacity var(--dur-base) var(--ease-out)'
    }
  }, "Explore", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 14,
    base: iconBase,
    style: {
      transform: hover ? 'translateX(4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  })))));
}
Object.assign(__ds_scope, { ExperienceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ExperienceCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GalleryTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Editorial image plate with an optional minimal caption below (Apple-like
   spacing: caption sits outside the frame, never on top of it). */
function GalleryTile({
  image,
  caption,
  credit,
  ratio = '4 / 5',
  tone = 'default',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("figure", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: ratio,
      overflow: 'hidden',
      borderRadius: 'var(--radius-image)',
      background: 'var(--bone-200)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: typeof caption === 'string' ? caption : '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(var(--hover-image-scale))' : 'scale(1)',
      transition: 'transform var(--dur-cinematic) var(--ease-out)'
    }
  })), (caption || credit) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-caption)',
      fontWeight: 300,
      lineHeight: 'var(--leading-tight)',
      color: inverse ? 'rgba(247,243,236,.72)' : 'var(--text-body)',
      maxWidth: 'var(--measure-caption)'
    }
  }, caption), credit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'rgba(247,243,236,.48)' : 'var(--text-muted)',
      whiteSpace: 'nowrap'
    }
  }, credit)));
}
Object.assign(__ds_scope, { GalleryTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GalleryTile.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Testimonial.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Serif pull quote, hairline rule, then attribution with a real photograph. */
function Testimonial({
  quote,
  name,
  role,
  company,
  avatar,
  tone = 'default',
  size = 'md',
  iconBase = 'assets/icons',
  style,
  ...rest
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("blockquote", _extends({}, rest, {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xl)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "quote",
    size: 20,
    base: iconBase,
    style: {
      color: inverse ? 'var(--gold-400)' : 'var(--gold-500)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontStyle: 'italic',
      fontSize: size === 'lg' ? 'var(--size-display-3)' : 'clamp(1.375rem,2vw,1.75rem)',
      lineHeight: 1.32,
      letterSpacing: 'var(--tracking-heading)',
      color: inverse ? 'var(--bone-100)' : 'var(--text-primary)',
      maxWidth: '28ch'
    }
  }, quote), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)'
    }
  }, avatar && /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: "",
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-circle)',
      objectFit: 'cover',
      filter: 'saturate(.9)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-body-sm)',
      fontWeight: 400,
      color: inverse ? 'var(--bone-100)' : 'var(--text-primary)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'rgba(247,243,236,.52)' : 'var(--text-muted)'
    }
  }, [role, company].filter(Boolean).join(' · ')))));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Testimonial.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  NavBar
} = window.ScentLabDesignSystem_38c3c1 || {};
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "transition": "sweep",
  "grain": true
} /*EDITMODE-END*/;
function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [pastJourney, setPastJourney] = React.useState(false);
  const [lightScene, setLightScene] = React.useState(true); // scene 1 is light
  const onProgress = p => {
    setPastJourney(p >= 6.4);
    const s = window.JOURNEY_SCENES[Math.max(0, Math.min(6, Math.round(p)))];
    setLightScene(!!(s && s.light));
  };
  const nav = {
    links: ['Experience', 'Contact'],
    iconBase: '../../assets/icons'
  };
  const goTo = id => {
    const map = {
      'Experience': 'experience',
      'Contact': 'booking'
    };
    const el = document.getElementById(map[id]);
    if (el) window.scrollTo({
      top: el.offsetTop - 60,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement(NavBar, _extends({}, nav, {
    tone: pastJourney || lightScene ? 'default' : 'inverse',
    condensed: pastJourney,
    onNavigate: goTo,
    onCta: () => goTo('Contact'),
    style: {
      position: 'static'
    }
  }))), /*#__PURE__*/React.createElement(Journey, {
    onProgress: onProgress,
    mode: tw.transition,
    grain: tw.grain
  }), /*#__PURE__*/React.createElement(Experience, null), /*#__PURE__*/React.createElement(Booking, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Cinematic journey"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Scene transition",
    value: tw.transition,
    options: ['dissolve', 'sweep', 'push'],
    onChange: v => setTweak('transition', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Film grain",
    value: tw.grain,
    onChange: v => setTweak('grain', v)
  })));
}

/* If the design-system bundle wasn't compiled yet when the page loaded,
   poll for it and reload once it exists — keeps the page from black-screening. */
if (window.ScentLabDesignSystem_38c3c1) {
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
} else {
  const retry = n => {
    const el = document.createElement('script');
    el.src = '../../_ds_bundle.js?retry=' + n;
    el.onload = () => location.reload();
    el.onerror = () => {
      el.remove();
      if (n < 40) setTimeout(() => retry(n + 1), 800);
    };
    document.head.appendChild(el);
  };
  retry(1);
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/journey.jsx
try { (() => {
/* The seven-scene cinematic opening — v2.
   One fixed, always-in-focus bottle (cut from the citrus plate) holds the
   center while environments transform behind it (brief: "the bottle should
   always stay in focus while the world around it changes").
   Three transition modes (dissolve / sweep / push) exposed as Tweaks. */
const {
  Eyebrow,
  Button,
  SceneProgress
} = window.ScentLabDesignSystem_38c3c1 || {};
const IB = '../../assets/icons';
const IMG = '../../assets/imagery/';
const SCENES = [{
  id: 'origin',
  label: 'Origin',
  title: 'A clean beginning',
  feelings: ['Freshness.', 'Purity.', 'Anticipation.'],
  img: IMG + 'scene-01-ice-mint.png',
  pos: '100% 22%',
  zoom: 2.0,
  light: true,
  glow: 'rgba(140,190,150,.5)',
  tint: 'sepia(.3) hue-rotate(60deg) saturate(1.6) brightness(1.12)'
}, {
  id: 'warmth',
  label: 'Warmth',
  title: 'Warmth, rising',
  feelings: ['Deep.', 'Slow.', 'Comfortable.'],
  img: IMG + 'scene-02-coffee-cream.png',
  pos: '2% 72%',
  zoom: 1.9,
  light: false,
  glow: 'rgba(200,140,70,.55)',
  tint: 'sepia(.9) hue-rotate(-10deg) saturate(1.8) brightness(1.05)'
}, {
  id: 'spark',
  label: 'Spark',
  title: 'A brighter pulse',
  feelings: ['Energy.', 'Creativity.', 'Joy.'],
  img: IMG + 'scene-03-citrus.png',
  pos: '100% 62%',
  zoom: 2.05,
  light: true,
  glow: 'rgba(240,170,60,.5)',
  tint: 'sepia(.8) hue-rotate(-25deg) saturate(2) brightness(1.12)'
}, {
  id: 'flow',
  label: 'Flow',
  title: 'Let it move you',
  feelings: ['Freedom.', 'Clarity.', 'Motion.'],
  atmosphere: 'water',
  light: false,
  glow: 'rgba(120,200,215,.5)',
  tint: 'sepia(.5) hue-rotate(140deg) saturate(1.8) brightness(1.1)'
}, {
  id: 'heat',
  label: 'Heat',
  title: 'The heat of it',
  feelings: ['Passion.', 'Intensity.', 'Glow.'],
  atmosphere: 'fire',
  light: false,
  glow: 'rgba(244,150,60,.65)',
  tint: 'sepia(1) hue-rotate(-30deg) saturate(2.4) brightness(1.08)'
}, {
  id: 'air',
  label: 'Air',
  title: 'Lighter than air',
  feelings: ['Ease.', 'Nature.', 'Elegance.'],
  atmosphere: 'wind',
  light: false,
  glow: 'rgba(232,206,160,.45)',
  tint: 'sepia(.5) hue-rotate(10deg) saturate(1.2) brightness(1.1)'
}, {
  id: 'arrival',
  label: 'Arrival',
  title: 'Florida, at last',
  feelings: ['Harmony.', 'Beauty.', 'Memory.'],
  img: IMG + 'scene-07-ocean-sunset.png',
  pos: '0% 42%',
  zoom: 1.65,
  light: false,
  glow: 'rgba(240,180,80,.55)',
  tint: 'sepia(.9) hue-rotate(-15deg) saturate(2) brightness(1.12)'
}];
function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}
function seeded(n) {
  let s = n * 9301 + 49297;
  return () => {
    s = (s * 233280 + 9301) % 233280;
    return s / 233280;
  };
}

/* ── CSS atmospheres for the three unphotographed scenes ───────────────── */
function Atmosphere({
  kind
}) {
  if (kind === 'water') return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 90% at 50% 26%, #45707D 0%, #2E4A52 44%, #0C171B 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: .5,
      mixBlendMode: 'screen',
      animation: 'sl-caustic 16s linear infinite alternate',
      background: 'radial-gradient(60px 46px at 30% 35%, rgba(140,210,220,.28), transparent 70%), radial-gradient(90px 70px at 68% 60%, rgba(120,190,205,.22), transparent 70%)',
      backgroundSize: '340px 260px, 420px 340px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-10% 20%',
      background: 'linear-gradient(178deg, rgba(190,235,240,.16), transparent 55%)',
      transform: 'skewX(-12deg)',
      filter: 'blur(6px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(90% 70% at 50% 55%, transparent 55%, rgba(6,12,14,.6) 100%)'
    }
  }));
  if (kind === 'fire') return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(115% 85% at 50% 72%, #A8451A 0%, #5E250D 40%, #0F0503 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '56%',
      width: '62vmin',
      height: '62vmin',
      borderRadius: '50%',
      filter: 'blur(30px)',
      background: 'radial-gradient(circle, rgba(255,166,70,.55) 0%, rgba(196,82,28,.28) 45%, transparent 72%)',
      animation: 'sl-glow 3.2s ease-in-out infinite alternate'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '26%',
      background: 'linear-gradient(to top, rgba(64,20,6,.85), transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(95% 75% at 50% 55%, transparent 50%, rgba(8,3,1,.72) 100%)'
    }
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(166deg, #C3A377 0%, #8F704A 44%, #1F150C 100%)'
    }
  }), [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      left: '-15%',
      right: '-15%',
      top: 22 + i * 20 + '%',
      height: '16%',
      borderRadius: '50%',
      filter: 'blur(18px)',
      background: 'linear-gradient(90deg, transparent, rgba(248,236,214,' + (0.1 - i * 0.02) + ') 45%, transparent)',
      animation: 'sl-band ' + (11 + i * 4) + 's ease-in-out ' + -i * 3 + 's infinite alternate'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '30%',
      background: 'linear-gradient(to top, rgba(38,26,14,.8), transparent)',
      filter: 'blur(2px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(95% 80% at 50% 50%, transparent 55%, rgba(12,8,4,.55) 100%)'
    }
  }));
}

/* ── per-mode environment motion ───────────────────────────────────────── */
function envMotion(mode, t) {
  const at = Math.abs(t);
  if (mode === 'sweep') return {
    opacity: clamp(1 - Math.max(0, at - 0.62) * 3.2, 0, 1),
    transform: 'translateX(' + t * -68 + 'vw) scale(1.1)',
    extraBlur: 0,
    z: 10
  };
  if (mode === 'push') return t >= 0 ? {
    opacity: clamp(1 - Math.max(0, t - 0.38) * 2.4, 0, 1),
    transform: 'scale(' + (1 + t * 0.6) + ')',
    extraBlur: t * 9,
    z: 20
  } : {
    opacity: clamp(1 - Math.max(0, at - 0.55) * 3, 0, 1),
    transform: 'scale(' + Math.max(0.86, 1 + t * 0.16) + ')',
    extraBlur: at * 5,
    z: 10
  };
  return {
    opacity: clamp(1 - Math.max(0, at - 0.3) * 2.2, 0, 1),
    transform: 'scale(' + (1.08 - t * 0.05) + ') translateY(' + t * -3 + '%)',
    extraBlur: 0,
    z: 10
  };
}
function Scene({
  scene,
  index,
  progress,
  mode
}) {
  const t = progress - index;
  if ((t <= -1 || t >= 1) && !(index === 0 && progress <= 0)) return null;
  const m = index === 0 && t < 0 ? envMotion(mode, 0) : envMotion(mode, t);
  const ink = scene.light;
  /* backgrounds run sharp (client direction); the ocean still resolves the
     journey by fading the hero bottle out over the real plate */
  const blur = 0;
  const active = Math.abs(t) < 0.45;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: m.opacity,
      zIndex: m.z,
      pointerEvents: active ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-6%',
      transform: m.transform
    }
  }, scene.img ? /*#__PURE__*/React.createElement("img", {
    src: scene.img,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: scene.pos,
      filter: m.extraBlur > 0.2 ? 'blur(' + m.extraBlur + 'px)' : 'none',
      transform: 'scale(' + (scene.zoom || 1.04) + ')',
      transformOrigin: scene.pos
    }
  }) : /*#__PURE__*/React.createElement(Atmosphere, {
    kind: scene.atmosphere
  }), scene.img && !scene.light && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-full)'
    }
  }), scene.img && scene.light && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top,rgba(252,250,246,.6) 0%,rgba(252,250,246,.06) 45%)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '0 var(--gutter) 9vh',
      transform: 'translateY(' + t * 30 + 'px)',
      transition: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: active ? 1 : 0,
      transform: active ? 'none' : 'translateY(14px)',
      transition: 'opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    index: index + 1,
    tone: ink ? 'accent' : 'inverse',
    wide: true
  }, scene.label)), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: 'clamp(3.2rem,7.5vw,7rem)',
      lineHeight: .96,
      letterSpacing: '-.02em',
      color: ink ? 'var(--ink-800)' : 'var(--bone-100)',
      textWrap: 'balance',
      opacity: active ? 1 : 0,
      transform: active ? 'none' : 'translateY(20px)',
      transition: 'opacity var(--dur-slow) var(--ease-out) 80ms, transform var(--dur-slow) var(--ease-out) 80ms'
    }
  }, scene.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-lg)',
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: 'clamp(1.05rem,1.5vw,1.4rem)',
      color: ink ? 'var(--ink-600)' : 'rgba(247,243,236,.78)'
    }
  }, scene.feelings.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: w,
    style: {
      opacity: active ? 1 : 0,
      transform: active ? 'none' : 'translateY(12px)',
      transition: 'opacity var(--dur-slow) var(--ease-out) ' + (180 + i * 140) + 'ms, transform var(--dur-slow) var(--ease-out) ' + (180 + i * 140) + 'ms'
    }
  }, w))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)',
      marginTop: 'var(--space-sm)',
      flexWrap: 'wrap',
      opacity: active ? 1 : 0,
      transition: 'opacity var(--dur-slow) var(--ease-out) 300ms'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: index === 0 ? 'lg' : 'md',
    icon: "arrow-right",
    iconBase: IB,
    onClick: () => window.scrollTo({
      top: document.getElementById('booking').offsetTop,
      behavior: 'smooth'
    })
  }, "Book a workshop"), index === 0 && /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    size: "lg",
    iconBase: IB,
    onClick: () => window.scrollTo({
      top: window.innerHeight * 1.3,
      behavior: 'smooth'
    })
  }, "Learn more")), index === 6 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)',
      marginTop: 'var(--space-sm)',
      opacity: active ? 1 : 0,
      transition: 'opacity var(--dur-slow) var(--ease-out) 300ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 1,
      background: 'var(--gold-400)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 500,
      letterSpacing: 'var(--tracking-eyebrow-wide)',
      textTransform: 'uppercase',
      color: 'rgba(247,243,236,.72)'
    }
  }, "The scent of memorable moments")))));
}

/* ── the fixed hero bottle ─────────────────────────────────────────────── */
function HeroBottle({
  progress
}) {
  const opacity = 1;
  const idx = clamp(Math.round(progress), 0, 6);
  const scene = SCENES[idx];
  const rot = Math.sin(progress * 1.9) * 1.6;
  const dy = Math.sin(progress * 2.6) * 12;
  const scale = 1 + Math.sin(progress * 1.3) * 0.02;
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '50%',
      top: '47%',
      zIndex: 15,
      opacity,
      pointerEvents: 'none',
      transform: 'translate(-50%,-50%) translateY(' + dy + 'px) rotate(' + rot + 'deg) scale(' + scale + ')'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '52%',
      transform: 'translate(-50%,-50%)',
      width: '70vmin',
      height: '70vmin',
      borderRadius: '50%',
      background: 'radial-gradient(circle,' + scene.glow + ' 0%, transparent 65%)',
      filter: 'blur(24px)',
      transition: 'background var(--dur-scene) var(--ease-in-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '64vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '27%',
      width: '46.4%',
      top: '30.5%',
      height: '61.5%',
      overflow: 'hidden',
      borderRadius: '3px 3px 8px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '-8%',
      right: '-8%',
      top: '12%',
      bottom: '-2%',
      transformOrigin: '50% 100%',
      animation: 'sl-slosh 5.6s var(--ease-in-out) infinite alternate'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: 'linear-gradient(rgba(214,186,133,.16) 0%, rgba(199,158,90,.28) 55%, rgba(154,110,44,.40) 100%)'
    }
  }, [18, 44, 66, 82].map((lx, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      left: lx + '%',
      bottom: '3%',
      width: 3 + i % 2 * 2,
      height: 3 + i % 2 * 2,
      borderRadius: '50%',
      background: 'rgba(255,250,236,.7)',
      animation: 'sl-bubble ' + (5 + i * 2.3) + 's ease-in ' + -i * 2.9 + 's infinite'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: '-55%',
      width: '210%',
      aspectRatio: '1',
      borderRadius: '38% 42% 40% 44%',
      transform: 'translateY(-50%)',
      background: 'rgba(255,246,222,.14)',
      animation: 'sl-spin 13s linear infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: '-52%',
      width: '204%',
      aspectRatio: '1',
      borderRadius: '44% 38% 46% 40%',
      transform: 'translateY(-50%)',
      background: 'rgba(214,186,133,.16)',
      animation: 'sl-spin 21s linear infinite reverse'
    }
  }))), /*#__PURE__*/React.createElement("img", {
    src: IMG + 'bottle-glass.png',
    alt: "",
    style: {
      position: 'relative',
      height: '100%',
      width: 'auto',
      display: 'block',
      filter: 'drop-shadow(0 44px 54px rgba(10,8,5,.45))'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: IMG + 'bottle-glass.png',
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      height: '100%',
      width: 'auto',
      mixBlendMode: 'screen',
      opacity: .24,
      filter: scene.tint,
      transition: 'filter var(--dur-scene) var(--ease-in-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '58%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: '2.6vh',
      letterSpacing: '.14em',
      color: scene.light ? 'rgba(74,58,32,.78)' : 'rgba(252,250,246,.94)',
      textShadow: scene.light ? 'none' : '0 0 1px rgba(80,60,30,.9), 0 1px 3px rgba(40,30,15,.45)',
      transition: 'color var(--dur-scene) var(--ease-in-out)'
    }
  }, "Scent ", /*#__PURE__*/React.createElement("i", null, "Lab"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '.9vh',
      fontWeight: 500,
      letterSpacing: '.4em',
      textTransform: 'uppercase',
      marginTop: '.8vh',
      opacity: .8
    }
  }, "Eau de parfum \xB7 Miami"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      bottom: '-7vh',
      transform: 'translateX(-50%)',
      width: '34vh',
      height: '5vh',
      borderRadius: '50%',
      background: 'radial-gradient(ellipse, rgba(10,8,5,.4) 0%, transparent 70%)',
      filter: 'blur(10px)'
    }
  }));
}
function Journey({
  onProgress,
  mode = 'sweep',
  grain = true
}) {
  const dbgMatch = typeof location !== 'undefined' && location.hash.match(/p=([\d.]+)/) || null;
  const dbg = dbgMatch ? parseFloat(dbgMatch[1]) : NaN;
  const [progress, setProgress] = React.useState(isNaN(dbg) ? 0 : dbg);
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    if (!isNaN(dbg)) return; // pinned via #p= for previews
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const runway = el.offsetHeight - window.innerHeight;
        const p = clamp(-el.getBoundingClientRect().top / (runway / SCENES.length), 0, SCENES.length - 1);
        setProgress(p);
        onProgress?.(p);
      });
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  const active = clamp(Math.round(progress), 0, 6);
  const goTo = i => {
    const el = wrapRef.current;
    const runway = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + runway / SCENES.length * i,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: {
      height: SCENES.length * 120 + 'vh',
      position: 'relative',
      background: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden'
    }
  }, SCENES.map((s, i) => /*#__PURE__*/React.createElement(Scene, {
    key: s.id,
    scene: s,
    index: i,
    progress: progress,
    mode: mode
  })), /*#__PURE__*/React.createElement(HeroBottle, {
    progress: progress
  }), grain && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 25,
      opacity: 'var(--grain-opacity)',
      backgroundImage: 'repeating-conic-gradient(#fff 0% 25%,#000 0% 50%)',
      backgroundSize: '3px 3px',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 30,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(SceneProgress, {
    scenes: SCENES.map(s => s.label),
    active: active,
    onSelect: goTo,
    style: {
      position: 'absolute',
      pointerEvents: 'auto'
    }
  })), progress < 0.08 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 'var(--gutter)',
      bottom: 18,
      zIndex: 30,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      color: 'var(--ink-600)',
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: '.28em',
      textTransform: 'uppercase'
    }
  }, "Scroll"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 34,
      background: 'currentColor',
      animation: 'sl-pulse 2.4s var(--ease-in-out) infinite'
    }
  }))));
}
Object.assign(window, {
  Journey,
  JOURNEY_SCENES: SCENES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/journey.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
/* Landing sections after the cinematic journey. */
const {
  SectionHeading,
  Eyebrow,
  Button,
  Testimonial,
  StatBlock,
  Divider,
  Field,
  Input,
  Select,
  Textarea,
  Icon,
  Wordmark,
  Toast
} = window.ScentLabDesignSystem_38c3c1 || {};
const IB2 = '../../assets/icons';
const IMG2 = '../../assets/imagery/';
function Section({
  children,
  tone,
  style,
  id
}) {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        io.disconnect();
      }
    }, {
      threshold: 0.12
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    "data-theme": tone === 'dark' ? 'cinematic' : undefined,
    style: {
      background: 'var(--surface-page)',
      padding: 'var(--section-y) var(--gutter)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(var(--reveal-distance))',
      transition: 'opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)'
    }
  }, children));
}
function Experience() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "experience"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2xl)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Scent Lab \xB7 Miami",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "A team experience", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("i", null, "they'll actually remember.")),
    lede: "A luxury fragrance workshop that doubles as the best team building you've booked \u2014 one shared brief, a working perfumer, and a bottle each guest blends, names and takes home."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-xl)',
      flexWrap: 'wrap',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "90 min",
    label: "Guided master class"
  }), /*#__PURE__*/React.createElement(Divider, {
    vertical: true
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "8\u201340",
    label: "Guests per session"
  }), /*#__PURE__*/React.createElement(Divider, {
    vertical: true
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "12",
    label: "Raw materials"
  }), /*#__PURE__*/React.createElement(Divider, {
    vertical: true
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "50 ml",
    label: "Take-home bottle"
  })), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 'var(--space-xl)'
    }
  }, [['flask-conical', 'Led by a working perfumer', 'Not event staff with a script — a professional nose guides every blend.'], ['users', 'Built for teams', 'One brief, many answers. Quiet competition, loud debrief.'], ['map-pin', 'Wynwood studio — or yours', 'A daylight studio with a bar, or we bring the lab to your office or venue.'], ['gift', 'Everyone leaves with proof', 'Each guest bottles and labels their own fragrance on the spot.']].map(([ic, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 'var(--space-md)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20,
    base: IB2,
    style: {
      color: 'var(--gold-600)',
      marginTop: 3
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 400,
      color: 'var(--text-primary)',
      fontSize: 'var(--size-body)'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 300,
      color: 'var(--text-muted)',
      fontSize: 'var(--size-body-sm)'
    }
  }, d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "arrow-right",
    iconBase: IB2,
    href: "#booking"
  }, "Book a workshop"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    iconBase: IB2,
    href: "#booking"
  }, "Plan a corporate event"))));
}
function Booking() {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement(Section, {
    id: "booking",
    tone: "dark",
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG2 + 'scene-07-ocean-sunset.png',
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: .28
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right,rgba(16,12,9,.92) 0%,rgba(16,12,9,.65) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'minmax(280px,1fr) minmax(320px,1fr)',
      gap: 'var(--space-3xl)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    tone: "inverse",
    eyebrow: "Booking",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Begin with", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("i", null, "a conversation.")),
    lede: "Tell us the occasion. A perfumer designs the session around it and replies within one business day."
  }), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-lg)',
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    iconBase: IB2,
    tone: "positive",
    message: "Enquiry sent. We reply within one business day."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    iconBase: IB2,
    onClick: () => setSent(false)
  }, "Send another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'grid',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    tone: "inverse",
    label: "Name",
    htmlFor: "bn"
  }, /*#__PURE__*/React.createElement(Input, {
    tone: "inverse",
    id: "bn",
    placeholder: "Alex Moreau"
  })), /*#__PURE__*/React.createElement(Field, {
    tone: "inverse",
    label: "Work email",
    htmlFor: "be",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    tone: "inverse",
    id: "be",
    type: "email",
    placeholder: "you@company.com"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    tone: "inverse",
    label: "Occasion",
    htmlFor: "bo"
  }, /*#__PURE__*/React.createElement(Select, {
    tone: "inverse",
    id: "bo",
    iconBase: IB2,
    options: ['Team building', 'Corporate event', 'Private party', 'Client appreciation', 'Brand activation']
  })), /*#__PURE__*/React.createElement(Field, {
    tone: "inverse",
    label: "Headcount",
    htmlFor: "bh"
  }, /*#__PURE__*/React.createElement(Input, {
    tone: "inverse",
    id: "bh",
    placeholder: "18"
  }))), /*#__PURE__*/React.createElement(Field, {
    tone: "inverse",
    label: "Anything else",
    htmlFor: "bb"
  }, /*#__PURE__*/React.createElement(Textarea, {
    tone: "inverse",
    id: "bb",
    rows: 2,
    placeholder: "Dates, venue, the mood you're after."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)',
      flexWrap: 'wrap',
      marginTop: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "arrow-right",
    iconBase: IB2
  }, "Book your workshop"), /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    size: "lg",
    iconBase: IB2
  }, "Plan a private event"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    iconBase: IB2,
    style: {
      color: 'var(--bone-100)'
    }
  }, "Request a quote")))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    "data-theme": "cinematic",
    style: {
      background: 'var(--ink-900)',
      padding: 'var(--section-y-tight) var(--gutter) var(--space-2xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'grid',
      gap: 'var(--space-2xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 'var(--space-xl)'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 34,
    tone: "inverse",
    lockup: "with-locale"
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-xl)',
      flexWrap: 'wrap'
    }
  }, [['instagram', 'Instagram', '#'], ['phone', '+1 (305) 555-0114', 'tel:+13055550114'], ['mail', 'hello@scentlab.miami', 'mailto:hello@scentlab.miami']].map(([ic, label, href]) => /*#__PURE__*/React.createElement("a", {
    key: label,
    href: href,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      border: 'none',
      color: 'rgba(247,243,236,.72)',
      fontSize: 'var(--size-caption)',
      fontWeight: 300,
      letterSpacing: '.04em'
    }
  }, ic !== 'instagram' && /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 14,
    base: IB2
  }), label)))), /*#__PURE__*/React.createElement(Divider, {
    tone: "inverse"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 'var(--space-md)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 400,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'rgba(247,243,236,.4)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Miami, Florida"), /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Scent Lab"))));
}
Object.assign(window, {
  Experience,
  Booking,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.SceneProgress = __ds_scope.SceneProgress;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ExperienceCard = __ds_scope.ExperienceCard;

__ds_ns.GalleryTile = __ds_scope.GalleryTile;

__ds_ns.Testimonial = __ds_scope.Testimonial;

})();
