import React from 'react';
import { View } from 'react-native';
import Text from './Text';

const RepositoryItem = ({ repository }) => {
  return (
    <View>
      <Text color="textSecondary">Full name: {repository.fullName}</Text>
      <Text color="textSecondary">Description: {repository.description}</Text>
      <Text color="textSecondary">Language: {repository.language}</Text>
      <Text color="textSecondary">Stars: {repository.stargazersCount}</Text>
      <Text color="textSecondary">Forks: {repository.forksCount}</Text>
      <Text color="textSecondary">Reviews: {repository.reviewCount}</Text>
      <Text color="textSecondary">Rating: {repository.ratingAverage}</Text>
    </View>
  );
};
  
export default RepositoryItem;