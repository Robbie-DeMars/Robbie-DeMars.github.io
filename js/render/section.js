import { el } from '../dom.js';
import { renderLinks } from './links.js';
import { itemRenderers } from './registry.js';

/**
 * Section shape:
 * { id, title, subtitle?, type?, items?, links? }
 * "type" selects the item renderer and is required when "items" is present.
 *
 * @param {object} section
 * @returns {HTMLElement}
 */
export function renderSection(section) {
  const children = [el('h2', { className: 'section__title', text: section.title })];

  if (section.subtitle) {
    children.push(el('p', { className: 'section__subtitle', text: section.subtitle }));
  }

  if (section.items) {
    const renderItems = itemRenderers[section.type];
    if (!renderItems) {
      throw new Error(`Section "${section.id}" has unknown type: ${section.type}`);
    }
    children.push(renderItems(section.items));
  }

  if (section.links) {
    const wrapper = el('div', { className: 'section__links' }, [renderLinks(section.links)]);
    children.push(wrapper);
  }

  return el('section', { className: 'section', attrs: { id: section.id } }, children);
}
