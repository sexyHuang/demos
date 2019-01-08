function RadixSort(array) {
  const MAX = Math.max(...array);
  const DIGIT = `${MAX}`.length;
  let radix_array;
  for (let _digit = 1; _digit <= DIGIT; _digit++) {
    radix_array = [...Array(10)].map(() => []);
    array.map(val => {
      let _digit_num = `${val}`.split('')[`${val}`.length - _digit] || 0;
      try {
        radix_array[_digit_num].push(val);
      } catch (e) {
        console.error(_digit_num);
      }
    });
    array = radix_array.reduce((prev, curr) => {
      prev.push(...curr);
      return prev;
    }, []);
  }
  return array;
}

module.exports = {
  RadixSort
};
