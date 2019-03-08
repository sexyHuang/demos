/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function createListNodeByArray(arr) {
  let head = new ListNode(0),
    curr = head;
  arr.map(val => {
    curr.next = new ListNode(val);
    curr = curr.next;
  });
  return head.next;
}
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
  let _list_node = new ListNode(x - 1);
  _list_node.next = head;
  let big_pointer = _list_node,
    small_pointer = head;
  while (true) {
    while (big_pointer.next && big_pointer.next.val < x) {
      big_pointer = big_pointer.next;
    }
    while (
      small_pointer.next &&
      (small_pointer.val < x || small_pointer.next.val >= x)
    ) {
      small_pointer = small_pointer.next;
    }
    if (!big_pointer.next || !small_pointer.next) break;
    let next = small_pointer.next;
    small_pointer.next = next.next;
    next.next = big_pointer.next;
    big_pointer.next = next;
  }
  return _list_node.next;
};

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
  if (s1 === s2) return true;
  if (
    s1.length !== s2.length ||
    s1
      .split('')
      .sort()
      .join('') !==
      s2
        .split('')
        .sort()
        .join('')
  )
    return false;
  for (let i = 1; i < s1.length; i++) {
    let left_1 = s1.substring(0, i),
      right_1 = s1.substring(i),
      left_2 = s2.substring(0, i),
      right_2 = s2.substring(i);
    if (isScramble(left_1, left_2) && isScramble(right_1, right_2)) return true;
    left_2 = s2.substring(s1.length - i);
    right_2 = s2.substring(0, s1.length - i);
    if (isScramble(left_1, left_2) && isScramble(right_1, right_2)) return true;
  }
  return false;
};

/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n, k = 1, result = [0, 1]) {
  let length = 2 ** n;
  if (n > 1) {
    result.push(
      ...result
        .slice()
        .reverse()
        .map(val => val + 2 ** k)
    );
    if (k < n) {
      grayCode(n, k + 1, result);
    }
  }
  result.length = length;
  return result;
};

/*
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
  let results = [];
  for (let k = 0; k <= nums.length; k++) {
    helper(nums, k, results);
  }

  return results;
};

function helper(arr, k, results, result = [], end = arr.length - 1) {
  if (k == 0) {
    results.push(result);
    return;
  }

  for (let i = end; i >= 0; i--) {
    if (i < end && arr[i] === arr[i + 1]) continue;
    helper(arr, k - 1, results, [...result, arr[i]], i - 1);
  }
}

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s, n = 0) {
  let map = new Array(s.length).fill(0);
  if (s[s.length - 1] !== '0') map[s.length - 1] = 1;
  for (let i = s.length - 2; i >= 0; i--) {
    let a = s[i] === '0' ? 0 : 1,
      b = `${s[i]}${s[i + 1]}` * 1 > 26 ? 0 : 1;
    if (!a) continue;
    if (i === s.length - 2) {
      map[i] = a * map[i + 1] + b;
    } else map[i] = map[i + 1] + map[i + 2] * b;
  }
  return map[0];
};
var reverseBetween = function(head, m, n) {
  let _list_node = new ListNode(0);
  _list_node.next = head;
  let start = _list_node,
    _head = head,
    curr = head,
    next = curr.next,
    count = 1;
  while (count < m) {
    start = start.next;
    _head = _head.next;
    curr = _head;
    next = curr.next;
    count++;
  }
  while (count < n) {
    curr.next = next.next;
    next.next = _head;
    _head = next;
    start.next = _head;
    next = curr.next;
    count++;
  }
  return _list_node.next;
};
let count = 0;
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  let results = [];
  if (s.length < 4 || s.length > 12) return results;
  helper(s, results);
  return results;
  function helper(s, results, k = 0, result = '') {
    if (k == 4 && s.length == 0) {
      results.push(result.slice(0, -1));
      return;
    }
    if (result === '172.162.') {
      console.log('stop');
    }
    for (let i = 1; i <= Math.min(3, s.length); i++) {
      if (s[0] == 0 && i > 1) return;
      let dig3 = s.slice(0, 3);
      if (dig3 > 255 && i == 3) return;
      helper(s.slice(i), results, k + 1, `${result}${s.slice(0, i)}.`);
    }
    /* if (s.slice(1).length <= (4 - k - 1) * 3)
      helper(s.slice(1), results, k + 1, `${result}${s[0]}.`);
    if (s[0] == 0) return;
    if (s.slice(2).length <= (4 - k - 1) * 3)
      helper(s.slice(2), results, k + 1, `${result}${s.slice(0, 2)}.`);
    if (s.length < 3) return;
    let dig3 = s.slice(0, 3);

    if (dig3 < 256) helper(s.slice(3), results, k + 1, `${result}${dig3}.`); */
  }
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
var generateTrees = function(n) {
  let cache = {};
  return helper(n);
  function helper(n, base = 0) {
    if (n == 0) return [null];
    if (cache[`${n}-${base}`]) return cache[`${n}-${base}`];
    let current = [];
    for (const key of Array(n).keys()) {
      let leftArray = helper(key, base),
        rightArray = helper(n - key - 1, key + base + 1);
      for (let left of leftArray) {
        for (let right of rightArray) {
          let root = new TreeNode(key + base + 1);
          root.left = left;
          root.right = right;
          current.push(root);
        }
      }
    }
    cache[`${n}-${base}`] = current;
    return current;
  }
};
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  let result = new TreeNode(0);
  helper(preorder, inorder, result);
  function helper(preorder, inorder, root, node_side = 'left') {
    let node_val = preorder.shift(),
      idx = inorder.indexOf(node_val);
    if (idx < 0) return;
    root[node_side] = new TreeNode(node_val);
    if (idx > 0)
      helper(
        preorder.slice(0, idx),
        inorder.slice(0, idx),
        root[node_side],
        'left'
      );
    if (idx < preorder.length)
      helper(
        preorder.slice(idx),
        inorder.slice(idx + 1),
        root[node_side],
        'right'
      );
  }
  return result.left;
};

