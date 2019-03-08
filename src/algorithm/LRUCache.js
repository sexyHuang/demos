class DLinkedNode {
  constructor(value = null) {
    return {
      key: null,
      value,
      post: null,
      pre: null
    };
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.count = 0;
    this.cacheMap = new Map();
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    linkNodes(this.head, this.tail);
  }
  get(key) {
    const { cacheMap } = this,
      target = cacheMap.get(key);
    if (!target) {
      return -1;
    }
    this._moveTohead(target);
    return target.value;
  }
  put(key, value) {
    const { cacheMap } = this,
      target = cacheMap.get(key);
    if (target) {
      target.value = value;
      this._moveTohead(target);
    } else {
      const new_node = new DLinkedNode(value);
      new_node.key = key;
      cacheMap.set(key, new_node);
      this._addNode(new_node);
    }
    
  }
  _moveTohead(node) {
    if (this.head === node) return;
    this._deleteNode(node);
    this._addNode(node);
  }
  _addNode(node) {
    const { cacheMap, capacity, head } = this;
    this.count++;
    if (this.count > capacity) {
      let _tail = this._popTail();
      cacheMap.delete(_tail.key);
    }
    node.pre = head;
    node.post = head.post;
    head.post.pre = node;
    head.post = node;
  }
  _deleteNode(node) {
    let pre = node.pre,
      post = node.post;
    pre.post = post;
    post.pre = pre;
    this.count--;
  }
  _popTail() {
    let res = this.tail.pre;
    this._deleteNode(res);
    return res;
  }
}

function linkNodes(...nodes) {
  nodes.reduce((prev, curr) => {
    prev && (prev.post = curr);
    curr.pre = prev;
    return curr;
  }, null);
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 返回  1
cache.put(3, 3); // 该操作会使得密钥 2 作废
console.log(cache.get(2)); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
console.log(cache.get(1)); // 返回 -1 (未找到)
console.log(cache.get(3)); // 返回  3
console.log(cache.get(4)); // 返回4

console.log('end');
