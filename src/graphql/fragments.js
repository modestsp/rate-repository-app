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