/**
 * 中序遍历 inorder = [9,3,15,20,7]
 * 后序遍历 postorder = [9,15,7,20,3]
 * @param {*} inorder
 * @param {*} postorder
 */
var buildTreeByinAndPost = function(inorder, postorder) {
  let result = new TreeNode(0);
  helper(postorder, inorder, result);
  function helper(postorder, inorder, root, node_side = 'left') {
    let node_val = postorder.pop(),
      idx = inorder.indexOf(node_val);
    if (idx < 0) return;
    root[node_side] = new TreeNode(node_val);
    if (idx > 0) {
      helper(
        postorder.slice(0, idx),
        inorder.slice(0, idx),
        root[node_side],
        'left'
      );
    }
    if (idx < postorder.length)
      helper(
        postorder.slice(idx),
        inorder.slice(idx + 1),
        root[node_side],
        'right'
      );
  }
  return result.left;
};

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  if (!head) return null;
  let listNode = new ListNode(0);
  listNode.next = head;
  let slow = listNode,
    quick = head;
  while (quick.next) {
    quick = quick.next;
    if (quick.next) quick = quick.next;
    slow = slow.next;
  }
  let node = new TreeNode(slow.next.val);
  node.right = sortedListToBST(slow.next.next);
  slow.next = null;
  node.left = sortedListToBST(listNode.next);
  return node;
};

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  let row = [1, 1];
  let i = 2;
  while (i <= rowIndex) {
    let middle = Math.ceil((row.length - 1) / 2);
    for (let j = 0; j <= middle; j++) {
      row[j] += row[j - 1] || 0;
    }
    row.length = middle + 1;
    if ((i + 1) % 2 === 0) {
      row.push(...row.slice().reverse());
    } else row.push(...row.slice(0, -1).reverse());
    i++;
  }
  row.length = rowIndex + 1;
  return row;
};

var minimumTotal = function(triangle) {
  for (let row = triangle.length - 1; row > 0; row--) {
    for (let col = 0; col < triangle[row].length - 1; col++) {
      triangle[row - 1][col] += Math.min(
        triangle[row][col],
        triangle[row][col + 1]
      );
    }
  }
  return triangle[0][0];
};

