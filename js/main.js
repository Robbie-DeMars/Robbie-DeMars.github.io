import { sections } from './data/sections.js';
import { site } from './data/site.js';
import { renderFooter } from './render/footer.js';
import { renderHeader } from './render/header.js';
import { renderHero } from './render/hero.js';
import { renderSection } from './render/section.js';

function mount(id, node) {
  const container = document.getElementById(id);
  if (!container) {
    throw new Error(`Missing #${id} in index.html`);
  }
  container.replaceChildren(node);
}

function renderPage() {
  mount('site-header', renderHeader(site, sections));
  mount('site-footer', renderFooter(site));

  const content = document.getElementById('content');
  if (!content) {
    throw new Error('Missing #content in index.html');
  }
  const nodes = [renderHero(site.hero)];
  for (const section of sections) {
    nodes.push(renderSection(section));
  }
  content.replaceChildren(...nodes);
}

renderPage();
