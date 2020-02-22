import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Piece from './piece';

import { GameStatus } from '../gameContext';

const Cell = (propieties) => {
  const [gameStatus, setGameStatus] = useContext(GameStatus)
  const { attempToMove } = gameStatus;

  const {
    row,
    col,
    isEmpty,
    isFilledWithPlayerOne,
    isFilledWithPlayertwo,
    isPressed,
  } = propieties

  const actionMove = attempToMove ? 'move' : 'selected';

  const payload = propieties;

  const isEvenCol = ((col % 2) == 0);
  const isEvenRow = ((row % 2) == 0);


  return (
    isEvenRow ?

      <TouchableOpacity onPress={() => setGameStatus({ type: actionMove, payload })}>
        <View style={[styles.cell, isEvenCol ? styles.evenBackground : styles.oddBackground]} >
          {!isEmpty && (<Piece isPressed={isPressed} isFilledWithPlayerOne={isFilledWithPlayerOne} isFilledWithPlayertwo={isFilledWithPlayertwo} />)}
        </View>
      </TouchableOpacity>
      :

      <TouchableOpacity onPress={() => setGameStatus({ type: actionMove, payload })}>
        <View style={[styles.cell, isEvenCol ? styles.oddBackground : styles.evenBackground]} >
          {!isEmpty && (<Piece isPressed={isPressed} isFilledWithPlayerOne={isFilledWithPlayerOne} isFilledWithPlayertwo={isFilledWithPlayertwo} />)}
        </View>
      </TouchableOpacity>


  )
};

const styles = StyleSheet.create({
  cell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 10,
  },
  evenBackground: {
    backgroundColor: '#F4B266',
  },
  oddBackground: {
    backgroundColor: '#000',
  }
});

export default Cell;