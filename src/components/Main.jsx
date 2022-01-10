import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.background}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;