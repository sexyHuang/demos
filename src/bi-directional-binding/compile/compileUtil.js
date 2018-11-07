import Updater from './../updater';

import Watch from './../watch';

const text = (node, vm) => {
  let expr = node.textContent;
  let reg = /\{\{([^}]+)\}\}/g;
  if (!reg.test(expr)) return;
  let updater = Updater.textUpdater;
  let value = getValByReg(vm.$data, expr, reg);
  if (!updater) return;
  expr.replace(reg, (...args) => {
    new Watch(vm, args[1], () => {
      updater(node, getValByReg(vm.$data, expr, reg));
    });
  });
  updater(node, value);
};

const event = (node, vm, expr, type) => {
  let eventType = type
      .split(':')
      .pop()
      .split('.')
      .shift(),
    handler = vm.$method[expr];
  if (eventType && handler) node.addEventListener(eventType, handler.bind(vm));
};

const clazz = (node, vm, expr) => {
  let updater = Updater.classUpdater;
  new Watch(vm, expr, newValue => {
    updater(node, newValue);
  });
  updater(node, getVal(vm.$data, expr));
};

const html = (node, vm, expr) => {
  let updater = Updater.htmlUpdater;
  new Watch(vm, expr, newValue => {
    updater(node, newValue);
  });
  updater(node, getVal(vm.$data, expr));
};

const model = (node, vm, expr) => {
  let updater = Updater.modelUpdater;
  new Watch(vm, expr, newValue => {
    updater(node, newValue);
  });

  updater(node, getVal(vm.$data, expr));
  node.addEventListener('input', e => {
    let newValue = e.target.value;
    setVal(vm.$data, expr, newValue);
  });
};

const getVal = (data, expr) => {
  expr = expr.split('.');
  return expr.reduce((prev, curr) => prev[curr], data);
};

const setVal = (data, expr, value) => {
  expr = expr.split('.');
  expr.reduce((prev, curr, idx) => {
    if (idx === expr.length - 1) return (prev[curr] = value);
    else return prev[curr];
  }, data);
};

const getValByReg = (data, expr, reg) => {
  return expr.replace(reg, (...args) => {
    return getVal(data, args[1]);
  });
};

export default {
  event,
  text,
  class: clazz,
  model,
  html
};
