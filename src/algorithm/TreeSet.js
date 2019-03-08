class TreeSet {
  constructor(val) {
    this.size = 0;
    this.left = this.right = null;

    if (val !== undefined) {
      this.value = val;
      this.size = 1;
    }
  }
  add(val) {
    if (val === undefined) return false;
    /*   if (this.size === 0) {
      this.value = val;
      this.size++;
      return true;
    } */
    let _value = this.value;
    if (_value == val) return false;
    let key = 'left';
    if (_value < val) {
      key = 'right';
    }
    this.size++;
    if (this[key]) {
      return this[key].add(val);
    }
    this[key] = new TreeSet(val);
    return true;
  }
  remove(val, b_node, b_node_key = 'left') {
    if (this.value == val) {
      let left_node = this.left,
        right_node = this.right,
        pointer = right_node;
      while (pointer) {
        if (pointer.left) {
          pointer = pointer.left;
        } else {
          pointer.left = left_node;
          break;
        }
      }

      b_node[b_node_key] = right_node || left_node;
      return true;
    }
    let key = 'left';
    if (this.value < val) {
      key = 'right';
    }
    if (this[key]) {
      let flag;
      flag = this[key].remove(val, this, key);
      if (flag) this.size--;
      return flag;
    } else {
      return false;
    }
  }
  ceiling(val) {
    if (this.value == val) return this.value;
    if (this.value === undefined)
      return this.left ? this.left.ceiling(val) : null;
    if (this.value > val) {
      return this.left && this.left.value >= val
        ? this.left.ceiling(val)
        : this.value;
    } else {
      return this.right ? this.right.ceiling(val) : null;
    }
  }
}

var containsNearbyAlmostDuplicate = function(nums, k, t) {
  let set = new TreeSet();
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (
      set.ceiling(nums[i] - t) !== null &&
      set.ceiling(nums[i] - t) <= nums[i] + t
    )
      return true;
    set.add(nums[i]);
    count++;
    if (count > k) {
      set.remove(nums[i - k]);
      count--;
    }
  }
  return false;
};
console.log(containsNearbyAlmostDuplicate([10, 15, 18, 24], 3, 3));
console.log('stop');
