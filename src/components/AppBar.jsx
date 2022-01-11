import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text'


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row'
  },
  flexItem: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#24292e'
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal style={styles.flexItem}>
      <View style={styles.flexItem}>
        <Link to="/">
          <Text color="textTab">Repositories</Text>
        </Link>
      </View>
      <View style={styles.flexItem}>
        <Link to="/signin">
          <Text color="textTab">Sign In</Text>
        </Link>
      </View>
    </ScrollView>
  </View>
  );
};

export default AppBar;