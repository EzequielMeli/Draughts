/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/require-default-props */

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Piece from './piece';

const Cell = ({ propieties, handler }) => {
  const {
    row,
    col,
    isEmpty,
    isFilledWithPlayerOne,
    isFilledWithPlayerTwo,
    isPressed,
  } = propieties;

  const isEvenCol = ((col % 2) === 0);
  const isEvenRow = ((row % 2) === 0);


  useEffect(() => {
    console.log("RE RENDER");
  });

  return (
    <TouchableOpacity onPress={() => handler(propieties)}>
      <View style={[styles.cell, getStyles(isEvenRow, isEvenCol)]}>
        {!isEmpty
          && (
            <Piece
              isPressed={isPressed}
              isFilledWithPlayerOne={isFilledWithPlayerOne}
              isFilledWithPlayerTwo={isFilledWithPlayerTwo}
            />
          )}
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (isEvenRow, isEvenCol) => {
  if (isEvenRow) {
    return isEvenCol ? styles.evenBackground : styles.oddBackground;
  }
  return isEvenCol ? styles.oddBackground : styles.evenBackground;
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
  },
});

Cell.propTypes = {
  propieties: PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number,
    isEmpty: PropTypes.bool,
    isFilledWithPlayerOne: PropTypes.bool,
    isFilledWithPlayerTwo: PropTypes.bool,
    isPressed: PropTypes.bool,
  }),
  handler: PropTypes.func,
};

const areEqual = (prevProps, nextProps) => {
  const {
    isFilledWithPlayerOne: prevIsFilledWithPlayerOne,
    isFilledWithPlayerTwo: prevIsFilledWithPlayerTwo,
    isEmpty: prevIsEmpty,
    isPressed: prevIsPressed,
    row, col,
  } = prevProps.propieties;
  const {
    isFilledWithPlayerOne: nextIsFilledWithPlayerOne,
    isFilledWithPlayerTwo: nextIsFilledWithPlayerTwo,
    isEmpty: nextIsEmpty,
    isPressed: nextIsPressed,
  } = nextProps.propieties;

  const changeCellByPlayerOne = prevIsFilledWithPlayerOne === nextIsFilledWithPlayerOne;
  const changeCellbyPlayerTwo = prevIsFilledWithPlayerTwo === nextIsFilledWithPlayerTwo;
  const changeCellPressed = prevIsPressed === nextIsPressed;
  const changeCellEmpty = prevIsEmpty === nextIsEmpty;

  if (row === 3 && col === 6) console.log({ prevProps, nextProps });

  return changeCellByPlayerOne
    && changeCellbyPlayerTwo
    && changeCellPressed
    && changeCellEmpty;
};

export default Cell;
