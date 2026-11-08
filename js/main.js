import { pages } from './data/pages.js';
import { site } from './data/site.js';
import { renderFooter } from './render/footer.js';
import { renderHeader } from './render/header.js';
import { renderHero } from './render/hero.js';
import { renderSection } from './render/section.js';

function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing #${id} in the HTML file`);
  }
  return element;
}

function renderPage(page) {
  getElement('site-header').replaceChildren(renderHeader(site));
  getElement('site-footer').replaceChildren(renderFooter(site));

  const nodes = [];
  if (page.hero) {
    nodes.push(renderHero(page.hero));
  }
  for (const section of page.sections) {
    nodes.push(renderSection(section));
  }
  getElement('content').replaceChildren(...nodes);
}

const pageName = document.body.dataset.page;
const page = pages[pageName];
if (!page) {
  throw new Error(`Unknown page "${pageName}". Add it to js/data/pages.js.`);
}
renderPage(page);
