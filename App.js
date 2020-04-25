/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Board from './gameComponents/board';
import { GameProvider } from './gameContext';

const App = () => (
  <GameProvider>
    <View style={styles.container}>
      <Board />
    </View>
  </GameProvider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
