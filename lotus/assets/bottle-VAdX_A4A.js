import{Hn as e,L as t,Vn as n,at as r,d as i,dt as a,g as o,j as s,o as c}from"./three.core-Dz0jzqxB.js";function l(e,t){let n=[],r=(n,r)=>{let[i,a,o]=e[n],s=(r+(o||0))/t*Math.PI*2;return[Math.sin(s)*i,a,Math.cos(s)*i]};for(let i=0;i<e.length-1;i++)for(let e=0;e<t;e++){let t=r(i,e),a=r(i,e+1),o=r(i+1,e),s=r(i+1,e+1);n.push(...t,...a,...o,...a,...s,...o)}let i=new c;return i.setAttribute(`position`,new s(n,3)),i.computeVertexNormals(),i}var u=[[0,0],[.15,0],[.232,.075,.5],[.245,.14],[.245,.34],[.222,.405,.5],[.15,.462],[.085,.48],[0,.48]],d=[[0,.52],[.07,.52],[.118,.558],[.14,.598],[.14,.624],[.122,.668,.5],[.092,.712,.5],[.074,.732,.5],[0,.732,.5]];function f(t,r,o,{env:s=1.25,coat:c=1,flat:l=!0,glass:u=null,glowScale:d=1}={}){let f=new a({color:`#2a0006`,roughness:.03,metalness:0,ior:1.77,specularIntensity:1,specularColor:new i(`#ff9aa6`),clearcoat:c,clearcoatRoughness:.02,envMapIntensity:s,flatShading:l,...u});t&&(f.envMap=t);let p={uGlow:{value:new i(r)},uFire:{value:new i(`#ff4a52`)},uCore:{value:new n(...o)},uGlowScale:{value:d},uTint:{value:new e(1,.32,.38)}};return f.userData.gem=p,f.onBeforeCompile=e=>{Object.assign(e.uniforms,p),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vLocal;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vLocal = mat3(modelMatrix) * position / length(modelMatrix[1].xyz); // rotated to world, local scale`),e.fragmentShader=e.fragmentShader.replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
        {
          // Dim studio reflections (walls, floor) pick up the stone's colour;
          // only the bright light panels stay white, so facets never read grey.
          vec3 ruby = uTint;
          float ls = dot(reflectedLight.indirectSpecular, vec3(0.299, 0.587, 0.114));
          reflectedLight.indirectSpecular *= mix(ruby, vec3(1.0), smoothstep(0.35, 0.9, ls));
          #ifdef USE_CLEARCOAT
          float lc = dot(clearcoatSpecularIndirect, vec3(0.299, 0.587, 0.114));
          clearcoatSpecularIndirect *= mix(ruby, vec3(1.0), smoothstep(0.35, 0.9, lc));
          #endif
        }`).replace(`#include <common>`,`#include <common>
uniform vec3 uGlow;
uniform vec3 uFire;
uniform vec2 uCore;
uniform float uGlowScale;
uniform vec3 uTint;
varying vec3 vLocal;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        {
          // Fake light trapped in the gem: facets facing the camera glow, the
          // silhouette stays deep crimson, a few facets flash with internal fire.
          vec3 V = normalize(vViewPosition);
          float facing = clamp(dot(normal, V), 0.0, 1.0);
          vec3 fk = floor(normal * 6.0 + 0.5);
          float h = fract(sin(dot(fk, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
          float h2 = fract(sin(dot(fk, vec3(39.346, 11.135, 83.155))) * 24634.6345);
          vec2 q = vec2(vLocal.x / uCore.x, (vLocal.y - uCore.y) / (uCore.x * 1.6));
          float core = exp(-dot(q, q) * 2.2);
          // internal reflection: the refracted ray bounces off the back facets
          vec3 rr = refract(-V, normal, 1.0 / 1.77);
          float bounce = pow(clamp(dot(reflect(rr, -normal), vec3(0.35, 0.8, 0.45)) * 0.5 + 0.5, 0.0, 1.0), 6.0);
          float fire = pow(h2, 5.0) * facing;
          vec3 glow = uGlow * (pow(facing, 1.8) * (0.2 + 0.35 * h) * (0.35 + 0.65 * core) + 0.8 * core * facing + 0.015);
          glow += uFire * (0.55 * fire + 0.35 * bounce * core);
          // darker toward grazing angles so the outline reads as thick glass
          glow *= mix(0.35, 1.0, smoothstep(0.05, 0.55, facing));
          totalEmissiveRadiance += glow * uGlowScale;
        }`)},f.customProgramCacheKey=()=>`ruby`,f}function p({envMap:e}={}){let n=new t;n.name=`bottle`;let i=new t;n.add(i);let s=new r(l(u,8),f(e,`#b0021a`,[.25,.24],{env:.8,coat:.45}));s.rotation.y=Math.PI/8;let c=new r(l(d,16),f(e,`#b8061c`,[.14,.63])),p=new a({color:`#e3b26a`,metalness:1,roughness:.16,envMapIntensity:1.5,clearcoat:.5,clearcoatRoughness:.1});e&&(p.envMap=e);let m=new r(new o(.094,.094,.04,40),p);m.position.y=.5;let h=new r(new o(.07,.085,.03,24),p);h.position.y=.475;for(let e of[s,c,m,h])e.castShadow=!0,i.add(e);function g(e,t=e){n.visible=e>.001,i.scale.setScalar(.3+.7*e),i.position.y=.04+.18*t}return g(0),{group:n,setReveal:g}}export{f as n,p as t};