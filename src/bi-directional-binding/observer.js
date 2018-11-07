import Dep from './dep';
class Observer {
  constructor(obj) {
    this.dep = new Dep();
    this.value = obj;
    this.walk(obj);
  }
  walk(obj) {
    for (let key of Object.keys(obj)) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive(obj, key, value) {
  const dep = new Dep();

  const property = Reflect.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  var childOb = observe(value);
  Reflect.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      value = newVal;
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

export const observe = (data, asRootData) => {
  if (!data || typeof data !== 'object') {
    return;
  }
  let ob = new Observer(data);
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
};
