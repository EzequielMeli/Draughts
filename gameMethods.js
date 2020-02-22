const startGame = (rows, cols) => {
  const initalMatrix = generateMatrix(rows, cols);
  return initalMatrix;
};

// Matrix methods
const generateMatrix = (rows, cols) => {
  let matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = Array(cols);
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = fillInitalMatrix(i, j, cols, rows);
    }
  }
  return matrix;
};

const fillInitalMatrix = (i, j, cols, rows) => {
  const isEvenCol = (j % 2 == 0);
  const isOddCol = !isEvenCol;

  const baseCellPropieties = getBaseCellPropieties(i, j);

  if ((i == 0 || i == 2) && isOddCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayerOne: true }
  }
  else if ((i == 1) && isEvenCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayerOne: true }
  }
  else if ((i == rows - 1 || i == rows - 3) && isEvenCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayertwo: true }
  }
  else if ((i == rows - 2) && isOddCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayertwo: true }
  }
  else {
    return baseCellPropieties;
  }
};


// Cell methods
const getBaseCellPropieties = (row, col) => ({
  row,
  col,
  isEmpty: true,
  isFilledWithPlayerOne: false,
  isFilledWithPlayertwo: false,
  isPressed: false,
});

const getCellPropieties = (mx, row, col) => {
  return mx[row][col];
};
const setCellPropieties = (mx, cellPropieties) => {
  const { row, col } = cellPropieties;
  mx[row][col] = cellPropieties;
  return mx;
}
const setCellsPropieties = (mx, cellsPropieties) => {
  cellsPropieties.forEach(cellProps => {
    const { row, col } = cellProps;
    mx[row][col] = cellProps
  })
  return mx;
}

const setAttempToMove = (mx, row, col, cellPropieties) => {
  const newCellPropieties = { ...cellPropieties, isPressed: true };
  mx[row][col] = newCellPropieties;
  return mx;
};

// Rules methods
const checkValidMove = (cellPropietiesStart, cellPropietiesEnd, turn) => {
  const isNotEmptyCellEnd = cellPropietiesEnd.isEmpty;
  const isDiagonalMove = checkDiagonalMove(cellPropietiesStart, cellPropietiesEnd);
  const isCorrectTurn = checkPlayerTurn(cellPropietiesStart, turn);

  return isNotEmptyCellEnd && isDiagonalMove && isCorrectTurn
};

const checkDiagonalMove = (startProps, endProps) => {
  const isDiagonalRigthBottomMove = startProps.col - 1 == endProps.col && startProps.row + 1 == endProps.row;
  const isDiagonalLeftBottomMove = startProps.col + 1 == endProps.col && startProps.row + 1 == endProps.row;
  const isDiagonalRigthTopMove = startProps.col + 1 == endProps.col && startProps.row - 1 == endProps.row;
  const isDiagonalLeftTopMove = startProps.col - 1 == endProps.col && startProps.row - 1 == endProps.row;

  return startProps.isFilledWithPlayerOne
    ? isDiagonalRigthBottomMove || isDiagonalLeftBottomMove
    : isDiagonalRigthTopMove || isDiagonalLeftTopMove;
}

const checkPlayerTurn = (cellPropieties, turn) => {
  const { playerOne } = turn;

  return playerOne
    ? cellPropieties.isFilledWithPlayerOne
    : cellPropieties.isFilledWithPlayertwo;
}

const getNextTurn = (turn) => {
  const { playerOne, playerTwo } = turn;

  return { ...turn, playerOne: !playerOne, playerTwo: !playerTwo }
}

export { startGame, generateMatrix, getCellPropieties, checkValidMove, getNextTurn, setCellPropieties, setCellsPropieties, setAttempToMove };