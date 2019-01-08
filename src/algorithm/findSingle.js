/**
 * @description 非空数组中，除了一个数外都是一对一对出现的数，求单独的数。
 */
function findOnlySingleInCouples(array) {
  return array.reduce((prev, curr) => prev ^ curr, 0);
}

/**
 * @description 非空数组中，除了一个数外都是三个三个出现的数，求单独的数。
 */
function findOnlySingleInTriple(array) {
  let resultInBirnary = array
    .reduce((prev, curr) => {
      return new Number(curr)
        .toString(2)
        .split('')
        .reduce((prev, curr, currIdx) => {
          prev[currIdx] = (prev[currIdx] || 0) + curr;
          return prev;
        }, prev);
    }, [])
    .map(val => val % 3)
    .join('');
  return parseInt(resultInBirnary, 2);
}

/**
 * @description 非空数组中，除了两个数外都是成双出现的数，求单独的两个数的值。
 */
function findTwoSingleInCouples(array) {
  //算出两数首个不同的二进制位
  let first_different_digit = new Number(
    array.reduce((prev, curr) => prev ^ curr, 0)
  )
    .toString(2)
    .split('')
    .reverse()
    .findIndex(val => val - 1 === 0);

  //分两组异或分别求出两数
  return array.reduce(
    (prev, curr) => {
      let currInBinary = new Number(curr).toString(2),
        currLength = currInBinary.length,
        splitDigitVal =
          currInBinary[currLength - first_different_digit - 1] || 0;
      prev[splitDigitVal] ^= curr;
      return prev;
    },
    [0, 0]
  );
}

module.exports = {
  findOnlySingleInCouples,
  findOnlySingleInTriple,
  findTwoSingleInCouples
};
