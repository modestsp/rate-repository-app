import { gql } from "@apollo/client";
import { CORE_REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...CoreRepositoryFields
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    me {
      id
      username
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
  query reviews($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
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
