import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { useHistory } from "react-router-dom";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  header: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  headerText: {
    flexDirection: 'column',
    flexGrow: 0,
    padding: 10,
    alignItems: 'flex-start'
  },
  headerItem: {
    marginTop: 5
  },
  language: {
    backgroundColor: '#0366d6',
    padding: 5,
    marginTop: 5,
    alignItems: 'center'
  },
  profilePicture: {
    padding: 15,
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  repoStats: {
    display: 'flex',
    flexDirection: 'row',
  },
  statItem: {
    flexGrow: 1,
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center'
  }
});

const RepositoryItem = ({ repository }) => {
  const history = useHistory();

  const showRepository = () => {
    history.push(`/${repository.id}`);
  }

  const onPressFunction = () => {
    console.log('Button pressed!');
    Linking.openURL(`${repository.url}`);
  }

  return (
    <View testID="repositoryItem">
      <Pressable onPress={showRepository}>
        <View style={styles.header}>
          <Image
            style={styles.profilePicture}
            source={{uri: repository.ownerAvatarUrl}}
          >
          </Image>
          <View style={styles.headerText}>
            <Text color="textSecondary" fontWeight="bold">{repository.fullName}</Text>
            <Text style={styles.headerItem} color="textSecondary">{repository.description}</Text>
            <View style={styles.language}>
              <Pressable>
                <Text color="textTab" fontWeight="bold">{repository.language}</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.repoStats}>
          <View style={styles.statItem}>
            <Text color="textSecondary" fontWeight="bold">{repository.stargazersCount}</Text>
            <Text color="textSeconday">Stars</Text>
          </View>
          <View style={styles.statItem}>
            <Text color="textSecondary" fontWeight="bold">{repository.forksCount}</Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View style={styles.statItem}>
            <Text color="textSecondary" fontWeight="bold">{repository.reviewCount}</Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text color="textSecondary" fontWeight="bold">{repository.ratingAverage}</Text>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>
        {repository.url ? (
          <View style={styles.language}>
            <Pressable onPress={onPressFunction}>
              <Text color="textTab" fontWeight="bold">{repository.url}</Text>
            </Pressable>
          </View>
        ) : (
          <View></View>
        )}
      </Pressable>
    </View>
  );
};
  
export default RepositoryItem;