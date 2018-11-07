/* import { funOsApi } from "./os2Js";
import VConsole from "vconsole";
import Man from "./Man";
let vConsole = new VConsole();
let tony = new Man();

console.log(`当前状态 ===> ${tony}`);
window.test = async function() {
  try {
    let data = await funOsApi("test")();
    alert(data.success);
  } catch (e) {
    alert(e.failure);
  } finally {
    console.log("complete");
  }
};
 */
import MVVM from './bi-directional-binding/mvvm';
let vm = new MVVM({
  el: '#app',
  data: {
    message: {
      a: {
        a: 'hello world',
        b: 'mvvm'
      }
    },
    className: 'btn',
    more: 'mvvm',
    htmlStr: '<span style="color: #f00;">red</span>'
  },
  method: {
    clickBtn: function(e) {
      let strArr = ['one', 'two', 'three'];
      this.message.a.b = strArr[parseInt(Math.random() * 3)];
    },
    clickBtn2(e) {
      this.className = 'btn btn-clicked';
      this.message.a = {
        a: 'test1',
        b: 'test2'
      };
    }
  }
});
