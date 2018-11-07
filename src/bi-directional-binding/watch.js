import { getVal } from './common';
import Dep from './dep';
const VM = Symbol('vm'),
  EXPR = Symbol('expr'),
  CB = Symbol('cb'),
  VALUE = Symbol('value'),
  DEP_IDS = Symbol('depIds'),
  NEW_DEPS_IDS = Symbol('new_deps_ids'),
  DEPS = Symbol('deps'),
  NEW_DEPS = Symbol('new_deps');
export default class Watch {
  constructor(vm, expr, cb) {
    this[VM] = vm;
    this[EXPR] = expr;
    this[CB] = cb;
    this[DEP_IDS] = new Set();
    this[NEW_DEPS_IDS] = new Set();
    this[DEPS] = [];
    this[NEW_DEPS] = [];
    this[VALUE] = this.get(vm, expr);
  }
  update() {
    const newValue = this.get(this[VM], this[EXPR]);
    const oldValue = this[VALUE];
    if (newValue !== oldValue) {
      this[VALUE] = newValue;
      this[CB](newValue);
    }
  }
  /**
   * @msg: 将自身添加到指定的订阅类内
   * @param {dep}
   * @return: null
   */
  addDep(dep) {
    const id = dep.id;
    if (this[NEW_DEPS_IDS].has(id)) return;
    this[NEW_DEPS_IDS].add(id);
    this[NEW_DEPS].push(dep);
    if (!this[DEP_IDS].has(id)) dep.addSub(this);
  }
  cleanupDeps() {
    let i = this[DEPS].length;
    while (i--) {
      const dep = this[DEPS][i];
      if (!this[NEW_DEPS_IDS].has(dep.id)) dep.removeSub(this);
    }
    [this[DEPS], this[NEW_DEPS]] = [this[NEW_DEPS], this[DEPS]];
    this[NEW_DEPS].length = 0;
    [this[DEP_IDS], this[NEW_DEPS_IDS]] = [this[NEW_DEPS_IDS], this[DEP_IDS]];
    this[NEW_DEPS_IDS].clear();
  }
  get(vm, expr) {
    Dep.target = this;
    const val = getVal(vm.$data, expr);
    Dep.target = null;
    this.cleanupDeps();
    return val;
  }
}
