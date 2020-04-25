// Rules methods
const detectMove = (startCellProps, endCellProps, isDobleUnder) => {
  const incremental = isDobleUnder ? 2 : 1;

  const rigthBottomMove = startCellProps.col - incremental === endCellProps.col
    && startCellProps.row + incremental === endCellProps.row;
  const leftBottomMove = startCellProps.col + incremental === endCellProps.col
    && startCellProps.row + incremental === endCellProps.row;
  const rigthTopMove = startCellProps.col + incremental === endCellProps.col
    && startCellProps.row - incremental === endCellProps.row;
  const leftTopMove = startCellProps.col - incremental === endCellProps.col
    && startCellProps.row - incremental === endCellProps.row;

  if (rigthBottomMove) return 'rigthBottomMove';
  if (leftBottomMove) return 'leftBottomMove';
  if (rigthTopMove) return 'rigthTopMove';
  if (leftTopMove) return 'leftTopMove';

  return false;
};

const checkValidDiagonalMove = (startCellProps, move, isDobleUnder, hasIntermedialCell) => {
  if (!move) { return false; }

  if (isDobleUnder) {
    return startCellProps.isFilledWithPlayerOne
      ? (move === 'rigthBottomMove' || move === 'leftBottomMove') && hasIntermedialCell
      : (move === 'rigthTopMove' || move === 'leftTopMove') && hasIntermedialCell;
  }
  return startCellProps.isFilledWithPlayerOne
    ? (move === 'rigthBottomMove' || move === 'leftBottomMove')
    : (move === 'rigthTopMove' || move === 'leftTopMove');
};


const checkPlayerTurn = (cellPropieties, turn) => {
  const { playerOne } = turn;

  return playerOne
    ? cellPropieties.isFilledWithPlayerOne
    : cellPropieties.isFilledWithPlayerTwo;
};

const checkValidMove = (startCellProps, endCellProps, turn, move, isDobleUnder = false, hasIntermedialCell = false) => {
  const isDiagonalValidMove = checkValidDiagonalMove(
    startCellProps,
    move,
    isDobleUnder,
    hasIntermedialCell,
  );
  const isEmptyCellEnd = endCellProps.isEmpty;
  const isCorrectTurn = checkPlayerTurn(startCellProps, turn);
  return isEmptyCellEnd && isDiagonalValidMove && isCorrectTurn;
};

const getNextTurn = (turn) => {
  const { playerOne, playerTwo } = turn;

  return { ...turn, playerOne: !playerOne, playerTwo: !playerTwo };
};

const restPiece = (turn, piece) => (
  turn.playerOne
    ? { ...piece, playerTwo: piece.playerTwo - 1 }
    : { ...piece, playerOne: piece.playerOne - 1 }
);

const checkIsValidDobleUnder = (startCellProps, endCellProps, matrix, turn) => {
  // const { playerOne, platerTwo } = turn;
  // let intermedialCell;

  // if (playerOne) {
  //   intermedialCell = {

  //   }
  // }
  // const intermedialCell = {
  //   row: startProps.row - endCellProps.row,
  //   col: startProps.col - endProps.cols,
  // }
  // const hasPieceEnemy = getCellPropieties(matrix)
  // const hasPieceEnemy = '';
};

export {
  checkValidMove,
  getNextTurn,
  detectMove,
  restPiece,
};
