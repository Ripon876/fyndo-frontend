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

const FRIENDSHIP_STATUS = gql`
  query ($id: ID!) {
    friendshipStatus(id: $id)
  }
`;

const ADD_FRIEND = gql`
  mutation ADD_FRIEND($id: ID!) {
    addFriend(id: $id)
  }
`;

export { GET_USER_DATA, FRIENDSHIP_STATUS, ADD_FRIEND };
