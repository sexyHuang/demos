import { privateProxy } from './../../proxys/privateProxy';
import compileUtil from './compileUtil';
import { node2Fragment, isDirective, isEventDirective } from './tools';
let { text, event } = compileUtil;
export default class Complie {
  constructor(el, vm) {
    this._el = this._isElementNode(el) ? el : document.querySelector(el);
    this._vm = vm;
    if (this._el) {
      let fragment = node2Fragment(this._el);
      this._complie(fragment);
      this._el.appendChild(fragment);
    }

    return privateProxy(this);
  }
  _complie(fragment) {
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this._isElementNode(node)) {
        this._complieElement(node);
        this._complie(node);
      } else this._complieText(node);
    });
  }
  _complieElement(node) {
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name;
      let attrArr = attrName.split('-');
      if (!isDirective(attrName) || attrArr.length !== 2) return;
      let expr = attr.value;
      let type = attrArr[1];
      if (isEventDirective(type)) {
        event(node, this._vm, expr, type);
      } else {
        compileUtil[type](node, this._vm, expr);
      }
    });
  }
  _complieText(node) {
    text(node, this._vm);
  }
  _isElementNode(node) {
    return node.nodeType === 1;
  }
}
