import{Hn as e,it as t,nt as n,r}from"./three.core-Dz0jzqxB.js";import{t as i}from"./spray-CSZ-WXUL.js";var a=[{ml:30,scale:.84,price:98},{ml:50,scale:1,price:145},{ml:100,scale:1.16,price:210}],o={no:`01`,name:`Lotus Rouge`,description:`Dewy pink lotus over cool water lily and a skin-close white musk, kept in a ruby jewel that opens like the flower.`,gem:{body:{glow:`#b0021a`,att:`#b8061c`},cap:{glow:`#b8061c`,att:`#d00c26`},fire:`#ff4a52`,refl:[1,.32,.38],spec:`#ff9aa6`,glass:`#ffe1e5`},spray:[`#d40f35`,`#ff8da3`],notes:[{tier:`Top`,name:`Pink lotus`,more:`Pink lotus, pear blossom, bergamot`},{tier:`Heart`,name:`Water lily`,more:`Water lily, peony, rose water`},{tier:`Base`,name:`White musk`,more:`White musk, ambrette, soft cedar`}],profile:{hours:8,intensity:.7,trail:.6}},s=e=>`$${e}`,c=2.92,l=e=>Math.min(1,Math.max(0,e)),u=e=>e*e*(3-2*e),d=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n*r)),f=(e,t,n)=>e<t?Math.min(t,e+n):Math.max(t,e-n),p=.42,m=e=>e<0?0:e<.09?u(e/.09):e<.2?1:1-u(l((e-.2)/.22)),h=.6,g=2.2,_=1.7,v=[-.32,0,.38,.72,1],y=1,b=Math.PI*2,x=`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 4v16M4 12h16"/><path d="M9.5 6.5 12 4l2.5 2.5M9.5 17.5 12 20l2.5-2.5M6.5 9.5 4 12l2.5 2.5M17.5 9.5 20 12l-2.5 2.5"/></svg>`,S=`<svg class="lx-mini" viewBox="0 0 32 40" aria-hidden="true">
  <defs>
    <linearGradient id="lx-ruby" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e2384c"/><stop offset=".55" stop-color="#a50f24"/><stop offset="1" stop-color="#5e0613"/>
    </linearGradient>
    <linearGradient id="lx-gilt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#a8742c"/><stop offset=".45" stop-color="#f4d99c"/><stop offset="1" stop-color="#8f5f22"/>
    </linearGradient>
  </defs>
  <g class="lx-mini__mist" fill="#fff">
    <circle cx="24" cy="8" r="1.1"/><circle cx="27.5" cy="6" r=".9"/><circle cx="28" cy="10" r="1"/><circle cx="30.6" cy="7.8" r=".7"/>
  </g>
  <g class="lx-mini__cap">
    <path d="M11 3.5h10l3 3.8-8 3.9-8-3.9z" fill="url(#lx-ruby)"/>
    <path d="M11 3.5h10l-5 3.6z" fill="#fff" opacity=".28"/>
    <rect x="12" y="11.2" width="8" height="3.2" rx=".6" fill="url(#lx-gilt)"/>
  </g>
  <path d="M8.5 15.5h15l4.5 5v11.5l-4.5 5h-15l-4.5-5V20.5z" fill="url(#lx-ruby)"/>
  <path d="M8.5 15.5 16 21l7.5-5.5M16 21v16M4 20.5l12 .5 12-.5" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width=".8"/>
</svg>`,C=`<svg viewBox="0 0 24 34" aria-hidden="true">
  <rect class="lx-glyph__cap" x="9" y="2" width="6" height="5" rx="1.2"/>
  <path class="lx-glyph__neck" d="M10.5 7h3v3h-3z"/>
  <rect class="lx-glyph__body" x="4" y="10" width="16" height="21" rx="5"/>
</svg>`;function w({hours:e},{x0:t,x1:n,top:r,base:i}){let a=t=>(1-Math.exp(-t*2.2))*(.76+.24*Math.exp(-t*.9))/(1+Math.exp((t-e*.72)/1.05)),o=Array.from({length:49},(e,t)=>a(t/48*12)),s=Math.max(...o),c=e=>t+e/12*(n-t),l=e=>i-e/s*(i-r),u=o.map((e,t)=>[c(t/48*12),l(e)]),d=`M${u[0][0].toFixed(1)} ${u[0][1].toFixed(1)}`;for(let e=0;e<u.length-1;e++){let[t,n,r,i]=[u[Math.max(0,e-1)],u[e],u[e+1],u[Math.min(u.length-1,e+2)]],a=[n[0]+(r[0]-t[0])/6,n[1]+(r[1]-t[1])/6],o=[r[0]-(i[0]-n[0])/6,r[1]-(i[1]-n[1])/6];d+=`C${a.map(e=>e.toFixed(1)).join(` `)} ${o.map(e=>e.toFixed(1)).join(` `)} ${r[0].toFixed(1)} ${r[1].toFixed(1)}`}return{d,area:`${d}L${n} ${i}L${t} ${i}Z`,at:e=>[c(e),l(a(e))],X:c}}function T(e,t){let n={x0:2,x1:298,top:24,base:92},r=w(e,n),i=[[`Top`,1,`middle`],[`Heart`,3.4,`middle`],[`Base`,e.hours*.92,`middle`]].map(([e,t,n])=>{let[i,a]=r.at(t);return`<g class="lx-chart__phase"><circle cx="${i.toFixed(1)}" cy="${a.toFixed(1)}" r="2.6"/>
        <text x="${i.toFixed(1)}" y="${(a-9).toFixed(1)}" text-anchor="${n}">${e}</text></g>`}).join(``);return`<svg class="lx-chart" viewBox="0 0 300 96" role="img" aria-label="Opens bright, holds through the heart and settles on the skin after about ${e.hours} hours.">
    <defs>
      <linearGradient id="${t}-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".88"/><stop offset=".7" stop-color="#fff" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity=".08"/></linearGradient>
    </defs>
    <path class="lx-chart__area" d="${r.area}" fill="url(#${t}-area)"/>
    <path class="lx-chart__line" d="${r.d}" pathLength="1"/>
    <line class="lx-chart__base" x1="${n.x0}" y1="${n.base}" x2="${n.x1}" y2="${n.base}"/>
    ${i}
  </svg>`}function E(e,t){return`<div class="lx-bar">
    <p class="lx-bar__label">${t}<span class="sr-visually-hidden">: ${Math.round(e*10)} out of 10</span></p>
    <span class="lx-bar__track" aria-hidden="true"><span class="lx-bar__fill" style="--v:${e}"></span></span>
  </div>`}function D(e,t){let n=o.profile;return`<div class="lx-curve__head"><h3 class="lx-title" id="${t}">Longevity</h3>
    <p class="lx-curve__hours">${n.hours}<span>hours</span></p></div>
    ${T(n,e)}
    <div class="lx-bars">${E(n.intensity,`Intensity`)}${E(n.trail,`Trail`)}</div>`}function O(e){return a.map((t,n)=>`<button type="button" class="${e}" data-size="${n}" aria-pressed="${n===1}" aria-label="${t.ml} ml, ${s(t.price)}">
      <span class="lx-glyph" style="--h:${(.62+.38*(t.ml/100)).toFixed(2)}">${C}</span><span class="lx-size__ml">${t.ml}<small>ml</small></span></button>`).join(``)}function k(e){let t=e.lastIndexOf(` `);return t<0?e:`${e.slice(0,t)} <em>${e.slice(t+1)}</em>`}function A(){let e=o.notes.map(e=>`<li><small>${e.tier}</small><span>${e.name}</span></li>`).join(``),t=o.notes.map(e=>`<li><small>${e.tier}</small><span>${e.more}</span></li>`).join(``);return`
  <div class="lx-left">
    <section class="lx-card lx-glass lx-size" aria-labelledby="lx-size-title">
      <h3 class="lx-title" id="lx-size-title">Size</h3>
      <div class="lx-size__row" role="group" aria-labelledby="lx-size-title">${O(`lx-size__btn`)}</div>
    </section>
    <section class="lx-card lx-glass lx-curve" aria-labelledby="lxc-title">${D(`lxc`,`lxc-title`)}</section>
  </div>

  <aside class="lx-info lx-glass" aria-labelledby="lx-name"><div class="lx-info__in">
    <p class="lx-title lx-info__no">No. ${o.no}</p>
    <h2 class="lx-info__name" id="lx-name">${k(o.name)}</h2>
    <p class="lx-info__desc">${o.description}</p>
    <ul class="lx-notes" aria-label="Notes">${e}</ul>
    <div class="lx-sizes-inline" role="group" aria-label="Size">${O(`lx-chip`)}</div>
    <p class="lx-price"><span data-f="price"></span><small data-f="ml"></small></p>
    <div class="lx-buy__row">
      <div class="lx-qty" role="group" aria-label="Quantity">
        <button type="button" data-act="less" aria-label="One bottle less"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 8h8"/></svg></button>
        <output data-f="qty" aria-live="polite">1</output>
        <button type="button" data-act="more" aria-label="One bottle more"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 4v8M4 8h8"/></svg></button>
      </div>
      <button type="button" class="lx-add pill" data-act="buy"><span class="pill__label"><span class="lx-add__text">Add to bag</span></span><svg class="pill__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 12.5l9-9M5 3.5h7.5V11"/></svg></button>
    </div>
    <button type="button" class="lx-more" data-act="details" aria-expanded="false" aria-controls="lx-details">All notes</button>
    <div class="lx-details" id="lx-details">
      <ul class="lx-pyramid">${t}</ul>
      <div class="lx-details__curve" aria-labelledby="lxm-title" role="group">${D(`lxm`,`lxm-title`)}</div>
    </div>
  </div></aside>

  <div class="lx-orbit">
    <svg class="lx-orbit__ring" viewBox="0 0 560 96" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <!-- the far side of the orbit fades out behind the bottle, the near side stays lit -->
        <linearGradient id="lx-orbit-fade" gradientUnits="userSpaceOnUse" x1="0" y1="4" x2="0" y2="92">
          <stop offset="0" stop-color="#fff" stop-opacity="0"/>
          <stop offset="0.22" stop-color="#fff" stop-opacity="0.1"/>
          <stop offset="0.55" stop-color="#fff" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#fff" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <ellipse class="lx-orbit__line" cx="280" cy="48" rx="276" ry="44"/>
    </svg>
    <div class="lx-orbit__handle lx-glass" role="slider" tabindex="0" aria-label="Turn the bottle" aria-valuemin="0" aria-valuemax="359" aria-valuenow="0" aria-valuetext="Front">${x}</div>
    <p class="lx-orbit__label" aria-hidden="true">Drag to rotate</p>
  </div>

  <button type="button" class="lx-spray lx-glass" data-act="spray" aria-label="Spray it">${S}<span class="lx-hint" aria-hidden="true">Spray it</span></button>

  <div class="lx-zoom" role="group" aria-label="Zoom">
    <button type="button" class="lx-glass" data-act="zoom-in" aria-label="Zoom in"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg><span class="lx-hint" aria-hidden="true">Zoom in</span></button>
    <button type="button" class="lx-glass" data-act="zoom-out" aria-label="Zoom out"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12"/></svg><span class="lx-hint" aria-hidden="true">Zoom out</span></button>
  </div>

  <p class="sr-visually-hidden" role="status" data-f="status"></p>`}function j({ctrl:l,deep:x,scene:S,camera:C,plinthTop:w,isMobile:T}){x.group.updateMatrixWorld(!0);let E=new t().copy(x.inner.matrixWorld).invert(),D=x.parts.Collar?.mesh,O=D?new r().setFromObject(D).applyMatrix4(E).getCenter(new e).y:.5,k=Array.from({length:3},()=>{let e=i({count:T()?220:340});return e.uniforms.uStrength.value=1,e.uniforms.uColA.value.set(o.spray[0]),e.uniforms.uColB.value.set(o.spray[1]),S.add(e.mesh),{s:e,start:null}}),j=0;for(let[e,t]of Object.entries({body:x.parts.Body?.mesh.material,cap:x.parts.Cap?.mesh.material})){if(!t)continue;let{gem:n}=o,r=t.userData.gem;r.uGlow.value.set(n[e].glow),r.uFire.value.set(n.fire),r.uTint.value.fromArray(n.refl),t.attenuationColor.set(n[e].att),t.specularColor.set(n.spec),t.color.set(n.glass)}let M=document.createElement(`section`);M.className=`sr`,M.setAttribute(`aria-label`,`The showroom`),M.innerHTML=A(),M.inert=!0,M.setAttribute(`aria-hidden`,`true`),document.body.append(M);let N=e=>M.querySelector(e),P=e=>[...M.querySelectorAll(e)],F=(e,t)=>P(`[data-f="${e}"]`).forEach(e=>e.textContent=t),I=e=>N(`[data-act="${e}"]`),L=document.querySelector(`#scene`),R=document.querySelector(`.nav__bag`),z=document.querySelector(`.nav__badge`),B=N(`.lx-orbit__handle`),V=N(`.lx-orbit`),H=N(`.lx-info`),U={size:1,qty:1,zoom:y,details:!1,bag:0},W={act:0,zoom:0,still:0,scale:a[1].scale,pan:0,yawVel:0,yawTarget:null,clock:0,cap:0,capTarget:0,queue:0,press:null,idle:0,presses:0},G=!1,K=null,q=0;function J(){let e=a[U.size];F(`price`,s(e.price)),F(`ml`,`${e.ml} ml`),F(`qty`,String(U.qty)),P(`[data-size]`).forEach(e=>e.setAttribute(`aria-pressed`,String(Number(e.dataset.size)===U.size))),I(`less`).disabled=U.qty<=1,I(`more`).disabled=U.qty>=9,I(`zoom-in`).disabled=U.zoom>=v.length-1,I(`zoom-out`).disabled=U.zoom<=0,I(`details`).setAttribute(`aria-expanded`,String(U.details)),I(`details`).textContent=U.details?`Fewer notes`:`All notes`,M.classList.toggle(`is-details`,U.details)}function ee(){let e=a[U.size];U.bag+=U.qty,z&&(z.textContent=String(U.bag)),R?.setAttribute(`aria-label`,`Bag, ${U.bag} ${U.bag===1?`item`:`items`}`);let t=U.qty;F(`status`,`${t} × ${o.name} ${e.ml} ml added to your bag.`);let n=I(`buy`);n.classList.add(`is-added`),n.querySelector(`.lx-add__text`).textContent=`Added`,clearTimeout(q),q=setTimeout(()=>{n.classList.remove(`is-added`),n.querySelector(`.lx-add__text`).textContent=`Add to bag`},1800)}M.addEventListener(`click`,e=>{let t=e.target.closest(`button`);if(t&&!t.disabled){if(t.dataset.size)U.size=Number(t.dataset.size),J();else{switch(t.dataset.act){case`less`:U.qty=Math.max(1,U.qty-1);break;case`more`:U.qty=Math.min(9,U.qty+1);break;case`zoom-in`:U.zoom=Math.min(v.length-1,U.zoom+1);break;case`zoom-out`:U.zoom=Math.max(0,U.zoom-1);break;case`details`:U.details=!U.details;break;case`spray`:W.queue=Math.min(W.queue+1,2),W.capTarget=1,W.idle=0;return;case`buy`:ee();return;default:return}J()}}});function Y(e,t){K={id:e.pointerId,x:e.clientX,t:performance.now(),k:t,moved:!1},W.yawTarget=null,W.yawVel=0}L.addEventListener(`pointerdown`,e=>{!G||e.button>0||Y(e,.009)}),V.addEventListener(`pointerdown`,e=>{!G||e.button>0||(e.preventDefault(),B.focus({preventScroll:!0}),V.setPointerCapture?.(e.pointerId),Y(e,Math.PI/2/Math.max(80,V.clientWidth/2)),V.classList.add(`is-grabbed`))}),window.addEventListener(`pointermove`,e=>{if(!K||e.pointerId!==K.id)return;let t=e.clientX-K.x,n=performance.now(),r=Math.max(1,n-K.t)/1e3;l.yaw+=t*K.k,W.yawVel=t*K.k/r,K.x=e.clientX,K.t=n,Math.abs(t)>1&&!K.moved&&(K.moved=!0,M.classList.add(`has-turned`))});let X=e=>{K&&e.pointerId===K.id&&(K=null,V.classList.remove(`is-grabbed`))};window.addEventListener(`pointerup`,X),window.addEventListener(`pointercancel`,X),B.addEventListener(`keydown`,e=>{let t={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1,PageUp:3,PageDown:-3}[e.key];if(t===void 0&&e.key!==`Home`)return;e.preventDefault();let n=W.yawTarget??l.yaw;W.yawTarget=e.key===`Home`?b*Math.round(n/b):n+t*Math.PI/12,W.yawVel=0,M.classList.add(`has-turned`)}),new ResizeObserver(()=>M.style.setProperty(`--sheet-h`,`${H.offsetHeight}px`)).observe(H),J();let Z={x:null,y:null,deg:null,behind:null,press:null};function te(e,t,r,i){t=Math.min(Math.max(t,0),.1),W.clock+=t;let o=+(r>=c);W.act=d(W.act,o,3.2,t),Math.abs(W.act-o)<.002&&(W.act=o);let s=W.act,_=s>.5;_!==G&&(G=_,M.classList.toggle(`is-on`,G),M.inert=!G,M.setAttribute(`aria-hidden`,String(!G)),document.documentElement.classList.toggle(`has-showroom`,G),G||(K=null)),M.classList.toggle(`is-lite`,!!i);let y=window.innerWidth<=900;if(K||(W.yawTarget===null?(W.yawVel*=Math.exp(-t*3),Math.abs(W.yawVel)<.002&&(W.yawVel=0),l.yaw+=W.yawVel*t):(l.yaw=d(l.yaw,W.yawTarget,4,t),Math.abs(l.yaw-W.yawTarget)<.002&&(l.yaw=W.yawTarget,W.yawTarget=null))),G||(W.queue=0,W.capTarget=0,W.press=null,W.cap=0),W.cap=f(W.cap,W.capTarget,t/h),W.press!==null)W.press+=t,W.press>=p&&(W.press=null);else if(W.queue>0&&W.cap>=1){W.queue--,W.press=0,W.presses++;let e=k[j];j=(j+1)%k.length,e.start=W.clock+.05}else W.cap>0&&W.queue===0&&(W.idle+=t,W.idle>g&&(W.capTarget=0));x.setCapOff(u(W.cap)*s),x.setPress(W.press===null?0:m(W.press));let S=W.press!==null;S!==Z.press&&(Z.press=S,I(`spray`).classList.toggle(`is-press`,S));let C=W.cap>0||W.queue>0;if(W.zoom=d(W.zoom,v[U.zoom],3,t),W.still=d(W.still,K||C||W.yawTarget!==null?1:0,3,t),W.scale=d(W.scale,a[U.size].scale,4,t),W.pan=d(W.pan,y&&!U.details?.15:0,3,t),l.offset.set(0,0,0),l.zoom=W.zoom*s,l.still=W.still*s,l.pan=W.pan*s,l.scale=W.scale,l.focusY=w+O*W.scale,G){let e=V.clientWidth,t=V.querySelector(`.lx-orbit__ring`).clientHeight,r=(l.yaw%b+b)%b,i=e/2+(e/2-2)*(276/280)*Math.sin(r),a=t/2+t/2*(44/48)*Math.cos(r);(Math.abs(i-Z.x)>.3||Math.abs(a-Z.y)>.3||Z.x===null)&&(Z.x=i,Z.y=a,B.style.transform=`translate(${i.toFixed(1)}px, ${a.toFixed(1)}px)`);let o=Math.cos(r)<0;o!==Z.behind&&(Z.behind=o,B.classList.toggle(`is-behind`,o));let s=Math.round(n.radToDeg(r))%360;s!==Z.deg&&(Z.deg=s,B.setAttribute(`aria-valuenow`,String(s)),B.setAttribute(`aria-valuetext`,s===0?`Front`:`${s} degrees`))}}let Q=new e,$=new e;function ne(){let e=!1;for(let t of k)t.start!==null&&(W.clock>t.start+_||!G?(t.start=null,t.s.mesh.visible=!1):(e||=(x.nozzle.getWorldPosition(Q),x.nozzle.getWorldDirection($),Q.addScaledVector($,.006*W.scale),!0),t.s.update(W.clock,[t.start,t.start,t.start],Q,$)))}function re(e,t,r){let i=t*r/(2*Math.tan(n.degToRad(C.fov/2)));for(let e of k)e.s.uniforms.uPx.value=i;Z={x:null,y:null,deg:null,behind:null,press:Z.press}}return{update:te,post:ne,resize:re,onAt:c,get on(){return G},state:U,anim:W,ctrl:l}}export{j as createShowroom};