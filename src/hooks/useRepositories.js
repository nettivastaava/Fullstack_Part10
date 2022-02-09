import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection }) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy: orderBy, orderDirection: orderDirection } 
  });

  console.log('ORDER BY ', orderBy);
  console.log('ORDER DIR ', orderDirection);



  return { 
    repositories: data ? data.repositories : undefined,
    loading, 
  };
};

export default useRepositories;