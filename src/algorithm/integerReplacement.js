/**
 * @param {number} n
 * @return {number}
 */
var integerReplacement = function(n) {
  let count = 0;
  while (n > 1) {
    if (n & 1) {
      n = (n + 1) % 4 || n - 1 == 2 ? n - 1 : n + 1;
    } else {
      n = n / 2;
    }
    console.log(n);
    count++;
  }
  return count;
};

function minOnesInBit(num1, num2) {
  return find1NumbersInBit(num2) >= find1NumbersInBit(num1) ? num1 : num2;
}

function find1NumbersInBit(num) {
  let mod = 0xffffffff;
  let Map = {
    1: '0xAAAAAAAA',
    2: '0xCCCCCCCC',
    4: '0xF0F0F0F0',
    8: '0xFF00FF00',
    16: '0xFFFF0000'
  };
  for (let [key, val] of Object.entries(Map)) {
    let _val = val ^ mod;
    num = ((num & val) >> key) + (num & _val);
  }
  return num;
}

console.log(integerReplacement(2147483647));
