import './index.scss';
/** 稀疏数组 （二维数组、矩阵）
 * 当一个数组中大部分值为 0 时或者为同一值时（无意义的重复值），可以使用稀疏数组保存
 * 记录数组数组一共有几行几列，有多少不同的值
 * 把具有不同值的元素的行列及值记录在一个小规模的数组中，从而缩小程序的规模
 */
/* // 把 5*7 转成了 9*3
      [
        [0, 0, 0, 22, 0, 0, 15],
        [0, 11, 0, 0, 0, 17, 0],
        [0, 0, 0, 6, 0, 0, 0],
        [0, 0, 0, 0, 0, 39, 0],
        [91, 0, 0, 0, 0, 0, 0],
        [0, 0, 28, 0, 0, 0, 0],
      ];
      // 行(不固定-所有值) 列(固定*3) 值
      [
        [6, 7, 8],  // 原始二维数组的行、列、所有值
        [0, 3, 22],
        [0, 6, 15],
        [1, 1, 11],
        [1, 5, 17],
        [2, 3, 6],
        [3, 5, 39],
        [4, 0, 91],
        [5, 2, 28],
      ]; */

// 如果稀疏数组的(所有值+1)*3 > 原始二位数组的长度（或者另一种算法）， 则不使用

// checkerboard 棋盘 15*15
/* [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]; */

// 生成矩阵
const generateTwoDimensional = (rowsLength, columnsLength, val) =>
  new Array(rowsLength)
    .fill(new Array(columnsLength).fill(val))
    .map((item) => [...item]);

const rows = 20,
  columns = 20;

let checkerboard = generateTwoDimensional(rows, columns, 0);

// 在棋盘中随机生成棋子
(() => {
  for (let i = 0; i < Math.floor(Math.random() * (rows * columns)); i++) {
    checkerboard[Math.floor(Math.random() * rows)][
      Math.floor(Math.random() * columns)
    ] = Math.floor(Math.random() * 2 + 1);
  }
})();

(() => {
  // 生成棋盘
  let grids = '';
  checkerboard
    .slice(1)
    .map((item) => [...item.slice(1)])
    .flat()
    .forEach(() => {
      grids += `<div class="grid"></div>`;
    });
  $('.checkerboard')
    .css({
      'grid-template-rows': `repeat(${rows - 1}, 60px)`,
      'grid-template-columns': `repeat(${columns - 1}, 60px)`
    })
    .html(grids);

  // 生成棋子
  const generatePieces = () => {
    let pieces = '';
    checkerboard.flat().forEach((val, index) => {
      pieces += `<div
            class="piece"
            data-piece="${val}"
            data-row="${Math.floor(index / rows)}"
            data-col="${index % columns}"></div>`;
    });
    $('.pieces')
      .css({
        'grid-template-rows': `repeat(${rows}, 60px)`,
        'grid-template-columns': `repeat(${columns}, 60px)`
      })
      .html(pieces);
  };
  generatePieces();
  (() => {
    let bw = 1;
    $('.pieces').on('click', '.piece', function () {
      if (!($(this).attr('data-piece') * 1)) {
        $(this).attr('data-piece', bw);
        checkerboard[$(this).data('row')][$(this).data('col')] = bw;
        bw = bw === 1 ? 2 : 1;
      }
      console.log(checkerboard);
      checkerboard.forEach((cols, index) => {
        var win = [];
        // 通过行计算五子
        cols.forEach((col) => {
          if (col) {
            // 如果没有珠
            if (!win.length) {
              win.push(col);
              // 如果新子和初子相同
            } else if (col === win[0]) {
              win.push(col);
              // 如果五连珠
              if (win.length === 5) {
                win[0] === 1 ? alert('黑棋获胜') : alert('白棋获胜');
                // checkerboard = generateTwoDimensional(rows, columns, 0);
                // generatePieces();
              }
            } else {
              win = [];
            }
          } else {
            win = [];
          }
        });
        // 通过列计算五子
        console.log(index, checkerboard[index]);
      });
    });
  })();
})();

// 将矩阵转成稀疏数组
const transSparse = () => {
  // 稀疏数组
  const sparse = [];
  let len = 0;
  checkerboard.forEach((rows, rowIndex) => {
    rows.forEach((col, colIndex) => {
      if (col) {
        len++;
        if (!sparse[len]) {
          sparse[len] = [];
        }
        sparse[len] = [rowIndex, colIndex, col];
      }
    });
    sparse[0] = [checkerboard.length, rows.length, len];
  });
  // 判断稀疏数组的长度是否大于矩阵的二维数组长度，如果长度大于，则不需要进行转换
  /* if (
          (len + 1) * 3 >
          transTwoDimensionalRowsLength * transTwoDimensionalColumnsLength
        ) {
        } */
  return sparse;
};
// 将稀疏数组转成矩阵
const transTwoDimensional = () => {
  const [transTwoDimensionalRowsLength, transTwoDimensionalColumnsLength] =
    sparse[0];
  const twoDimensional = generateTwoDimensional(
    transTwoDimensionalRowsLength,
    transTwoDimensionalColumnsLength,
    0
  );
  sparse.slice(1).forEach(([rowIndex, colIndex, col]) => {
    twoDimensional[rowIndex][colIndex] = col;
  });
  return twoDimensional;
};
// const twoDimensional = transTwoDimensional();
