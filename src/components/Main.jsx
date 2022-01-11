import React from 'react';
import { View, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn'
import { Route, Switch, Redirect } from 'react-router-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.background}>
      <AppBar />
      <Switch>        
        <Route path="/" exact>          
          <RepositoryList />        
        </Route>          
        <Route path="/signin" exact>
          <SignIn />
        </Route>  
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;