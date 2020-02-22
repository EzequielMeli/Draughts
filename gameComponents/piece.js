import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const Piece = ({ isPressed, isFilledWithPlayerOne, isFilledWithPlayertwo }) => {
  return (
    <View style={[
      styles.piece,
      isFilledWithPlayerOne ? styles.piecePlayerOne : null,
      isFilledWithPlayertwo ? styles.piecePlayerTwo : null,
      isPressed ? styles.pieceIsPressed : null,
    ]}>
      <View style={[
        styles.pieceCenter,
        isFilledWithPlayerOne ? styles.pieceCenterPlayerOne : null,
        isFilledWithPlayertwo ? styles.pieceCenterPlayerTwo : null,
      ]} />
    </View>
  )
};

const styles = StyleSheet.create({
  piece: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 30,
    height: 30,
    margin: 5,
    borderRadius: 30,
  },
  pieceCenter: {
    width: 7,
    height: 7,
    borderRadius: 5,
  },
  piecePlayerOne: {
    backgroundColor: '#750005',
  },
  piecePlayerTwo: {
    backgroundColor: '#fff',
  },
  pieceCenterPlayerOne: {
    backgroundColor: '#fff',
  },
  pieceCenterPlayerTwo: {
    backgroundColor: '#750005',
  },
  pieceIsPressed: {
    width: 40,
  },
});

Piece.propTypes = {
  isPressed: PropTypes.bool,
  isFilledWithPlayerOne: PropTypes.bool,
  isFilledWithPlayertwo: PropTypes.bool,
};

export default Piece;


