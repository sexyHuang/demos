import { observe } from './observer';
import Compile from './compile';
export default class MVVM {
  constructor({ el, data, method }) {
    this.$el = el;
    this.$data = data;
    this.$method = method;
    if (this.$el) {
      observe(this.$data);
      this.proxyData(this.$data);
      new Compile(this.$el, this);
    }
  }
  proxyData(data) {
    Object.keys(data).forEach(key => {
      Reflect.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        }
      });
    });
  }
}
