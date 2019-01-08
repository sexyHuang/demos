/*
 * @Author: Sexy
 * @Date: 2019-01-03 16:05:36
 * @LastEditors: Sexy
 * @LastEditTime: 2019-01-03 17:28:47
 * @Description: 插入排序
 */

/**
 * @description: 插入法
 * @param {type}
 * @return:
 */
function InsertSort(array) {
  for (let i = 1; i < array.length; i++) {
    for (let j = i - 1; j >= -1; j--) {
      if (array[j] < array[i] || j == -1) {
        if (j + 1 < i) {
          array.splice(j + 1, 0, ...array.splice(i, 1));
        }
        break;
      }
    }
  }
  return array;
}

/**
 * @description: 交换法
 * @param {type}
 * @return:
 */
function InsertSort_2(array) {
  for (let i = 1; i < array.length; i++) {
    for (let j = i; j > 0; j--) {
      if (array[j] < array[j - 1]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
      }
    }
  }
  return array;
}

module.exports = {
  InsertSort: InsertSort_2
};
