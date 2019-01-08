/*
 * @Author: Sexy
 * @Date: 2019-01-03 14:29:39
 * @LastEditors: Sexy
 * @LastEditTime: 2019-01-03 17:21:24
 * @Description: 计数排序
 */


function CountingSort(array) {
  const min = Math.min(...array);
  return array
    .reduce((prev, curr) => {
      prev[curr] = prev[curr] ? prev[curr] + 1 : 1;
      return prev;
    }, [])
    .reduce((prev, count, dVal) => {
      const val = min + dVal;
      count && prev.push(...Array(count).fill(val));
      return prev;
    }, []);
}

module.exports = {
  CountingSort
};