var maxProfit = function(prices) {
  let length = prices.length,
    profits1 = new Array(length).fill(0),
    profits2 = new Array(length).fill(0),
    maxProfit = 0;
  min = prices[0];
  max = prices[length - 1];
  for (let i = 1; i < prices.length; i++) {
    let j = length - 1 - i;
    profits1[i] = Math.max(profits1[i - 1], prices[i] - min);
    if (prices[i] < min) {
      min = prices[i];
    }
    profits2[j] = Math.max(profits2[j + 1], max - prices[j]);
    if (prices[j] > max) {
      max = prices[j];
    }
  }
  for (let i = 1; i < prices.length; i++) {
    maxProfit = Math.max(profits1[i] + profits2[i], maxProfit);
  }
  return maxProfit;
};
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let left = 0,
    right = s.length - 1,
    reg = /[^A-Za-z0-9]/;
  while (left < right) {
    if (reg.test(s[left])) {
      left++;
      continue;
    }

    if (reg.test(s[right])) {
      right--;
      continue;
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
};
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function(beginWord, endWord, wordList) {
  const chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const wordSet = new Set(wordList);
  const used = new Set();
  const tree = { val: beginWord, parent: null };
  const result = [];
  let siblings = [tree],
    stop = false;
  if (!wordSet.has(endWord)) return result;
  while (!stop && siblings.length) {
    let length = siblings.length;
    while (length--) {
      let node = siblings.shift();
      for (let word of nextChangeWord(node.val, wordSet)) {
        if (word === 'dot') {
          console.log('stop');
        }
        if (used.has(word)) continue;
        let new_node = {
          val: word,
          parent: node
        };
        if (word === endWord) stop = true;
        siblings.push(new_node);
      }
    }
    siblings.map(node => used.add(node.val));
  }
  siblings.map(({ val, parent }) => {
    if (val !== endWord) return;
    let res = [val];
    while (parent) {
      res.unshift(parent.val);
      parent = parent.parent;
    }
    result.push(res);
  });
  return result;
  function nextChangeWord(word, wordSet) {
    let res = [];
    for (let i = 0; i < word.length; i++) {
      for (let char of chars) {
        if (char === word[i]) continue;
        let new_word = `${word.slice(0, i)}${char}${word.slice(i + 1)}`;
        if (wordSet.has(new_word)) res.push(new_word);
      }
    }
    return res;
  }
};
/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function(n) {
  let temp = n ^ (n >> 1);
  return !(temp & (temp + 1));
};
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function(s) {
  if (s.length <= 10) return [];
  let list = new Set(),
    result = new Set();
  for (let i = 0; i < s.length - 9; i++) {
    let cur = s.substr(i, 10);
    if (list.has(cur)) result.add(cur);
    else list.add(cur);
  }
  return [...result];
};
var reverseBits = function(n) {
  let m = '';
  for (let i = 0; i < 32; i++) {
    m += n % 2;
    n = 0 | (n / 2);
  }

  return parseInt(m, 2);
};

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  if (board.length < 3 || board[0].length < 3) return;
  const TARGET = 'O',
    BLOCK = 'X',
    PLACEHOLDER = '_';
  let di = 0,
    dj = 1,
    i = 0,
    j = 0;
  do {
    if (i === 2 && j === 0) {
      console.log('stop');
    }
    dfs(board, i, j);
    if (!board[i + di] || !board[i + di][j + dj]) [di, dj] = [dj, -di];
    i += di;
    j += dj;
  } while (i !== 0 || j !== 0);
  for (let i of board.keys()) {
    for (let j of board.keys()) {
      if (board[i][j] === TARGET) board[i][j] = BLOCK;
      else if (board[i][j] === PLACEHOLDER) board[i][j] = TARGET;
    }
  }
  function dfs(board, i, j) {
    const FOUR_DIRECTION = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    try {
      if (!board[i] || board[i][j] !== TARGET) return;
    } catch (e) {
      console.log(i, j);
    }

    board[i][j] = PLACEHOLDER;
    for (let [di, dj] of FOUR_DIRECTION) {
      dfs(board, i + di, j + dj);
    }
  }
};
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  let results = [];
  dfs(s);
  return results;
  function dfs(s, result = []) {
    if (s.length <= 0) {
      results.push(result);
      return;
    }
    let normal = '',
      reverse = '';
    for (let i = 0; i < s.length; i++) {
      normal += s[i];
      reverse = s[i] + reverse;
      if (normal === reverse) {
        dfs(s.slice(i + 1), [...result, normal]);
      }
    }
  }
};
/**
 * @param {string} s
 * @return {number}
 * @description: 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。
 * 返回符合要求的最少分割次数。
 * 解法：
 *     dp[i]保存s的前i个字符串最小分割次数；
 *     matrix[i][j]表示ds[i,j]是否为回文；
 *     遍历s,i为index;
 *     循环中遍历ds[0,i],j为index;
 *     当s[i] == s[j] 且 i和j中没有其他字符或者ds[i-1,j+1]是回文时，ds[i,j]是回文，dp[i]等于dp[j-1]+1与dp[i]中的较小值。
 */
