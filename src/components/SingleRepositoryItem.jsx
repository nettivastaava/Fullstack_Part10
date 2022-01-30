import React, { useEffect,useState } from 'react';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';

const SingleRepositoryItem = () => {
  let { id } = useParams();
  const [repository, setRepository] = useState(null);
  const result = useQuery(GET_REPOSITORY,
    { variables: { id: id } }
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
    )
  };

  return (
    <RepositoryItem repository={repository} />
  );
}

export default SingleRepositoryItem;