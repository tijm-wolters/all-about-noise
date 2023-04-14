import { PseudoRandom, Perlin } from './math.js';
import { NoiseFnOpts } from './types';

export function draw1DNoiseGraph(
  parentEl: HTMLElement,
  { seed = 'Hello World!', size = 256, zoom = 2 }: NoiseFnOpts
): void {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.height = size / 2;
  canvas.width = size;

  ctx.beginPath();
  // x = 0, y = 50%, start on the left in the middle of the graph.
  ctx.moveTo(0, canvas.width / 2);

  const pseudoRandom = new PseudoRandom(seed);

  for (let point = 0; point * zoom < size; point++) {
    const random = pseudoRandom.get(point);

    ctx.lineTo((point + 1) * zoom, (random * size) / 2);
  }

  ctx.stroke();
  parentEl.appendChild(canvas);
}

export function draw2DNoiseGrid(
  parentEl: HTMLElement,
  { seed = 'Hello World!', size = 256, zoom = 16 }: NoiseFnOpts
): void {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const nodeSize = size / zoom;

  canvas.width = canvas.height = size;

  const pseudoRandom = new PseudoRandom(seed);

  // Create rows
  for (let row = 0; row < zoom; row++) {
    // Create nodes within the row
    for (let node = 0; node < zoom; node++) {
      const random = pseudoRandom.get(row, node);

      ctx.fillStyle = `rgba(0, 0, 0, ${random})`;
      ctx.fillRect(node * nodeSize, row * nodeSize, nodeSize, nodeSize);
    }
  }
  parentEl.appendChild(canvas);
}

export function draw2DPerlinGrid(
  parentEl: HTMLElement,
  { seed = 'Hello World!', size = 256, zoom = 16 }: NoiseFnOpts
): void {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const nodeSize = size / zoom;

  canvas.width = canvas.height = size;

  const perlin = new Perlin(seed);

  for (let row = 0; row < zoom; row++) {
    for (let node = 0; node < zoom; node++) {
      const perlinRand = perlin.get2D(row * 0.1, node * 0.1);

      ctx.fillStyle = `rgba(0, 0, 0, ${perlinRand})`;
      ctx.fillRect(node * nodeSize, row * nodeSize, nodeSize, nodeSize);
    }
  }

  parentEl.appendChild(canvas);
}
