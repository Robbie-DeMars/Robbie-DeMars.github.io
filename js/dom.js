// Shared DOM helpers. All text is set with textContent, never innerHTML.

/**
 * Creates an element.
 * @param {string} tag
 * @param {{className?: string, text?: string, attrs?: Object<string, string>}} [options]
 * @param {Node[]} [children]
 * @returns {HTMLElement}
 */
export function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);

  if (options.className) {
    node.className = options.className;
  }
  if (options.text !== undefined) {
    node.textContent = options.text;
  }
  if (options.attrs) {
    for (const name of Object.keys(options.attrs)) {
      node.setAttribute(name, options.attrs[name]);
    }
  }
  for (const child of children) {
    node.appendChild(child);
  }

  return node;
}

/**
 * Creates a <ul> with one <li> per string.
 * @param {string[]} values
 * @param {string} listClass
 * @param {string} [itemClass]
 * @returns {HTMLUListElement}
 */
export function list(values, listClass, itemClass) {
  const items = [];
  for (const value of values) {
    items.push(el('li', { className: itemClass, text: value }));
  }
  return el('ul', { className: listClass }, items);
}
