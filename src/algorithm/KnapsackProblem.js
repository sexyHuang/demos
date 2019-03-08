function knapsackProblem(store, maxWeight) {
  let dp = new Array(store.length + 1)
    .fill(0)
    .map(() => new Array(maxWeight + 1).fill(0));
  for (let i of store.keys()) {
    for (let weight = 1; weight <= maxWeight; weight++) {
      let [iWeight, iValue] = store[i];
      let b_val = dp[i] ? dp[i][weight] : 0,
        a_val =
          dp[i] && weight - iWeight >= 0 ? dp[i][weight - iWeight] : -Infinity;
      dp[i + 1][weight] = Math.max(b_val, a_val + iValue);
    }
  }
  return dp.pop().pop();
}

let store = [[2, 1], [5, 5], [1, 4], [2, 3], [1, 2]],
  maxWeight = 6;
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let nums_1 = [...nums, ...nums];
  return _rob(nums_1) - _rob(nums);
  function _rob(nums) {
    if (nums.length <= 0) return 0;
    let dp = [0, nums[0]];
    for (let i = 1; i < nums.length; i++) {
      dp[i + 1] = Math.max(dp[i], dp[i - 1] + nums[i]);
    }
    return dp.pop();
  }
};

