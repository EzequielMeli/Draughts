/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const StatusMessage = ({ turn, pieces, hasWinning, winning }) => (
  <View>
    <Text style={[styles.textTurn, turn.playerOne ? styles.colorPlayerOne : styles.colorPlayerTwo]}>
      Is turn of
      {turn.playerOne ? ' player one ' : ' player two '}
      {hasWinning
        && (
          <View>
            <Text>
              Congrats
              {winning}
              {' '}
              you won!
            </Text>
          </View>
        )}
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
  hasWinning: PropTypes.bool,
  winning: PropTypes.string,
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
