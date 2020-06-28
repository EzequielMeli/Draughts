
const getBaseCellPropieties = (row, col) => ({
  row,
  col,
  isEmpty: true,
  isFilledWithPlayerOne: false,
  isFilledWithPlayerTwo: false,
  isPressed: false,
});

const isCellInTheBoundry = (row, col, mxLength) => {
  if (row < 0 || row >= mxLength) {
    return false;
  }
  if (col < 0 || col >= mxLength) {
    return false;
  }
  return true;
}

const getCellPropieties = (mx, row, col) => {
  return isCellInTheBoundry && mx[row][col];
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
  isCellInTheBoundry,
  getBaseCellPropieties,
  getCellPropieties,
  getIntermedialCell,
  setCellPropieties,
  setCellsPropieties,
};
