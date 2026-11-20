const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./product-BvFDE5jZ.js","./three.core-Dz0jzqxB.js","./bottle-VAdX_A4A.js","./story-CkmplLQG.js","./preload-helper-Bg10DPg8.js","./story-Dr-e4nt3.css","./showroom-Dxzoilbm.js","./spray-CSZ-WXUL.js","./showroom-FJoRH8YJ.css"])))=>i.map(i=>d[i]);
import{a as e,n as t,r as n}from"./BufferGeometryUtils-4KX7f1yg.js";import{B as r,Cn as i,Ct as a,D as o,Dn as s,E as c,G as l,Gn as u,Hn as d,L as f,M as p,Mn as m,On as h,Q as g,R as _,Sn as v,St as y,T as b,Tn as ee,Tt as x,U as S,Un as C,Vn as w,Y as T,_t as E,a as D,at as O,b as k,bn as A,bt as te,d as j,dn as ne,dt as re,f as M,ft as ie,i as ae,it as N,lt as oe,nt as se,o as ce,ot as le,r as ue,rt as de,u as fe,un as pe,x as me,yt as he,z as ge}from"./three.core-Dz0jzqxB.js";import{i as _e,n as ve,r as ye,t as be}from"./preload-helper-Bg10DPg8.js";import{t as xe}from"./bottle-VAdX_A4A.js";import{t as Se}from"./spray-CSZ-WXUL.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var Ce=class extends v{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new ae;e.deleteAttribute(`uv`);let t=new ie({side:1}),n=new ie,r=new y(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new O(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new S(e,n,6),o=new E;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new O(e,P(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new O(e,P(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new O(e,P(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new O(e,P(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new O(e,P(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new O(e,P(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function P(e){return new oe({color:0,emissive:16777215,emissiveIntensity:e})}var we=class extends k{constructor(e){super(e),this.type=_}parse(e){let t=function(e,t){switch(e){case 1:throw Error(`THREE.HDRLoader: Read Error: `+(t||``));case 2:throw Error(`THREE.HDRLoader: Write Error: `+(t||``));case 3:throw Error(`THREE.HDRLoader: Bad File Format: `+(t||``));default:case 4:throw Error(`THREE.HDRLoader: Memory Error: `+(t||``))}},n=function(e,t,n){t||=1024;let r=e.pos,i=-1,a=0,o=``,s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(r,r+128)));for(;0>(i=s.indexOf(`
`))&&a<t&&r<e.byteLength;)o+=s,a+=s.length,r+=128,s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(r,r+128)));return-1<i&&(!1!==n&&(e.pos+=a+i+1),o+s.slice(0,i))},r=function(e){let r=/^#\?(\S+)/,i=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,a=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*FORMAT=(\S+)\s*$/,s=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,c={valid:0,string:``,comments:``,programtype:`RGBE`,format:``,gamma:1,exposure:1,width:0,height:0},l,u;for((e.pos>=e.byteLength||!(l=n(e)))&&t(1,`no header found`),(u=l.match(r))||t(3,`bad initial token`),c.valid|=1,c.programtype=u[1],c.string+=l+`
`;l=n(e),!1!==l;)if(c.string+=l+`
`,l.charAt(0)===`#`)c.comments+=l+`
`;else if((u=l.match(i))&&(c.gamma=parseFloat(u[1])),(u=l.match(a))&&(c.exposure=parseFloat(u[1])),(u=l.match(o))&&(c.valid|=2,c.format=u[1]),(u=l.match(s))&&(c.valid|=4,c.height=parseInt(u[1],10),c.width=parseInt(u[2],10)),c.valid&2&&c.valid&4)break;return c.valid&2||t(3,`missing format specifier`),c.valid&4||t(3,`missing image size specifier`),c},i=function(e,n,r){let i=n;if(i<8||i>32767||e[0]!==2||e[1]!==2||e[2]&128)return new Uint8Array(e);i!==(e[2]<<8|e[3])&&t(3,`wrong scanline width`);let a=new Uint8Array(4*n*r);a.length||t(4,`unable to allocate buffer space`);let o=0,s=0,c=4*i,l=new Uint8Array(4),u=new Uint8Array(c),d=r;for(;d>0&&s<e.byteLength;){s+4>e.byteLength&&t(1),l[0]=e[s++],l[1]=e[s++],l[2]=e[s++],l[3]=e[s++],(l[0]!=2||l[1]!=2||(l[2]<<8|l[3])!=i)&&t(3,`bad rgbe scanline format`);let n=0,r;for(;n<c&&s<e.byteLength;){r=e[s++];let i=r>128;if(i&&(r-=128),(r===0||n+r>c)&&t(3,`bad scanline data`),i){let t=e[s++];for(let e=0;e<r;e++)u[n++]=t}else u.set(e.subarray(s,s+r),n),n+=r,s+=r}let f=i;for(let e=0;e<f;e++){let t=0;a[o]=u[e+t],t+=i,a[o+1]=u[e+t],t+=i,a[o+2]=u[e+t],t+=i,a[o+3]=u[e+t],o+=4}d--}return a},a=function(e,t,n,r){let i=2**(e[t+3]-128)/255;n[r+0]=e[t+0]*i,n[r+1]=e[t+1]*i,n[r+2]=e[t+2]*i,n[r+3]=1},o=function(e,t,n,r){let i=2**(e[t+3]-128)/255;n[r+0]=me.toHalfFloat(Math.min(e[t+0]*i,65504)),n[r+1]=me.toHalfFloat(Math.min(e[t+1]*i,65504)),n[r+2]=me.toHalfFloat(Math.min(e[t+2]*i,65504)),n[r+3]=me.toHalfFloat(1)},s=new Uint8Array(e);s.pos=0;let c=r(s),l=c.width,u=c.height,d=i(s.subarray(s.pos),l,u),f,m,h;switch(this.type){case p:h=d.length/4;let e=new Float32Array(h*4);for(let t=0;t<h;t++)a(d,t*4,e,t*4);f=e,m=p;break;case _:h=d.length/4;let t=new Uint16Array(h*4);for(let e=0;e<h;e++)o(d,e*4,t,e*4);f=t,m=_;break;default:throw Error(`THREE.HDRLoader: Unsupported type: `+this.type)}return{width:l,height:u,data:f,header:c.string,gamma:c.gamma,exposure:c.exposure,type:m,colorSpace:g,minFilter:T,magFilter:T,generateMipmaps:!1,flipY:!0}}setDataType(e){return this.type=e,this}},Te={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Ee=class extends _e{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},De=class extends _e{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Oe=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new w);this._width=n.width,this._height=n.height,t=new u(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:_}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ve(Te),this.copyPass.material.blending=0,this.timer=new h}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Ee!==void 0&&(r instanceof Ee?n=!0:r instanceof De&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new w);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},ke=class extends _e{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new j}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Ae={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new j(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},je=class e extends _e{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new w(256,256):new w(e.x,e.y),this.clearColor=new j(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new u(a,o,{type:_,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new u(a,o,{type:_,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new u(a,o,{type:_,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),a=Math.round(a/2),o=Math.round(o/2)}let s=Ae;this.highPassUniforms=m.clone(s.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new i({uniforms:this.highPassUniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.separableBlurMaterials=[];let c=[6,10,14,18,22];a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new w(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new d(1,1,1),new d(1,1,1),new d(1,1,1),new d(1,1,1),new d(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=m.clone(Te.uniforms),this.blendMaterial=new i({uniforms:this.copyUniforms,vertexShader:Te.vertexShader,fragmentShader:Te.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new j,this._oldClearAlpha=1,this._basic=new le,this._fsQuad=new ye(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new w(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],a=[];for(let n=1;n<e;n+=2){let i=t[n],o=n+1<e?t[n+1]:0,s=i+o;r.push((n*i+(n+1)*o)/s),a.push(s)}return new i({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new w(.5,.5)},direction:{value:new w(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:a}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new i({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};je.BlurDirectionX=new w(1,0),je.BlurDirectionY=new w(0,1);var Me={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Ne=class extends _e{constructor(){super(),this.isOutputPass=!0,this.uniforms=m.clone(Me.uniforms),this.material=new pe({name:Me.name,uniforms:this.uniforms,vertexShader:Me.vertexShader,fragmentShader:Me.fragmentShader}),this._fsQuad=new ye(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},M.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Pe=e=>Math.min(1,Math.max(0,e));function Fe(){let e=document.querySelector(`[data-hero]`);if(!e)return{update(){}};e.querySelectorAll(`[data-rise]`).forEach(e=>e.style.setProperty(`--rise`,e.dataset.rise));let t=!1,n=-1,r=null;function i(i,a){let o=a.heroAt-.5;!t&&i>=o&&(t=!0,e.classList.add(`is-in`));let s=Pe((i-a.heroAt-.3)/1.55),c=s*s*(3-2*s),l=Math.round(c*1e3)/1e3;l!==n&&(n=l,e.style.setProperty(`--hero-out`,l));let u=i<o||c>=1;u!==r&&(r=u,e.classList.toggle(`is-gone`,u),e.inert=u)}return{update:i}}var Ie={ritual:{sel:`[data-ritual]`,from:4.3,to:7.1},mist:{sel:`[data-mist]`,from:7.35,to:10.3}};function Le({sel:e,from:t,to:n}){let r=document.querySelector(e);if(!r)return{update(){}};r.querySelectorAll(`[data-rise]`).forEach(e=>e.style.setProperty(`--rise`,e.dataset.rise));let i=null;function a(e,a){let o=e-a.land,s=o>t&&o<n;s!==i&&(i=s,r.classList.toggle(`is-in`,s),r.setAttribute(`aria-hidden`,String(!s)))}return{update:a}}var Re=()=>Le(Ie.ritual),ze=()=>Le(Ie.mist);function Be(){let e=document.querySelector(`[data-shade]`);if(!e)return{update(){}};let t=null;function n(n,r){let i=n>=r.heroAt-.5&&n-r.land<Ie.mist.to;i!==t&&(t=i,e.classList.toggle(`is-in`,i))}return{update:n}}var Ve=e=>Math.min(1,Math.max(0,e)),He=(e,t,n)=>{let r=Ve((n-e)/(t-e));return r*r*(3-2*r)};function Ue({marks:e,end:t}){let n=e[e.length-1].q||t,r=document.createElement(`nav`);r.className=`tl`,r.setAttribute(`aria-hidden`,`true`),r.innerHTML=`<div class="tl__track"><div class="tl__fill"></div>${e.map(e=>`<div class="tl__mark" style="--at:${(e.q/n).toFixed(4)}"><span class="tl__dot"></span><span class="tl__label">${e.label}</span></div>`).join(``)}</div>`,document.body.append(r);let i=r.querySelector(`.tl__fill`),a=[...r.querySelectorAll(`.tl__mark`)],o={in:null,k:-1,fade:-1,current:-1},s=t-.6,c=t-.25;function l(t,l){l!==o.in&&(o.in=l,r.classList.toggle(`is-in`,l));let u=Math.round(Ve(t/n)*1e3)/1e3;u!==o.k&&(o.k=u,i.style.transform=`scaleY(${u})`);let d=Math.round((1-He(s,c,t))*100)/100;d!==o.fade&&(o.fade=d,r.style.setProperty(`--tl-fade`,d),r.classList.toggle(`is-gone`,d<=0));let f=0;e.forEach((e,n)=>{t>=e.q-.02&&(f=n)}),f!==o.current&&(o.current=f,a.forEach((e,t)=>{e.classList.toggle(`is-past`,t<f),e.classList.toggle(`is-current`,t===f)}))}return{update:l}}var We={file:`lotus-ambient.mp3`,intro:3,from:14,xfade:6},Ge=`./audio/${We.file}`,Ke=.3,qe=2.5,Je=.8,Ye=We.xfade,Xe=We.intro,Ze=We.from,Qe=`lotus-sound`;function $e({gate:e=!1,land:t=2.85}={}){let n=document.querySelector(`.nav__sound`);if(!n)return null;let r=!0;try{r=localStorage.getItem(Qe)!==`off`}catch{}let i=null,a=null,o=null,s=null,c=!1,l=0,u=null,d=e=>{n.classList.toggle(`is-on`,e),n.setAttribute(`aria-pressed`,String(e))};function f(){i||(i=new(window.AudioContext||window.webkitAudioContext),a=i.createGain(),a.gain.value=0,a.connect(i.destination))}function p(){return f(),s||=fetch(Ge).then(e=>{if(!e.ok)throw Error(`sound ${e.status}`);return e.arrayBuffer()}).then(e=>i.decodeAudioData(e)).then(e=>o=e),s}function m(e,t,n){let r=o.duration-t,s=i.createBufferSource(),c=i.createGain();s.buffer=o,s.connect(c).connect(a),c.gain.setValueAtTime(+!n,e),n&&c.gain.linearRampToValueAtTime(1,e+Ye),c.gain.setValueAtTime(1,e+r-Ye),c.gain.linearRampToValueAtTime(0,e+r),s.start(e,t),s.stop(e+r),l=e+r-Ye}setInterval(()=>{c&&o&&l&&i.state===`running`&&i.currentTime>l-3&&m(l,Ze,!0)},1e3);function h(e,t){let n=i.currentTime;a.gain.cancelScheduledValues(n),a.gain.setValueAtTime(a.gain.value,n),a.gain.linearRampToValueAtTime(e,n+t)}async function g(e=!1,n=performance.now()){f(),c=!0,d(!0),clearTimeout(u),i.resume();try{await p()}catch{c=!1,d(!1);return}if(c){if(!l){let r=(performance.now()-n)/1e3,a=t-Xe-r;if(e&&a>-Xe){m(i.currentTime+Math.max(.02,a),Math.max(0,-a),!1),h(Ke,.05);return}m(i.currentTime+.05,Ze,!0)}h(Ke,qe)}}function _(){c=!1,d(!1),i&&(h(0,Je),u=setTimeout(()=>{c||i.suspend()},900))}if(n.addEventListener(`click`,()=>{r=!c;try{localStorage.setItem(Qe,r?`on`:`off`)}catch{}r?g():_()}),e)p().catch(()=>{});else{let e=e=>{n.contains(e.target)||(i(),r&&!c&&g())},t=[`pointerdown`,`keydown`,`touchend`],i=()=>t.forEach(t=>window.removeEventListener(t,e,!0));t.forEach(t=>window.addEventListener(t,e,!0)),n.addEventListener(`click`,i)}return document.addEventListener(`visibilitychange`,()=>{i&&c&&(document.hidden?i.suspend():i.resume())}),{enter(){r&&g(!0)},start:g,stop:_,get playing(){return c}}}var et={src:``,srcPortrait:``,alt:``,hazeColor:[221,229,244],restingHaze:.38,introHaze:.97,introMs:3200,blurPx:20,brushRadius:130,holdMs:650,refogMs:2400,cell:10,fogScale:.5,ambientEveryMs:2500,ambientRadius:0,ambientFadeMs:1100,ambientHoldMs:1400,ambientSpots:null,particles:!0,particleEveryPx:14,particleMax:120,particleOpacity:.85,particleSize:[1.2,3.2],particleLifeMs:[900,1900],particleShape:`mote`,particleColors:[[238,243,252],[208,222,248],[176,198,244],[226,222,250]],pointerTarget:null,onReady:null},tt=e=>e<0?0:e>1?1:e,nt=e=>e*e*(3-2*e),rt=e=>1-(1-e)**3,it=e=>.5-Math.cos(Math.PI*e)/2,at=([e,t])=>e+Math.random()*(t-e),F=64;function ot(e){let t=document.createElement(`canvas`);t.width=F,t.height=F;let n=t.getContext(`2d`),r=F/2,[i,a,o]=e,s=n.createRadialGradient(r,r,0,r,r,r);s.addColorStop(0,`rgba(107, 26, 46, 0.16)`),s.addColorStop(1,`rgba(107, 26, 46, 0)`),n.fillStyle=s,n.fillRect(0,0,F,F);let c=n.createRadialGradient(r,r,0,r,r,r*.62);return c.addColorStop(0,`rgba(${i}, ${a}, ${o}, 1)`),c.addColorStop(.2,`rgba(${i}, ${a}, ${o}, 0.95)`),c.addColorStop(.42,`rgba(${i}, ${a}, ${o}, 0.28)`),c.addColorStop(1,`rgba(${i}, ${a}, ${o}, 0)`),n.fillStyle=c,n.fillRect(0,0,F,F),t}function st(e){let t=document.createElement(`canvas`);t.width=F,t.height=F;let n=t.getContext(`2d`),[r,i,a]=e,o=()=>{n.beginPath(),n.moveTo(32,58),n.bezierCurveTo(15,51,12,25,32,6),n.bezierCurveTo(52,25,49,51,32,58),n.closePath()},s=n.createLinearGradient(32,58,32,6);s.addColorStop(0,`rgba(255, 248, 244, 1)`),s.addColorStop(.45,`rgba(${Math.round((r+255)/2)}, ${Math.round((i+244)/2)}, ${Math.round((a+240)/2)}, 1)`),s.addColorStop(1,`rgba(${r}, ${i}, ${a}, 1)`),n.save(),n.shadowColor=`rgba(107, 26, 46, 0.3)`,n.shadowBlur=5,n.shadowOffsetY=1.5,o(),n.fillStyle=s,n.fill(),n.restore();let c=n.createLinearGradient(16,0,48,0);return c.addColorStop(0,`rgba(255, 255, 255, 0.35)`),c.addColorStop(.5,`rgba(255, 255, 255, 0)`),c.addColorStop(1,`rgba(107, 26, 46, 0.08)`),o(),n.fillStyle=c,n.fill(),n.strokeStyle=`rgba(${Math.round(r*.7)}, ${Math.round(i*.6)}, ${Math.round(a*.65)}, 0.28)`,n.lineWidth=.7,n.stroke(),n.beginPath(),n.moveTo(32,54),n.quadraticCurveTo(31,32,32,13),n.moveTo(30,50),n.quadraticCurveTo(23,36,25,20),n.moveTo(34,50),n.quadraticCurveTo(41,36,39,20),n.strokeStyle=`rgba(${Math.round(r*.75)}, ${Math.round(i*.6)}, ${Math.round(a*.7)}, 0.16)`,n.lineWidth=.6,n.stroke(),t}function ct(e,t,n,r){let i=Math.max(n/e,r/t),a=e*i,o=t*i;return[(n-a)/2,(r-o)/2,a,o]}function lt(e,t){return tt(.5+(Math.sin(e*.021+1.3)*Math.cos(t*.017-.4)+.6*Math.sin((e+t)*.033+2.1)+.4*Math.cos((e-t)*.047-1.7))/4)}function ut(e,t,n,r){let i=Math.max(1,Math.ceil(t/8)),a=Math.max(1,Math.ceil(n/8)),o=document.createElement(`canvas`);o.width=i,o.height=a;let s=o.getContext(`2d`,{willReadFrequently:!0});s.imageSmoothingQuality=`high`;let[c,l,u,d]=ct(e.naturalWidth,e.naturalHeight,i,a);s.drawImage(e,c,l,u,d);let f;try{f=s.getImageData(0,0,i,a).data}catch{return[]}let p=i*a,m=e=>{let t=new Uint8Array(p);for(let n=0;n<p;n++)t[n]=f[n*4+e];return t.sort()[p>>1]},h=[m(0),m(1),m(2)],g=new Float32Array(p);for(let e=0;e<p;e++){let[t,n,r]=[f[e*4],f[e*4+1],f[e*4+2]];g[e]=n>t&&n>r?0:Math.hypot(t-h[0],n-h[1],r-h[2])}let _=Math.max(1,Math.round(r/8/4)),v=(e,t)=>{let n=new Float32Array(p),r=t?i:a,o=t?a:i;for(let a=0;a<o;a++)for(let o=0;o<r;o++){let s=0,c=0;for(let n=Math.max(0,o-_);n<=Math.min(r-1,o+_);n++)s+=e[t?a*i+n:n*i+a],c++;n[t?a*i+o:o*i+a]=s/c}return n};for(let e=0;e<2;e++)g=v(v(g,!0),!1);let y=Array.from(g.keys()).sort((e,t)=>g[t]-g[e]),b=Math.max(14,g[y[0]]*.35),ee=r*1.6,x=r*.5,S=[];for(let e of y){if(g[e]<b||S.length>=24)break;let r=(e%i+.5)*8,a=(Math.floor(e/i)+.5)*8;r<x||a<x||r>t-x||a>n-x||S.every(([e,t])=>Math.hypot(e-r,t-a)>=ee)&&S.push([r,a])}return S}function dt(e,t={}){let n={...et};for(let[e,r]of Object.entries(t))r!==void 0&&(n[e]=r);let r=n.pointerTarget||e,i=window.matchMedia(`(prefers-reduced-motion: reduce)`),a=new Image;a.className=`fr-image`,a.alt=n.alt,a.decoding=`async`,a.draggable=!1;let o=document.createElement(`canvas`);o.className=`fr-fog`,o.setAttribute(`aria-hidden`,`true`);let s=o.getContext(`2d`),c=document.createElement(`canvas`);c.className=`fr-particles`,c.setAttribute(`aria-hidden`,`true`);let l=c.getContext(`2d`),u=1,d=new Map,f=document.createElement(`canvas`),p=document.createElement(`canvas`),m=p.getContext(`2d`);e.classList.add(`fr-layer`),e.append(a,o,c);let h=0,g=0,_=0,v=0,y=new Float32Array,b=new Float32Array,ee=new Float32Array,x=null,S=null,C=``,w=!1,T=!1,E=!0,D=0,O=0,k=0,A=null,te=[],j=[],ne=[],re=0,M=[],ie=0;function ae(){return Math.min(n.brushRadius,Math.min(h,g)*.24)}function N(){return n.ambientRadius||ae()*1.25}function oe(){return[].concat(n.ambientEveryMs)[0]>0&&!i.matches}function se(){n.ambientSpots?te=n.ambientSpots.map(([e,t])=>[e*h,t*g]):oe()&&(te=ut(S,h,g,N())),j=[]}function ce(){let e=o.width,t=o.height;f.width=e,f.height=t;let r=f.getContext(`2d`),i=n.blurPx*n.fogScale,a=Math.ceil(i*3),[s,c,l,u]=ct(S.naturalWidth,S.naturalHeight,e+a*2,t+a*2);if(typeof r.filter==`string`)r.filter=`blur(${i}px)`,r.drawImage(S,s-a,c-a,l,u),r.filter=`none`;else{let n=document.createElement(`canvas`);n.width=Math.max(1,Math.round(e/14)),n.height=Math.max(1,Math.round(t/14));let i=n.getContext(`2d`);i.imageSmoothingQuality=`high`,i.drawImage(S,(s-a)/14,(c-a)/14,l/14,u/14),r.imageSmoothingQuality=`high`,r.drawImage(n,0,0,e,t)}}function le(){let t=e.getBoundingClientRect();if(!t.width||!t.height)return;h=t.width,g=t.height,o.width=Math.max(1,Math.round(h*n.fogScale)),o.height=Math.max(1,Math.round(g*n.fogScale)),u=Math.min(2,window.devicePixelRatio||1),c.width=Math.max(1,Math.round(h*u)),c.height=Math.max(1,Math.round(g*u)),M=[],_=Math.ceil(h/n.cell)+1,v=Math.ceil(g/n.cell)+1,y=new Float32Array(_*v).fill(1),b=new Float32Array(_*v).fill(-1/0),ee=new Float32Array(_*v);for(let e=0;e<v;e++)for(let t=0;t<_;t++)ee[e*_+t]=.55+.9*lt(t*n.cell,e*n.cell);p.width=_,p.height=v,x=m.createImageData(_,v),x.data.fill(255);let r=ue();r!==C&&de(r),w&&(ce(),se(),P())}function ue(){return n.srcPortrait&&g>h*1.1?n.srcPortrait:n.src}function de(t){C=t;let r=new Image;r.src=t,r.decode().catch(()=>void 0).then(()=>{T||t!==C||(r.naturalWidth?(S=r,a.src=t,e.classList.remove(`is-error`),w?(ce(),se(),P()):(w=!0,k=i.matches?0:performance.now(),e.classList.add(`is-ready`),i.matches||e.classList.add(`is-intro`),le(),we.observe(e),Te.observe(e),ye(k?n.introMs:0),n.onReady?.())):e.classList.add(`is-error`))})}function fe(e,t,r,i,a=1,o=i){let s=n.cell,c=Math.max(0,Math.floor((e-r)/s)),l=Math.min(_-1,Math.ceil((e+r)/s)),u=Math.max(0,Math.floor((t-r)/s)),d=Math.min(v-1,Math.ceil((t+r)/s));for(let n=u;n<=d;n++)for(let i=c;i<=l;i++){let c=Math.hypot(i*s-e,n*s-t)/r;if(c>=1)continue;let l=a*(c<.42?1:1-nt((c-.42)/.58)),u=n*_+i,d=1-l;d<y[u]&&(y[u]=d),l>.3&&o>b[u]&&(b[u]=o)}}function pe(e,t){if(!_)return;let n=performance.now(),r=ae();if(A&&n-A.t<120){let i=e-A.x,a=t-A.y,o=Math.min(40,Math.ceil(Math.hypot(i,a)/(r*.3)));for(let e=1;e<=o;e++)fe(A.x+i*e/o,A.y+a*e/o,r,n)}else fe(e,t,r,n);A&&n-A.t<120&&he(A.x,A.y,e,t,n),A={x:e,y:t,t:n},P()}function me(e){let t=e.join(`,`),r=d.get(t);return r||d.set(t,r=n.particleShape===`petal`?st(e):ot(e)),r}function he(e,t,r,a,o){if(!n.particles||i.matches)return;let s=r-e,c=a-t,l=Math.hypot(s,c);if(!l)return;ie+=l;let u=Math.min(.08,l/700);for(;ie>=n.particleEveryPx;){ie-=n.particleEveryPx;let r=tt(1-ie/l),i=1+Math.floor(Math.random()*2);for(let a=0;a<i;a++){M.length>=n.particleMax&&M.shift();let i=Math.random()*Math.PI*2,a=.008+Math.random()*.04;n.particleShape===`petal`?M.push({x:e+s*r+(Math.random()-.5)*22,y:t+c*r+(Math.random()-.5)*22,vx:s/l*u*(.4+Math.random())+Math.cos(i)*a,vy:c/l*u*(.4+Math.random())-.02-Math.random()*.03,size:at(n.particleSize),sprite:me(n.particleColors[Math.floor(Math.random()*n.particleColors.length)]),born:o,life:at(n.particleLifeMs),rot:Math.random()*Math.PI*2,spin:(Math.random()-.5)*.004,flip:Math.random()*Math.PI*2,flipSpeed:.002+Math.random()*.004,sway:Math.random()*Math.PI*2}):M.push({x:e+s*r+(Math.random()-.5)*18,y:t+c*r+(Math.random()-.5)*18,vx:s/l*u*Math.random()+Math.cos(i)*a,vy:c/l*u*Math.random()+Math.sin(i)*a,size:at(n.particleSize),sprite:me(n.particleColors[Math.floor(Math.random()*n.particleColors.length)]),born:o,life:at(n.particleLifeMs),twinkle:Math.random()*Math.PI*2,twinkleSpeed:.006+Math.random()*.01})}}}function ge(e,t){let r=u;l.setTransform(1,0,0,1,0,0),l.clearRect(0,0,c.width,c.height),M=M.filter(t=>e-t.born<t.life);let i=.994**t;if(n.particleShape===`petal`){let i=.997**t;for(let a of M){let o=(e-a.born)/a.life;a.vx*=i,a.vy=a.vy*i+5e-5*t,a.sway+=.0028*t,a.x+=(a.vx+Math.sin(a.sway)*.018)*t,a.y+=a.vy*t,a.rot+=a.spin*t+Math.cos(a.sway)*9e-4*t,a.flip+=a.flipSpeed*t;let s=Math.min(1,o/.1)*(1-nt(tt((o-.6)/.4))),c=Math.cos(a.flip),u=a.size*r/(F*.82);l.globalAlpha=tt(n.particleOpacity*s*(.8+.2*Math.abs(c))),l.setTransform(1,0,0,1,a.x*r,a.y*r),l.rotate(a.rot),l.scale(u*Math.max(.18,Math.abs(c)),u),l.drawImage(a.sprite,-32,-32)}l.setTransform(1,0,0,1,0,0),l.globalAlpha=1}else{for(let a of M){let o=(e-a.born)/a.life;a.vx*=i,a.vy=a.vy*i-12e-6*t,a.x+=a.vx*t,a.y+=a.vy*t,a.twinkle+=a.twinkleSpeed*t;let s=Math.min(1,o/.08)*(1-nt(tt((o-.3)/.7))),c=.72+.28*Math.sin(a.twinkle);l.globalAlpha=tt(n.particleOpacity*s*c);let u=a.size*8*(1-.45*o)*r;l.drawImage(a.sprite,a.x*r-u/2,a.y*r-u/2,u,u)}l.globalAlpha=1}}function _e(e,t){let r=Math.min(_-1,Math.max(0,Math.round(e/n.cell))),i=Math.min(v-1,Math.max(0,Math.round(t/n.cell)));return y[i*_+r]}function ve(){if(!te.length)return[h*(.1+.8*Math.random()),g*(.1+.8*Math.random())];let e=Math.min(3,te.length-1),t=te.filter(e=>!j.includes(e)&&_e(e[0],e[1])>.6),n=t.length?t:te,r=n[Math.floor(Math.random()*n.length)];return j=[r,...j].slice(0,e),r}function ye(e=0){if(clearTimeout(re),T||!oe())return;let[t,r=t]=[].concat(n.ambientEveryMs);re=setTimeout(be,e+t+Math.random()*(r-t))}function be(){if(w&&E&&!document.hidden&&_){let[e,t]=ve();ne.push({x:e,y:t,start:performance.now()}),P()}ye()}function xe(t){if(!w)return;let n=e.getBoundingClientRect();pe(t.clientX-n.left,t.clientY-n.top)}function Se(){A=null}function Ce(e){if(D=0,T||!w)return;let t=Math.min(64,e-(O||e));O=e;let r=k?tt((e-k)/n.introMs):1,i=n.introHaze+(n.restingHaze-n.introHaze)*rt(r),a=r<1;if(ne.length){let t=N(),r=e+n.ambientHoldMs-n.holdMs;ne=ne.filter(i=>{let a=tt((e-i.start)/n.ambientFadeMs);return fe(i.x,i.y,t,e,it(a),r),a<1}),a=!0}let c=t/n.refogMs,l=x.data;for(let t=0,r=y.length;t<r;t++){let r=y[t];r<1&&(a=!0,e-b[t]>n.holdMs&&(r=Math.min(1,r+c*ee[t]),y[t]=r)),l[t*4+3]=nt(r)*255}m.putImageData(x,0,0);let u=o.width,d=o.height,[h,g,S]=n.hazeColor;s.globalCompositeOperation=`copy`,s.drawImage(f,0,0),s.globalCompositeOperation=`source-over`,s.fillStyle=`rgba(${h}, ${g}, ${S}, ${i})`,s.fillRect(0,0,u,d);let C=n.cell*n.fogScale;s.globalCompositeOperation=`destination-in`,s.imageSmoothingEnabled=!0,s.imageSmoothingQuality=`high`,s.drawImage(p,-C/2,-C/2,_*C,v*C),s.globalCompositeOperation=`source-over`,M.length&&(ge(e,t),a=!0),a&&E&&(D=requestAnimationFrame(Ce))}function P(){!D&&w&&E&&!T&&(O=0,D=requestAnimationFrame(Ce))}let we=new ResizeObserver(le),Te=new IntersectionObserver(([e])=>{E=e.isIntersecting,E&&P()});r.addEventListener(`pointermove`,xe,{passive:!0}),r.addEventListener(`pointerdown`,xe,{passive:!0}),r.addEventListener(`pointerleave`,Se),r.addEventListener(`pointercancel`,Se);let Ee=e.getBoundingClientRect();return h=Ee.width,g=Ee.height,de(ue()),{reveal(e,t){w&&pe(e,t)},update(e={}){let t={...n};for(let[t,r]of Object.entries(e))r!==void 0&&(n[t]=r);if(n.alt!==t.alt&&(a.alt=n.alt),n.src!==t.src||n.srcPortrait!==t.srcPortrait){let e=ue();e!==C&&de(e)}w&&(n.blurPx!==t.blurPx&&ce(),(n.brushRadius!==t.brushRadius||n.ambientRadius!==t.ambientRadius||String(n.ambientEveryMs)!==String(t.ambientEveryMs))&&se(),String(n.ambientEveryMs)!==String(t.ambientEveryMs)&&ye(),(n.particleColors!==t.particleColors||n.particleShape!==t.particleShape)&&(d=new Map),n.particles||(M=[],l.clearRect(0,0,c.width,c.height)),P())},destroy(){T=!0,D&&cancelAnimationFrame(D),clearTimeout(re),we.disconnect(),Te.disconnect(),r.removeEventListener(`pointermove`,xe),r.removeEventListener(`pointerdown`,xe),r.removeEventListener(`pointerleave`,Se),r.removeEventListener(`pointercancel`,Se),a.remove(),o.remove(),c.remove(),e.classList.remove(`fr-layer`,`is-ready`,`is-intro`,`is-error`)}}}var ft=`./`,pt=1300,mt=1200;function ht({onStart:e}){let t=document.querySelector(`.gate`);if(!t)return null;t.hidden=!1;let n=t.querySelector(`.gate__glass`),r=t.querySelector(`.gate__mark`),i=t.querySelector(`.gate__start`),a=t.querySelector(`.gate__mute`),o=document.querySelector(`.brand__mark`),s=dt(n,{src:`${ft}img/gate-scene.webp`,srcPortrait:`${ft}img/gate-scene-portrait.webp`,alt:``,hazeColor:[243,221,226],restingHaze:.46,introHaze:.98,blurPx:22,holdMs:180,refogMs:1e3,particleShape:`petal`,particleEveryPx:42,particleMax:50,particleOpacity:.95,particleSize:[20,32],particleLifeMs:[2200,3600],particleColors:[[236,140,168],[226,118,150],[244,172,192],[214,98,132]],pointerTarget:t}),c=!1;function l(){if(!o)return;let e=document.querySelector(`.nav`),t=r.getBoundingClientRect(),n=o.getBoundingClientRect(),i=e?new DOMMatrixReadOnly(getComputedStyle(e).transform).m42:0,a=n.left+n.width/2-(t.left+t.width/2),s=n.top-i+n.height/2-(t.top+t.height/2),c=n.width/t.width;document.documentElement.classList.add(`is-docking`),r.animate([{transform:`none`},{transform:`translate(${a}px, ${s}px) scale(${c})`}],{duration:pt,easing:`cubic-bezier(0.65, 0, 0.25, 1)`,fill:`forwards`}).finished.then(()=>{document.documentElement.classList.remove(`is-docking`),document.documentElement.classList.add(`is-docked`)})}function u(n){c||i.disabled||(c=!0,e({sound:n}),t.classList.add(`is-leaving`),l(),setTimeout(()=>{s.destroy(),t.remove()},Math.max(pt,mt)+100))}return i.addEventListener(`click`,()=>u(!0)),a?.addEventListener(`click`,()=>u(!1)),{ready(){i.disabled=!1,a&&(a.disabled=!1),t.classList.add(`is-ready`)}}}var gt=16,I=34,_t=[{name:`sepal`,count:5,len:.22,wid:.15,r0:.085,y0:.03,phase:.31,closed:{tilt:1.3,bend:1.25,pow:1,cup:.15},open:{tilt:1.45,bend:.45,pow:1.5,cup:.2},delay:0,sepal:!0},{name:`inner`,count:5,len:.92,wid:.29,r0:.1,y0:.065,phase:Math.PI/5,closed:{tilt:1.15,bend:1.65,pow:.4,cup:.16,point:.3},open:{tilt:1,bend:.45,pow:1.1,cup:.4},front:{tilt:.26,bend:-.55,cup:-.16},back:{tilt:-.35},delay:.7},{name:`middle`,count:6,len:.92,wid:.31,r0:.07,y0:.06,phase:Math.PI/6,closed:{tilt:1.65,bend:2.3,pow:.4,cup:.18,len:.9,point:.4},open:{tilt:1.22,bend:.5,pow:2,cup:.27},front:{tilt:.3,bend:-.25},back:{tilt:-.74,bend:.2,cup:.2,len:.12,wid:.15},delay:.35},{name:`outer`,count:8,len:.92,wid:.34,r0:.095,y0:.055,phase:0,closed:{tilt:1.55,bend:2.4,pow:.6,cup:.2,len:.8,point:.45},open:{tilt:1.42,bend:.72,pow:2.2,cup:.28},delay:0}];function vt(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var yt=(e,t,n)=>e+(t-e)*n;function bt(e){return Math.sin(Math.PI*e**.72)**.6*(1-.35*(1-e)**3)+.22*(1-e)**2.4}function xt(e,t,n){let{len:r,wid:i,bend:a,pow:o,cup:s,point:c}=e,l=0,u=0,d=r/I;for(let e=0;e<=I;e++){let t=a*(e/I)**+o;n[e*4]=l,n[e*4+1]=u,n[e*4+2]=Math.sin(t),n[e*4+3]=Math.cos(t);let r=a*((e+.5)/I)**+o;l+=Math.cos(r)*d,u-=Math.sin(r)*d}let f=0;for(let e=0;e<=I;e++){let r=e/I,a=Math.min(1,Math.max(0,(r-.45)/.55)),o=i*bt(r)*(1-c*a*a*(3-2*a)),l=s*(.7+.6*r),u=n[e*4],d=n[e*4+1],p=n[e*4+2],m=n[e*4+3];for(let e=0;e<=gt;e++){let n=e/gt*2-1,i=n*o/l,a=l*Math.sin(i),s=-l*(1-Math.cos(i))-.012*r**6*n*n;t[f++]=a,t[f++]=u+p*s,t[f++]=d+m*s}}}function St(){let e=new ce,t=new Float32Array(1785),n=new Float32Array(1190),r=0;for(let e=0;e<=I;e++)for(let t=0;t<=gt;t++)n[r++]=t/gt,n[r++]=e/I;let i=[];for(let e=0;e<I;e++)for(let t=0;t<gt;t++){let n=e*17+t,r=n+1,a=n+gt+1,o=a+1;i.push(n,a,r,r,a,o)}return e.setIndex(i),e.setAttribute(`position`,new D(t,3).setUsage(c)),e.setAttribute(`uv`,new D(n,2)),e.setAttribute(`normal`,new D(new Float32Array(1785),3)),e}var Ct=`
uniform vec3 uBase;
uniform vec3 uMid;
uniform vec3 uEdge;
uniform vec3 uTip;
uniform vec3 uTrans;
uniform float uVein;
varying vec2 vPetalUv;
vec2 hash22(vec2 p){ p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453); }
float hash12(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), f.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), f.x), f.y);
}
float cellEdge(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float d1 = 8.0, d2 = 8.0;
  for (int y=-1; y<=1; y++) for (int x=-1; x<=1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 o = hash22(i + g);
    float d = length(g + o - f);
    if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
  }
  return 1.0 - smoothstep(0.0, 0.09, d2 - d1);
}
// Vein structure shared by color and relief: x = combined mask, y = relief height.
vec2 petalVeins(vec2 uv){
  float u = uv.x * 2.0 - 1.0;
  float v = uv.y;
  float au = abs(u);
  float fan = u * (5.0 + 2.5 * v);
  float vein = 1.0 - smoothstep(0.0, 0.11, abs(fract(fan + 0.5) - 0.5));
  // wide, soft profile of the same veins for the relief (sharp grooves alias into stipple)
  float groove = 1.0 - smoothstep(0.0, 0.3, abs(fract(fan + 0.5) - 0.5));
  float mid = 1.0 - smoothstep(0.0, 0.05, au);
  float midRidge = 1.0 - smoothstep(0.0, 0.14, au);
  float net = cellEdge(vec2(u * 7.0, v * 15.0));
  float fade = smoothstep(0.02, 0.2, v) * (1.0 - smoothstep(0.86, 0.97, v));
  float mask = (vein * 0.55 + net * 0.35 + mid * 0.6) * uVein * fade;
  // veins sit in shallow, rounded grooves either side of a raised midrib; a slow
  // undulation keeps the blade from looking machined
  float h = (-groove * 0.7 + midRidge * 0.6) * fade + vnoise(uv * vec2(4.0, 7.0)) * 0.5;
  return vec2(mask, h * uVein);
}
`;function wt(e,{sepal:t=!1}={}){let n=new re({color:16777215,roughness:.44,metalness:0,sheen:.7,sheenRoughness:.38,sheenColor:new j(`#ffd6da`),clearcoat:.3,clearcoatRoughness:.28,side:2,envMapIntensity:.85});n.shadowSide=2;let r={uBase:{value:new j(e.base)},uMid:{value:new j(e.mid)},uEdge:{value:new j(e.edge)},uTip:{value:new j(e.tip)},uTrans:{value:new j(e.trans)},uVein:{value:t?.5:1}};return n.userData.uniforms=r,n.onBeforeCompile=e=>{Object.assign(e.uniforms,r),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec2 vPetalUv;`).replace(`#include <uv_vertex>`,`#include <uv_vertex>
vPetalUv = uv;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\n${Ct}`).replace(`#include <color_fragment>`,`#include <color_fragment>
        {
          float u = vPetalUv.x * 2.0 - 1.0;
          float v = vPetalUv.y;
          float au = abs(u);
          vec2 vh = petalVeins(vPetalUv);
          vec3 c = mix(uBase, uMid, smoothstep(0.15, 0.85, v));
          // blush creeping in from the margins, strongest on the upper half
          float blush = smoothstep(0.4, 1.0, au) * smoothstep(0.1, 0.85, v);
          blush *= 0.75 + 0.5 * vnoise(vPetalUv * vec2(3.0, 5.0));
          c = mix(c, uEdge, blush * 0.5);
          // rose rim along the whole edge, widening toward the tip
          float rimW = mix(0.95, 0.86, smoothstep(0.5, 1.0, v));
          c = mix(c, uTip, smoothstep(rimW, 1.0, au) * smoothstep(0.3, 0.9, v) * 0.55);
          // magenta tip that bleeds down the centre line
          float tip = smoothstep(0.84, 0.995, v) * (1.0 - 0.55 * smoothstep(0.2, 0.85, au));
          c = mix(c, uTip, tip * 0.9);
          // veins: slightly darker and pinker than the blade
          c *= 1.0 - 0.08 * vh.x;
          c = mix(c, uEdge, vh.x * 0.12);
          // occlusion where the petal meets the receptacle
          c *= mix(0.8, 1.0, smoothstep(0.0, 0.3, v));
          diffuseColor.rgb *= c;
        }`).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
        {
          // bump from the vein relief (derivative bump, as in three's bumpmap)
          float hb = petalVeins(vPetalUv).y * 0.0008;
          vec3 dpx = dFdx(-vViewPosition);
          vec3 dpy = dFdy(-vViewPosition);
          float hx = dFdx(hb);
          float hy = dFdy(hb);
          vec3 r1 = cross(dpy, normal);
          vec3 r2 = cross(normal, dpx);
          float det = dot(dpx, r1);
          vec3 grad = sign(det) * (hx * r1 + hy * r2);
          normal = normalize(abs(det) * normal - grad);
        }`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        {
          // soft pink halo where the petal turns away from the viewer
          float fres = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 3.0);
          totalEmissiveRadiance += uTrans * uEdge * fres * 0.1;
        }`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
        #if NUM_DIR_LIGHTS > 0
        {
          // backlit translucency from the low sun, warmer and thicker toward the base
          vec3 L = directionalLights[ 0 ].direction;
          vec3 V = geometryViewDir;
          float back = pow(clamp(dot(-V, L), 0.0, 1.0), 2.0);
          float thru = clamp(-dot(normal, L), 0.0, 1.0);
          float thin = mix(0.55, 1.0, smoothstep(0.1, 0.8, vPetalUv.y));
          vec3 trans = uTrans * diffuseColor.rgb * directionalLights[ 0 ].color;
          reflectedLight.directDiffuse += trans * (0.45 * thru + 0.55 * back) * thin;
        }
        #endif`)},n.customProgramCacheKey=()=>t?`petal-sepal`:`petal`,n}var Tt={base:`#fff7f0`,mid:`#fbe7df`,edge:`#efc0b9`,tip:`#c64a68`,trans:`#ffd9cf`},Et={base:`#d7b2ad`,mid:`#c49a98`,edge:`#b0827f`,tip:`#9a636b`,trans:`#e2b4ad`};function Dt({envMap:e}={}){let t=new f;t.name=`flower`;let n=vt(20261009),r=wt(Tt),i=wt(Et,{sepal:!0});e&&(r.envMap=e,i.envMap=e);let a=[[0,-.035],[.035,-.032],[.07,-.015],[.098,.012],[.112,.042],[.106,.068],[.085,.085],[.05,.094],[0,.097]].map(([e,t])=>new w(e,t)),o=new l(a,40),s=new re({color:`#b47c84`,roughness:.42,sheen:.5,sheenColor:new j(`#f3c3c8`),clearcoat:.3,clearcoatRoughness:.3,envMapIntensity:.7});e&&(s.envMap=e);let c=new O(o,s);c.castShadow=!0,c.receiveShadow=!0,t.add(c);let u=[];for(let e of _t)for(let a=0;a<e.count;a++){let o=e.phase+a/e.count*Math.PI*2+(n()-.5)*.08,s=new f;s.rotation.y=o,s.position.set(Math.sin(o)*e.r0,e.y0,Math.cos(o)*e.r0);let c=new f;s.add(c);let l=St(),d=new O(l,e.sepal?i:r);d.castShadow=!0,d.receiveShadow=!0,c.add(d),t.add(s);let p={len:1+(n()-.5)*.08,wid:1+(n()-.5)*.1,tilt:(n()-.5)*.06,bend:(n()-.5)*.08};u.push({ring:e,index:a,az:o,pivot:s,tiltGroup:c,mesh:d,geo:l,jitter:p,spine:new Float32Array(140),open:-1,stagger:a*3%e.count/e.count})}let d={len:0,wid:0,tilt:0,bend:0,pow:0,cup:0,point:0};function p(e,t){if(Math.abs(e.open-t)<1e-5)return!1;e.open=t;let{closed:n,open:r}=e.ring,i=Math.min(Math.max(t,0),1);d.len=e.ring.len*e.jitter.len*yt(n.len??1,1,i),d.point=yt(n.point??0,0,i),d.wid=e.ring.wid*e.jitter.wid;let a=Math.cos(e.az),o=Math.max(0,a)**2*i,s=Math.max(0,-a)**1.5*i,c=t=>(e.ring.front?.[t]??0)*o+(e.ring.back?.[t]??0)*s;return d.len*=1+c(`len`),d.wid*=1+c(`wid`),d.bend=yt(n.bend,r.bend,t)+e.jitter.bend+c(`bend`),d.pow=yt(n.pow,r.pow,i),d.cup=yt(n.cup,r.cup,i)+c(`cup`),d.tilt=yt(n.tilt,r.tilt,t)+e.jitter.tilt*t+c(`tilt`),e.tiltGroup.rotation.x=d.tilt,xt(d,e.geo.attributes.position.array,e.spine),e.geo.attributes.position.needsUpdate=!0,e.geo.computeVertexNormals(),e.geo.computeBoundingSphere(),!0}function m(e){let t=!1;for(let n of u)t=p(n,e(n))||t;return t}return m(()=>0),{group:t,petals:u,setOpen:m,petalMat:r,sepalMat:i,receptacle:c,SEG_U:gt,SEG_V:I}}function Ot(e,{envMap:t}={}){let n=vt(77),i=[];for(let t of e.petals){let r=!!t.ring.sepal,a=r?2:t.ring.name===`core`?4:12;for(let r=0;r<a;r++){let r=n()<.5?0:e.SEG_U,a=Math.round((.3+n()*.62)*e.SEG_V);i.push({p:t,i:r,j:a,side:n()<.5?1:-1,r:.0035+n()*.0042})}let o=r?1:t.ring.name===`core`?3:8;for(let r=0;r<o;r++){let r=Math.round((.15+n()*.7)*e.SEG_U),a=Math.round((.25+n()*.6)*e.SEG_V);i.push({p:t,i:r,j:a,side:n()<.5?1:-1,r:.0022+n()*.0026})}r||i.push({p:t,i:e.SEG_U/2,j:e.SEG_V,side:1,r:.0075+n()*.0035,tip:!0})}let a=new r(1,2),o=new re({color:`#fff6f4`,roughness:.03,metalness:0,transparent:!0,opacity:.6,clearcoat:1,clearcoatRoughness:.02,envMapIntensity:2.2,depthWrite:!1});t&&(o.envMap=t);let s=new S(a,o,i.length);s.instanceMatrix.setUsage(c),s.frustumCulled=!1,s.renderOrder=2;let l=new N,u=new d,f=new d,p=new x,m=new d,h=new de,g=new d(0,1,0);function _(t=1){for(let n=0;n<i.length;n++){let r=i[n],{mesh:a,geo:o}=r.p,c=r.j*(e.SEG_U+1)+r.i;u.fromBufferAttribute(o.attributes.position,c),f.fromBufferAttribute(o.attributes.normal,c),u.applyMatrix4(a.matrixWorld),h.getNormalMatrix(a.matrixWorld),f.applyMatrix3(h).normalize().multiplyScalar(r.side);let d=r.r*t;r.tip?(u.y-=d*.55,m.set(d,d*1.15,d),p.identity()):(u.addScaledVector(f,d*.45),m.set(d,d*.7,d),p.setFromUnitVectors(g,f)),l.compose(u,p,m),s.setMatrixAt(n,l)}s.instanceMatrix.needsUpdate=!0}return{mesh:s,update:_}}var kt={rx:.66,rz:.5,height:.13,y:-.035};function At(e,t,n){let r=Math.sin(e*127.1+t*311.7+n*74.7)*43758.5453;return r-Math.floor(r)}function jt(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=Math.floor(n),o=e-r,s=t-i,c=n-a,l=o*o*(3-2*o),u=s*s*(3-2*s),d=c*c*(3-2*c),f=0;for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){let o=(n?l:1-l)*(t?u:1-u)*(e?d:1-d);f+=o*At(r+n,i+t,a+e)}return f}function Mt({envMap:e,clipPlanes:n}){let i=new f;i.name=`stone`;let a=new r(1,14);a.deleteAttribute(`normal`),a.deleteAttribute(`uv`);let s=t(a),c=s.attributes.position,l=new d;for(let e=0;e<c.count;e++){l.fromBufferAttribute(c,e).normalize();let t=jt(l.x*3.1+7,l.y*3.1,l.z*3.1)*.6+jt(l.x*9+1,l.y*9,l.z*9)*.4,n=1+(t-.5)*.22,r=l.y>0?l.y**.75:l.y;c.setXYZ(e,l.x*kt.rx*n,r*kt.height*(.85+t*.3),l.z*kt.rz*n)}s.computeVertexNormals();let u=new ie({color:`#3c3134`,roughness:.3,metalness:0,envMapIntensity:1.1,clippingPlanes:n});e&&(u.envMap=e);let p=new O(s,u);p.position.y=kt.y,p.receiveShadow=!0,p.castShadow=!0,i.add(p);let m=2600,h=new r(1,1),g=new ie({color:`#ffffff`,roughness:.28,metalness:0,envMapIntensity:1.25,clippingPlanes:n});e&&(g.envMap=e);let _=new S(h,g,m);_.receiveShadow=!0,_.castShadow=!0;let v=new ne,y=new N,b=new x,ee=new o,C=new d,w=new d,T=new j,E=[`#2c2427`,`#463a3d`,`#5e5053`,`#3a2f32`,`#76686a`,`#231c1f`,`#54464a`];p.updateMatrixWorld(!0);let D=3,k=()=>(D=D*16807%2147483647,(D-1)/2147483646),A=0;for(let e=0;A<m&&e<m*4;e++){let e=k()*Math.PI*2,t=Math.sqrt(k())*1.02,n=Math.cos(e)*kt.rx*t,r=Math.sin(e)*kt.rz*t;v.set(new d(n,1,r),new d(0,-1,0));let i=v.intersectObject(p,!1)[0];if(!i||(w.copy(i.point),w.y<-.01))continue;let a=.0045+k()**3*.015;C.set(a*(.8+k()*.5),a*(.35+k()*.3),a*(.8+k()*.5)),ee.set(k()*.6,k()*Math.PI,k()*.6),b.setFromEuler(ee),y.compose(w,b,C),_.setMatrixAt(A,y),T.set(E[Math.floor(k()*E.length)]),_.setColorAt(A,T),A++}return _.count=A,i.add(_),{group:i,dome:p,grains:_}}var Nt=[[`outer`,7],[`outer`,1],[`middle`,4],[`outer`,2],[`inner`,0],[`outer`,6],[`middle`,1],[`inner`,4]],Pt=7.8,Ft=3.4,It=1.2,Lt=1.5,Rt=2.4,zt=.0058,Bt=3.6;function Vt(e){let t=Math.sin(e*91.17+4.3)*43758.5453;return t-Math.floor(t)}function Ht(e){return Pt+e*Ft+(Vt(e)-.5)*It}function Ut(e,{envMap:t}={}){let n=Nt.map(([t,n])=>e.petals.find(e=>e.ring.name===t&&e.index===n)).filter(Boolean),r=e.SEG_V*(e.SEG_U+1)+e.SEG_U/2,i=new ee(1,20,14),a=new re({color:`#fff7f5`,roughness:.02,metalness:0,transparent:!0,opacity:.68,clearcoat:1,clearcoatRoughness:.02,envMapIntensity:2.4,depthWrite:!1});t&&(a.envMap=t);let o=new S(i,a,2);o.instanceMatrix.setUsage(c),o.frustumCulled=!1,o.renderOrder=2;let s=Array.from({length:4},()=>new C),l=new N,u=new d,f=new d,p=new x;function m(e,t){let i=n[(e*3+Math.floor(Vt(e+17)*2))%n.length];return t.fromBufferAttribute(i.geo.attributes.position,r).applyMatrix4(i.mesh.matrixWorld)}function h(e){let t=Math.floor((e-Pt)/Ft)+1,n=0;for(let r=t;r>=Math.max(0,t-3);r--){let t=Ht(r);if(e<t)continue;m(r,u);let i=Math.sqrt(2*Math.max(u.y,.05)/Rt),a=t+Lt,c=a+i;if(e<c&&n<2){if(e<a){let n=(e-t)/Lt,r=zt*(.35+.65*n*n);u.y-=.006+r*(.6+.5*n),f.set(r,r*(1.05+.2*n),r)}else{let t=e-a,n=Rt*t;u.y-=.01238+.5*Rt*t*t;let r=1.15+Math.min(n*.35,.55);f.set(zt*.88,zt*r,zt*.88)}l.compose(u,p,f),o.setMatrixAt(n++,l)}else if(e>=c&&e-c<3.6){let e=r%4;s[e].set(u.x,u.z,c,1)}}for(let e=n;e<2;e++)l.makeScale(0,0,0),o.setMatrixAt(e,l);for(let t of s)(e-t.z>=3.6||e<t.z)&&(t.w=0);o.instanceMatrix.needsUpdate=!0}return{mesh:o,impacts:s,update:h}}var Wt=`
varying vec2 vNdc;
void main() {
  vNdc = position.xy;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`,Gt=`
uniform sampler2D tSky;
uniform sampler2D tRefl;
uniform vec2 uRes;
uniform float uHorizonNdc;
uniform float uSkyScale;
uniform mat4 uInvProj;
uniform mat4 uCamWorld;
uniform mat4 uViewProj;
uniform mat4 uReflMat;
uniform float uTime;
uniform float uLand;
uniform vec3 uWaterDeep;
uniform vec3 uWaterTint;
uniform vec3 uReflTint;
uniform vec2 uStone;
uniform float uRipple;
uniform vec4 uDrips[DRIP_SLOTS]; // x, z, impact time, strength
uniform vec4 uSplash; // story drop/bottle: x, z, age (s), strength
uniform vec4 uSkyTint; // story mist in the clouds: rgb multiplier, amount
varying vec2 vNdc;

float texRowFor(float ndcY) {
  float py = (1.0 - (ndcY * 0.5 + 0.5)) * uRes.y;
  float hy = (1.0 - (uHorizonNdc * 0.5 + 0.5)) * uRes.y;
  return (py - hy) / uSkyScale + 540.0;
}

vec3 skyAt(vec2 ndc) {
  float px = (ndc.x * 0.5 + 0.5) * uRes.x;
  float tx = (px - uRes.x * 0.5) / uSkyScale + 960.0;
  float ty = clamp(texRowFor(ndc.y), 0.5, 604.5);
  vec3 c = texture2D(tSky, vec2(tx / 1920.0, 1.0 - ty / 605.0)).rgb;
  if (uSkyTint.w > 0.0) {
    // the essence soaks into the clouds in slow, uneven drifts
    float above = smoothstep(548.0, 360.0, ty);
    float n = 0.6 + 0.4 * sin(tx * 0.0061 + uTime * 0.05) * sin(ty * 0.013 - tx * 0.0023 + 1.7);
    float l = dot(c, vec3(0.299, 0.587, 0.114));
    c = mix(c, c * uSkyTint.rgb, uSkyTint.w * above * n * smoothstep(0.35, 0.8, l));
  }
  return c;
}

// returns (dh/dx, dh/dz)
vec2 waterSlope(vec2 p) {
  vec2 slope = vec2(0.0);
  vec2 q = p / uStone;
  float e = length(q);
  float r = length(p) + 1e-4;
  vec2 dir = p / r;
  float outside = smoothstep(0.92, 1.12, e);
  float decay = exp(-max(r - 0.7, 0.0) * 0.32);
  float d = 0.0;
  d += 0.02 * cos(r * 34.0 - uTime * 1.7);
  d += 0.009 * cos(r * 57.0 - uTime * 2.5 + 1.3);
  d *= outside * decay * uRipple;
  float dt = uTime - uLand;
  if (dt > 0.0) {
    float c = 0.62 + dt * 0.5;
    float g = exp(-pow((r - c) / 0.28, 2.0));
    d += 0.09 * g * cos((r - c) * 40.0) * exp(-dt * 0.3) * outside;
  }
  slope += dir * d;
  // faint rings where a drip from the petals hits the water
  for (int i = 0; i < DRIP_SLOTS; i++) {
    vec4 dp = uDrips[i];
    float age = uTime - dp.z;
    if (dp.w <= 0.0 || age < 0.0 || age > RIPPLE_LIFE) continue;
    vec2 o = p - dp.xy;
    float rr = length(o) + 1e-4;
    float c = 0.008 + age * 0.26;
    float env = exp(-pow((rr - c) / (0.018 + age * 0.03), 2.0));
    float fade = exp(-age * 0.95) * (1.0 - smoothstep(RIPPLE_LIFE - 0.8, RIPPLE_LIFE, age));
    slope += (o / rr) * dp.w * 0.1 * env * fade * sin((rr - c) * 110.0) / (1.0 + rr * 4.0);
  }
  // one big impact (the story's water drop or the falling bottle): a short train of rings
  if (uSplash.w > 0.0) {
    vec2 o = p - uSplash.xy;
    float rr = length(o) + 1e-4;
    float age = uSplash.z;
    for (int j = 0; j < 3; j++) {
      float c = age * (0.42 - float(j) * 0.11);
      float env = exp(-pow((rr - c) / (0.03 + age * 0.05), 2.0));
      slope += (o / rr) * uSplash.w * 0.14 * env * exp(-age * 0.4) * sin((rr - c) * 75.0 - uTime * 2.0) / (1.0 + rr * 2.0);
    }
  }
  // wind micro-waves, mostly across z, so reflections smear vertically
  slope.y += 0.010 * sin(p.y * 21.0 + uTime * 1.05 + sin(p.x * 2.7) * 1.6);
  slope.y += 0.006 * sin(p.y * 47.0 - uTime * 1.6 + p.x * 4.0);
  slope.x += 0.004 * sin(p.x * 15.0 + p.y * 7.0 + uTime * 0.7);
  return slope;
}

void main() {
  vec2 ndc = vNdc;
  vec4 vp = uInvProj * vec4(ndc, 1.0, 1.0);
  vp /= vp.w;
  vec3 dir = normalize((uCamWorld * vec4(vp.xyz, 0.0)).xyz);
  vec3 ro = cameraPosition;

  vec3 col;
  float row = texRowFor(ndc.y);
  if (dir.y > -1e-4) {
    col = skyAt(ndc);
  } else {
    float t = -ro.y / dir.y;
    vec3 P = ro + dir * t;
    vec2 s = waterSlope(P.xz);
    // flatten micro-detail with distance to avoid shimmering at the horizon
    s *= mix(1.0, 0.35, smoothstep(6.0, 30.0, t));
    vec3 n = normalize(vec3(-s.x, 1.0, -s.y));
    vec3 r = reflect(dir, n);
    r.y = max(r.y, 0.0015);
    vec4 qc = uViewProj * vec4(r, 0.0);
    vec2 ndcR = qc.xy / max(qc.w, 1e-4);
    vec3 sky = skyAt(ndcR);

    float cosT = clamp(dot(n, -dir), 0.0, 1.0);
    float F = 0.58 + 0.42 * pow(1.0 - cosT, 3.0);
    col = mix(uWaterDeep, sky * uWaterTint, F);

    // planar reflection of the flower and stone
    vec4 rp = uReflMat * vec4(P, 1.0);
    vec2 ruv = rp.xy / rp.w + vec2(s.x * 0.5, s.y * 1.2);
    vec4 refl = vec4(0.0);
    refl += texture2D(tRefl, ruv + vec2(0.0, -0.011)) * 0.2;
    refl += texture2D(tRefl, ruv + vec2(0.0, -0.005)) * 0.2;
    refl += texture2D(tRefl, ruv) * 0.2;
    refl += texture2D(tRefl, ruv + vec2(0.0, 0.005)) * 0.2;
    refl += texture2D(tRefl, ruv + vec2(0.0, 0.011)) * 0.2;
    col = mix(col, refl.rgb / max(refl.a, 1e-3) * uReflTint, clamp(refl.a, 0.0, 1.0) * 0.76);

    // thin bright meniscus where the water touches the stone
    float e = length(P.xz / uStone);
    col += vec3(0.05, 0.035, 0.04) * exp(-pow((e - 1.0) / 0.035, 2.0));
    col *= 1.0 - 0.18 * exp(-pow((e - 1.05) / 0.12, 2.0));

    // far water fades into the plate's own haze band
    float far = 1.0 - smoothstep(546.0, 600.0, row);
    col = mix(col, skyAt(ndc), far);
  }

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;function Kt({skyTexture:e,reflTexture:t,drips:n}){let r={tSky:{value:e},tRefl:{value:t},uRes:{value:new w(1,1)},uHorizonNdc:{value:0},uSkyScale:{value:1},uInvProj:{value:new N},uCamWorld:{value:new N},uViewProj:{value:new N},uReflMat:{value:new N},uTime:{value:0},uLand:{value:1e6},uWaterDeep:{value:new j(`#765262`)},uWaterTint:{value:new j(`#f3e2e5`)},uReflTint:{value:new j(`#dcc3c6`)},uStone:{value:new w(kt.rx,kt.rz)},uRipple:{value:1},uDrips:{value:n},uSplash:{value:new C},uSkyTint:{value:new C(1,1,1,0)}},a=new i({uniforms:r,vertexShader:Wt,fragmentShader:Gt,depthWrite:!1,defines:{DRIP_SLOTS:4,RIPPLE_LIFE:Bt.toFixed(2)},depthTest:!1,toneMapped:!1}),o=new ce;o.setAttribute(`position`,new D(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));let s=new O(o,a);s.frustumCulled=!1,s.renderOrder=-1e3;let c=new N,l=new d,u=new C;function f(e,t,n,i){r.uRes.value.set(t,n),r.uSkyScale.value=Math.max(t/1920,n/1080),r.uInvProj.value.copy(e.projectionMatrixInverse),r.uCamWorld.value.copy(e.matrixWorld),c.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),r.uViewProj.value.copy(c),r.uReflMat.value.copy(i),e.getWorldDirection(l),l.y=0,l.normalize(),u.set(l.x,0,l.z,0).applyMatrix4(c),r.uHorizonNdc.value=u.y/u.w}return{mesh:s,uniforms:r,update:f}}var qt=`
attribute vec4 aSeed;
uniform float uU;
uniform vec3 uOrigin;
uniform float uPx;
varying float vA;
varying float vAge;
void main() {
  float birth = aSeed.x * 0.7;
  float a = (uU - birth) / 0.6;
  vAge = a;
  if (a <= 0.0 || a >= 1.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vA = 0.0;
    return;
  }
  float e = 1.0 - pow(1.0 - a, 2.2); // fast out of the nozzle, then drifting
  float ang = aSeed.y * 6.2832 + a * (1.8 + aSeed.w * 1.4);
  float rad = 0.004 + e * (0.05 + aSeed.z * 0.13);
  vec3 p = uOrigin;
  p.y += e * (0.12 + aSeed.w * 0.2);
  p.x += cos(ang) * rad;
  p.z += sin(ang) * rad;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = 0.008 + e * (0.045 + aSeed.z * 0.05);
  gl_PointSize = clamp(size * uPx / -mv.z, 1.0, 60.0);
  vA = smoothstep(0.0, 0.08, a) * (1.0 - smoothstep(0.35, 1.0, a)) * (0.45 + 0.55 * aSeed.w);
}`,Jt=`
uniform vec3 uColA;
uniform vec3 uColB;
uniform float uStrength;
varying float vA;
varying float vAge;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d) * 4.0;
  float g = exp(-r2 * 3.0) * (1.0 - smoothstep(0.7, 1.0, r2));
  vec3 c = mix(uColA, uColB, smoothstep(0.0, 0.7, vAge));
  float a = g * vA * uStrength;
  if (a < 0.003) discard;
  gl_FragColor = vec4(c, a);
}`,Yt=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)};function Xt({count:e=260}={}){let t=new ce,n=new Float32Array(e*4);for(let e=0;e<n.length;e++)n[e]=Yt(e*1.91+4.3);t.setAttribute(`position`,new D(new Float32Array(e*3),3)),t.setAttribute(`aSeed`,new D(n,4));let r=new i({uniforms:{uU:{value:0},uOrigin:{value:new d},uPx:{value:1},uStrength:{value:.65},uColA:{value:new j(`#c0233f`)},uColB:{value:new j(`#fff1f4`)}},vertexShader:qt,fragmentShader:Jt,transparent:!0,depthWrite:!1}),o=new a(t,r);o.frustumCulled=!1,o.renderOrder=3,o.visible=!1;function s(e,t){r.uniforms.uU.value=e,r.uniforms.uOrigin.value.copy(t),o.visible=e>0&&e<1.3}return{mesh:o,update:s,uniforms:r.uniforms}}var Zt=1,Qt=new URLSearchParams(location.search),$t=Qt.has(`t`)?parseFloat(Qt.get(`t`)):null,en=$t===null&&!Qt.has(`p`)&&Qt.get(`entrada`)!==`0`,tn=en,nn=null,rn=en?ht({onStart({sound:e}){tn=!1,e&&nn?.enter(),document.body.classList.add(`is-ready`)}}):null;rn&&document.documentElement.classList.add(`has-gate`);var an=Qt.get(`producto`)??`blender`,on=an===`original`?null:an,sn=on?`agua`:null,L=[{pr:1.5,prPhone:2.25,samples:4,refl:.5,trans:.5},{pr:1.25,prPhone:2,samples:2,refl:.4,trans:.4},{pr:1,prPhone:1.5,samples:0,refl:.33,trans:.33},{pr:.6,prPhone:.6,samples:0,refl:.25,trans:.25,bloom:!1}],cn=()=>window.innerWidth<760,ln=e=>Math.min(window.devicePixelRatio,cn()?e.prPhone:e.pr),un=Qt.has(`calidad`)?Math.min(L.length-1,Math.max(0,parseInt(Qt.get(`calidad`),10)||0)):null,R=un??+!!cn(),dn=document.querySelector(`#scene`),z=new e({canvas:dn,antialias:!on,powerPreference:`high-performance`});if(z.setPixelRatio(ln(L[R])),z.transmissionResolutionScale=L[R].trans,un===null){let e=z.getContext(),t=e.getExtension(`WEBGL_debug_renderer_info`),n=String(e.getParameter(t?t.UNMASKED_RENDERER_WEBGL:e.RENDERER)||``);/swiftshader|llvmpipe|softpipe|software|basic render/i.test(n)&&(R=L.length-1,z.setPixelRatio(ln(L[R])),z.transmissionResolutionScale=L[R].trans)}z.outputColorSpace=A,z.toneMapping=7,z.toneMappingExposure=1.06,z.shadowMap.enabled=!0,z.shadowMap.type=on?3:1,z.localClippingEnabled=!0;var B=new v,V=new he(30,16/9,.05,400);function fn(){let e=new v,t=new i({side:1,depthWrite:!1,uniforms:{uZenith:{value:new j(`#c4a0ab`)},uHorizon:{value:new j(`#ecccc9`)},uWater:{value:new j(`#a17987`)},uSun:{value:new j(`#fff1e8`)},uSunDir:{value:new d(-1,.32,-1.1).normalize()}},vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`
      uniform vec3 uZenith, uHorizon, uWater, uSun, uSunDir; varying vec3 vDir;
      void main(){
        vec3 d = normalize(vDir);
        vec3 c = d.y > 0.0 ? mix(uHorizon, uZenith, pow(d.y, 0.6)) : mix(uHorizon, uWater, pow(-d.y, 0.4));
        float s = max(dot(d, uSunDir), 0.0);
        c += uSun * (pow(s, 24.0) * 1.6 + pow(s, 4.0) * 0.25);
        gl_FragColor = vec4(c, 1.0);
      }`});e.add(new O(new ee(10,48,24),t));let r=new n(z),a=r.fromScene(e,.02);return r.dispose(),a.texture}var pn=fn();function mn(){let e=new n(z),t=new Ce,r=e.fromScene(t,.03);return t.dispose(),e.dispose(),r.texture}var hn=mn();async function gn(){let e=await new we().loadAsync(`./hdr/studio_small_09_1k.hdr`);e.mapping=303;let t=new n(z),r=t.fromEquirectangular(e);return e.dispose(),t.dispose(),r.texture}var _n=new ge(`#faeae0`,`#94706f`,1.15),vn=new b(`#ffe4da`,2.1);vn.position.set(-3.2,2,-2.6);var H=new b(`#fff2e8`,1.45);H.position.set(-1.6,3.4,2.4),H.castShadow=!0,H.shadow.mapSize.set(1024,1024),H.shadow.camera.left=-1.4,H.shadow.camera.right=1.4,H.shadow.camera.top=1.6,H.shadow.camera.bottom=-1,H.shadow.camera.near=.5,H.shadow.camera.far=9,H.shadow.bias=-4e-4,H.shadow.normalBias=.015,H.shadow.radius=4;var yn=new b(`#f6d8cc`,.45);yn.position.set(2.5,.6,2);for(let e of[_n,vn,H,yn])e.layers.enable(Zt),B.add(e);var bn=Mt({envMap:pn,clipPlanes:[new te(new d(0,1,0),0)]});B.add(bn.group);var xn=Dt({envMap:pn}),Sn=new f;Sn.add(xn.group);var U,Cn=null;if(on){let{createProduct:e}=await be(async()=>{let{createProduct:e}=await import(`./product-BvFDE5jZ.js`);return{createProduct:e}},__vite__mapDeps([0,1,2]),import.meta.url),t=await gn();Cn=()=>e({variant:on,envMap:t}),U=await Cn()}else U=xe({envMap:hn});Sn.add(U.group),B.add(Sn);var wn=Ot(xn,{envMap:pn});B.add(wn.mesh);var Tn=Ut(xn,{envMap:pn});B.add(Tn.mesh);var En=Xt({count:window.innerWidth<760?180:260});B.add(En.mesh);var Dn=Se({count:window.innerWidth<760?420:660});B.add(Dn.mesh);var On=.088;for(let e of[bn.group,Sn,wn.mesh,Tn.mesh])e.traverse(e=>e.layers.enable(Zt));var kn=new u(2,2,{type:_}),W=new he;W.layers.set(Zt);var An=new N,jn=new d,Mn=new d,Nn=new N;function Pn(){V.updateMatrixWorld(),jn.setFromMatrixPosition(V.matrixWorld),Nn.extractRotation(V.matrixWorld),Mn.set(0,0,-1).applyMatrix4(Nn).add(jn),W.position.set(jn.x,-jn.y,jn.z),W.up.set(0,1,0).applyMatrix4(Nn),W.up.y*=-1,W.lookAt(Mn.x,-Mn.y,Mn.z),W.updateMatrixWorld(),W.projectionMatrix.copy(V.projectionMatrix),W.projectionMatrixInverse.copy(V.projectionMatrixInverse),An.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),An.multiply(W.projectionMatrix).multiply(W.matrixWorldInverse);let e=z.shadowMap.autoUpdate;z.shadowMap.autoUpdate=!1,z.setRenderTarget(kn),z.setClearColor(0,0),z.clear(),z.render(B,W),z.setRenderTarget(null),z.setClearColor(0,1),z.shadowMap.autoUpdate=e}var Fn=await new s().loadAsync(`./tex/sky.jpg`);Fn.colorSpace=A,Fn.wrapS=fe,Fn.wrapT=fe,Fn.generateMipmaps=!1,Fn.minFilter=T;var In=Kt({skyTexture:Fn,reflTexture:kn.texture,drips:Tn.impacts});B.add(In.mesh);var G=null,Ln=null,Rn=null;on&&(G=new Oe(z,new u(2,2,{type:_,samples:L[R].samples})),Ln=new ke(B,V),Rn=new je(new w(2,2),.45,.25,1.5),G.addPass(Ln),G.addPass(Rn),G.addPass(new Ne));var K={w:1,h:1,dist:4,height:.5,top:1.6};function zn(){let e=window.innerWidth,t=window.innerHeight;z.setPixelRatio(ln(L[R])),z.setSize(e,t,!1);let n=e/t;V.aspect=n,K.dist=4*Math.max(1,(1.62/n)**.78),K.height=K.dist*.125,K.top=K.height+K.dist*Math.tan(se.degToRad(V.fov/2)),V.updateProjectionMatrix();let r=z.getPixelRatio(),i=L[R].refl;kn.setSize(Math.max(2,Math.round(e*r*i)),Math.max(2,Math.round(t*r*i))),K.w=Math.round(e*r),G&&(G.setPixelRatio(r),G.setSize(e,t)),K.h=Math.round(t*r),En.uniforms.uPx.value=t*r/(2*Math.tan(se.degToRad(V.fov/2))),Dn.uniforms.uPx.value=En.uniforms.uPx.value,q?.resize(e,t,r),Bn?.resize(e,t,r)}var q=null,Bn=null,Vn=null;window.addEventListener(`resize`,zn),zn(),`scrollRestoration`in history&&(history.scrollRestoration=`manual`);var J={x:0,y:0,sx:0,sy:0};window.addEventListener(`pointermove`,e=>{J.x=e.clientX/window.innerWidth*2-1,J.y=e.clientY/window.innerHeight*2-1});var Y={fallStart:.35,fallDur:2.5,get land(){return this.fallStart+this.fallDur},openDur:3,hero:2.4,bloomEnd:4,flourishEnd:10.4,get heroAt(){return this.land+this.hero},get introEnd(){return this.land+this.flourishEnd}},X=e=>Math.min(1,Math.max(0,e)),Hn=(e,t=1.15)=>1+(t+1)*(e-1)**3+t*(e-1)**2,Z=e=>e*e*(3-2*e),Un=(e,t,n)=>X((n-e)/(t-e)),Wn={outer:.88,middle:.66,inner:.56},Gn={outer:0,middle:.12,inner:.25};function Kn(e,t,n){let r=t-Y.land,i=e.ring.name===`outer`?.07*Z(X((t-(Y.fallStart+Y.fallDur*.72))/(Y.fallDur*.28))):0;if(e.ring.sepal)return i+.9*Z(X((r-.05)/2.2));let a=Wn[e.ring.name]??1,o=.12+e.ring.delay*.6+e.stagger*.18,s=X((r-o)/(Y.hero-.1-o)),c=s<=0?0:a*(1-(1-s)**3),l=Y.hero+(Gn[e.ring.name]??0)+e.stagger*.12,u=X((r-l)/(Y.bloomEnd-.1-l));u>0&&(c=a+(1-a)*Hn(u)),c=i+(1-i)*c;let d=X((n-Y.land-Y.hero)/1.5);return c+=d*.018*Math.sin(n*.9+e.az*2+e.index),c}function qn(e){let t=X((e-Y.land-.5)/(Y.hero-.6));return t<=0?0:1-(1-t)**3}var Jn=.55;function Yn(e){return Jn+.44999999999999996*Z(Un(Y.hero+.25,Y.bloomEnd,e-Y.land))}var Xn=.22,Zn=[7.5,8.15,8.8],Qn=sn===`agua`,$n=new ue,er=new d,tr=new d,nr=new d,rr=e=>e<0?0:e<.09?Z(e/.09):e<.2?1:1-Z(Un(.2,.42,e));function ir(e){if(!U.setCapOff)return;let t=e-Y.land,n=(.5*Z(Un(4.2,5.7,t))+.5*Z(Un(6.7,7.35,t)))*(1-(Qn?0:Z(Un(9.8,Y.flourishEnd,t))));U.inner.position.y+=Xn*n+.006*Math.sin((t-5.7)*2.4)*n,U.inner.rotation.y=Math.PI*2*Z(Un(4.6,7.1,t)),U.setCapOff(Un(4.8,5.8,t)*(1-Un(9.1,9.9,t))),U.setPress(Math.max(...Zn.map(e=>rr(t-e))));let r=(t-5.3)/1.4;r>0&&r<1.3&&(U.group.updateMatrixWorld(!0),$n.setFromObject(U.parts.Neck.mesh),$n.getCenter(er),er.y=$n.max.y),En.update(r,er),t>Zn[0]&&t<Zn[Zn.length-1]+1.7&&(U.group.updateMatrixWorld(!0),U.nozzle.getWorldPosition(tr),U.nozzle.getWorldDirection(nr),tr.addScaledVector(nr,.006)),Dn.update(t,Zn.map(e=>e+.05),tr,nr)}function ar(e){let t=X((e-Y.fallStart)/Y.fallDur),n=.55*t+.45*t*t,r=K.top+.04,i=r+(On-r)*n,a=1,o=1,s=e-Y.land;if(s>0){i=On;let e=Math.exp(-s*6.5)*Math.sin(s*22);o=1-.06*e,a=1+.03*e}let c=(1-t)*(1-t);Sn.position.set(Math.sin(t*5.2)*.05*c,i,Math.cos(t*4.1)*.03*c),Sn.rotation.set(Math.sin(t*6+.4)*.12*c,-.9+.9*Z(t),Math.sin(t*5.1)*.1*c),Sn.scale.set(a,o,a)}if(sn){let{createStory:e}=await be(async()=>{let{createStory:e}=await import(`./story-CkmplLQG.js`);return{createStory:e}},__vite__mapDeps([3,1,4,5]),import.meta.url);if(q=await e(sn,{renderer:z,composer:G,scene:B,camera:V,view:K,T:Y,flower:xn,flowerRoot:Sn,bottle:U,backdrop:In,envMap:pn,studioEnv:hn,makeProduct:Cn,isMobile:cn,hover:Qn?Xn:0,samples:L[R].samples,lowGpu:R===L.length-1,lead:U.setCapOff?2.6:0}),q.showroom){let{createShowroom:e}=await be(async()=>{let{createShowroom:e}=await import(`./showroom-Dxzoilbm.js`);return{createShowroom:e}},__vite__mapDeps([6,1,7,8]),import.meta.url);Bn=e({...q.showroom,isMobile:cn})}if(Bn&&q.lead){let e=e=>q.lead*X((e-Y.hero)/(Y.flourishEnd-Y.hero));Vn=Ue({end:q.lead+Bn.onAt,marks:[{q:0,label:`The bloom`},{q:e(Ie.ritual.from),label:`The ritual`},{q:e(Ie.mist.from),label:`The mist`},{q:q.lead+.15,label:`The dive`},{q:q.lead+1.6,label:`The depths`}]})}zn()}function or(){let e=L[R];if(z.setPixelRatio(ln(e)),z.transmissionResolutionScale=e.trans,Q.frames=0,G)for(let t of[G.renderTarget1,G.renderTarget2])t.samples=e.samples,t.dispose();q?.setSamples(e.samples),zn()}var Q={acc:0,n:0,slow:0,frames:0};function sr(e){if(un!==null||$!==null||R>=L.length-1||!(e>0)||++Q.frames<=3||(Q.acc+=e,Q.n++,Q.acc<1))return;let t=Q.acc/Q.n;Q.acc=0,Q.n=0,Q.slow=t>1/45?Q.slow+1:0,Q.slow>=2&&(Q.slow=0,R++,or())}async function cr(){let e=[],t=t=>t.traverse(t=>{t.visible||=(e.push(t),!0)});t(B);let n=[];z.setRenderTarget(G?G.renderTarget1:null),n.push(z.compileAsync(B,V)),z.setRenderTarget(null),q&&n.push(...q.precompile(t));try{await Promise.all(n)}catch(e){console.warn(`precompile`,e)}finally{for(let t of e)t.visible=!1}}await cr();var lr=0,ur=0,dr=0,$=$t,fr=new h;fr.connect(document);var pr={pos:new d,look:new d},mr=-1,hr=-1,gr=0;function _r(){fr.update();let e=fr.getDelta();sr(e),$===null&&!tn&&(lr+=Math.min(Math.max(e,0),.1));let t=$===null?lr:$,n=t;q?.lead&&$===null?(lr>=Y.heroAt&&q.unlock(),q.scroll(e),lr>=Y.heroAt&&(n=Y.heroAt+q.lead01*(Y.introEnd-Y.heroAt))):q&&(($!==null||lr>Y.introEnd)&&q.unlock(),q.scroll(e)),$===null&&n-Y.land>4.8&&n-Y.land<9.8&&ur++,$===null&&Dn.mesh.visible&&dr++,gr=n,vr.update(n,Y),yr.update(n,Y),br.update(n,Y),xr.update(n,Y),ar(n),U.setReveal(qn(n),Yn(n)),ir(n),(t!==hr||n!==mr)&&(xn.setOpen(e=>Kn(e,n,t)),hr=t,mr=n),J.sx+=(J.x-J.sx)*.04,J.sy+=(J.y-J.sy)*.04;let r=$===null?J.sx:0,i=$===null?J.sy:0;pr.pos.set(r*.14*(K.dist/4),K.height-i*.04,K.dist),pr.look.set(r*.04,K.height-i*.04,0),Bn?.update(t,e,q.p,R>=2),Vn?.update(q.q,t>=Y.heroAt-.5),q?.update(t,pr),Bn?.post(),V.position.copy(pr.pos),V.lookAt(pr.look),V.updateMatrixWorld(),B.updateMatrixWorld(),wn.update(1),Tn.update(t),In.uniforms.uTime.value=t,In.uniforms.uLand.value=Y.land;let a=!q||q.prepare();if(a&&Pn(),In.update(V,K.w,K.h,An),G){Ln.enabled=a,Rn.enabled=L[R].bloom!==!1;let e=q?.glow??0;Rn.threshold=1.5-.3*e,Rn.strength=.45+.05*e,Rn.radius=.25+.15*e,G.render()}else z.render(B,V)}var vr=Fe(),yr=Re(),br=ze(),xr=Be();z.setAnimationLoop(_r),nn=$e({gate:!!rn,land:Y.land}),rn?rn.ready():requestAnimationFrame(()=>{document.body.classList.add(`is-ready`)}),window.__lotus={setTime(e){$=e},play(){$=null,lr=0},seek(e){$=null,lr=e},T:Y,get tier(){return R},get clock(){return lr},get timeline(){return gr},get capOffFrames(){return ur},get sprayFrames(){return dr},pace:Q,info:z.info,get story(){return q},get showroom(){return Bn}};