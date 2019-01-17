/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  let a_length = word1.length,
    b_length = word2.length,
    a = word1.split(''),
    b = word2.split('');
  let d = [...Array(a_length + 1)].map((val, idx) =>
    [...Array(b_length + 1)].map((val, _idx) => {
      if (idx === 0) return _idx;
      else if (_idx === 0) {
        return idx;
      }
    })
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      let temp = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + temp
      );
    }
  }
  return d[a_length][b_length];
};

console.log(minDistance('intention', 'execution'));
