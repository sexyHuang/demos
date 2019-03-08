function findLCSlength(a, b) {
  let a_length = a.length,
    b_length = b.length,
    dp = new Array(b_length + 1).fill(0),
    before = 0;
  for (let i of a.keys()) {
    before = 0;
    for (let j of b.keys()) {
      [before, dp[j]] = [
        a[i] == b[j] ? dp[j] + 1 : Math.max(dp[j + 1], before),
        before
      ];
    }
    dp[b_length] = before;
  }
  return dp.pop();
}

let a = 'sdfsnnsdfsx'.split(''),
  b = 'sbbdsaffsdnxxs'.split('');
console.log(findLCSlength(a, b));
