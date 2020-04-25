/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const StatusMessage = ({ turn, pieces }) => (
  <View>
    <Text style={[styles.textTurn, turn.playerOne ? styles.colorPlayerOne : styles.colorPlayerTwo]}>
      Is turn of
      {turn.playerOne ? ' Player one ' : ' Player two '}
      pieces player one
    </Text>
    <Text>
      pieces player one:
      {pieces.playerOne}
    </Text>
    <Text>
      pieces player two:
      {pieces.playerTwo}
    </Text>
  </View>
);

StatusMessage.propTypes = {
  turn: PropTypes.shape({
    playerOne: PropTypes.bool,
    playerTwo: PropTypes.bool,
  }).isRequired,
  pieces: PropTypes.shape({
    playerOne: PropTypes.number,
    playerTwo: PropTypes.number,
  }).isRequired,
};

const styles = StyleSheet.create({
  textTurn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 12,
    borderRadius: '5px',
    color: '#fff',
  },
  colorPlayerOne: {
    backgroundColor: '#750005',
  },
  colorPlayerTwo: {
    backgroundColor: '#34252F',
  },
});

export default StatusMessage;
