// Ordered list of page sections. Order here is the order on the page and in the nav.
// Section shape: { id, title, subtitle?, type?, items?, links? } (see js/render/section.js).

import { art } from './art.js';
import { links } from './links.js';
import { projects } from './projects.js';
import { skills } from './skills.js';

export const sections = [
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'A mix of team and solo work from internships and coursework.',
    type: 'cards',
    items: projects,
  },
  {
    id: 'art',
    title: '3D Art',
    subtitle: 'Hand-painted, low-poly game assets modeled in Maya and textured in Substance Painter.',
    type: 'gallery',
    items: art,
    links: [links.artRepo],
  },
  {
    id: 'skills',
    title: 'Skills',
    subtitle: 'What I use day to day.',
    type: 'columns',
    items: skills,
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'The best way to reach me is through LinkedIn.',
    links: [{ ...links.linkedin, primary: true }, links.github, links.itch],
  },
];
