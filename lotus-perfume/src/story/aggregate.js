import * as THREE from 'three';

// Pebble aggregate (pink terrazzo / conglomerate sandstone), baked once on the
// GPU into two tileable textures: albedo (sRGB-ish, height in alpha) and a
// tangent-space normal map. Still fully procedural: no image is downloaded, the
// pattern is three layers of periodic Voronoi pebbles (large, medium, grit) set
// in a fine speckled matrix. The seabed samples them triplanar in world space.

const BAKE_FRAG = /* glsl */ `
precision highp float;
uniform int uMode;
uniform float uTexel;
varying vec2 vUv;

vec2 h22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}
float h12(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5453); }
float vnoise(vec2 p, float n) {
  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  float a = h12(mod(i, n)), b = h12(mod(i + vec2(1, 0), n));
  float c = h12(mod(i + vec2(0, 1), n)), d = h12(mod(i + vec2(1, 1), n));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// periodic Voronoi with n cells per tile: x = distance to the cell border (cell
// units), y/z = two hashes of the cell
vec3 voro(vec2 uv, float n, float jit) {
  vec2 p = uv * n;
  vec2 ip = floor(p);
  vec2 f = fract(p);
  float d1 = 8.0;
  vec2 mr = vec2(0.0);
  vec2 mc = vec2(0.0);
  for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 c = mod(ip + g, n);
      vec2 r = g + 0.5 + jit * (h22(c) - 0.5) - f;
      float d = dot(r, r);
      if (d < d1) { d1 = d; mr = r; mc = c; }
    }
  float md = 8.0;
  for (int y = -2; y <= 2; y++)
    for (int x = -2; x <= 2; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 c = mod(ip + g, n);
      vec2 r = g + 0.5 + jit * (h22(c) - 0.5) - f;
      vec2 dr = r - mr;
      if (dot(dr, dr) > 1e-5) md = min(md, dot(0.5 * (mr + r), normalize(dr)));
    }
  return vec3(md, h12(mc + n * 7.0), h12(mc * 1.7 + n + 3.1));
}

vec3 palette(float a, float b) {
  // cream, peach, dusty rose, terracotta pink, with white quartz and rare plum
  vec3 c = mix(vec3(0.98, 0.92, 0.86), vec3(0.95, 0.78, 0.68), smoothstep(0.0, 0.35, a));
  c = mix(c, vec3(0.88, 0.62, 0.58), smoothstep(0.35, 0.65, a));
  c = mix(c, vec3(0.76, 0.47, 0.46), smoothstep(0.78, 0.9, a));
  c = mix(c, vec3(1.0, 0.97, 0.94), step(0.8, b));
  c = mix(c, vec3(0.52, 0.32, 0.38), step(0.955, a));
  return c;
}

// one layer of pebbles: some cells stay empty so the next layer shows through
// x = covered (0..1), y = height, rgb in col
float layer(vec2 uv, float n, float fill, float gap0, float lift, out vec3 col, out float h) {
  vec3 v = voro(uv, n, 0.85);
  float gap = gap0 * (0.6 + 0.9 * v.z);
  float inside = smoothstep(gap, gap + 0.035, v.x) * step(v.y * 0.71 + v.z * 0.29, fill);
  float dome = sqrt(clamp((v.x - gap) / 0.3, 0.0, 1.0));
  vec3 c = palette(v.y, v.z);
  // a little grain inside the pebble and a darker rim where it dips into the matrix
  c *= 0.95 + 0.08 * vnoise(uv * n * 6.0 + v.y * 31.0, n * 6.0);
  c *= mix(0.84, 1.0, smoothstep(gap, gap + 0.14, v.x));
  col = c;
  h = lift + (1.0 - lift) * dome * (0.75 + 0.25 * v.z);
  return inside;
}

vec4 aggregate(vec2 uv) {
  // matrix: fine sand with dark and light specks
  float s1 = vnoise(uv * 512.0, 512.0);
  float s2 = vnoise(uv * 256.0 + 11.0, 256.0);
  vec3 col = vec3(0.80, 0.63, 0.57) * (0.9 + 0.2 * s2);
  col *= 1.0 - 0.45 * smoothstep(0.78, 0.92, s1);
  col = mix(col, vec3(0.95, 0.86, 0.8), smoothstep(0.86, 0.97, s2) * 0.6);
  float h = 0.06 * s2;
  vec3 c; float hl; float k;
  k = layer(uv + vec2(0.37, 0.11), 96.0, 0.9, 0.06, 0.12, c, hl);
  col = mix(col, c, k); h = mix(h, hl * 0.45, k);
  k = layer(uv + vec2(0.71, 0.53), 40.0, 0.78, 0.07, 0.2, c, hl);
  col = mix(col, c, k); h = mix(h, hl * 0.75, k);
  k = layer(uv, 17.0, 0.55, 0.08, 0.25, c, hl);
  col = mix(col, c, k); h = mix(h, hl, k);
  return vec4(col, h);
}

void main() {
  if (uMode == 0) {
    vec4 a = aggregate(vUv);
    gl_FragColor = vec4(pow(a.rgb, vec3(1.0 / 2.2)), a.a);
  } else {
    float e = uTexel;
    float hl = aggregate(vUv - vec2(e, 0.0)).a;
    float hr = aggregate(vUv + vec2(e, 0.0)).a;
    float hd = aggregate(vUv - vec2(0.0, e)).a;
    float hu = aggregate(vUv + vec2(0.0, e)).a;
    vec3 n = normalize(vec3((hl - hr) * 3.5, (hd - hu) * 3.5, 1.0));
    gl_FragColor = vec4(n * 0.5 + 0.5, 1.0);
  }
}
`;

export function bakeAggregate(renderer, size = 1024) {
  const make = () => {
    const rt = new THREE.WebGLRenderTarget(size, size, {
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping,
      depthBuffer: false,
    });
    rt.texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return rt;
  };
  const albedo = make();
  const normal = make();
  const mat = new THREE.ShaderMaterial({
    uniforms: { uMode: { value: 0 }, uTexel: { value: 1 / size } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: BAKE_FRAG,
    depthTest: false,
    depthWrite: false,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  quad.frustumCulled = false;
  const scene = new THREE.Scene();
  scene.add(quad);
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const prevTarget = renderer.getRenderTarget();
  const prevTone = renderer.toneMapping;
  const prevAuto = renderer.autoClear;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.autoClear = true;
  for (const [rt, mode] of [[albedo, 0], [normal, 1]]) {
    mat.uniforms.uMode.value = mode;
    renderer.setRenderTarget(rt);
    renderer.render(scene, cam);
  }
  renderer.setRenderTarget(prevTarget);
  renderer.toneMapping = prevTone;
  renderer.autoClear = prevAuto;
  mat.dispose();
  quad.geometry.dispose();
  return { albedo: albedo.texture, normal: normal.texture };
}
