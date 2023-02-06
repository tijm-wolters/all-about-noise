import { pseudoRandomGet } from './math.js';

export function draw1DNoiseGraph(parentEl, detail = 2, seed, length = 256) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.height = length / 2;
  canvas.width = length;

  ctx.beginPath();
  // x = 0, y = 50%, start on the left in the middle of the graph.
  ctx.moveTo(0, length / 4);

  for (let point = 0; point * detail < length; point++) {
    // I think my seeds are stupid AF, don't know tho
    const random = pseudoRandomGet(point.toString() + seed);

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

  // Create rows
  for (let row = 0; row < nodes; row++) {
    // Create nodes within the row
    for (let node = 0; node < nodes; node++) {
      const random = pseudoRandomGet(seed, row, node);

      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random()})`;
      ctx.fillRect(node * nodeSize, row * nodeSize, nodeSize, nodeSize);
    }
  }
  parentEl.appendChild(canvas);
}
