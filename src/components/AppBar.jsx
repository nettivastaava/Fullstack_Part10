import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text'
import { AUTHORIZED_USER } from '../graphql/queries';
import { useQuery, useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';


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
  const { data, loading } = useQuery(AUTHORIZED_USER);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();


  const signOutFunction = async () => {
    await authStorage.removeAccessToken();

    apolloClient.resetStore();
  };

  return(
    <View style={styles.container}>
    <ScrollView horizontal style={styles.flexItem}>
      <View style={styles.flexItem}>
        <Link to="/">
          <Text color="textTab">Repositories</Text>
        </Link>
      </View>
      {data?.authorizedUser?.username ? (
      <View style={styles.flexItem}>
        <Link to="/review">
          <Text color="textTab">Review</Text>
        </Link>
      </View> ) : (
      <View></View>
      )}
      {data?.authorizedUser?.username ? (
      <View style={styles.flexItem}>
        <Pressable onPress={signOutFunction}>
          <Text color="textTab">Sign out</Text>
        </Pressable>
      </View>
      ) : (
      <View style={styles.flexItem}>
        <Link to="/signin">
          <Text color="textTab">Sign in</Text>
        </Link>
      </View>
      )}
    </ScrollView>
  </View>
  )
};

export default AppBar;