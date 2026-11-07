import { el } from '../dom.js';
import { renderLinks } from './links.js';

/**
 * Hero shape: { heading, lead?, actions?: {label, href, primary?}[] }
 * @param {object} hero
 * @returns {HTMLElement}
 */
export function renderHero(hero) {
  const children = [el('h1', { className: 'hero__heading', text: hero.heading })];

  if (hero.lead) {
    children.push(el('p', { className: 'hero__lead', text: hero.lead }));
  }
  if (hero.actions) {
    children.push(renderLinks(hero.actions));
  }

  return el('div', { className: 'hero' }, children);
}
