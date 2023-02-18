import { draw1DNoiseGraph, draw2DNoiseGrid, draw2DPerlinGrid } from './draw.js';

/**
 * One dimensional random noise graph.
 */
const noiseGraphParent = document.getElementById('noise-graph');
const noiseGraphInputs = document.getElementById('noise-graph-form');

noiseGraphInputs.addEventListener('input', () => {
  noiseGraphParent.replaceChildren([]);
  draw1DNoiseGraph(
    noiseGraphParent,
    noiseGraphInputs.detail.value,
    noiseGraphInputs.seed.value
  );
});

draw1DNoiseGraph(
  noiseGraphParent,
  noiseGraphInputs.detail.value,
  noiseGraphInputs.seed.value
);

/**
 * Two dimensional random noise grid.
 */
const noiseGridParent = document.getElementById('noise-grid');
const noiseGridInputs = document.getElementById('noise-grid-form');

noiseGridInputs.addEventListener('input', () => {
  noiseGridParent.replaceChildren([]);
  draw2DNoiseGrid(
    noiseGridParent,
    noiseGridInputs.detail.value,
    noiseGridInputs.seed.value
  );
});

draw2DNoiseGrid(
  noiseGridParent,
  noiseGridInputs.detail.value,
  noiseGridInputs.seed.value
);

/**
 * Two dimensional perlin noise grid.
 */
const perlinGridParent = document.getElementById('perlin-grid');
const perlinGridInputs = document.getElementById('perlin-grid-form');

perlinGridInputs.addEventListener('input', () => {
  perlinGridParent.replaceChildren([]);
  draw2DPerlinGrid(
    perlinGridParent,
    perlinGridInputs.detail.value,
    perlinGridInputs.seed.value
  );
});

draw2DPerlinGrid(
  perlinGridParent,
  perlinGridInputs.detail.value,
  perlinGridInputs.seed.value
);