var minCut = function(s) {
  const DP = new Array(s.length).fill(s.length),
    MATRIX = new Array(s.length)
      .fill(0)
      .map(() => new Array(s.length).fill(false));
  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (s[i] === s[j] && (i - j < 2 || MATRIX[i - 1][j + 1])) {
        DP[i] = j == 0 ? 0 : Math.min(DP[i], DP[j - 1] + 1);
        MATRIX[i][j] = true;
      }
    }
  }
  return DP[s.length - 1];
};

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
  let remain = gas[0] - cost[0],
    start = 0,
    curr = 0;
  while (true) {
    while (remain < 0) {
      start++;
      if (start >= gas.length) return -1;
      remain = gas[start] - cost[start];
    }
    curr = start === gas.length - 1 ? 0 : start + 1;
    while (remain >= 0) {
      if (curr === start) {
        return start;
      }
      remain += gas[curr] - cost[curr];
      curr = curr === gas.length - 1 ? 0 : curr + 1;
    }
  }
};
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
  let result = new Array(ratings.length).fill(0);
  for (let i of ratings.keys()) {
    help(ratings, i);
  }
  return result.reduce((prev, curr) => prev + curr, 0);
  function help(ratings, i) {
    let left = i - 1,
      right = i + 1;
    if (
      (left < 0 || ratings[left] >= ratings[i]) &&
      (right > ratings.length - 1 || ratings[right] >= ratings[i])
    ) {
      result[i] = 1;

      while (left >= 0 && ratings[left] >= ratings[left + 1]) {
        let val =
          ratings[left] === ratings[left + 1] ? 1 : result[left + 1] + 1;
        result[left] = Math.max(result[left], val);
        left--;
      }
      while (
        right <= ratings.length - 1 &&
        ratings[right] >= ratings[right - 1]
      ) {
        let val =
          ratings[right] === ratings[right - 1] ? 1 : result[right - 1] + 1;
        result[right] = Math.max(result[right], val);
        right++;
      }
    }
  }
};

var wordBreak = function(s, wordDict) {
  let results = [];
  helper(s, wordDict);
  return results;
  function helper(s, wordDict, result = '') {
    if (!s.length) results.push(result.trim());
    for (let i = 1; i <= s.length; i++) {
      let temp = s.slice(0, i);
      if (wordDict.includes(temp)) {
        helper(s.slice(i), wordDict, `${result}${temp} `);
      }
    }
  }
};
var reorderList = function(head) {
  if (!head || !head.next || !head.next.next) return;
  let fast = head,
    slow = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let head_2 = slow.next;
  slow.next = null;
  head_2 = reverseNodeList(head_2);
  let pointer = head,
    pointer_2 = head_2;
  while (pointer && pointer_2) {
    let next1 = pointer.next,
      next2 = pointer_2.next;
    pointer_2.next = null;
    pointer.next = pointer_2;
    pointer_2.next = next1;
    pointer_2 = next2;
    pointer = next1;
  }
};

