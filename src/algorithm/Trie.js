/**
 * @description: 前缀树
 * @param {type} 
 * @return: 
 */
class Trie {
  constructor() {
    this.children = [];
    this.isWord = false;
  }
  insert(word) {
    let curr = this;
    for (let i = 0; i < word.length; i++) {
      let charIndex = word[i].charCodeAt() - 97;
      if (curr.children[charIndex]) {
        curr = curr.children[charIndex];
      } else {
        curr.children[charIndex] = new Trie();
        curr = curr.children[charIndex];
      }
    }
    curr.isWord = true;
  }
  _search(word) {
    let curr = this;
    for (let i = 0; i < word.length; i++) {
      let charIndex = word[i].charCodeAt() - 97;
      if (curr.children[charIndex]) {
        curr = curr.children[charIndex];
      } else {
        return -1;
      }
    }
    return curr.isWord ? 1 : 0;
  }
  search(word) {
    return this._search(word) === 1;
  }
  startsWith(prefix) {
    return this._search(prefix) > -1;
  }
}


class WordDictionary {
  constructor() {
    this.trie = new Trie();
  }
  addWord(word) {
    this.trie.insert(word);
  }
  search(word) {
    let queue = [this.trie];
    for (let i = 0; i < word.length; i++) {
      let charIndex = word[i].charCodeAt() - 97;
      let length = queue.length;
      while (length--) {
        let parent = queue.shift();
        parent.children.map((trie, idx) => {
          if (trie && (idx === charIndex || word[i] === '.')) {
            queue.push(trie);
          }
        });
      }
    }
    return queue.some(val => val.isWord);
  }
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  let trie = new Trie();
  words.map(word => trie.insert(word));
  let list = [];
  for (let i of board.keys()) {
    for (let j of board[0].keys()) {
      find(board, trie, i, j, list);
    }
  }
  return list;
};

function find(board, trie, i, j, list, str = '') {
  const moves = [[0, 1], [1, 0], [-1, 0], [0, -1]];
  if (!board[i] || !board[i][j]) return;
  let charIndex = board[i][j].charCodeAt() - 97;

  if (!trie.children[charIndex]) return;
  str += board[i][j];
  if (trie.children[charIndex].isWord) {
    list.push(str);
    trie.children[charIndex].isWord = false;
  }
  let char = board[i][j];
  board[i][j] = null;
  moves.map(([di, dj]) => {
    find(board, trie.children[charIndex], i + di, j + dj, list, str);
  });
  board[i][j] = char;
}
