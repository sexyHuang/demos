function ShellSort(array, length = array.length) {
  let gap = Math.floor(length / 2);
  for (let i = gap; i < array.length; i++) {
    for (let j = i; j - gap >= 0; j -= gap) {
      if (array[j] < array[j - gap])
        [array[j], array[j - gap]] = [array[j - gap], array[j]];
    }
  }
  if (gap == 1) {
    return array;
  } else return ShellSort(array, gap);
}

module.exports = { ShellSort };
