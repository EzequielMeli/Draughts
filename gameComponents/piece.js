/* eslint-disable no-use-before-define */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View } from 'react-native';

const Piece = ({ isPressed, isFilledWithPlayerOne, isFilledWithPlayerTwo }) => {
  const [enlarge] = useState(new Animated.Value(1));
  const [spinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isPressed) {
      Animated.parallel([
        Animated.timing(enlarge, {
          toValue: 1.3,
          duration: 150,
        }),
        Animated.timing(spinValue, {
          toValue: '360deg',
          duration: 1500,
        }),
      ]).start(() => {});
    } else {
      Animated.timing(enlarge, {
        toValue: 1,
        duration: 0,
      }).start();
    }
  }, [isPressed]);

  const animatedStyle = {
    transform: [
      {
        scale: enlarge,
        rotate: spinValue,
      },
    ],
  };

  return (
    <Animated.View style={[
      styles.piece,
      isFilledWithPlayerOne ? styles.piecePlayerOne : null,
      isFilledWithPlayerTwo ? styles.piecePlayerTwo : null,
      animatedStyle,
    ]}
    >
      <View style={[
        styles.pieceCenter,
        isFilledWithPlayerOne ? styles.pieceCenterPlayerOne : null,
        isFilledWithPlayerTwo ? styles.pieceCenterPlayerTwo : null,
      ]}
      />
    </Animated.View>
  );
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
    transform: 'scale(0.7)',
  },
});

Piece.propTypes = {
  isPressed: PropTypes.bool,
  isFilledWithPlayerOne: PropTypes.bool,
  isFilledWithPlayerTwo: PropTypes.bool,
};

export default Piece;
