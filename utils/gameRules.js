import { isCellInTheBoundry } from './cellMethods';

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

const checkValidIntermedialCell = (startCellProps, intermedialCell) => {
  if (intermedialCell.isEmpty) {
    return false;
  }
  if (startCellProps.isFilledWithPlayerOne && intermedialCell.isFilledWithPlayerOne) return false;
  if (startCellProps.isFilledWithPlayerTwo && intermedialCell.isFilledWithPlayerTwo) return false;
  return true;
};

const checkValidDiagonalMove = (startCellProps, move, isDobleUnder, intermedialCell) => {
  if (!move) { return false; }
  if (isDobleUnder) {
    const hasCorrectIntermedialCell = checkValidIntermedialCell(startCellProps, intermedialCell);

    return startCellProps.isFilledWithPlayerOne
      ? (move === 'rigthBottomMove' || move === 'leftBottomMove') && hasCorrectIntermedialCell
      : (move === 'rigthTopMove' || move === 'leftTopMove') && hasCorrectIntermedialCell;
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

const checkValidMove = ({ mx, startCellProps, endCellProps, turn, move, isDobleUnder = false, intermedialCell = false }) => {
  const isDiagonalValidMove = checkValidDiagonalMove(
    startCellProps,
    move,
    isDobleUnder,
    intermedialCell,
  );

  const isEmptyCellEnd = endCellProps.isEmpty;
  const isCorrectTurn = checkPlayerTurn(startCellProps, turn);
  const hasNotAvailibleEatingPice = checkHasNotAvailableEatPiece({ mx, turn, endCellProps });
  return isEmptyCellEnd && isDiagonalValidMove && isCorrectTurn && hasNotAvailibleEatingPice;
};

const getNextTurn = (turn) => {
  const { playerOne, playerTwo } = turn;
  return { playerOne: !playerOne, playerTwo: !playerTwo };
};



const checkHasNotAvailableEatPiece = ({ mx, turn, endCellProps }) => {
  const validPlaces = [];
  mx.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      let hasLeftDiagonalEnemy;
      let hasDobleLeftDiagonalEmpty;
      let hasRightDiagonalEnemy;
      let hasDobleRightDiagonalEmpty;

      if (turn.playerOne && cell.isFilledWithPlayerOne) {
        hasLeftDiagonalEnemy =
          isCellInTheBoundry(rowIndex + 1, colIndex + 1, mx.length)
          && mx[rowIndex + 1][colIndex + 1].isFilledWithPlayerTwo;

        hasDobleLeftDiagonalEmpty =
          isCellInTheBoundry(rowIndex + 2, colIndex + 2, mx.length)
          && mx[rowIndex + 2][colIndex + 2].isEmpty;


        if (hasLeftDiagonalEnemy && hasDobleLeftDiagonalEmpty) validPlaces.push({ row: rowIndex + 2, col: colIndex + 2 })

        hasRightDiagonalEnemy =
          isCellInTheBoundry(rowIndex + 1, colIndex - 1, mx.length)
          && mx[rowIndex + 1][colIndex - 1].isFilledWithPlayerTwo;

        hasDobleRightDiagonalEmpty =
          isCellInTheBoundry(rowIndex + 2, colIndex - 2, mx.length)
          && mx[rowIndex + 2][colIndex - 2].isEmpty;

        if (hasRightDiagonalEnemy && hasDobleRightDiagonalEmpty) validPlaces.push({ row: rowIndex + 2, col: colIndex + 2 })

      } else if (turn.playerTwo && cell.isFilledWithPlayerTwo) {
        console.log("PLATER DOS TURNO");
        hasLeftDiagonalEnemy =
          isCellInTheBoundry(rowIndex - 1, colIndex - 1, mx.length)
          && mx[rowIndex - 1][colIndex - 1].isFilledWithPlayerOne;

        hasDobleLeftDiagonalEmpty =
          isCellInTheBoundry(rowIndex - 2, colIndex - 2, mx.length)
          && mx[rowIndex - 2][colIndex - 2].isEmpty;

        if (hasLeftDiagonalEnemy && hasDobleLeftDiagonalEmpty) validPlaces.push({ row: rowIndex - 2, col: colIndex - 2 })

        hasRightDiagonalEnemy =
          isCellInTheBoundry(rowIndex - 1, colIndex + 1, mx.length)
          && mx[rowIndex - 1][colIndex + 1].isFilledWithPlayerOne;

        hasDobleRightDiagonalEmpty =
          isCellInTheBoundry(rowIndex - 2, colIndex + 2, mx.length)
          && mx[rowIndex - 2][colIndex + 2].isEmpty;

        if (hasRightDiagonalEnemy && hasDobleRightDiagonalEmpty) validPlaces.push({ row: rowIndex + 2, col: colIndex + 2 })
      }
    });
  });

  if (validPlaces.length > 0) {
    const { col, row } = endCellProps;
    const hasCorrectMove = validPlaces.find(element => element.col === col && element.row === row);
    return Boolean(hasCorrectMove);
  }
  return true;
};

const restPiece = (turn, piece) => (
  turn.playerOne
    ? { ...piece, playerTwo: piece.playerTwo - 1 }
    : { ...piece, playerOne: piece.playerOne - 1 }
);

export {
  checkValidMove,
  checkPlayerTurn,
  getNextTurn,
  detectMove,
  restPiece,
};
