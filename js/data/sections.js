// Ordered list of page sections. Order here is the order on the page and in the nav.
// Section shape: { id, title, subtitle?, type?, items?, links? } (see js/render/section.js).

import { art } from './art.js';
import { links } from './links.js';
import { music } from './music.js';
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
    title: 'Art',
    subtitle: '3D models and animations made in Maya, with textures painted in Substance Painter.',
    type: 'gallery',
    items: art,
    links: [links.artRepo],
  },
  {
    id: 'music',
    title: 'Music',
    subtitle: 'Game audio.',
    type: 'audio',
    items: music,
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
