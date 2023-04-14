export class PseudoRandom {
  seed: number;

  _MILLIONTH_PRIME = 15485863;
  _HUNDERED_MILLIONTH_PRIME = 2038074743;
  _SMALL_PRIMES = [541, 1223, 1987, 2741, 3571];

  constructor(seed: string) {
    this.seed = this._integerHash(seed);
  }

  _integerHash(seed: string): number {
    let result = 0;

    for (let char = 0; char < seed.length; char++) {
      result +=
        seed.charCodeAt(char) *
        this._SMALL_PRIMES[Math.round(char) % this._SMALL_PRIMES.length];
    }

    return ((result * result * result) % 100) / 100;
  }

  setSeed(seed: string) {
    this.seed = this._integerHash(seed);
  }

  /**
   * Deterministically generates a pseudo random number based on the seed and coordinates
   * @param {Array<number>} coordinates The coordinates to generate the pseudo random number.
   */
  get(...coordinates: number[]) {
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

export class Perlin {
  random: PseudoRandom;

  constructor(seed: string) {
    this.random = new PseudoRandom(seed);
  }

  _lerp(a0: number, a1: number, w: number): number {
    // return (a1 - a0) * w + a0;
    return (a1 - a0) * ((w * (w * 6.0 - 15.0) + 10.0) * w * w * w) + a0;
  }

  _randomGradient(x: number, y: number): { x: number; y: number } {
    const theta = this.random.get(x, y) * 2 * Math.PI;
    return { x: Math.cos(theta), y: Math.sin(theta) };
  }

  _getDotProduct(ix: number, iy: number, x: number, y: number): number {
    const gradient = this._randomGradient(ix, iy);

    const distance = { x: x - ix, y: y - iy };

    // Calculate the dot product
    return distance.x * gradient.x + distance.y * gradient.y;
  }

  get2D(x: number, y: number): number {
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const y0 = Math.floor(y);
    const y1 = y0 + 1;

    // Determine weight for interpolation
    const sx = x - x0;
    const sy = y - y0;

    let n0, n1;

    n0 = this._getDotProduct(x0, y0, x, y);
    n1 = this._getDotProduct(x1, y0, x, y);
    const ix0 = this._lerp(n0, n1, sx);

    n0 = this._getDotProduct(x0, y1, x, y);
    n1 = this._getDotProduct(x1, y1, x, y);
    const ix1 = this._lerp(n0, n1, sx);

    return this._lerp(ix0, ix1, sy);
  }
}