function reverseNodeList(head) {
  let prev = null,
    curr = head,
    next = head;
  while (curr) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
var postorderTraversal = function(root) {
  if (!root) return [];
  let stack = [root],
    result = [],
    prev = null;
  while (stack.length) {
    let tar = stack[stack.length - 1];
    if (
      (!tar.left && !tar.right) ||
      (prev != null && (tar.left === prev || tar.right === prev))
    ) {
      result.push(tar.val);
      prev = stack.pop();
      continue;
    }

    tar.right && stack.push(tar.right);
    tar.left && stack.push(tar.left);
  }
  return result;
};

let root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4
    },
    right: {
      val: 5
    }
  },
  right: {
    val: 3,
    left: {
      val: 6
    },
    right: {
      val: 7
    }
  }
};

var insertionSortList = function(head) {
  let res = new ListNode(-Infinity);
  let node = head;
  while (node) {
    let next = node.next;
    help(res, node);
    node = next;
  }
  return res.next;

  function help(res, node) {
    let pointer = res,
      pointer_2 = res.next;
    while (pointer_2 && pointer_2.val < node.val) {
      pointer = pointer.next;
      pointer_2 = pointer_2.next;
    }
    pointer.next = node;
    node.next = pointer_2;
  }
};
let head = createListNodeByArray([1, -2, 3, -4, 5, -6, 100]);

function getNodeListMiddlePointer(head) {
  let slow = head,
    fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

function MergeSort(left) {
  if (left && left.next) {
    let mid = getNodeListMiddlePointer(left);
    let right = mid.next;
    mid.next = null;
    return Merge(MergeSort(left), MergeSort(right));
  }
  return left;
}

function Merge(left, right) {
  let res = new ListNode(0),
    curr = res,
    left_pointer = left,
    right_pointer = right;
  while (left_pointer && right_pointer) {
    if (left_pointer.val < right_pointer.val) {
      curr.next = left_pointer;
      left_pointer = left_pointer.next;
    } else {
      curr.next = right_pointer;
      right_pointer = right_pointer.next;
    }
    curr = curr.next;
  }
  curr.next = left_pointer || right_pointer;
  return res.next;
}

var maxPoints = function(points) {
  let map = new Map();
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let [x0, y0] = points[i],
        [x1, y1] = points[j],
        k = (y1 - y0) / (x1 - x0),
        b = x1 - x0 === 0 ? x0 : y0 - k * x0;
      let key = `${k},${b}`;
      if (map.has(key)) {
        let set = map.get(key);
        set.add(points[i]);
        set.add(points[j]);
      } else {
        map.set(key, new Set([points[i], points[j]]));
      }
    }
  }
  return Math.max(...[...map.values()].map(val => val.size));
};

var maxProduct = function(nums) {
  let max = -Infinity;
  nums.map((_, idx) => {
    max = Math.max(max, helper(nums, idx));
  });
  return max;
  function helper(nums, start = 0) {
    let products = [nums[start]];
    for (let i = start + 1; i < nums.length; i++) {
      products.push(products[products.length - 1] * nums[i]);
    }

    return Math.max(...products);
  }
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
  return helper(nums);
  function helper(nums, start = 0, end = nums.length) {
    let middle = ((start + end) / 2) | 0;
    if (nums[middle] < nums[middle + 1]) return helper(nums, middle + 1, end);
    if (nums[middle] < nums[middle - 1]) return helper(nums, start, middle);
    return nums[middle];
  }
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
  return HeapSort(nums);
  function HeapSort(array) {
    createMaxHeap(array);
    //let result = [].push(array[0]);
    let max = 0;
    for (let i = array.length - 1; i >= 0; i--) {
      if (i < array.length - 1) max = Math.max(array[i + 1] - array[0], max);
      [array[i], array[0]] = [array[0], array[i]];
      heapify(array, 0, i - 1);
    }
    return max;
  }

  function heapify(array, startIdx = 0, endIdx = array.length - 1) {
    let son = startIdx * 2 + 1;
    if (son > endIdx) return;
    if (son + 1 <= endIdx && array[son + 1] > array[son]) {
      son++;
    }
    if (array[startIdx] <= array[son]) {
      [array[startIdx], array[son]] = [array[son], array[startIdx]];
      heapify(array, son, endIdx);
    }
  }

  function createMaxHeap(array) {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
      heapify(array, i, array.length - 1);
    }
    return array;
  }
};
var compareVersion = function(version1, version2) {
  let v1 = version1.split('.'),
    v2 = version2.split('.'),
    maxLength = Math.max(v2.length, v1.length);
  for (let i = 0; i <= maxLength; i++) {
    if (i === maxLength) return 0;
    let _v1 = v1[i] || 0,
      _v2 = v2[i] || 0;
    if (_v1 > _v2) return 1;
    if (_v1 < _v2) return -1;
  }
};

