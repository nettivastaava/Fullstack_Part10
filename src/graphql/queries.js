import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection $searchKeyword: String, $after: String, $first: Int){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
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
        },
        cursor
      },
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  
  query repository($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo {
          hasPreviousPage
          endCursor
          startCursor
          hasNextPage
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