/*
 * @Author: Sexy
 * @Date: 2019-01-02 13:54:44
 * @LastEditors: Sexy
 * @LastEditTime: 2019-01-08 16:18:48
 * @Description: 快速排序
 */

function QuickSort(array, startIdx = 0, endIdx = array.length - 1) {
  if (endIdx - startIdx > 0) {
    let middleIdx = Math.ceil((endIdx + startIdx) / 2);
    let pivot = array[middleIdx];
    let left = startIdx;
    let right = endIdx;

    while (left < right) {
      while (array[right] > pivot && left < right) {
        right--;
      }
      while (array[left] < pivot && left < right) {
        left++;
      }
      [array[left], array[right]] = [array[right], array[left]];
    }

    quickSort(array, startIdx, left - 1);
    quickSort(array, left + 1, endIdx);
  }

  return array;
}

module.exports = {
  QuickSort
};
