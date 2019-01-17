/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  let result = [];
  _solveNQueens(n, result);
  return result.map(val =>
    val.map(val => val.map(val => (val ? 'Q' : '.')).join(''))
  );
};
function _solveNQueens(n, result) {
  let board = [...Array(n)].map(() => Array(n).fill(0)),
    stack = [];
  let i = 0;
  let j = 0;
  while (true) {
    while (j < n && i < n) {
      if (checkSingleQueen(board, i, j)) {
        board[i][j] = 1;
        stack.push([i, j]);
        i++;
        j = 0;
      } else {
        j++;
      }
    }
    if (j == n) {
      let load = stack.pop();
      if (!load) return 0;
      board[load[0]][load[1]] = 0;
      i = load[0];
      j = load[1] + 1;
    }
    if (stack.length === n) {
      result.push(JSON.parse(JSON.stringify(board)));
      let load = stack.pop();
      if (!load) return 0;
      board[load[0]][load[1]] = 0;
      i = load[0];
      j = load[1] + 1;
    }
  }
}

function checkSingleQueen(board, i, j) {
  for (let k = 0; k < board.length; k++) {
    if (board[i][k] || board[k][j]) {
      return false;
    }
  }
  let n = 0;
  while (
    i - n >= 0 ||
    j - n >= 0 ||
    i + n < board.length ||
    j + n < board.length
  ) {
    if (board[i - n]) {
      if (board[i - n][j - n] || board[i - n][j + n]) return false;
    }
    if (board[i + n]) {
      if (board[i + n][j - n] || board[i + n][j + n]) return false;
    }
    n++;
  }
  return true;
}

/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
  return dfs(n);
  function dfs(n, l = 0, r = 0, c = 0, index = 0) {
    if (index == n) {
      return 1;
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
      let temp = 1 << i;
      if (temp & (l | c | r)) continue;
      ans += dfs(n, (temp | l) << 1, (temp | r) >> 1, temp | c, index + 1);
    }
    return ans;
  }
};

console.log(totalNQueens(15));
