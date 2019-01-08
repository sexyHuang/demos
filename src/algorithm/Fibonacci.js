/*
 * @Author: Sexy
 * @Date: 2019-01-08 10:42:12
 * @LastEditors: Sexy
 * @LastEditTime: 2019-01-08 14:17:09
 * @Description: 斐波那契数列
 */

function fibonacci(n) {
  let a = 0,
    b = 1;
  if (n == 0) return a;

  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

/**
 * @description 跳n阶台阶，可以一次跳1或2，求跳法数。
 *              解：在上第n阶有两种跳法，从n-1上或者从n-2上，所以f(n) = f(n-1)+f(n-2);
 *              递归法
 */
function jumpingWays(n) {
  if (n == 1) return 1;
  if (n == 2) return 2;
  return jumpingWays(n - 1) + jumpingWays(n - 2);
}

/**
 * @description 迭代法
 */

function jumpingWays_2(n) {
  let a = 1,
    b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

/**
 * @description  跳n阶台阶，可以每次可跳1~n阶，求跳法数。
 *               解：在上第n阶可以是从第n-k阶直接跳上，所以f(n) = f(n-1)+f(n-2)+···+f(1)+f(0);
 *                  所以f(n)-f(n-1) =  f(n-1)+f(n-2)+···+f(1)+f(0)-(f(n-2)+···+f(1)+f(0)),即f(n) = 2f(n-1);
 *                  所以f(n) = 2 ** (n-1) * f(1) = 2 ** ( n - 1 );
 */
function jumpingWaysInN(n) {
  return 2 ** (n - 1);
}

module.exports = {
  fibonacci,
  jumpingWays_2,
  jumpingWays,
  jumpingWaysInN
};
