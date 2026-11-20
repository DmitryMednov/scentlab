# Lotus Perfume

A scroll-driven 3D landing page for a perfume, built with three.js and Vite. A lotus bud falls onto a stone in a pink sea and blooms, a ruby bottle rises out of the flower and mists, then dives into the water and sinks to an underwater showroom where the visitor picks a size and adds it to the bag.

Made by HorizonX · Version 1.0.0 · October 2026

## Start here

1. Unzip this folder.
2. Start a local web server inside it:
   - Ready-built copy, nothing to install: `cd dist`, then `python3 -m http.server 8080` (or `npx serve .`).
   - Editable source (needs Node.js 20.19 or newer): `npm install`, then `npm run dev`. pnpm works too: `pnpm install`, then `pnpm dev`.
3. Open `http://localhost:8080` for the ready-built copy, or the address `npm run dev` prints (usually `http://localhost:5173`) in your browser.

The page loads its 3D model, lighting map and textures with JavaScript, so it must be served over http: opening `index.html` by double-click will not work. After editing the source, run `npm run build` to write a fresh `dist/` and `npm run preview` to check it.

## What's inside

- `index.html`: the page markup: menu, hero copy, the two story captions (The ritual, The mist) and the entry screen.
- `src/main.js`: starts everything: renderer, camera, quality tiers, the intro timeline and the scroll story.
- `src/scene/`: the 3D pieces: `flower.js` (the lotus petals), `stone.js`, `backdrop.js` (sky and water with reflections), `bottle.js` and `product.js` (the perfume bottle), `drips.js`, `spray.js` and `spritz.js` (water drops and the mist).
- `src/story/`: the scroll story after the bloom. `agua.js` is the dive into the water used by default; `aire.js` is an alternative ending; `seabed.js`, `bubbles.js` and `fx.js` build the underwater scene; `smooth.js` smooths wheel scrolling.
- `src/showroom/`: the shop on the stone plinth at the end (size, quantity, Add to bag, notes). The perfume's name, copy, sizes, prices and notes live in `src/showroom/collection.js`.
- `src/gate.js` and `src/fog.js`: the entry screen with fogged glass the visitor wipes with the pointer. `src/sound.js`: the background music and the sound button in the menu. `src/timeline.js`: the chapter timeline on the right edge. `src/hero.js`: the hero copy.
- `src/styles.css`: all page styles and the `@font-face` rules; `src/fonts/` holds the font files.
- `public/`: files loaded at run time: `models/bottle_blender_v1.obj` (bottle), `hdr/studio_small_09_1k.hdr` (studio lighting), `tex/sky.jpg` (sky), `img/gate-scene*.webp` (entry screen background), `audio/lotus-ambient.mp3` (music).
- `dist/`: a ready-built copy of the site that you can upload as it is.
- `package.json`, `pnpm-lock.yaml` and `vite.config.js`: the build setup (three.js 0.186.1, Vite 8.3.4).
- `README.md` (this guide), `CREDITS.md` (libraries, models, images, music and fonts), and `AGENTS.md` plus `CLAUDE.md` (instructions for AI coding agents).

## Page sections

- **Entry screen:** "Welcome to Lotus" behind fogged glass that clears where the pointer moves. **Click to start** begins the intro together with the music; **Continue without sound** starts it silently. It doubles as the loading screen.
- **The bloom:** the bud falls onto the stone, ripples spread and the lotus opens, with the hero copy "Bloom is not a season. It's a scent."
- **The ritual:** the ruby bottle rises out of the flower (caption "Lift the jewel, slowly.").
- **The mist:** the bottle sprays a rose-red mist (caption "Three breaths of lotus, one soft red veil.").
- **The dive:** the bottle arcs over the petals and plunges into the sea; the camera follows it under the water line.
- **The depths:** the bottle sinks through light shafts and bubbles to a stone plinth.
- **Showroom:** frosted-glass panels around the plinth: size and longevity on the left, the perfume, quantity and **Add to bag** on the right, and an orbit control at the bottom that turns the bottle.
- A menu bar with links, the sound button, a language label and the bag, plus a chapter timeline on the right edge that fills as you scroll.

## Make it yours

