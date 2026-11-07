import { el } from '../dom.js';

/**
 * @param {{footer: string}} site
 * @returns {HTMLElement}
 */
export function renderFooter(site) {
  return el('div', { className: 'wrap', text: site.footer });
}
