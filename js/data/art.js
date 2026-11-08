// Gallery items. Shape: { src, alt, title?, caption?, width?, height?, fullWidth?, pixelated? }
// Image files live in assets/art/. Each image is defined once and then grouped into the lists below.

// Shared by both pop token GIFs.
const TOKEN_NOTE =
  'GameMaker Studio is a 2D-only engine, so I modeled and animated this coin flip in Maya ' +
  'and exported a low-resolution recording of the animation.';

const swordSheet = {
  src: 'assets/art/sword-sheet.jpg',
  alt: 'Presentation sheet of a green-bladed fantasy sword with a red and gold hilt, shown from five angles next to its concept art',
  title: 'Stylized sword, final presentation.',
  caption: '1,496 triangles, modeled in Maya and hand-painted in Substance Painter. Concept art by Jessica Geis.',
  width: 1800,
  height: 1286,
  fullWidth: true,
};

const swordTextured = {
  src: 'assets/art/sword-textured.jpg',
  alt: 'Textured side view of the sword on a grey background',
  title: 'Textured view.',
  caption: 'The finished hand-painted texture on the low-poly mesh.',
};

const swordWireframe = {
  src: 'assets/art/sword-wireframe.jpg',
  alt: 'Side view of the sword with its wireframe topology drawn over the texture',
  title: 'Wireframe view.',
  caption: 'The same model with its topology shown.',
};

const oldMan = {
  src: 'assets/art/old-man.png',
  alt: 'Low-poly 3D model of an elderly man in a plaid shirt holding a green box',
  title: 'Low-poly character.',
  caption: 'Modeled and textured character in a game-ready style.',
};

const tokenSated = {
  src: 'assets/art/pop-token-sated.gif',
  alt: 'Low-resolution animation of a coin-flipping pop token: a black keyhole-shaped figure on a green octagon',
  title: 'Who We Are: sated pop token.',
  caption: `Coin-flip animation for a sated pop token. ${TOKEN_NOTE}`,
  width: 256,
  height: 256,
  pixelated: true,
};

const tokenUnsated = {
  src: 'assets/art/pop-token-unsated.gif',
  alt: 'Low-resolution animation of a coin-flipping pop token: a black keyhole-shaped figure on a red octagon',
  title: 'Who We Are: unsated pop token.',
  caption: `Coin-flip animation for an unsated pop token. ${TOKEN_NOTE}`,
  width: 256,
  height: 256,
  pixelated: true,
};

// Art page lists.
export const renders = [swordSheet, swordTextured, swordWireframe, oldMan];
export const sprites = [tokenSated, tokenUnsated];

// Home page selection.
export const featured = [swordTextured, oldMan, tokenSated, tokenUnsated];
