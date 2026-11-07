import { el } from '../dom.js';

/**
 * Audio item shape: { src, title, caption? }
 */
function renderTrack(item) {
  const player = el('audio', {
    className: 'track__player',
    attrs: { controls: '', preload: 'none', src: item.src },
  });

  const children = [el('h3', { className: 'track__title', text: item.title })];
  if (item.caption) {
    children.push(el('p', { className: 'track__caption', text: item.caption }));
  }
  children.push(player);

  return el('div', { className: 'track' }, children);
}

/**
 * @param {object[]} items
 * @returns {HTMLDivElement}
 */
export function renderAudio(items) {
  const tracks = [];
  for (const item of items) {
    tracks.push(renderTrack(item));
  }
  return el('div', { className: 'grid grid--columns' }, tracks);
}
