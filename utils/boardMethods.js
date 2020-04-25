/* eslint-disable no-plusplus */

import { getBaseCellPropieties } from './cellMethods';

const fillInitalMatrix = (i, j, cols, rows) => {
  const isEvenCol = (j % 2 === 0);
  const isOddCol = !isEvenCol;
  const baseCellPropieties = getBaseCellPropieties(i, j);

  if ((i === 0 || i === 2) && isEvenCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayerOne: true };
  } if ((i === 1) && isOddCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayerOne: true };
  }
  if ((i === rows - 1 || i === rows - 3) && isOddCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayerTwo: true };
  }
  if ((i === rows - 2) && isEvenCol) {
    return { ...baseCellPropieties, isEmpty: false, isFilledWithPlayerTwo: true };
  }

  return baseCellPropieties;
};


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

export default generateMatrix;
