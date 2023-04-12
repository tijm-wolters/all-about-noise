# All about noise

## Introduction

This is a hobby project of mine to implement visualisation for noise algorithms, both for my own understanding and that of others. The code is meant to be as readable as possible and I'm planning on creating good documentation.

Please note this project is a work in progress, and I'm aware some things (especially relating to maths) don't function as expected, there are things about seeding, and pseudo random number generation that have to be improved.

## Roadmap

Because I struggle with motivation persistence I will define some clear goals to motivate me to continue with my project. These are loosely prioritised from top to bottom, with the top being most important and the bottom the least important.

### Performance optimizations

Currently rendering the 2D Perlin noise grid with a higher amount of detail already takes a few seconds to fully draw, this _has_ to be improved especially since I want to take this in the 3rd dimension as well. Below a small list of my goals for this.

- [ ] Implement timing when rendering and display this on the web page.
- [ ] Define and implement a realistic performance target based on the acquired metrics.

### One dimensional Perlin noise implementation

I've implemented Perlin noise in the second dimension, but it should be relatively easy to implement this in the first, this is mostly for completeness sake
