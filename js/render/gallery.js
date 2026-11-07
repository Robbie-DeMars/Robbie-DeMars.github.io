import { el } from '../dom.js';

/**
 * Gallery item shape:
 * { src, alt, title?, caption?, width?, height?, fullWidth? }
 */
function renderFigure(item) {
  const imageAttrs = { src: item.src, alt: item.alt, loading: 'lazy' };
  if (item.width) {
    imageAttrs.width = String(item.width);
  }
  if (item.height) {
    imageAttrs.height = String(item.height);
  }

  const image = el('img', { className: 'figure__image', attrs: imageAttrs });
  const children = [el('a', { attrs: { href: item.src } }, [image])];

  if (item.title || item.caption) {
    const captionChildren = [];
    if (item.title) {
      captionChildren.push(el('strong', { className: 'figure__title', text: item.title }));
    }
    if (item.title && item.caption) {
      captionChildren.push(document.createTextNode(' '));
    }
    if (item.caption) {
      captionChildren.push(document.createTextNode(item.caption));
    }
    children.push(el('figcaption', { className: 'figure__caption' }, captionChildren));
  }

  const className = item.fullWidth ? 'figure grid__item--full' : 'figure';
  return el('figure', { className }, children);
}

/**
 * @param {object[]} items
 * @returns {HTMLDivElement}
 */
export function renderGallery(items) {
  const figures = [];
  for (const item of items) {
    figures.push(renderFigure(item));
  }
  return el('div', { className: 'grid grid--gallery' }, figures);
}
