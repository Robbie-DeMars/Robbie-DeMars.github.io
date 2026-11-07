# Robbie-DeMars.github.io

Portfolio website, served by GitHub Pages at https://robbie-demars.github.io.

The site is static. There is no build step, no framework and no dependencies. Content is stored as data,
and a small set of generic renderers turns that data into HTML in the browser.

## Structure

```
index.html            Page shell: head metadata, empty containers, script and stylesheet tags
css/
  tokens.css          Design tokens (colors, spacing, fonts). Only :root rules
  base.css            Element defaults. No classes
  layout.css          Page structure: wrapper, header, hero, sections, footer, grids
  components.css      Reusable components: link list, button, tag list, card, figure, column
js/
  main.js             Entry point. Renders the header, hero, sections and footer
  dom.js              DOM helpers: el(), list()
  data/               Content only. No markup, no logic
    site.js           Owner name, footer text, hero
    links.js          External URLs used in more than one place
    projects.js       Items for the "cards" layout
    art.js            Items for the "gallery" layout
    music.js          Items for the "audio" layout
    skills.js         Items for the "columns" layout
    sections.js       Ordered list of page sections
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
assets/art/           Web-sized images and GIFs used by js/data/art.js
assets/audio/         MP3 files used by js/data/music.js
```

## How rendering works

1. `index.html` loads the stylesheets and `js/main.js`.
2. `main.js` reads `site` and `sections` from `js/data/`.
3. For each entry in `sections`, `render/section.js` creates a `<section>`. It calls the renderer that
   `render/registry.js` has registered for the section's `type`.
4. The navigation is built from the same `sections` list, so a new section appears in the nav automatically.

Data and rendering do not import each other except through `main.js` and `section.js`.

## Common changes

| Change | Edit |
| --- | --- |
| Add or edit a project | `js/data/projects.js` |
| Add an image | Put the file in `assets/art/`, then add an entry to `js/data/art.js` |
| Add an audio track | Put the MP3 in `assets/audio/`, then add an entry to `js/data/music.js` |
| Add or edit a skill group | `js/data/skills.js` |
| Add a section | Add an entry to `js/data/sections.js` |
| Reorder sections | Reorder `js/data/sections.js` |
| Add a new layout | Create `js/render/<name>.js`, register it in `js/render/registry.js`, add styles to `css/components.css` |
| Change colors or spacing | `css/tokens.css` |
| Change the page title or meta description | `index.html` |
| Reuse a URL in several places | Add it to `js/data/links.js` and import it |

### Data shapes

```
section : { id, title, subtitle?, type?, items?, links? }
link    : { label, href, primary? }
card    : { title, meta?, summary?, bullets?, tags?, links? }          type: "cards"
figure  : { src, alt, title?, caption?, width?, height?,
            fullWidth?, pixelated? }                                   type: "gallery"
track   : { src, title, caption? }                                     type: "audio"
column  : { title, text }                                              type: "columns"
hero    : { heading, lead?, actions? }
```

`type` is required when a section has `items`. A section may have only `links`.

## Local preview

The site uses ES modules, which browsers block on `file://` URLs. Serve the folder over HTTP:

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

GitHub Pages serves the `main` branch from the repository root
(Settings, Pages, Source: Deploy from a branch, `main`, `/ (root)`). Pushing to `main` publishes the site.
