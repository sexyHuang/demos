/*
 * @Author: Sexy
 * @Date: 2019-01-02 16:00:48
 * @LastEditors: Sexy
 * @LastEditTime: 2019-01-03 17:20:58
 * @Description: 桶排序
 */


function bucketSort(array) {
  let max = Math.max(...array);
  let min = Math.min(...array);
  let steps = Math.ceil((max - min) / 20);
  let buckets = [];
  array.map(val => {
    let buckets_idx = Math.ceil((val - min) / steps);
    buckets[buckets_idx] || (buckets[buckets_idx] = []);
    let idx = buckets[buckets_idx].findIndex(_val => _val > val);
    if (idx >= 0) {
      buckets[buckets_idx].splice(idx, 0, val);
    } else {
      buckets[buckets_idx].push(val);
    }
  });
  return buckets.reduce((prev, curr) => {
    prev.push(...curr);
    return prev;
  }, []);
}

module.exports = {
  bucketSort
};
