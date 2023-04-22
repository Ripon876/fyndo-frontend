import { gql } from "@apollo/client";

const GET_USER_DATA = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      bio
      email
      phone
      address
      profilePhoto
      coverPhoto
      posts {
        id
        content
        createdAt
      }
    }
  }
`;

export { GET_USER_DATA };
