import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';

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
  language: {
    backgroundColor: '#0366d6',
    padding: 5
  },
  profilePicture: {
    padding: 15,
    width: 70,
    height: 70,
    borderRadius: 10,
  }
});

const onPressFunction = () => {
  console.log('Hoi');
}

const RepositoryItem = ({ repository }) => {
  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.profilePicture}
          source={{uri: repository.ownerAvatarUrl}}
        >
        </Image>
        <View style={styles.headerText}>
          <Text color="textSecondary" fontWeight="bold">{repository.fullName}</Text>
          <Text color="textSecondary">{repository.description}</Text>
          <View style={styles.language}>
            <Pressable onPress={onPressFunction}>
              <Text color="textTab" fontWeight="bold">{repository.language}</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Text color="textSecondary">Stars: {repository.stargazersCount}</Text>
      <Text color="textSecondary">Forks: {repository.forksCount}</Text>
      <Text color="textSecondary">Reviews: {repository.reviewCount}</Text>
      <Text color="textSecondary">Rating: {repository.ratingAverage}</Text>
    </View>
  );
};
  
export default RepositoryItem;