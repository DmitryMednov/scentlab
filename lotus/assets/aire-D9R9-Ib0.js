import{Cn as e,Ct as t,Hn as n,N as r,Sn as i,T as a,Tn as o,Vn as s,a as c,at as l,d as u,dt as d,ft as f,g as p,kn as m,l as h,nt as g,o as _,r as v,yt as y,z as b}from"./three.core-Dz0jzqxB.js";import{a as x,c as S,i as C,n as w,o as T,r as E,s as D}from"./fx-DsHpMm0C.js";var O=new n(.72,1.12,1.05),k=.4,A=2.6,j=`
attribute vec4 aSeed;
uniform float uM;
uniform float uTime;
uniform vec3 uOrigin;
uniform float uPx;
varying float vA;
varying float vAge;
void main() {
  float birth = aSeed.x * 0.55;
  float a = (uM - birth) / 0.55;
  vAge = a;
  if (a <= 0.0 || a >= 1.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vA = 0.0;
    return;
  }
  float ang = aSeed.y * 6.2832 + a * (1.4 + aSeed.w * 2.2) + uTime * 0.15 * (aSeed.w - 0.5);
  float rad = 0.012 + a * a * (0.35 + aSeed.z * 1.3);
  vec3 p = uOrigin;
  p.y += pow(a, 1.15) * (1.2 + aSeed.z * 1.1);
  p.x += cos(ang) * rad + sin(a * 3.0 + aSeed.y * 9.0) * 0.06 * a;
  p.z += sin(ang) * rad * 0.8 - a * a * (1.2 + aSeed.w * 2.4);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = 0.014 + a * a * (0.16 + aSeed.w * 0.22);
  gl_PointSize = clamp(size * uPx / -mv.z, 1.0, 200.0);
  vA = smoothstep(0.0, 0.05, a) * (1.0 - smoothstep(0.55, 1.5, a)) * (0.5 + 0.5 * aSeed.z);
}`,M=`
attribute vec4 aSeed;
uniform float uG;
uniform vec3 uDrop;
uniform float uPx;
varying float vA;
varying float vAge;
void main() {
  vec3 dir = normalize(aSeed.xyz - 0.5);
  float f = smoothstep(0.0, 1.0, uG);
  vec3 p = uDrop + dir * (0.03 + aSeed.w * 0.22) * (1.0 - f) + vec3(0.0, 0.06 * (1.0 - f), 0.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp((0.02 + 0.05 * aSeed.w) * (1.0 - 0.6 * f) * uPx / -mv.z, 1.0, 80.0);
  vA = smoothstep(0.0, 0.25, uG) * (1.0 - smoothstep(0.7, 1.0, uG));
  vAge = 0.9;
}`,N=`
uniform vec3 uColA;
uniform vec3 uColB;
varying float vA;
varying float vAge;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d) * 4.0;
  float g = exp(-r2 * 3.0) * (1.0 - smoothstep(0.7, 1.0, r2));
  vec3 c = mix(uColA, uColB, smoothstep(0.0, 0.9, vAge));
  float a = g * vA * mix(0.9, 0.4, smoothstep(0.0, 1.0, vAge));
  if (a < 0.003) discard;
  gl_FragColor = vec4(c, a);
}`;function P(n,r,i){let a=new _,o=new Float32Array(n*4);for(let e=0;e<o.length;e++)o[e]=x(e*1.37+9.1);a.setAttribute(`position`,new c(new Float32Array(n*3),3)),a.setAttribute(`aSeed`,new c(o,4));let s=new e({uniforms:{uColA:{value:new u(`#a90f2c`)},uColB:{value:new u(`#f3b6c2`)},...i},vertexShader:r,fragmentShader:N,transparent:!0,depthWrite:!1}),l=new t(a,s);return l.frustumCulled=!1,l.renderOrder=3,l}function F({studioEnv:t}){let n=new i,s=new u(`#e7cfd0`);n.background=s.clone(),n.fog=new r(s,6,15),n.environment=t,n.environmentIntensity=.55;let c=new l(new o(40,32,16),new e({side:1,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new u(`#f8eeec`)},uHorizon:{value:s}},vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform vec3 uTop, uHorizon; varying vec3 vDir; void main(){ gl_FragColor = vec4(mix(uHorizon, uTop, smoothstep(0.0, 0.45, vDir.y)), 1.0); }`}));n.add(c);let g=new l(new h(30,64),new f({color:`#e9d3d2`,roughness:.92}));g.rotation.x=-Math.PI/2,g.receiveShadow=!0,n.add(g);let _=new d({color:`#f3e3e0`,roughness:.34,clearcoat:.6,clearcoatRoughness:.25}),v=new d({color:`#efc07a`,metalness:1,roughness:.18,envMapIntensity:1.2}),y=new l(new p(.42,.44,.62,96),_);y.position.y=.31;let x=new l(new p(.52,.53,.035,96),_);x.position.y=.0175;let S=new l(new m(.421,.005,12,160),v);S.rotation.x=Math.PI/2,S.position.y=.6;for(let e of[y,x])e.castShadow=!0,e.receiveShadow=!0;n.add(y,x,S),n.add(new b(`#fff4f0`,`#c9a3a6`,.9));let C=new a(`#fff1ea`,2.1);C.position.set(-2.2,4.2,2.6),C.castShadow=!0,C.shadow.mapSize.set(1024,1024),Object.assign(C.shadow.camera,{left:-1.5,right:1.5,top:2,bottom:-1,near:.5,far:10}),C.shadow.radius=8,C.shadow.blurSamples=16,C.shadow.bias=-4e-4;let w=new a(`#ffd6de`,1.3);w.position.set(2.6,2.2,-3);let T=new a(`#f7dcd2`,.35);return T.position.set(2.5,.8,2.5),n.add(C,w,T),{scene:n,top:.62}}async function I(t){let{scene:r,camera:i,flowerRoot:a,bottle:c,backdrop:u,envMap:f,isMobile:p}=t,m=P(p()?900:1800,j,{uM:{value:0},uTime:{value:0},uOrigin:{value:new n},uPx:{value:1}}),h=P(60,M,{uG:{value:0},uDrop:{value:O.clone()},uPx:{value:1}});r.add(m,h);let _=new d({color:`#ffffff`,roughness:0,metalness:0,transmission:1,ior:1.33,thickness:.05,specularIntensity:1,envMapIntensity:1.8,clearcoat:1,clearcoatRoughness:0});_.envMap=f;let b=new l(new o(1,40,28),_);b.visible=!1,b.renderOrder=2,r.add(b);let x=new e({transparent:!0,depthWrite:!1,blending:2,vertexShader:`varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.2); float g = pow(max(dot(vN, normalize(vV + vec3(-0.4, 0.6, 0.2))), 0.0), 60.0); gl_FragColor = vec4(vec3(1.0, 0.97, 0.98) * (f * 0.85 + g * 1.6), 1.0); }`}),N=new l(b.geometry,x);N.renderOrder=3,b.add(N);let I=w({count:18,size:.006,speed:.75,envMap:f});r.add(I.mesh);let L=new n(O.x,0,O.z),R=O.clone(),z=F(t),B=await t.makeProduct();B.setReveal(1),B.inner.position.y=0,B.group.position.y=z.top,z.scene.add(B.group);let V=new y(30,16/9,.05,100),H=new v,U=new n,W=new n,G=new s,K=16/9;function q(e,t,n){let r=E(D(.05,1,e)),a=E(D(.8,1.45,e)),o=D(1.75,2.35,e);c.group.position.y=.55*r+2.6*o*o,c.group.rotation.y=.9*r+.8*o,c.setExplode(a+.35*o),c.group.visible=c.group.visible&&o<.999;let s=D(1.05,2.3,e)*1.4;c.group.updateMatrixWorld(!0),H.setFromObject(c.parts.Body.mesh),H.getCenter(U),U.y=H.max.y-.005,m.material.uniforms.uM.value=s,m.material.uniforms.uTime.value=t,m.material.uniforms.uOrigin.value.copy(U),m.visible=s>0&&s<1.85;let l=.85*S(D(.25,1.1,s));u.uniforms.uSkyTint.value.set(1.13,.8,.88,l);let d=D(2,2.27,e),f=D(2.27,A,e);h.material.uniforms.uG.value=d,h.visible=d>0&&d<1,R.x=p()?k:O.x,L.x=R.x,h.material.uniforms.uDrop.value.copy(R);let g=(p()?.05:.04)*C(d);if(b.visible=d>0&&f<1,b.visible){let e=O.y*(1-f*f)+(1-d)*.04,t=1+.45*f;b.position.set(R.x,Math.max(e,g),R.z),b.scale.set(g/Math.sqrt(t),g*t,g/Math.sqrt(t))}let _=(e-A)*4;I.update(L,_,1),u.uniforms.uSplash.value.set(L.x,L.z,Math.max(_,0),_>0&&_<9?1.4:0);let v=E(D(0,1,e)),y=E(D(1,1.9,e)),x=E(D(1.95,2.45,e)),w=E(D(2.6,3.4,e)),j=T(.42*v+.5*y,0,x);n.pos.y+=j,n.look.y+=j-.14*x,n.pos.z*=1+(.1*v+.08*y)*(1-x)-.1*w,n.pos.x+=L.x*.25*w,n.look.x+=L.x*.4*w,n.look.y-=.05*w;let M=C(D(3.05,3.7,e));B.setExplode(1-M),B.group.position.y=z.top+.12*(1-M),B.group.rotation.y=t*.22+1.2*(1-M);let N=p(),P=N?4.6:4,F=N?0:-.62,q=Math.sin(t*.13)*.05;V.position.set(F+q,N?.98:1.02,P*(.9+.1*M)),V.lookAt(F,N?.6:.86,0),i.position.copy(n.pos),i.lookAt(n.look),i.updateMatrixWorld(),W.copy(L).project(i),G.set(W.x*.5+.5,W.y*.5+.5);let J=Math.max(Math.hypot(G.x*K,G.y),Math.hypot((1-G.x)*K,G.y),Math.hypot(G.x*K,1-G.y),Math.hypot((1-G.x)*K,1-G.y)),Y=D(3,3.65,e),X=(J+.06)*Y*Y;return{k:Y<=0?0:Y>=1?1:.5,center:G,radius:X}}function J(e,t){K=e/t,V.aspect=K,V.updateProjectionMatrix();let n=t*Math.min(window.devicePixelRatio,1.75)/(2*Math.tan(g.degToRad(i.fov/2)));m.material.uniforms.uPx.value=n,h.material.uniforms.uPx.value=n}return{length:4,mode:0,alt:{scene:z.scene,camera:V},nav:[0,1.35,4],card:3.8,captions:[{from:-1,to:.55,eyebrow:`Capítulo uno`,title:`La flor`,text:`Nace del agua y se abre al cielo.`},{from:.85,to:1.9,eyebrow:`Capítulo dos`,title:`La esencia`,text:`El frasco se abre y su perfume se vuelve nube.`},{from:2.05,to:2.95,eyebrow:`Capítulo tres`,title:`La gota`,text:`De la bruma nace una sola gota de agua, que vuelve a la superficie.`}],update:q,resize:J}}export{I as createChapters};