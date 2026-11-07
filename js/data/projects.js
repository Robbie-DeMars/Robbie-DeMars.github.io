// Card items. Shape: { title, meta?, summary?, bullets?, tags?, links? }

export const projects = [
  {
    title: 'Blacksite Trailblazer',
    meta: 'Six-person Unity team project · Traditional Game Development · Spring 2025',
    summary:
      'A turn-based tactical RPG set in a city of eternal night. I proposed the concept and was one of two ' +
      'programmers, working with two artists, a composer and a team lead.',
    bullets: [
      'Built the turn-order UI, per-enemy behaviors, encounters and tutorial.',
      'Reworked combat balance and fixed crashes from instructor critiques and playtests across 100+ commits.',
    ],
    tags: ['Unity', 'C#', 'Game design'],
    links: [
      { label: 'Play on itch.io', href: 'https://robbie-demars.itch.io/blacksite-trailblazer' },
      { label: 'Source', href: 'https://github.com/Robbie-DeMars/Trad-Games-Blacksite-Trailblazer' },
    ],
  },
  {
    title: 'Olympic Medal Classification',
    meta: 'Team project · Managing Data for and with ML · Spring 2026',
    summary:
      'Predicts Olympic outcomes (gold, silver, bronze or no medal) from athlete features, using data merged ' +
      'from Kaggle, Maddison GDP and scraped Wikipedia sources.',
    bullets: [
      'Built the XGBoost classifier with class weighting.',
      'Found median imputation outperformed KNN on the class-imbalanced data.',
      'Wrote the dataset-completeness evaluation and missing-data plots.',
    ],
    tags: ['Python', 'XGBoost', 'scikit-learn', 'Data cleaning'],
    links: [
      { label: 'Source and report', href: 'https://github.com/Robbie-DeMars/Olympics-Classification-Project' },
    ],
  },
  {
    title: 'Who We Are',
    meta: 'Three-person GameMaker team project · Fall 2024',
    summary:
      'A GameMaker game in which the player names a tribe, defines its culture, assigns jobs to its ' +
      'population and resolves dilemmas, built by a team of three.',
    bullets: [
      'Added the game’s dilemma content and fixed crash, restart and culture-removal bugs.',
      'Contributed most of the 120 commits alongside two teammates.',
    ],
    tags: ['GameMaker', 'GML', 'Team of three'],
    links: [{ label: 'Source', href: 'https://github.com/Robbie-DeMars/Who-We-Are' }],
  },
  {
    title: 'AdLib Mayhem',
    meta: 'Solo project · Misfits and Machines · Summer 2025',
    summary:
      'A browser-based advergame I developed on my own for the Misfits and Machines website, ' +
      'used as a marketing piece to draw interest in the product.',
    tags: ['Browser game', 'Solo developer'],
  },
  {
    title: 'Project Escargot',
    meta: '48-hour game jam · Unity · September 2024',
    summary:
      'A Unity game made in 48 hours for the “snail’s pace” theme with a team of first-time game jam ' +
      'participants. I was lead programmer and 3D modeler.',
    tags: ['Unity', 'C#', '3D modeling'],
  },
];
