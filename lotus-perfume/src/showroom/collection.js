// The perfume on the plinth: the bottle of the story (it keeps its own ruby
// materials), its sizes and the copy for the panels.

export const SIZES = [
  { ml: 30, scale: 0.84, price: 98 },
  { ml: 50, scale: 1, price: 145 },
  { ml: 100, scale: 1.16, price: 210 },
];

export const PERFUME = {
  no: '01',
  name: 'Lotus Rouge',
  description: 'Dewy pink lotus over cool water lily and a skin-close white musk, kept in a ruby jewel that opens like the flower.',
  // the ruby the showroom has always applied to the deep bottle (rubyMaterial in scene/bottle.js)
  gem: {
    body: { glow: '#b0021a', att: '#b8061c' },
    cap: { glow: '#b8061c', att: '#d00c26' },
    fire: '#ff4a52',
    refl: [1.0, 0.32, 0.38],
    spec: '#ff9aa6',
    glass: '#ffe1e5',
  },
  spray: ['#d40f35', '#ff8da3'],
  notes: [
    { tier: 'Top', name: 'Pink lotus', more: 'Pink lotus, pear blossom, bergamot' },
    { tier: 'Heart', name: 'Water lily', more: 'Water lily, peony, rose water' },
    { tier: 'Base', name: 'White musk', more: 'White musk, ambrette, soft cedar' },
  ],
  // hours on skin; intensity and trail from 0 to 1
  profile: { hours: 8, intensity: 0.7, trail: 0.6 },
};

export const money = (n) => `$${n}`;
