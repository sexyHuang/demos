const {
  findOnlySingleInCouples,
  findOnlySingleInTriple,
  findTwoSingleInCouples
} = require('./findSingle');

const { findIn2DArray } = require('./findInArray.js');

const {
  fibonacci,
  jumpingWays,
  jumpingWays_2,
  jumpingWaysInN
} = require('./Fibonacci');

const { TowerHanoi } = require('./TowerHanoi');

const SINGLE_IN_COUPLES_ARRAY = [5, 4, 4, 2, 3, 2, 3, 11, 10, 12, 11, 12, 10];
const SINGLE_IN_TRIPLE_ARRAY = [
  112,
  211,
  322,
  112,
  211,
  545,
  322,
  112,
  211,
  322
];
const SINGLES_IN_COUPLES_ARRAY = [
  9411,
  301,
  9411,
  211,
  123,
  568,
  9411,
  123,
  568,
  9411,
  568,
  9411,
  568,
  9411
];

const ARRAY_2D = [[1, 3, 5, 7], [4, 6, 8, 10], [5, 7, 9, 11], [12, 14, 16, 18]];
//console.log(findIn2DArray(ARRAY_2D, 18));
TowerHanoi(5)