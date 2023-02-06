/**
 * Deterministically generates a pseudo random number based on the seed.
 *
 * **IMPORTANT:** Will always return the same result for the same seed!
 * @param {string} seed
 * @returns {number} A pseudorandom number between -1 and 1.
 */
export function pseudoRandomGet(seed) {
  const MILLIONTH_PRIME = 15485863;
  const HUNDERED_MILLIONTH_PRIME = 2038074743;

  /**
   * Define the pseudo random algorithm for re-use in seed hashing.
   * @returns {number} A pseudorandom number between -1 and 1.
   */
  const pseudoRandom = (seed) => {
    const a = seed * MILLIONTH_PRIME;
    return ((a * a * a) % HUNDERED_MILLIONTH_PRIME) / HUNDERED_MILLIONTH_PRIME;
  };

  let numberSeed = 0;

  // I don't think this is a good way to convert the seed to an integer, although, I can't put my finger on it.
  for (let i = 0; i < seed.length; i++) {
    numberSeed += pseudoRandom(seed.charCodeAt(i));
  }

  return pseudoRandom(numberSeed / seed.length);
}

/**
 * The next part of my code, does not work (I think) :)
 */

class Perlin {
  /**
   * Array of rows, which are arrays of nodes, which are gradient vectors,
   * can be solved by implementing seeding based on a hash from used input seed and location.
   * Example:
   * [[{ x: 0.6, y: -0.1 }, {...}], [...]]
   */
  gradientGrid = [];

  _lerp(a0, a1, w) {
    return (a1 - a0) * w + a0;
  }

  // TODO: Implement seeding
  _randomGradient() {
    let theta = Math.random() * 2 * Math.PI;
    return { x: Math.cos(theta), y: Math.sin(theta) };
  }

  _getDotProduct(ix, iy, x, y) {
    let gradient;
    if (this.gradientGrid[[ix, iy]]) {
      gradient = this.gradientGrid[[ix, iy]];
    } else {
      gradient = this._randomGradient();
      this.gradientGrid[[ix, iy]] = gradient;
    }
    const distance = { x: x - ix, y: y - iy };

    // Calculate the dot product
    return distance.x * gradient.x + distance.y * gradient.y;
  }

  get(x, y) {
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const y0 = Math.floor(y);
    const y1 = y0 + 1;

    // Determine weight for interpolating
    const sx = x - x0;
    const sy = y - y0;

    let n0, n1;

    n0 = this._getDotProduct(x0, y0, x, y);
    n1 = this._getDotProduct(x1, y0, x, y);
    const ix0 = this._lerp(n0, n1, sx);

    n0 = this._getDotProduct(x0, y1, x, y);
    n1 = this._getDotProduct(x1, y1, x, y);
    const ix1 = this._interpolate(n0, n1, sx);

    return this._lerp(ix0, ix1, sy);
  }
}

class Perlin1D {
  _lerp(a0, a1, weight) {
    return (a1 - a0) * weight + a0;
  }

  get(x) {
    const x0 = Math.floor(x);
    const x1 = x + 1;

    const weight = x - x0;

    return this._lerp(x0, x1, weight);
  }
}