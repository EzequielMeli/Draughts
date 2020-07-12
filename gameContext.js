/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useReducer } from 'react';
import generateMatrix from './utils/boardMethods';
import { setCellsPropieties, setCellPropieties, getIntermedialCell } from './utils/cellMethods';
import { checkValidMove, checkPlayerTurn, getNextTurn, detectMove, restPiece } from './utils/gameRules';

function GameReducer(state, action) {
  const { board, turn, attempToMove } = state;
  const { type, payload } = action;
  const { isEmpty } = payload;
  const nexTurn = getNextTurn(turn);

  switch (type) {
    case 'end-game': { return payload; }
    case 'selected': {
      // console.log('#SELECTED');
      const isNotCorrectTurn = !checkPlayerTurn(payload, turn);
      if ((attempToMove && !isEmpty) || isNotCorrectTurn) {
        return state;
      }
      const newBoard = setCellPropieties(board, {
        ...payload,
        isPressed: true,
      });
      const newAttempToMove = { ...payload };
      return { ...state, board: newBoard, attempToMove: newAttempToMove };
    }
    case 'simple-under': {
      // console.log('#SIMPLE-UNDER');
      const move = detectMove(attempToMove, payload, false);
      const isAValidMove = checkValidMove({
        mx: board,
        startCellProps: attempToMove,
        endCellProps: payload,
        turn,
        move
      });

      if (!isAValidMove) {
        // console.log('INVALID MOVE');
        const resetedBoard = setCellPropieties(board, {
          ...attempToMove,
          isPressed: false,
        });
        return {
          ...state, board: resetedBoard, attempToMove: false,
        };
      }

      // Grab the board removing the piece of the cell
      // then generate a new board with the new move
      const newBoard = setCellsPropieties(board, [
        {
          ...attempToMove,
          isEmpty: true,
          isFilledWithPlayerOne: false,
          isFilledWithPlayerTwo: false,
          isPressed: false,
        },
        {
          ...payload,
          isEmpty: false,
          isFilledWithPlayerOne: turn.playerOne,
          isFilledWithPlayerTwo: turn.playerTwo,
          isPressed: false,
        },
      ]);

      return {
        ...state, board: newBoard, attempToMove: false, turn: nexTurn,
      };
    }
    case 'doble-under': {
      const move = detectMove(attempToMove, payload, true);
      const intermedialCell = getIntermedialCell(move, attempToMove, board);
      const isAValidMove = checkValidMove({
        mx: board,
        startCellProps: attempToMove,
        endCellProps: payload,
        turn,
        move,
        isDobleUnder: true,
        intermedialCell,
      });

      if (!isAValidMove) {
        const resetedBoard = setCellPropieties(board, {
          ...attempToMove,
          isPressed: false,
        });
        return {
          ...state, board: resetedBoard, attempToMove: false,
        };
      }

      const newBoard = setCellsPropieties(board, [
        {
          ...attempToMove,
          isEmpty: true,
          isFilledWithPlayerOne: false,
          isFilledWithPlayerTwo: false,
        },
        {
          ...intermedialCell,
          isEmpty: true,
          isFilledWithPlayerOne: false,
          isFilledWithPlayerTwo: false,
        },
        {
          ...payload,
          isEmpty: false,
          isFilledWithPlayerOne: turn.playerOne,
          isFilledWithPlayerTwo: turn.playerTwo,
        },
      ]);

      return {
        ...state,
        board: newBoard,
        attempToMove: false,
        turn: nexTurn,
        pieces: restPiece(turn, state.pieces),
      };
    }
    default: {
      return state;
    }
  }
}

const matrixColumns = 8;
const matrixRows = 8;

const gameInitalStatus = {
  board: generateMatrix(matrixRows, matrixColumns),
  attempToMove: false,
  turn: {
    playerOne: true,
    playerTwo: false,
  },
  pieces: {
    playerOne: 12,
    playerTwo: 12,
  },
  hasWinning: false,
  winning: '',
};


const GameStatus = createContext(gameInitalStatus);

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, gameInitalStatus);

  return (
    <GameStatus.Provider
      value={[state, dispatch]}
    >
      {children}
    </GameStatus.Provider>
  );
};

export { GameStatus, GameProvider };
