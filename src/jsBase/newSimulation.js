/*
 * @Author: Sexy
 * @Date: 2019-02-19 14:57:33
 * @LastEditors: Sexy
 * @LastEditTime: 2019-02-19 17:02:50
 * @Description:
 * `new` 创建的实例有以下 2 个特性
 * 1、访问到构造函数里的属性
 * 2、访问到原型里的属性
 * 当代码 new Foo(...)执行时，会发生：
 *  1.一个继承自Foo.prototype的新对象被创建；
 *  2.使用制定的参数调用构造函数Foo,并将this绑定到新创建的对象。new Foo 等同于 new Foo(),也就是没有制定参数列表，Foo不带参数调用的情况。
 *  3.由构造函数返回的对象就是new表达式的结果。如果构造函数没有显式返回一个对象，则使用step1创建的对象。
 */

function create(Con, ...args) {
  let new_obj = new Object();
  new_obj.__proto__ = Con.prototype; //__proto__是每个实例上都有的属性，prototype是构造函数的属性。
  let ret = Con.apply(new_obj, args);

  return ret instanceof Object ? ret : new_obj;
}

function Car(color) {
  this.color = color;
  return 'dfsd';
}

// black car start
function add(num) {
  function sum(b) {
    num += b;
    return sum;
  }
  sum.toString = () => num;
  return sum;
}
var moveZeroes = function(nums) {
  let zero_pointer = 0,
    n_zero_pointer = 0,
    size = nums.length - 1;
  while (zero_pointer < size && n_zero_pointer < size) {
    while (nums[zero_pointer] && zero_pointer < size) {
      zero_pointer++;
    }
    n_zero_pointer = zero_pointer ;
    while (!nums[n_zero_pointer] && n_zero_pointer < size) {
      n_zero_pointer++;
    }
    if (zero_pointer >= n_zero_pointer) break;
    [nums[zero_pointer], nums[n_zero_pointer]] = [
      nums[n_zero_pointer],
      nums[zero_pointer]
    ];
  }
  return nums;
};
moveZeroes([0,1,0,2,12]);
