# AGENTS.md — VIREN Cinematic Fragrance Hero

Instructions for AI coding agents (Codex, Claude Code, Cursor and others) working in this folder. The person you are working with always has the final say: when their request and these notes disagree, follow them.

## Project

A single-screen botanical fragrance hero with a forest video background, headline, navigation, media controls and a poster fallback.

- Stack: static HTML, CSS and vanilla JavaScript with local video, poster and fonts; no build step
- `README.md` is the buyer guide. `CREDITS.md` lists every library and image with its license. `LICENSE.md` (when present) is the HorizonX license.

## Run it

   - With Python: `python3 -m http.server 8080`
   - Or with Node.js: `npx serve .`

Then open `http://localhost:8080` (with `npx serve`, use the address it prints).

## Where things are

- `index.html`: hero content and navigation.
- `styles.css`: layout, typography and motion; `script.js`: media controls and fallback behavior.
- `assets/forest-fragrance.mp4`, `assets/forest-fragrance-poster.png` and `assets/viren-mark.svg`: background video, poster and brand mark.
- `assets/fonts/`: four local TTF font files.
- `README.md` (the buyer guide), `CREDITS.md` (libraries and images), `LICENSE.md`, and `AGENTS.md` plus `CLAUDE.md` (instructions for AI coding agents).

## How to change things

- **Colors and layout:** edit `styles.css`; token values and breakpoint widths are not supplied.
- **Text and links:** edit the headline and navigation in `index.html`.
- **Media and mark:** replace `assets/forest-fragrance.mp4`, `assets/forest-fragrance-poster.png` and `assets/viren-mark.svg`, keeping their paths or updating references.
- **Fonts:** update the local font declarations in `styles.css` and their references to `assets/fonts/`.
- **Controls:** edit `script.js` for media control and poster fallback behavior.

## Motion

- CSS and lightweight JavaScript handle the video hero and media controls. No third-party runtime library is listed.
- The existing guide says the page respects `prefers-reduced-motion` and uses a static poster when playback is unavailable. This is not visible in the extracted HTML; verify `styles.css` and `script.js` before relying on those behaviors.

## Rules for this project

- Keep markup in `index.html`, styles in `styles.css` and media behavior in `script.js`.
- Keep the video and poster references working together when replacing the forest media.
- Preserve media controls and check their keyboard behavior after changes.
- Verify reduced-motion and unavailable-video states in the separate styles and script before changing playback.
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
