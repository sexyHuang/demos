let solveSudoku = function(board) {
  let sudo = board.map(val => val.map(val => (val === '.' ? 0 : val*1))),
    stack = [],
    flag = false;
  for (let i = 0; i < 9; i++) {
    let j = 0;
    while (j < 9) {
      if (sudo[i][j] === 0 || flag) {
        flag = false;
        let k = sudo[i][j] + 1;
        while (k < 10) {
          sudo[i][j] = k;
          if (check20Grid(sudo, i, j) === 0) {
            stack.push([i, j]);
            j++;
            break;
          }
          k++;
        }
        //错误时
        if (k > 9) {
          sudo[i][j] = 0;
          let load = stack.pop();
          if (!load) return 0;
          i = load[0];
          j = load[1];
          flag = true;
        }
      } else {
        j++;
      }
    }
  }
  return sudo;
};

function check20Grid(sudo, i, j) {
  let row = [],
    column = [],
    subSudo = [];
  for (let k = 0; k < 9; k++) {
    let _row = sudo[i][k],
      _column = sudo[k][j],
      _subSudo = sudo[i - (i % 3) + (0 | (k / 3))][j - (j % 3) + (k % 3)];
    if (row[sudo[i][k]]) return 1;
    else {
      row[_row] = _row;
    }

    if (column[_column]) {
      return 2;
    } else column[_column] = _column;

    if (subSudo[_subSudo]) {
      return 3;
    } else subSudo[_subSudo] = _subSudo;
  }
  return 0;
}

let sudoku = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
];

function logSudoku(sudoku){
    console.log([...Array(37)].fill('-').join(''));
    sudoku.map(val=>{
        console.log(`| ${val.join(' | ')} |`);
        console.log([...Array(37)].fill('-').join(''));
    });
}
logSudoku(solveSudoku(sudoku));
