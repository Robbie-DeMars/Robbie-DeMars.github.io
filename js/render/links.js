import { el } from '../dom.js';

const VARIANTS = {
  button: { listClass: 'link-list', linkClass: 'button', primaryClass: 'button--primary' },
  inline: { listClass: 'link-list link-list--inline', linkClass: '', primaryClass: '' },
};

/**
 * Renders a list of links.
 * @param {{label: string, href: string, primary?: boolean}[]} links
 * @param {'button'|'inline'} [variant]
 * @returns {HTMLUListElement}
 */
export function renderLinks(links, variant = 'button') {
  const style = VARIANTS[variant];
  if (!style) {
    throw new Error(`Unknown link variant: ${variant}`);
  }

  const items = [];
  for (const link of links) {
    let className = style.linkClass;
    if (link.primary && style.primaryClass) {
      className = `${className} ${style.primaryClass}`;
    }
    const anchor = el('a', { className, text: link.label, attrs: { href: link.href } });
    items.push(el('li', {}, [anchor]));
  }

  return el('ul', { className: style.listClass }, items);
}
