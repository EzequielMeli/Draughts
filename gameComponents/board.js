import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Cell from './cell';
import { GameStatus } from '../gameContext';

const Board = () => {
  const [gameStatus] = useContext(GameStatus)
  const { board } = gameStatus;

  return (
    <View style={styles.board}>
      {
        board && board.map((row, rowIndex) => (

          <View key={'row' + rowIndex} style={styles.row} >
            {
              row.map((propieties, colIndex) => (
                <Cell key={'cell' + colIndex + '' + rowIndex} {...propieties} />
              ),
              )
            }
          </View>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 40,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Board;