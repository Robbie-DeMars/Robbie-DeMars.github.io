import { renderCards } from './cards.js';
import { renderColumns } from './columns.js';
import { renderGallery } from './gallery.js';

// Maps a section "type" in js/data/sections.js to the function that renders its items.
// To add a new item layout: create js/render/<name>.js and register it here.
export const itemRenderers = {
  cards: renderCards,
  gallery: renderGallery,
  columns: renderColumns,
};