var fractionToDecimal = function(numerator, denominator) {
  if (!denominator) return NaN;
  if (!numerator) return '0';
  let f = (numerator < 0) ^ (denominator < 0) ? '-' : '';
  numerator = Math.abs(numerator);
  denominator = Math.abs(denominator);
  let first = numerator > denominator ? parseInt(numerator / denominator) : 0,
    mod = numerator % denominator,
    mod_list = new Map();
  if (!mod) return f + first + '';
  return `${f}${first}.${helper(mod * 10, denominator)}`;
  function helper(numerator, denominator, result = '') {
    if (!numerator) return result;
    if (mod_list.has(numerator)) {
      let idx = mod_list.get(numerator);
      return result.slice(0, idx) + '(' + result.slice(idx) + ')';
    }
    mod_list.set(numerator, result.length);
    if (numerator >= denominator) {
      result += (numerator / denominator) | 0;
      return helper((numerator % denominator) * 10, denominator, result);
    } else {
      result += '0';
      return helper(numerator * 10, denominator, result);
    }
  }
};

var convertToTitle = function(n) {
  let result = '';
  while (n) {
    n--;
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = parseInt(n / 26);
  }
  return result;
};

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
  let m = dungeon.length,
    n = dungeon[0].length,
    martix = new Array(m + 1).fill(0).map((_, i) =>
      new Array(n + 1).fill(1).map((_, j) => {
        if ((i == m || j == n) && i !== m - 1 && j != n - 1) return Infinity;
        return 1;
      })
    );
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      martix[i][j] = Math.max(
        1,
        Math.min(martix[i + 1][j], martix[i][j + 1]) - dungeon[i][j]
      );
    }
  }
  return martix[0][0];
};

var maxProfit = function(k, prices) {
  if (k === 1) return 0;
  if (k >= prices.length / 2) return greedy(prices);
  let dp = new Array(k).fill(0).map(() => [-Infinity, -Infinity]);
  prices.map(val => {
    dp[0][0] = Math.max(dp[0][0], -val);
    dp[0][1] = Math.max(dp[0][1], dp[0][0] + val);
    for (let i = 1; i < k; i++) {
      dp[i][0] = Math.max(dp[i][0], dp[i - 1][1] - val);
      dp[i][1] = Math.max(dp[i][1], dp[i][0] + val);
    }
  });
  return dp.pop().pop();
  function greedy(prices) {
    let length = prices.length,
      profits1 = new Array(length).fill(0),
      profits2 = new Array(length).fill(0),
      maxProfit = 0;
    min = prices[0];
    max = prices[length - 1];
    for (let i = 1; i < prices.length; i++) {
      let j = length - 1 - i;
      profits1[i] = Math.max(profits1[i - 1], prices[i] - min);
      if (prices[i] < min) {
        min = prices[i];
      }
      profits2[j] = Math.max(profits2[j + 1], max - prices[j]);
      if (prices[j] > max) {
        max = prices[j];
      }
    }
    for (let i = 1; i < prices.length; i++) {
      maxProfit = Math.max(profits1[i] + profits2[i], maxProfit);
    }
    return maxProfit;
  }
};

var hammingWeight = function(n) {
  let mod = 0xffffffff;
  let Map = {
    1: '0xAAAAAAAA',
    2: '0xCCCCCCCC',
    4: '0xF0F0F0F0',
    8: '0xFF00FF00'
  };
  for (let [key, val] of Object.entries(Map)) {
    let _val = val ^ mod;
    n = ((n & val) >>> key) + (n & _val);
  }
  n = (n >>> 16) + (n & 0x0000ffff);
  return n;
};
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var rangeBitwiseAnd = function(m, n) {
  let digit = 0;
  while (m != n) {
    m = m >> 1;
    n = n >> 1;
    digit++;
  }
  return m << digit;
};

