import { el } from '../dom.js';

/**
 * Model item shape: { group?, label, src }
 * Items with the same group are listed together, in the order the group first appears.
 */
function groupModels(items) {
  const groups = [];
  const byName = {};
  for (const item of items) {
    const name = item.group || '';
    if (!byName[name]) {
      byName[name] = { name, items: [] };
      groups.push(byName[name]);
    }
    byName[name].items.push(item);
  }
  return groups;
}

/**
 * Renders a 3D viewer with one button per model. The three.js scene (js/viewer/stage.js) is loaded
 * the first time a model is selected, so pages that never show a model do not download it.
 *
 * @param {object[]} items
 * @returns {HTMLDivElement}
 */
export function renderModels(items) {
  const status = el('p', { className: 'viewer__status', text: 'Select a model to view it in 3D.' });
  const stage = el('div', { className: 'viewer__stage' }, [status]);
  const buttons = [];
  let stagePromise = null;
  let hasSelection = false;

  async function select(item, button) {
    hasSelection = true;
    for (const entry of buttons) {
      entry.button.setAttribute('aria-pressed', entry.button === button ? 'true' : 'false');
    }
    status.textContent = `Loading ${item.label}...`;
    status.hidden = false;

    try {
      if (!stagePromise) {
        stagePromise = import('../viewer/stage.js').then((module) => module.createStage(stage));
      }
      const viewer = await stagePromise;
      await viewer.load(item.src);
      status.hidden = true;
    } catch (error) {
      console.error(error);
      status.textContent = `Could not load ${item.label}.`;
      status.hidden = false;
    }
  }

  const groupNodes = [];
  for (const group of groupModels(items)) {
    const chips = [];
    for (const item of group.items) {
      const button = el('button', {
        className: 'chip',
        text: item.label,
        attrs: { type: 'button', 'aria-pressed': 'false' },
      });
      button.addEventListener('click', () => select(item, button));
      buttons.push({ item, button });
      chips.push(el('li', {}, [button]));
    }
    const children = [];
    if (group.name) {
      children.push(el('h3', { className: 'viewer__group-title', text: group.name }));
    }
    children.push(el('ul', { className: 'chip-list' }, chips));
    groupNodes.push(el('div', { className: 'viewer__group' }, children));
  }

  const root = el('div', { className: 'viewer' }, [
    stage,
    el('div', { className: 'viewer__choices' }, groupNodes),
  ]);

  // Show the first model once the viewer scrolls into view.
  if (buttons.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.disconnect();
          if (!hasSelection) {
            select(buttons[0].item, buttons[0].button);
          }
        }
      }
    });
    observer.observe(root);
  }

  return root;
}
