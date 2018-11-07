//订阅类唯一ID
let _id = 0;

const SUBS = Symbol('sub');

export default class Dep {
  constructor() {
    this.id = _id++;
    this[SUBS] = [];
  }

  /**
   * @msg: 添加watcher
   * @param {watcher}
   * @return: null
   */
  addSub(watcher) {
    !this[SUBS].includes(watcher) && this[SUBS].push(watcher);
  }
  depend() {
    Dep.target.addDep(this);
  }
  removeSub(watcher) {
    const index = this[SUBS].indexOf(watcher);
    index > 0 && this[SUBS].splice(index, 1);
  }

  notify() {
    this[SUBS].map(val => {
      val.update();
    });
  }
}

Dep.target = null;