- **Product, prices and notes:** edit `src/showroom/collection.js`: `PERFUME` holds the name, description, bottle colours, spray colours, notes and the longevity chart; `SIZES` holds the sizes and prices; `money` formats the price.
- **Copy:** the hero, the two story captions and the entry screen text are plain HTML in `index.html`. Chapter names on the timeline are the `marks` labels in `src/main.js`.
- **Colours and fonts:** the `:root` block near the top of `src/styles.css` holds the colours (`--plum`, `--wine`, `--ink`, `--vinotinto`) and font stacks (`--inter`, `--instrument`, `--montserrat`, `--jost`, `--bodoni`). The showroom panels are styled in `src/showroom/showroom.css`.
- **Style switches:** three attributes on the `<html>` tag in `index.html` pick the look: `data-letras="blanco"` sets all copy in white (remove it for wine-coloured copy), `data-sombra="no"` removes the soft shadow under the white copy (`"si"` brings it back), and `data-cta="vidrio"` gives the buttons their frosted-glass style (`"vino"` switches to a wine pill with an arrow).
- **Sky and music:** replace `public/tex/sky.jpg` (keep the horizon at the same height, see the comment at the top of `src/scene/backdrop.js`) or `public/audio/lotus-ambient.mp3`. The music's timing (where the opening chord lands, where the loop starts) is set in `TRACK` at the top of `src/sound.js`.
- **Bottle:** the bottle is `public/models/bottle_blender_v1.obj`, coloured in code by `src/scene/product.js`. Add `?producto=original` to the address to see the simpler bottle built in code (`src/scene/bottle.js`).
- **Other endings:** `VITE_HISTORIA=aire npm run build` builds the alternative story ending, `VITE_HISTORIA=ninguna` stops after the intro, and `VITE_SCENE_ONLY=1` builds the 3D animation alone with no menu, copy or showroom.

## Motion

- Everything moves on one clock: the intro (fall, landing, bloom, rise, mist) plays on time from the entry click, then the scroll position drives the story forwards and backwards. The intro timings are in `src/main.js`; the scroll story's beats are listed at the top of `src/story/agua.js`.
- Wheel scrolling is eased by `src/story/smooth.js`; `RATE` sets how quickly the page catches up.
- The 3D quality adapts to the device: the canvas starts at a high setting and steps down when frames run slow (the `TIERS` list in `src/main.js`). For testing, `?calidad=0` to `?calidad=3` pins a tier, `?t=<seconds>` freezes the intro at a moment, `?p=<chapters>` freezes the story, and `?entrada=0` skips the entry screen.
- When **Reduce motion** is turned on in the system settings (`prefers-reduced-motion`), wheel smoothing is off, the fog's particles and intro sweep are off and the decorative button and loading animations stop. The 3D story still follows the scroll because it is the page's content.
- Music only starts after a click, tap or key press, as browsers require, and the sound button remembers the visitor's choice.

## Deploy

- Upload the contents of `dist/` to any static host: Cloudflare Pages, Netlify, Vercel, GitHub Pages or your own server. The build uses relative paths, so it also works from a sub-folder.
- To deploy from the source instead, set the build command to `npm run build` and the output folder to `dist`.

## Keep building with AI

Open this folder in an AI coding agent such as Claude Code or Codex and ask in plain words. The folder includes `AGENTS.md` (and a `CLAUDE.md` that points to it), so Codex, Claude Code, Cursor and other agents learn how the project is built and how to check their work before they change anything. Some examples:

- "Read README.md and index.html, then change the brand colors to my palette: …"
- "Replace the copy with content for my studio. Keep the layout and the animations."
- "Port this page to Next.js with React Three Fiber without changing how it looks or moves."

To add more HorizonX components to the page from your agent, connect the HorizonX MCP server (included in your membership): https://horizonx.so/mcp

## License

Your HorizonX membership gives you a commercial license for this template: use it and adapt it in personal, client and commercial projects. You may not resell, redistribute, sublicense or publicly share the original source files. Full terms: https://horizonx.so/terms.
Libraries and images are listed with their own licenses in `CREDITS.md`. Fonts are not covered by the HorizonX license: if you change them, use fonts you own or have a license for.

## Need help?

Write to support@horizonx.so and mention **Lotus Perfume**.
