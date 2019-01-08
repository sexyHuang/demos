function SelectSort(array) {
  for (let i = 0; i < array.length; i++) {
    let min_idx = i;
    for (let j = i; j < array.length; j++) {
      if (array[j] < array[min_idx]) min_idx = j;
    }
    [array[i], array[min_idx]] = [array[min_idx], array[i]];
  }
  return array;
}

module.exports = {
  SelectSort
};
