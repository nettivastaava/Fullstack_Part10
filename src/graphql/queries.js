import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
            node {
            fullName,
            language,
            stargazersCount,
            reviewCount,
            forksCount,
            ratingAverage,
            ownerAvatarUrl
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