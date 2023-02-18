import { PseudoRandom, Perlin } from './math.js';

export function draw1DNoiseGraph(parentEl, detail = 2, seed, length = 256) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.height = length / 2;
  canvas.width = length;

  ctx.beginPath();
  // x = 0, y = 50%, start on the left in the middle of the graph.
  ctx.moveTo(0, length / 4);

  const pseudoRandom = new PseudoRandom(seed);

  for (let point = 0; point * detail < length; point++) {
    const random = pseudoRandom.get(point);

    ctx.lineTo((point + 1) * detail, (random * length) / 2);
  }

  ctx.stroke();
  parentEl.appendChild(canvas);
}

export function draw2DNoiseGrid(
  parentEl,
  nodes = 16,
  seed = 'abc',
  gridSize = 256
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const nodeSize = gridSize / nodes;

  canvas.width = canvas.height = gridSize;

  const pseudoRandom = new PseudoRandom(seed);

  // Create rows
  for (let row = 0; row < nodes; row++) {
    // Create nodes within the row
    for (let node = 0; node < nodes; node++) {
      const random = pseudoRandom.get(row, node);

      ctx.fillStyle = `rgba(0, 0, 0, ${random})`;
      ctx.fillRect(node * nodeSize, row * nodeSize, nodeSize, nodeSize);
    }
  }
  parentEl.appendChild(canvas);
}

export function draw2DPerlinGrid(
  parentEl,
  nodes = 16,
  seed = 'abc',
  gridSize = 256
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const nodeSize = gridSize / nodes;

  canvas.width = canvas.height = gridSize;

  const perlin = new Perlin(seed);

  for (let row = 0; row < nodes; row++) {
    for (let node = 0; node < nodes; node++) {
      const perlinRand = perlin.get2D(row * 0.1, node * 0.1);

      ctx.fillStyle = `rgba(0, 0, 0, ${perlinRand})`;
      ctx.fillRect(node * nodeSize, row * nodeSize, nodeSize, nodeSize);
    }
  }

  parentEl.appendChild(canvas);
}
