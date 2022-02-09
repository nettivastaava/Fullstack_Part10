import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
        edges {
            node {
            id,
            fullName,
            description,
            language,
            stargazersCount,
            createdAt,
            reviewCount,
            forksCount,
            ratingAverage,
            ownerAvatarUrl,
            reviews {
              edges {
                node {
                  id
                  text
                  rating
                  createdAt
                  user {
                    id
                    username
                  }
                }
              }
            }
          }
        }
    }
  }
`;

export const GET_REPOSITORY = gql`
  
  query repository($id: ID!) {
    repository(id: $id) {
      id,
      fullName,
      language,
      description,
      stargazersCount,
      reviewCount,
      forksCount,
      ratingAverage,
      ownerAvatarUrl,
      url,
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      username
    }
  }
`;