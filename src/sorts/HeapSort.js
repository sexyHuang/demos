/*
 * @Author: Sexy
 * @Date: 2019-01-02 16:44:40
 * @LastEditors: Sexy
 * @LastEditTime: 2019-01-08 17:38:49
 * @Description: 堆排序
 */

function HeapSort(array) {
  createMaxHeap(array);
  //let result = [].push(array[0]);
  for (let i = array.length - 1; i > 0; i--) {
    [array[i], array[0]] = [array[0], array[i]];
    heapify(array, 0, i - 1);
  }
}

function heapify(array, startIdx = 0, endIdx = array.length - 1) {
  let son = startIdx * 2 + 1;
  if (son > endIdx) return;
  if (son + 1 <= endIdx && array[son + 1] > array[son]) {
    son++;
  }
  if (array[startIdx] <= array[son]) {
    [array[startIdx], array[son]] = [array[son], array[startIdx]];
    heapify(array, son, endIdx);
    
  }
}

function createMaxHeap(array) {
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, i, array.length - 1);
  }
  return array;
}

module.exports = {
  HeapSort
};
