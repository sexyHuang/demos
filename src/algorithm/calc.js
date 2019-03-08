var calculate = function(s) {
  s = s.replace(/\s/g, '');
  let cal_f_map = {
    '#': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };
  let stack_f = ['#'],
    stack_cal = [],
    cal_funs = {
      '(': str => {
        stack_f.push(str);
      },
      normals: str => {
        let peek = stack_f[stack_f.length - 1];
        while (peek !== '(' && cal_f_map[str] <= cal_f_map[peek]) {
          stack_cal.push(stack_f.pop());
          peek = stack_f[stack_f.length - 1];
        }
        stack_f.push(str);
      },
      ')': () => {
        let peek = stack_f.pop();
        while (peek !== '(') {
          stack_cal.push(peek);
          peek = stack_f.pop();
        }
      }
    };
  for (let i = 0; i < s.length; i++) {
    let temp = s[i];
    if (/\d/.test(temp)) {
      while (/\d/.test(s[i + 1])) {
        temp += s[++i];
      }
      stack_cal.push(temp);
      continue;
    }
    if (Object.keys(cal_f_map).includes(temp)) {
      cal_funs.normals(temp);
    } else cal_funs[temp](temp);
  }
  while (stack_f.length > 1) {
    stack_cal.push(stack_f.pop());
  }
  return evalRPN(stack_cal);
};
function evalRPN(tokens) {
  let stack = [];
  let f = ['+', '-', '*', '/'];
  tokens.map(val => {
    if (!f.includes(val)) {
      stack.push(val * 1);
    } else {
      let a = stack.pop(),
        b = stack.pop();
      stack.push(calc(b, a, val));
    }
  });
  return stack.pop();
  function calc(a, b, f) {
    let map = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b
    };
    return map[f](a, b);
  }
}
console.log(calculate(' 2-1 + 2 '));
console.log('stop');
