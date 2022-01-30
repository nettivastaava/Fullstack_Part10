import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
            node {
            id,
            fullName,
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
      stargazersCount,
      reviewCount,
      forksCount,
      ratingAverage,
      ownerAvatarUrl,
      url
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