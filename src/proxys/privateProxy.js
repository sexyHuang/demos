const handler = {
  get(obj, prop) {
    if (!filter(prop)) {
      let val = Reflect.get(obj, prop);
      if (typeof val === 'function') {
        val = val.bind(obj);
      }
      return val;
    }
  },
  set(obj, prop, val) {
    if (filter(prop)) {
      throw new Error(`cannot set property ${prop}`);
    }
    return Reflect.set(obj, prop, val);
  },
  has(obj, prop) {
    return filter(prop) ? false : Reflect.has(obj, prop);
  },
  ownKeys(obj) {
    return Reflect.ownKeys(obj).filter(prop => !filter(prop));
  }
};
function filter(prop) {
  return prop.indexOf('_') === 0;
}
export const privateProxy = target => {
  return new Proxy(target, handler);
};

