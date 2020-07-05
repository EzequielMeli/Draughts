/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */

import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import StatusMessage from './statusMessage';
import Cell from './cell';
import { GameStatus } from '../gameContext';
import getActionToMove from '../utils/getActionToMove';

const Board = () => {
  const [gameStatus, setGameStatus] = useContext(GameStatus);
  const {
    board,
    attempToMove,
    turn,
    pieces,
    hasWinning,
    winning,
  } = gameStatus;

  const handleCellPress = (propieties) => {
    const actionToMove = getActionToMove(propieties, attempToMove);
    setGameStatus({ type: actionToMove, payload: propieties });
  };

  useEffect(() => {
    const { playerOne: pieceP1, playerTwo: pieceP2 } = pieces;
    const playerOneWin = pieceP2 === 0;
    const playerTwoWin = pieceP1 === 0;
    if (playerOneWin || playerTwoWin) {
      const winning = playerOneWin ? 'playerOne' : 'playerTwo';
      setGameStatus({ type: 'end-game', payload: { ...gameStatus, hasWinning: true, winning } });
    }
  }, [pieces]);

  return (
    <View>
      <StatusMessage turn={turn} pieces={pieces} hasWinning={hasWinning} winning={winning} />
      {board && (
        <View style={styles.board}>
          {board.map((row) => (
            <View key={`row${row[0].row}`} style={styles.row}>
              {row.map((propieties) => (
                <Cell
                  key={`cell col${propieties.col} row${propieties.row}`}
                  propieties={propieties}
                  handler={handleCellPress}
                />
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 1,
    flexDirection: 'column-reverse',
    marginTop: 40,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Board;
