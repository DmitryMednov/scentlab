import{Cn as e,Ct as t,Hn as n,a as r,d as i,o as a}from"./three.core-Dz0jzqxB.js";var o=3,s=`
attribute vec4 aSeed;
uniform float uT;
uniform vec3 uStarts;
uniform vec3 uOrigin;
uniform vec3 uDir;
uniform float uPx;
varying float vA;
varying float vAge;
void main() {
  float slot = floor(aSeed.x * ${o}.0);
  float start = slot < 0.5 ? uStarts.x : (slot < 1.5 ? uStarts.y : uStarts.z);
  float birth = fract(aSeed.x * ${o}.0) * 0.24; // each burst lasts a quarter of a second
  float life = 0.8 + aSeed.w * 0.6;
  float a = (uT - start - birth) / life;
  vAge = a;
  if (a <= 0.0 || a >= 1.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vA = 0.0;
    return;
  }
  vec3 side = normalize(cross(uDir, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(side, uDir);
  float e = (1.0 - exp(-a * 6.0)) / (1.0 - exp(-6.0)); // air drag: fast out, then hanging
  float dist = e * (0.32 + 0.3 * aSeed.z);
  float ang = aSeed.y * 6.2832;
  float rad = sqrt(fract(aSeed.z * 7.31)) * (dist * 0.16 + e * e * 0.06);
  vec3 p = uOrigin + uDir * dist + (side * cos(ang) + up * sin(ang)) * rad;
  p.y -= 0.06 * a * a;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = 0.009 + e * (0.016 + aSeed.w * 0.026);
  gl_PointSize = clamp(size * uPx / -mv.z, 1.0, 48.0);
  vA = smoothstep(0.0, 0.02, a) * (1.0 - smoothstep(0.3, 1.0, a)) * (0.5 + 0.5 * aSeed.w);
}`,c=`
uniform vec3 uColA;
uniform vec3 uColB;
uniform float uStrength;
varying float vA;
varying float vAge;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d) * 4.0;
  float g = exp(-r2 * 2.5) * (1.0 - smoothstep(0.7, 1.0, r2));
  vec3 c = mix(uColA, uColB, smoothstep(0.1, 0.9, vAge));
  float a = g * vA * uStrength;
  if (a < 0.003) discard;
  gl_FragColor = vec4(c, a);
}`,l=e=>{let t=Math.sin(e*91.7+17.3)*43758.5453;return t-Math.floor(t)};function u({count:u=660}={}){let d=new a,f=new Float32Array(u*4);for(let e=0;e<f.length;e++)f[e]=l(e*2.37+1.1);d.setAttribute(`position`,new r(new Float32Array(u*3),3)),d.setAttribute(`aSeed`,new r(f,4));let p=new e({uniforms:{uT:{value:-1},uStarts:{value:new n},uOrigin:{value:new n},uDir:{value:new n(1,0,0)},uPx:{value:1},uStrength:{value:.9},uColA:{value:new i(`#d40f35`)},uColB:{value:new i(`#ff8da3`)}},vertexShader:s,fragmentShader:c,transparent:!0,depthWrite:!1}),m=new t(d,p);m.frustumCulled=!1,m.renderOrder=3,m.visible=!1;function h(e,t,n,r){let i=p.uniforms;i.uT.value=e,i.uStarts.value.fromArray(t),i.uOrigin.value.copy(n),i.uDir.value.copy(r),m.visible=e>t[0]&&e<t[2]+1.7}return{mesh:m,update:h,uniforms:p.uniforms,pulses:o}}export{u as t};