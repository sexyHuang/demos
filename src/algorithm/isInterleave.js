/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
  if (s3.length != s1.length + s2.length) return false;
  let m = s1.length,
    n = s2.length,
    matrix = [...new Array(m + 1)].map((_, i) =>
      new Array(n + 1).fill(0).map((_, j) => {
        if (
          (i == 0 && s3.substring(0, j) === s2.substring(0, j)) ||
          (j == 0 && s3.substring(0, i) === s1.substring(0, i))
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      matrix[i][j] =
        (matrix[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
        (matrix[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }
  return matrix[m][n];
};
let s1 = 'aabcc',
  s2 = 'dbbca',
  s3 = 'aadbbcbcac';
isInterleave(s1, s2, s3);
