import { gql } from "@apollo/client";

export const CORE_REPOSITORY_FIELDS = gql`
  fragment CoreRepositoryFields on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
  }
`;

export const CORE_REVIEW_FIELDS = gql`
  fragment CoreReviewFields on ReviewConnection {
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
      endCursor
      startCursor
      hasNextPage
    }
  }
`;
