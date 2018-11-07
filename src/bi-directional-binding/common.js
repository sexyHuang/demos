export const getVal = (data, expr) => {
  expr = expr.split('.');
  return expr.reduce((prev, curr) => {
    return prev[curr];
  }, data);
};
