import { el, list } from '../dom.js';
import { renderLinks } from './links.js';

/**
 * Card item shape:
 * { title, meta?, summary?, bullets?: string[], tags?: string[], links?: {label, href}[] }
 */
function renderCard(item) {
  const children = [el('h3', { className: 'card__title', text: item.title })];

  if (item.meta) {
    children.push(el('p', { className: 'card__meta', text: item.meta }));
  }
  if (item.summary) {
    children.push(el('p', { className: 'card__summary', text: item.summary }));
  }
  if (item.bullets) {
    children.push(list(item.bullets, 'card__bullets'));
  }
  if (item.tags) {
    children.push(list(item.tags, 'tag-list card__tags', 'tag-list__item'));
  }
  if (item.links) {
    children.push(renderLinks(item.links, 'inline'));
  }

  return el('article', { className: 'card' }, children);
}

/**
 * @param {object[]} items
 * @returns {HTMLDivElement}
 */
export function renderCards(items) {
  const cards = [];
  for (const item of items) {
    cards.push(renderCard(item));
  }
  return el('div', { className: 'grid grid--cards' }, cards);
}
