/*
 * @Author: Sexy
 * @Date: 2018-12-29 10:30:49
 * @LastEditors: Sexy
 * @LastEditTime: 2019-01-03 17:20:33
 * @Description: 冒泡排序
 */

function BubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    let flag = true;
    for (let j = array.length - 1; j > i; j--) {
      if (array[j] < array[j - 1]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
        flag = false;
      }
    }
    if (flag) break;
  }
  return array;
}

module.exports = {
  BubbleSort
};
