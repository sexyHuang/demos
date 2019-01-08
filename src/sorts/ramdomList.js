const ramdomList = length => {
  let result = [],
    range = length * 1e2;
  while (result.length < length) {
    result.push(0 | (Math.random() * range));
  }
  return result;
};

module.exports = {
  ramdomList
};
