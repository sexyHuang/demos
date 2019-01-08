/**
 * @description 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 */
function findIn2DArray(array, val) {
  for (let i = 0; i < array.length; i++) {
    for (let j = array[i].length - 1; j >= 0; j--) {
      if (val === array[i][j]) return [i, j];
      else if (array[i][j] > val) i++;
      else j--;
    }
  }
  return false;
}

module.exports = {
  findIn2DArray
};
