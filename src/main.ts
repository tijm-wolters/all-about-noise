import './style.css';
import { draw1DNoiseGraph, draw2DNoiseGrid, draw2DPerlinGrid } from './draw.js';
import { NoiseFnOpts } from './types';

function _attachCanvas(
  baseIdentifier: string,
  noiseFn: (parentEl: HTMLElement, options: NoiseFnOpts) => void
): void {
  const parentEl = document.getElementById(baseIdentifier)!;
  const formEl = document.getElementById(
    baseIdentifier + '-form'
  ) as HTMLFormElement;
  const renderTimeMetricDisplayEl = document.getElementById(
    baseIdentifier + '-render-time'
  );

  formEl.addEventListener('input', () => {
    parentEl.replaceChildren();
    noiseFn(parentEl, {
      zoom: formEl.zoom.value,
      seed: formEl.seed.value,
      size: 256,
      renderTimeMetricDisplayEl: renderTimeMetricDisplayEl ?? undefined,
    });
  });

  noiseFn(parentEl, {
    zoom: formEl.zoom.value,
    seed: formEl.seed.value,
    size: 256,
    renderTimeMetricDisplayEl: renderTimeMetricDisplayEl ?? undefined,
  });
}

// One dimensional random noise graph.
_attachCanvas('noise-graph', draw1DNoiseGraph);

// Two dimensional random noise grid.
_attachCanvas('noise-grid', draw2DNoiseGrid);

// Two dimensional perlin noise grid.
_attachCanvas('perlin-grid', draw2DPerlinGrid);
