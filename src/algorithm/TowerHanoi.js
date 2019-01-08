/*
 * @Author: Sexy
 * @Date: 2019-01-08 13:50:22
 * @LastEditors: Sexy
 * @LastEditTime: 2019-01-08 14:26:42
 * @Description: 汉诺塔
 */

/**
 * @description 算法分析：
 *                  在n层的移动中，
 *                  先把前n-1层移到buff中；
 *                  再把第n层移到target中；
 *                  最后把前n-1移到target中；
 * @param {*} n 层数
 */
function TowerHanoi(n) {
  let step = 0;
  function hanoi(n, now = 'A', buff = 'B', target = 'C') {
    if (n === 1) move(n, now, target);
    else {
      hanoi(n - 1, now, target, buff);
      move(n, now, target);
      hanoi(n - 1, buff, now, target);
      //Step(n) = 2Step(n-1) + 1,所以 Step(n) = 2 ** n - 1;
    }
  }

  function move(n, now, target) {
    console.log(`第${++step}步：将${n}号盘子从${now}移到${target};`);
  }
  hanoi(n);
  console.log(`移动完成，共${step}步`);
}
module.exports = {
  TowerHanoi
};
