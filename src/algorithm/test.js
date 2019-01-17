/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  let results = [];
  for(let k = 0;k<=nums.length;k++)
      helper(nums,k,results);
  return results;
};

function helper(arr, k, results, result = [], end = arr.length - 1) {
  if (k == 0) {
    results.push(result);
    return;
  }

  for (let i = end; i >= 0; i--) {
    helper(arr, k - 1, results, [...result, arr[i]], i - 1);
  }
}
subsets([9,6,3]);
