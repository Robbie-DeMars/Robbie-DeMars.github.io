// Page definitions, keyed by the data-page attribute on <body> in each HTML file.
// Page shape: { hero?, sections }
// Section shape: { id, title, subtitle?, type?, items?, links? } (see js/render/section.js).
// Order here is the order on the page.

import { featured, renders, sprites } from './art.js';
import { links } from './links.js';
import { models } from './models.js';
import { music } from './music.js';
import { projects } from './projects.js';
import { skills } from './skills.js';

export const pages = {
  home: {
    hero: {
      heading: 'I build software, ML systems and games.',
      lead:
        'Senior Computer Science student at the University of Utah (AI and robotics emphasis, games minor), ' +
        'graduating May 2027. I work on LLM agent systems as an engineering intern, train classifiers on messy data, ' +
        'and make games in Unity, including the 3D art.',
      actions: [
        { label: 'See projects', href: '#projects', primary: true },
        links.github,
        links.linkedin,
      ],
    },
    sections: [
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
        subtitle: 'A selection. The art page has the interactive 3D models, more renders and music.',
        type: 'gallery',
        items: featured,
        links: [{ label: 'View all art', href: 'art.html', primary: true }],
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
    ],
  },

  art: {
    hero: {
      heading: 'Art',
      lead: 'My 3D models, renders, animated sprites and music.',
      actions: [links.artRepo],
    },
    sections: [
      {
        id: 'models',
        title: '3D Models',
        subtitle: 'Drag to rotate and scroll to zoom. Some models are untextured.',
        type: 'models',
        items: models,
      },
      {
        id: 'renders',
        title: 'Renders',
        subtitle: 'Models built in Maya and textured in Substance Painter.',
        type: 'gallery',
        items: renders,
      },
      {
        id: 'sprites',
        title: 'Animated sprites',
        subtitle: 'Game sprites animated in Maya.',
        type: 'gallery',
        items: sprites,
      },
      {
        id: 'music',
        title: 'Music',
        subtitle: 'Game audio.',
        type: 'audio',
        items: music,
      },
    ],
  },
};
