# AGENTS.md

Instructions for AI coding agents working in this repository. For the human-facing overview, see `README.md`.

## Project

Static portfolio site on GitHub Pages. Plain HTML, CSS and ES modules. No build step, no framework,
no package manager, no dependencies. Do not add any of these.

## Architecture

Content and rendering are separate.

- `js/data/` holds content only: strings, arrays and objects. No DOM calls, no markup, no logic.
- `js/render/` holds generic renderers. No page content and no URLs.
- `js/main.js` is the only entry point.
- `index.html` is a shell with empty containers. Do not put page content in it.
- `css/` is split by responsibility: `tokens.css`, `base.css`, `layout.css`, `components.css`.

Page sections are defined by `js/data/sections.js`. Each section has a `type` that selects a renderer
through `js/render/registry.js`. The navigation is generated from the same list.

## Rules

### Keep it DRY

- State each fact once. A URL used in more than one place goes in `js/data/links.js` and is imported.
- Do not copy a renderer to change one detail. Add an optional field to the item shape and handle it in the
  existing renderer.
- Do not repeat style values. Colors, spacing, fonts and radii come from `css/tokens.css`.
- Do not add a one-off style for one element. Add a reusable class to `css/components.css` or `css/layout.css`.

### Keep it generic

- Renderers must not reference a specific project, image or person.
- A new layout is a new file in `js/render/` plus one line in `registry.js`. Do not add `if` branches by
  section id.
- Data shapes are documented in `README.md`. Update that table in the same change if you add or rename a field.

### Code style

- Use plain `for` and `for...of` loops. Do not use `map`, `forEach`, `reduce` or comprehension-style chains.
- Build DOM with `el()` and `list()` from `js/dom.js`. Set text with `textContent`. Never use `innerHTML`.
- No inline `style` attributes and no inline event handlers.
- One responsibility per file. Keep files short. Split a file when it handles two concerns.
- CSS class names follow `block__element--modifier`.
- JSDoc a function when its argument shape is not obvious.
- Fail loudly on bad data: throw an `Error` that names the offending section or field.

### Content

- Do not invent facts. Every project, date, metric and credit must come from the owner or from a source file
  in the owner's repositories. If a detail is missing, leave the field out.
- Do not add an email address, phone number or street address.
- Do not link or publish the resume PDF. It contains personal contact details.
- Credit third-party work next to the work it applies to. The sword concept art is by Jessica Geis.

### Assets

- Put web-ready images in `assets/art/`. Resize to 1800 px wide or less and keep each file under about 500 KB.
- Do not copy source files here (`.psd`, `.spp`, `.mb`, `.ma`, `.fbx`). They belong in the `Art-Portfolio`
  repository.
- Every image needs meaningful `alt` text in `js/data/art.js`.

### Accessibility and layout

- Keep a visible focus style, a color contrast that passes in both color schemes, and a layout that works at
  360 px width with no horizontal scroll.
- Do not rely on JavaScript for essential links. `index.html` keeps a `<noscript>` fallback.

## Verification

Before finishing a change:

1. Serve the folder with `python -m http.server 8000` and open the page. ES modules do not run from `file://`.
2. Check the browser console for errors.
3. Check each section renders and each nav link scrolls to its section.
4. Check the page at about 360 px and at desktop width.
5. If a data shape changed, check that `README.md` matches.

## Version control

- Do not commit or push unless the owner asks. The repository is pushed through GitHub Desktop under the
  `Robbie-DeMars` account.
- Do not rewrite history or force-push.
