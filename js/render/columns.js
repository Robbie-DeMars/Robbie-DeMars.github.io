import { el } from '../dom.js';

/**
 * Column item shape: { title, text }
 */
function renderColumn(item) {
  return el('div', { className: 'column' }, [
    el('h3', { className: 'column__title', text: item.title }),
    el('p', { className: 'column__text', text: item.text }),
  ]);
}

/**
 * @param {object[]} items
 * @returns {HTMLDivElement}
 */
export function renderColumns(items) {
  const columns = [];
  for (const item of items) {
    columns.push(renderColumn(item));
  }
  return el('div', { className: 'grid grid--columns' }, columns);
}
