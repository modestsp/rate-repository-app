import { gql } from "@apollo/client";
import { CORE_REPOSITORY_FIELDS, CORE_REVIEW_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...CoreRepositoryFields
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${CORE_REPOSITORY_FIELDS}
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...CoreRepositoryFields
      url
    }
  }
`;

export const GET_REVIEWS = gql`
  ${CORE_REVIEW_FIELDS}
  query reviews($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      reviews(first: $first, after: $after) {
        ...CoreReviewFields
      }
    }
  }
`;

export const GET_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
            }
            repository {
              url
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
    }
  }
`;
