import { draw1DNoiseGraph, draw2DNoiseGrid } from './draw.js';

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
  draw2DNoiseGrid(noiseGridParent, noiseGridInputs.detail.value);
});

draw2DNoiseGrid(noiseGridParent, noiseGridInputs.detail.value);
