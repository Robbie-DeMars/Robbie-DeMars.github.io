# Robbie-DeMars.github.io

Portfolio website, served by GitHub Pages at https://robbie-demars.github.io.

The site is static. There is no build step and no package manager. Content is stored as data, and a small set
of generic renderers turns that data into HTML in the browser. The only third-party code is an unmodified copy
of three.js in `vendor/`, used by the 3D model viewer.

## Pages

| File | `data-page` | Content |
| --- | --- | --- |
| `index.html` | `home` | Hero, projects, a selection of art with a link to the art page, skills, contact |
| `art.html` | `art` | 3D model viewer, renders, animated sprites, music |

Each HTML file is a shell: head metadata, empty containers and script tags. `art.html` also has an import map
for three.js.

## Structure

```
index.html            Home page shell
art.html              Art page shell (includes the three.js import map)
css/
  tokens.css          Design tokens (colors, spacing, fonts). Only :root rules
  base.css            Element defaults. No classes
  layout.css          Page structure: wrapper, header, hero, sections, footer, grids
  components.css      Reusable components: link list, button, tag list, card, figure, track, viewer, chip, column
js/
  main.js             Entry point. Picks the page from <body data-page> and renders it
  dom.js              DOM helpers: el(), list()
  data/               Content only. No markup, no logic
    site.js           Owner name, footer text, site navigation
    pages.js          Hero and ordered sections for each page
    links.js          External URLs used in more than one place
    projects.js       Items for the "cards" layout
    skills.js         Items for the "columns" layout
    art.js            Items for the "gallery" layout. Each image is defined once, then grouped into
                      renders, sprites and featured (the home page selection)
    models.js         Items for the "models" layout (FBX files)
    music.js          Items for the "audio" layout
  render/             Generic renderers. No content
    registry.js       Maps a section type to its item renderer
    section.js        Renders any section from its data
    header.js         Brand link and navigation
    hero.js           Hero block
    footer.js         Footer
    links.js          Link list (button and inline variants)
    cards.js          "cards" layout
    gallery.js        "gallery" layout
    columns.js        "columns" layout
    audio.js          "audio" layout
    models.js         "models" layout: model buttons and the viewer container
  viewer/
    stage.js          three.js scene that loads and displays one FBX at a time
assets/
  art/                Web-sized images and GIFs
  audio/              MP3 files
  models/<group>/     FBX files
vendor/three/         Unmodified three.js (see vendor/three/VERSION.txt)
```

## How rendering works

1. The HTML file loads the stylesheets and `js/main.js`.
2. `main.js` reads `document.body.dataset.page` and looks up that page in `js/data/pages.js`.
3. It renders the header (from `site.nav`), the page's optional hero, each section, and the footer.
4. `render/section.js` creates a `<section>` for each entry and calls the renderer that
   `render/registry.js` has registered for the section's `type`.

The 3D viewer loads lazily. `render/models.js` imports `viewer/stage.js` (and therefore three.js) only when the
first model is shown, so the home page never downloads it.

## Common changes

| Change | Edit |
| --- | --- |
| Add or edit a project | `js/data/projects.js` |
| Add an image | Put the file in `assets/art/`, then add an entry to `js/data/art.js` |
| Add a 3D model | Put the `.fbx` in `assets/models/<group>/`, then add an entry to `js/data/models.js` |
| Add an audio track | Put the MP3 in `assets/audio/`, then add an entry to `js/data/music.js` |
| Add or edit a skill group | `js/data/skills.js` |
| Add a section to a page | Add an entry to that page's `sections` in `js/data/pages.js` |
| Reorder sections | Reorder `sections` in `js/data/pages.js` |
| Add a page | Copy an HTML shell, set `data-page`, add the page to `js/data/pages.js`, add a link in `site.nav` |
| Change the navigation | `nav` in `js/data/site.js` |
| Add a new layout | Create `js/render/<name>.js`, register it in `js/render/registry.js`, add styles to `css/components.css` |
| Change colors or spacing | `css/tokens.css` |
| Change a page title or meta description | The page's HTML file |
| Reuse a URL in several places | Add it to `js/data/links.js` and import it |

### Data shapes

```
page    : { hero?, sections }
section : { id, title, subtitle?, type?, items?, links? }
hero    : { heading, lead?, actions? }
link    : { label, href, primary? }
nav     : { label, href }
card    : { title, meta?, summary?, bullets?, tags?, links? }          type: "cards"
figure  : { src, alt, title?, caption?, width?, height?,
            fullWidth?, pixelated? }                                   type: "gallery"
track   : { src, title, caption? }                                     type: "audio"
model   : { group?, label, src }                                       type: "models"
column  : { title, text }                                              type: "columns"
```

`type` is required when a section has `items`. A section may have only `links`.

## 3D models

- The viewer reads binary FBX files and shows the materials stored in them.
- A texture an FBX refers to is loaded from the same folder, using the file name stored in the FBX. Without that
  file the model is shown untextured. The wheel and bulb use `Glass_Bulb_Tex.png`, `Wood_Planks_Tex.png` and
  `Rust_Tex.jpg`, resized to 1024 px.
- Keep each `.fbx` under about 1 MB. The camera is fitted to the model automatically, so units and scale do
  not matter.
- If an FBX contains animation, the first clip plays.

## Local preview

The site uses ES modules and an import map, which browsers block on `file://` URLs. Serve the folder over HTTP:

```
python -m http.server 8000
```

Then open http://localhost:8000 and http://localhost:8000/art.html.

## Deployment

GitHub Pages serves the `main` branch from the repository root
(Settings, Pages, Source: Deploy from a branch, `main`, `/ (root)`). Pushing to `main` publishes the site.

## Third-party code

`vendor/three/` holds three.js 0.186.1 (MIT license, see `vendor/three/LICENSE`). Only the files the viewer needs
are included, unmodified: `three.module.js`, `three.core.js`, and the FBX loader, orbit controls, NURBS curve
helpers and fflate from `examples/jsm`. To upgrade, replace those files from the same npm package version and
update `vendor/three/VERSION.txt`.
