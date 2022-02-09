import React, { useEffect,useState } from 'react';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import { View, StyleSheet, FlatList } from 'react-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { format, parseISO } from 'date-fns';

const styles = StyleSheet.create({
  header: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  reviewHeader: {
    flexDirection: 'column',
    flexGrow: 0,
    marginLeft: 10,
    alignItems: 'flex-start',
    width: 300
  },
  headerItem: {
    marginTop: 5,
  },
  rating: {
    borderWidth: 2,
    borderRadius: 45/2,
    paddingTop: 13,
    padding: 5,
    height: 45,
    width: 45,
    margin: 5,
    textAlign: "center",
    borderColor: '#0366d6'
  },
  separator: {
    height: 10,
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

const ReviewItem = ({ review }) => {
  const parsedDate = parseISO(review.createdAt);
  const date = format((parsedDate), 'MM/dd/yyyy');  

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.rating} color="primary" fontWeight="bold">{review.rating}</Text>
        <View style={styles.reviewHeader}>
          <Text color="textPrimary" fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">{date}</Text>
          <Text color="textPrimary">{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepositoryItem = () => {
  let { id } = useParams();
  const [repository, setRepository] = useState(null);
  const result = useQuery(GET_REPOSITORY,
    { 
      fetchPolicy: 'cache-and-network',
      variables: { id: id } 
    },
    
  );

  useEffect(() => {  
    if (result.data) {     
      setRepository(result.data.repository);
    }  
  }, [result.data]);

  if (result.loading || repository === null) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }
  const reviews = result.data.repository.reviews;

  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => 
      <View style={{ backgroundColor: 'white' }}> 
        <ReviewItem review={item} />
      </View>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => 
      <View style={{ backgroundColor: 'white' }}> 
        <RepositoryItem repository={repository} />
      </View>}
    />
  );
};

export default SingleRepositoryItem;