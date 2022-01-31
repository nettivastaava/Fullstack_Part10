import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
            node {
            id,
            fullName,
            description,
            language,
            stargazersCount,
            reviewCount,
            forksCount,
            ratingAverage,
            ownerAvatarUrl,
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