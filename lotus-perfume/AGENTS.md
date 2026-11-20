# AGENTS.md — Lotus Perfume

Instructions for AI coding agents (Codex, Claude Code, Cursor and others) working in this folder. The person you are working with always has the final say: when their request and these notes disagree, follow them.

## Project

A scroll-driven 3D landing page for a perfume, built with three.js and Vite. A lotus bud falls onto a stone in a pink sea and blooms, a ruby bottle rises out of the flower and mists, then dives into the water and sinks to an underwater showroom where the visitor picks a size and adds it to the bag.

- Stack: Vite 8.3.4 with plain JavaScript modules and CSS; three.js 0.186.1 for the WebGL scene (custom GLSL shaders, HDR lighting, bloom); no UI framework
- `README.md` is the buyer guide. `CREDITS.md` lists every library and image with its license. `LICENSE.md` (when present) is the HorizonX license.

## Run it

   - Ready-built copy, nothing to install: `cd dist`, then `python3 -m http.server 8080` (or `npx serve .`).
   - Editable source (needs Node.js 20.19 or newer): `npm install`, then `npm run dev`. pnpm works too: `pnpm install`, then `pnpm dev`.

Then open `http://localhost:8080` for the ready-built copy, or the address `npm run dev` prints (usually `http://localhost:5173`).

## Where things are

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

## How to change things

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

## Rules for this project

- Run `npm run dev` while working and `npm run build` before you finish; the build must pass and `dist/` must be rebuilt after source changes.
- The intro and the scroll story share one clock and one progress value. Change beat timings in `src/main.js` and the beat list in `src/story/agua.js` together, and keep the story working when scrolling backwards.
- Product data lives in `src/showroom/collection.js`. Edit it there instead of hard-coding names or prices in the showroom markup.
- Keep the quality tiers in `src/main.js`: new heavy effects must respect the current tier and stay off on the last one.
- Test URLs (`?t=`, `?p=`, `?calidad=`, `?entrada=0`) and `window.__lotus` are debugging aids. Keep them working; they do not affect visitors who open the plain address.
- Keep the current look and motion unless the user asks to change them. Before a large change, say what you plan to do.
- Every animation you add or change must keep working with `prefers-reduced-motion` and when its script fails to load.
- Fonts are not covered by the HorizonX license. If the user changes the fonts, use ones they own or have a license for, and never download font files they did not provide.
- When you add a library, font or image, add it to `CREDITS.md` with its version and license.
- Do not add analytics, tracking or other third-party scripts unless the user asks for them.

## Check your work

1. Serve the folder and open every section of the page.
2. Make sure the browser console shows no errors and no file returns 404.
3. Check the layout at 390 px and 1440 px wide.
4. Turn on reduced motion in the operating system and check that the content still appears.

## License

The template is licensed to its owner through their HorizonX membership. Building and shipping sites from it is allowed; publishing or reselling the source files as a template is not. Terms: https://horizonx.so/terms
