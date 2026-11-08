import { el } from '../dom.js';

/**
 * Renders the header contents: brand link and the site navigation.
 * @param {{owner: string, nav: {label: string, href: string}[]}} site
 * @returns {HTMLElement}
 */
export function renderHeader(site) {
  const brand = el('a', {
    className: 'site-header__brand',
    text: site.owner,
    attrs: { href: 'index.html' },
  });

  const navLinks = [];
  for (const item of site.nav) {
    navLinks.push(el('a', { className: 'site-nav__link', text: item.label, attrs: { href: item.href } }));
  }
  const nav = el('nav', { className: 'site-nav', attrs: { 'aria-label': 'Main' } }, navLinks);

  return el('div', { className: 'wrap site-header__inner' }, [brand, nav]);
}
