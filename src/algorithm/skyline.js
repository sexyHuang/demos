/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function(buildings) {
  let height = [0],
    res = [],
    topPoints = getTopPoints(buildings);
  for (let idx of topPoints.keys()) {
    let [x, y, type] = topPoints[idx];
    let max = height[height.length - 1];
    if (type === 's') {
      if (
        idx - 1 >= 0 &&
        x === topPoints[idx - 1][0] &&
        y === topPoints[idx - 1][1]
      )
        continue;
      if (max < y) {
        res.push([x, y]);
      }
      if (!height.includes(y)) height.push(y);
      height.sort((a, b) => a - b);
    } else {
      if (
        idx + 1 < topPoints.length &&
        x === topPoints[idx + 1][0] &&
        y === topPoints[idx + 1][1]
      )
        continue;
      height.splice(height.indexOf(y), 1);
      if (max === y) {
        res.push([x, height[height.length - 1]]);
      }
    }
  }
  return res.reduce((prev, curr) => {
    if (!prev) return [curr];
    let [x, y] = prev[prev.length - 1];
    if (x === curr[0] && y <= curr[1]) prev.pop();
    prev.push(curr);
    return prev;
  }, null);
};
function getTopPoints(buildings) {
  let res = [];
  buildings.map(([start, end, height]) => {
    res.push([start, height, 's'], [end, height, 'e']);
  });
  return res
    .sort((a, b) => a[0] - b[0])
    .reduce((prev, curr) => {
      if (!prev) return [curr];
      let [pX, pY, pType] = prev[prev.length - 1],
        [x, y, type] = curr;
      
    });
}

let buildings = [[0, 3, 3], [1, 5, 3], [2, 4, 3], [3, 7, 3]];

console.log(getTopPoints(buildings));
console.log('stop');
