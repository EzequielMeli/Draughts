const getBaseCellPropieties = (row, col) => ({
  row,
  col,
  isEmpty: true,
  isFilledWithPlayerOne: false,
  isFilledWithPlayerTwo: false,
  isPressed: false,
});

const getCellPropieties = (mx, row, col) => {
  const isNotPositiveRow = row < 0;
  const isNotValidNumberRow = row >= mx.length;
  const isNotPositiveCol = col < 0;
  const isNotValidNumberCol = col >= mx.length;
  if (isNotPositiveRow
    || isNotPositiveCol
    || isNotValidNumberCol
    || isNotValidNumberRow
  ) return false;
  return mx[row][col];
};

const getIntermedialCell = (move, startCellProps, matrix) => {
  const { row, col } = startCellProps;
  const movesCheckers = {
    rigthBottomMove: getCellPropieties(matrix, row + 1, col - 1),
    leftBottomMove: getCellPropieties(matrix, row + 1, col + 1),
    rigthTopMove: getCellPropieties(matrix, row - 1, col + 1),
    leftTopMove: getCellPropieties(matrix, row - 1, col - 1),
    default: false,
  };

  return movesCheckers[move] || movesCheckers.default;
};

const setCellPropieties = (mx, cellPropieties) => {
  const { row, col } = cellPropieties;
  const newMatrix = [...mx];
  newMatrix[row][col] = cellPropieties;
  return newMatrix;
};
const setCellsPropieties = (mx, cellsPropieties) => {
  const newMatrix = [...mx];
  cellsPropieties.forEach((cellProps) => {
    const { row, col } = cellProps;
    newMatrix[row][col] = cellProps;
  });
  return newMatrix;
};

export {
  getBaseCellPropieties,
  getCellPropieties,
  getIntermedialCell,
  setCellPropieties,
  setCellsPropieties,
};
