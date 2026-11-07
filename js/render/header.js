import { el } from '../dom.js';

/**
 * Renders the header contents: brand link and one nav link per section.
 * @param {{owner: string}} site
 * @param {{id: string, title: string}[]} sections
 * @returns {HTMLElement}
 */
export function renderHeader(site, sections) {
  const brand = el('a', {
    className: 'site-header__brand',
    text: site.owner,
    attrs: { href: '#top' },
  });

  const navLinks = [];
  for (const section of sections) {
    navLinks.push(
      el('a', { className: 'site-nav__link', text: section.title, attrs: { href: `#${section.id}` } })
    );
  }
  const nav = el('nav', { className: 'site-nav', attrs: { 'aria-label': 'Main' } }, navLinks);

  return el('div', { className: 'wrap site-header__inner' }, [brand, nav]);
}