var countPrimes = function(n) {
  let isprime = new Array(n).fill(1),
    count = new Array(n).fill(0);
  isprime[0] = 0;
  for (let i = 1; i < n; i++) {
    if (isprime[i]) {
      count[i] = count[i - 1] + 1;
      let k = i + 1;
      while (k * (i + 1) <= n) {
        isprime[k * (i + 1) - 1] = 0;
        k++;
      }
    } else count[i] = count[i - 1];
  }
  return count.pop();
};
var canFinish = function(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0),
    adjacencyList = new Array(numCourses).fill(0).map(() => []),
    pointSet = new Set();

  prerequisites.map(val => {
    inDegree[val[1]]++;
    adjacencyList[val[0]].push(val[1]);
  });
  let zeroIns = inDegree.reduce((prev, curr, currIdx) => {
    !curr && prev.push(currIdx);
    return prev;
  }, []);
  while (zeroIns.length > 0) {
    let curr = zeroIns.shift();
    pointSet.add(curr);
    for (let child of adjacencyList[curr]) {
      inDegree[child]--;
      if (inDegree[child] === 0) {
        zeroIns.push(child);
      }
    }
  }
  return pointSet.size === numCourses ? [...pointSet] : [];
};
var minSubArrayLen = function(s, nums) {
  let left = 0,
    right = 1,
    sum = nums[0],
    min = nums.length + 1;
  nums.push(-Infinity);
  if (sum >= s) return 1;
  while (right < nums.length) {
    if (sum >= s) {
      min = Math.min(right - left, min);
      sum -= nums[left];
      left++;
    } else {
      sum += nums[right];
      right++;
    }
    if (min === 1) return min;
  }
  return min === nums.length ? 0 : min;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  return help(nums);
  function help(nums, start = 0, end = nums.length - 1) {
    const start_val = nums[start],
      end_val = nums[end];
    if (start_val < end_val) return start_val;
    if (end - start < 2) return end_val;
    let middle = ((start + end) / 2) | 0,
      middle_val = nums[middle];
    if (middle_val > end_val) {
      return help(nums, middle, end);
    } else {
      return help(nums, start, middle);
    }
  }
};

var findMin_2 = function(nums) {
  return help(nums);
  function help(nums, start = 0, end = nums.length - 1) {
    const start_val = nums[start],
      end_val = nums[end];
  }
};

var shortestPalindrome = function(s) {
  let max_right_pointer = longestPalindrome(s);
  let remains = s.slice(max_right_pointer);
  return (
    remains
      .split('')
      .reverse()
      .join('') + s
  );
  function longestPalindrome(s) {
    for (let idx = 0 | ((s.length - 1) / 2); idx >= 0; idx--) {
      let left_pointer = idx - 1,
        right_pointer = idx + 1;
      while (s[idx] === s[left_pointer]) left_pointer--;
      while (s[idx] === s[right_pointer]) right_pointer++;
      while ((s[left_pointer] || NaN) === (s[right_pointer] || NaN)) {
        left_pointer--;
        right_pointer++;
      }
      if (left_pointer === -1) return right_pointer;
    }
  }
};
function longestPalindrome(s) {
  for (let idx = 0 | ((s.length - 1) / 2); idx >= 0; idx--) {
    let left_pointer = idx - 1,
      right_pointer = idx + 1;
    while (s[idx] === s[left_pointer]) left_pointer--;
    while (s[idx] === s[right_pointer]) right_pointer++;
    while ((s[left_pointer] || NaN) === (s[right_pointer] || NaN)) {
      left_pointer--;
      right_pointer++;
    }
    if (left_pointer === -1) return right_pointer;
  }
}

var combinationSum3 = function(k, n) {
  let ress = [];
  help(n, k, ress);
  return ress;
  function help(n, d, ress, res = [], start = 1) {
    if (d > 9 - start + 1) {
      return;
    }

    if (d == 0) {
      if (n == 0) ress.push(res.slice());
      return;
    }
    for (let i = start; i <= n; i++) {
      res.push(i);
      help(n - i, d - 1, ress, res, i + 1);
      res.pop();
    }
  }
};

