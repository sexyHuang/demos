/*
 * @Author: Sexy
 * @Date: 2018-11-06 14:30:29
 * @LastEditors: Sexy
 * @LastEditTime: 2018-11-07 15:31:03
 * @Description: 页面元素更新器集合
 */

const textUpdater = (node, value) => {
  node.textContent = typeof value === 'undefined' ? '' : value;
};

const htmlUpdater = (node, value) => {
  node.innerHTML = typeof value === 'undefined' ? '' : value;
};

const classUpdater = (node, value) => {
  if (!value) return;
  node.className = Array.from(getClasses(value)).join(' ');
};

function getClasses(value, classSet = new Set()) {
  if (typeof value === 'string') return classSet.add(value);
  else if (Array.isArray(value)) {
    value = value.slice();
    let newClassSet = getClasses(value.shift(), classSet);
    if (value.length > 0) return getClasses(value, newClassSet);
    else return newClassSet;
  } else if (typeof value === 'object') {
    for (let [key, val] of Object.entries(value)) {
      if (val) {
        classSet.add(key);
      }
    }
    return classSet;
  }
}

const modelUpdater = (node, value) => {
  node.value = typeof value === 'undefined' ? '' : value;
};

export default {
  textUpdater,
  htmlUpdater,
  classUpdater,
  modelUpdater
};
