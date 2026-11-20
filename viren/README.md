# VIREN Cinematic Fragrance Hero

A single-screen botanical fragrance hero with a forest video background, headline, navigation, media controls and a poster fallback.

Made by HorizonX · Version 1.0.1 · October 2026

## Start here

1. Unzip this folder.
2. Start a local web server inside it:
   - With Python: `python3 -m http.server 8080`
   - Or with Node.js: `npx serve .`
3. Open `http://localhost:8080` (with `npx serve`, use the address it prints) in your browser.

There is no build step or dependency installation. Video, poster, brand mark and fonts are local files.

## What's inside

- `index.html`: hero content and navigation.
- `styles.css`: layout, typography and motion; `script.js`: media controls and fallback behavior.
- `assets/forest-fragrance.mp4`, `assets/forest-fragrance-poster.png` and `assets/viren-mark.svg`: background video, poster and brand mark.
- `assets/fonts/`: four local TTF font files.
- `README.md` (the buyer guide), `CREDITS.md` (libraries and images), `LICENSE.md`, and `AGENTS.md` plus `CLAUDE.md` (instructions for AI coding agents).

## Page sections

- Single hero stage (`.hero`) with header (`.site-header`) and navigation (`.nav`).
- **The forest, distilled.**: hero content in `#discover`, over the forest video and poster.

## Make it yours

- **Colors and layout:** edit `styles.css`; token values and breakpoint widths are not supplied.
- **Text and links:** edit the headline and navigation in `index.html`.
- **Media and mark:** replace `assets/forest-fragrance.mp4`, `assets/forest-fragrance-poster.png` and `assets/viren-mark.svg`, keeping their paths or updating references.
- **Fonts:** update the local font declarations in `styles.css` and their references to `assets/fonts/`.
- **Controls:** edit `script.js` for media control and poster fallback behavior.

## Motion

- CSS and lightweight JavaScript handle the video hero and media controls. No third-party runtime library is listed.
- The existing guide says the page respects `prefers-reduced-motion` and uses a static poster when playback is unavailable. This is not visible in the extracted HTML; verify `styles.css` and `script.js` before relying on those behaviors.

## Deploy

- Upload `index.html`, `styles.css`, `script.js` and `assets/` to a static host. No build step is needed.

## Keep building with AI

Open this folder in an AI coding agent such as Claude Code or Codex and ask in plain words. The folder includes `AGENTS.md` (and a `CLAUDE.md` that points to it), so Codex, Claude Code, Cursor and other agents learn how the project is built and how to check their work before they change anything. Some examples:

- "Read README.md and index.html, then change the brand colors to my palette: …"
- "Replace the copy with content for my studio. Keep the layout and the animations."
- "Port this page to Next.js with Tailwind CSS without changing how it looks or moves."

To add more HorizonX components to the page from your agent, connect the HorizonX MCP server (included in your membership): https://horizonx.so/mcp

## License

Your HorizonX membership gives you a commercial license for this template: use it and adapt it in personal, client and commercial projects. You may not resell, redistribute, sublicense or publicly share the original source files. Full terms: https://horizonx.so/terms.
Libraries and images are listed with their own licenses in `CREDITS.md`. Fonts are not covered by the HorizonX license: if you change them, use fonts you own or have a license for.

## Need help?

Write to support@horizonx.so and mention **VIREN Cinematic Fragrance Hero**.
