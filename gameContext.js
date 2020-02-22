import React, { createContext, useReducer } from 'react';
import { startGame, setCellsPropieties, checkValidMove, getNextTurn } from './gameMethods';

function GameReducer(state, action) {
  const { isEmpty } = action.payload;

  switch (action.type) {

    case 'selected': {
      console.log("SELECTED");

      const attempToMove = !isEmpty && action.payload;

      return { ...state, attempToMove };
    }
    case 'move': {
      console.log("MOVE");

      const { board, turn, attempToMove } = state;

      const isAValidMove = checkValidMove(attempToMove, action.payload, turn);

      if (!isAValidMove) {
        return { ...state, attempToMove: false }
      }

      // Grab the board removing the piece of the cell 
      // then generate a new board with the new move
      const newBoard = setCellsPropieties(board, [
        {
          ...attempToMove,
          isEmpty: true,
          isFilledWithPlayerOne: false,
          isFilledWithPlayertwo: false
        },
        {
          ...action.payload,
          isEmpty: false,
          isFilledWithPlayerOne: turn.playerOne,
          isFilledWithPlayertwo: turn.playerTwo,
        }
      ])

      const nexTurn = getNextTurn(turn);

      return { ...state, board: newBoard, attempToMove: false, turn: nexTurn };
    }
    default: {
      return state;
    }
  }
}


const matrixColumns = 8;
const matrixRows = 8;

const gameInitalStatus = {
  board: startGame(matrixRows, matrixColumns),
  attempToMove: false,
  turn: {
    playerOne: true,
    playerTwo: false,
  },
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
