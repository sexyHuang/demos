/**
 * 给定一个字符串 S 和一个字符串 T，计算在 S 的子序列中 T 出现的个数。
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
  let s_length = s.length,
    t_length = t.length,
    matrix = new Array(t_length + 1)
      .fill(0)
      .map((_, i) =>
        new Array(s_length + 1).fill(0).map((_, j) => (i === 0 ? 1 : 0))
      );
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      matrix[i][j] =
        matrix[i][j - 1] + (s[j - 1] === t[i - 1] ? matrix[i - 1][j - 1] : 0);
    }
  }
  return matrix[t_length][s_length];
};

function TreeLinkNode(val) {
  this.val = val;
  this.left = this.right = this.next = null;
}
var connect = function(root) {
  if (!root) return;
  let stack = [root];
  while (stack.length) {
    let length = stack.length;
    let i = 0;
    while (i < length - 1) {
      stack[i].next = stack[i + 1];
      i++;
    }
    while (length--) {
      let node = stack.shift();
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }
};

let root = new TreeLinkNode(1);
root.left = new TreeLinkNode(2);
root.right = new TreeLinkNode(3);

connect(root);
console.log(root);
