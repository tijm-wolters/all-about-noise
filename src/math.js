export class PseudoRandom {
  _MILLIONTH_PRIME = 15485863;
  _HUNDERED_MILLIONTH_PRIME = 2038074743;
  _SMALL_PRIMES = [541, 1223, 1987, 2741, 3571];

  constructor(seed) {
    this.seed = this._integerHash(seed);
  }

  _integerHash(seed) {
    let result = 0;

    for (let char = 0; char < seed.length; char++) {
      result +=
        seed.charCodeAt(char) *
        this._SMALL_PRIMES[Math.round(char) % this._SMALL_PRIMES.length];
    }

    return ((result * result * result) % 100) / 100;
  }

  /**
   * Sets the class seed based on the input string.
   * @param {string} seed
   */
  setSeed(seed) {
    this.seed = this._integerHash(seed);
  }

  /**
   * Deterministically generates a pseudo random number based on the seed and coordinates
   * @param  {Array<number>} coordinates The coordinates to generate the pseudo random number.
   */
  get(...coordinates) {
    let seed = 0;

    for (let i = 0; i < coordinates.length; i++) {
      seed += coordinates[i] * this._SMALL_PRIMES[i];
    }

    const a = seed + this.seed * this._MILLIONTH_PRIME;
    return (
      ((a * a * a) % this._HUNDERED_MILLIONTH_PRIME) /
      this._HUNDERED_MILLIONTH_PRIME
    );
  }
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
