/*
 * @Author: Sexy
 * @Date: 2018-12-29 10:30:49
 * @LastEditors: Sexy
 * @LastEditTime: 2019-01-02 15:55:21
 * @Description: 并归排序
 */


function MergeArrays_2(array, start_idx, end_idx) {
  let array_copy = array.slice(start_idx, end_idx + 1);
  let a_pointer = 0,
    resultArr_pointer = start_idx,
    b_pointer = (middle_idx = 0 | ((end_idx - start_idx) / 2)) + 1;
  end_idx -= start_idx;

  while (a_pointer <= middle_idx && b_pointer <= end_idx) {
    array[resultArr_pointer++] =
      array_copy[a_pointer] < array_copy[b_pointer]
        ? array_copy[a_pointer++]
        : array_copy[b_pointer++];
  }
  while (a_pointer <= middle_idx)
    array[resultArr_pointer++] = array_copy[a_pointer++];
  while (b_pointer <= end_idx) {
    array[resultArr_pointer++] = array_copy[b_pointer++];
  }
}

function mergeSorts(array, start_idx = 0, end_idx = array.length - 1) {
  if (start_idx < end_idx) {
    let mid = 0 | ((end_idx + start_idx) / 2);
    mergeSorts(array, start_idx, mid);
    mergeSorts(array, mid + 1, end_idx);
    if (array[mid] > array[mid + 1]) MergeArrays_2(array, start_idx, end_idx);
  }
}
function MergeSorts(array) {
  // let Copy = array.slice();
  mergeSorts(array, 0, array.length - 1);
  return array;
}

/* let a = ramdomList(2);
console.log(a);
console.time();
console.log(mergeSorts(a));
console.timeEnd();
console.log('end') */

/* let a = ramdomList(4);
console.log(a);
console.time();
console.log(mergeSorts(a));
console.timeEnd();
console.log('end');
 */

module.exports = {
  MergeSorts
};
