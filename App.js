import React from 'react';

import { StyleSheet, View } from 'react-native';
import Board from './gameComponents/board';

import { GameProvider } from './gameContext';

export default function App() {

  return (
    <GameProvider>
      <View style={styles.container}>
        <Board />
      </View>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
