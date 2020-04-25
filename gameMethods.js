const startGame = (rows, cols) => {
  const initalMatrix = generateMatrix(rows, cols);
  return initalMatrix;
};

// Matrix methods
const generateMatrix = (rows, cols) => {
  const matrix = [];
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
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayerOne: true };
  } if ((i == 1) && isEvenCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayerOne: true };
  }
  if ((i == rows - 1 || i == rows - 3) && isEvenCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayertwo: true };
  }
  if ((i == rows - 2) && isOddCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayertwo: true };
  }

  return baseCellPropieties;
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

const getCellPropieties = (mx, row, col) => mx[row][col];

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

const setAttempToMove = (mx, row, col, cellPropieties) => {
  const newCellPropieties = { ...cellPropieties, isPressed: true };
  const newMatrix = [...mx];
  newMatrix[row][col] = newCellPropieties;
  return newMatrix;
};

// Rules methods
const checkValidMove = (cellPropietiesStart, cellPropietiesEnd, turn) => {
  const isNotEmptyCellEnd = cellPropietiesEnd.isEmpty;
  const isDiagonalMove = checkDiagonalMove(cellPropietiesStart, cellPropietiesEnd);
  const isCorrectTurn = checkPlayerTurn(cellPropietiesStart, turn);

  return isNotEmptyCellEnd && isDiagonalMove && isCorrectTurn;
};

const checkDiagonalMove = (startProps, endProps, isDobleUnder = false) => {
  const incremental = isDobleUnder ? 2 : 1;

  const isDiagonalRigthBottomMove = startProps.col - incremental == endProps.col
    && startProps.row + incremental == endProps.row;
  const isDiagonalLeftBottomMove = startProps.col + incremental == endProps.col
    && startProps.row + incremental == endProps.row;
  const isDiagonalRigthTopMove = startProps.col + incremental == endProps.col
    && startProps.row - incremental == endProps.row;
  const isDiagonalLeftTopMove = startProps.col - incremental == endProps.col
    && startProps.row - incremental == endProps.row;

  return startProps.isFilledWithPlayerOne
    ? isDiagonalRigthBottomMove || isDiagonalLeftBottomMove
    : isDiagonalRigthTopMove || isDiagonalLeftTopMove;
};

const checkIsValidDobleUnder = (startProps, endProps, matrix, turn) => {
  // const { playerOne, platerTwo } = turn;
  // let intermedialCell;

  // if (playerOne) {
  //   intermedialCell = {

  //   }
  // }
  // const intermedialCell = {
  //   row: startProps.row - endProps.row,
  //   col: startProps.col - endProps.cols,
  // }
  // const hasPieceEnemy = getCellPropieties(matrix)
  // const hasPieceEnemy = '';
};

const checkPlayerTurn = (cellPropieties, turn) => {
  const { playerOne } = turn;

  return playerOne
    ? cellPropieties.isFilledWithPlayerOne
    : cellPropieties.isFilledWithPlayertwo;
};

// const getIntermedialCell = (startProps, endProps) => {
//   const checkPlayerTurn = '';
// }

const getNextTurn = (turn) => {
  const { playerOne, playerTwo } = turn;

  return { ...turn, playerOne: !playerOne, playerTwo: !playerTwo };
};

export {
  startGame, generateMatrix, getCellPropieties, checkValidMove, getNextTurn, setCellPropieties, setCellsPropieties, setAttempToMove,
};
