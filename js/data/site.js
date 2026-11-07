// Site-wide values. Page title and meta description live in index.html.

import { links } from './links.js';

export const site = {
  owner: 'Robbie DeMars',
  footer: '© 2026 Robbie DeMars. Sword concept art by Jessica Geis.',
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
};
