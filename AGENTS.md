# AGENTS.md

Instructions for AI coding agents working in this repository. For the human-facing overview, see `README.md`.

## Project

Static portfolio site on GitHub Pages. Plain HTML, CSS and ES modules. No build step, no framework,
no package manager. Do not add any of these.

The only third-party code is `vendor/three/`, an unmodified copy of three.js used by the 3D viewer.
Do not edit files in `vendor/`. Do not load libraries from a CDN. Do not add other dependencies without the
owner's approval.

## Architecture

Content and rendering are separate.

- `js/data/` holds content only: strings, arrays and objects. No DOM calls, no markup, no logic.
- `js/render/` holds generic renderers. No page content and no URLs.
- `js/viewer/` holds the three.js scene. It is imported only by `js/render/models.js`, on demand.
- `js/main.js` is the only entry point. It chooses a page from `<body data-page>`.
- Each HTML file (`index.html`, `art.html`) is a shell with empty containers. Do not put page content in it.
- `css/` is split by responsibility: `tokens.css`, `base.css`, `layout.css`, `components.css`.

Pages and their sections are defined in `js/data/pages.js`. Each section has a `type` that selects a renderer
through `js/render/registry.js`. Site navigation is `nav` in `js/data/site.js`.

## Rules

### Keep it DRY

- State each fact once. A URL used in more than one place goes in `js/data/links.js` and is imported.
- Do not copy a renderer to change one detail. Add an optional field to the item shape and handle it in the
  existing renderer.
- Do not repeat style values. Colors, spacing, fonts and radii come from `css/tokens.css`.
- Do not add a one-off style for one element. Add a reusable class to `css/components.css` or `css/layout.css`.
- The head block is repeated in each HTML shell. Keep the shells identical except for `title`, `description`,
  Open Graph tags, `data-page` and the import map on pages that use three.js.

### Keep it generic

- Renderers must not reference a specific project, image, model or person.
- A new layout is a new file in `js/render/` plus one line in `registry.js`. Do not add `if` branches by
  section id or page name.
- Data shapes are documented in `README.md`. Update that table in the same change if you add or rename a field.

### Code style

- Use plain `for` and `for...of` loops. Do not use `map`, `forEach`, `reduce` or comprehension-style chains.
- Build DOM with `el()` and `list()` from `js/dom.js`. Set text with `textContent`. Never use `innerHTML`.
- No inline `style` attributes and no inline event handlers.
- One responsibility per file. Keep files short. Split a file when it handles two concerns.
- CSS class names follow `block__element--modifier`.
- JSDoc a function when its argument shape is not obvious.
- Fail loudly on bad data: throw an `Error` that names the offending section, page or field.

### Content

- Do not invent facts. Every project, date, metric and credit must come from the owner or from a source file
  in the owner's repositories. If a detail is missing, leave the field out.
- Do not add an email address, phone number or street address.
- Do not link or publish the resume PDF. It contains personal contact details.
- Credit third-party work next to the work it applies to. The sword concept art is by Jessica Geis.
- Do not publish code or history from repositories the owner does not control, such as company repositories.

### Assets

- Put web-ready images in `assets/art/`. Resize to 1800 px wide or less and keep each file under about 500 KB.
- Put web-ready audio in `assets/audio/` as MP3 at about 128 kbps. Do not add `.wav` files.
- Put 3D models in `assets/models/<group>/` as binary `.fbx` files under about 1 MB. Name files in kebab-case.
  Put textures an FBX refers to in the same folder, under the exact file name the FBX stores, resized to
  1024 px or less.
- Do not copy source files here (`.psd`, `.spp`, `.mb`, `.ma`, `.blend`, `.wav`). They belong in the
  `Art-Portfolio` repository.
- Every image needs meaningful `alt` text in `js/data/art.js`.
- Set `pixelated: true` on low-resolution images (pixel art, small renders) so they scale without blurring.
- Audio uses `preload="none"`. Do not autoplay.

### Accessibility and layout

- Keep a visible focus style, a color contrast that passes in both color schemes, and a layout that works at
  360 px width with no horizontal scroll.
- Controls must be real `<button>` or `<a>` elements.
- Respect `prefers-reduced-motion`: the viewer does not auto-rotate when it is set.
- Do not rely on JavaScript for essential links. Each HTML shell keeps a `<noscript>` fallback.

## Verification

Before finishing a change:

1. Serve the folder with `python -m http.server 8000`. ES modules and the import map do not run from `file://`.
2. Open `index.html` and `art.html`. Check the browser console for errors.
3. Check each section renders and each nav link goes to the right place.
4. On `art.html`, check that the first model loads and that selecting another model replaces it.
5. Check each page at about 360 px and at desktop width.
6. If a data shape changed, check that `README.md` matches.

## Version control

- Do not commit or push unless the owner asks. The repository is pushed through GitHub Desktop under the
  `Robbie-DeMars` account.
- Do not rewrite history or force-push.
- Do not add Claude or other AI attribution lines (such as `Co-Authored-By`) to commits or pull requests.
