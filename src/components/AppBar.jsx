import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
  },
  flexItem: {
    flexGrow: 0,
    padding: 30,
    backgroundColor: '#24292e'
  }
});

const onPressFunction = () => {
  console.log('Hei');
}

const AppBar = () => {
  return (
  <View style={styles.container}>
    <View style={styles.flexItem}>
      <Pressable onPress={onPressFunction}>
        <Text color="textTab">Repositories</Text>
      </Pressable>
    </View>
  </View>
  );
};

export default AppBar;