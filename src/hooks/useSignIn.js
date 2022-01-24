import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  
  const signIn = async ({ username, password }) => {
    const { data }  = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authorize.accessToken);

    apolloClient.resetStore();
  };
  
  return [signIn, result];
};

export default useSignIn;