var containsNearbyDuplicate = function(nums, k) {
  let map = {};
  return nums.some((val, idx) => {
    if (map[val] && idx + 1 - map[val] <= k) {
      return true;
    } else {
      map[val] = idx + 1;
      return false;
    }
  });
};

var lowestCommonAncestor = function(root, p, q) {
  let [b_node, s_node] = p.val > q.val ? [p, q] : [q, p];
  return helper(root);
  function helper(root) {
    if (
      root.val == s_node.val ||
      root.val == b_node.val ||
      (root.val > s_node.val && root.val < b_node.val)
    )
      return root;

    if (root.val < s_node.val) {
      return helper(root.right);
    } else return helper(root.left);
  }
};
let root2 = {
  val: 6,
  left: {
    val: 2,
    left: {
      val: 0
    },
    right: {
      val: 4,
      left: {
        val: 3
      },
      right: {
        val: 5
      }
    }
  },
  right: {
    val: 8,
    left: {
      val: 7
    },
    right: {
      val: 9
    }
  }
};
var countDigitOne = function(n) {
  let [num, sum, digit] = [n, 0, 1];
  while (num) {
    sum += (0 | (num / 10)) * digit;
    if (num % 10 == 1) {
      sum += (n % digit) + 1;
    }
    if (num % 10 > 1) {
      sum += digit;
    }
    digit *= 10;
    num = 0 | (num / 10);
  }
  return sum;
};
/**
 * @param {string} s
 * @return {number}
 * @description: 正反序检测有效子串，有效检测：两符号各为1/-1，当sum为0是记录子串长度，当小于零时记录最大值并初始化。
 */
var longestValidParentheses = function(s) {
  return Math.max(calc(), calc(')', s.length - 1, -1, -1));

  function calc(beginStr = '(', start = 0, end = s.length, step = 1) {
    let [sum, validLen, currLen, max] = [0, 0, 0, 0];
    for (let i = start; i != end; i += step) {
      currLen++;
      sum += s[i] === beginStr ? 1 : -1;
      if (sum < 0) {
        max = Math.max(max, validLen);
        validLen = 0;
        currLen = 0;
        sum = 0;
      } else if (sum == 0) {
        validLen = currLen;
      }
    }
    max = Math.max(max, validLen);
    return max;
  }
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 *
 */
var minDistance = function(word1, word2) {
  let [w1_len, w2_len] = [word1.length, word2.length],
    dp = new Array(w2_len + 1)
      .fill(0)
      .map((_, i) => new Array(w1_len + 1).fill(0).map((_, j) => i || j));
  for (let i of dp.keys()) {
    for (let j of dp[0].keys()) {
      if (i == 0 || j == 0) continue;
      dp[i][j] = Math.min(
        dp[i][j - 1] + 1,
        dp[i - 1][j] + 1,
        dp[i - 1][j - 1] + (word1[j - 1] === word2[i - 1] ? 0 : 1)
      );
    }
  }
  return dp.pop().pop();
};

function largestRectangleArea(heights) {
  let stack = [],
    max = 0;
  for (let i of heights.keys()) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
      let j = stack.pop();
      let k = stack.length ? stack[stack.length - 1] : -1;
      max = Math.max(max, (i - k - 1) * heights[j]);
    }
    stack.push(i);
  }
  let h_len = heights.length;
  while (stack.length) {
    let j = stack.pop();
    let k = stack.length ? stack[stack.length - 1] : -1;
    max = Math.max(max, (h_len - k - 1) * heights[j]);
  }
  return max;
}

function maximalRectangle(matrix) {
  let heights = new Array(matrix[0].length).fill(0),
    max = 0;
  for (let i of matrix.keys()) {
    for (let j of matrix[0].keys()) {
      if (matrix[i][j] === '1') {
        heights[j]++;
      } else heights[j] = 0;
    }
    max = Math.max(max, largestRectangleArea(heights));
  }
  return max;
}

minCut('aab');