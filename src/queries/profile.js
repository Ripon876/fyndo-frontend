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
    friendshipStatus(id: $id) {
      id
      status
      sender
    }
  }
`;

const ADD_FRIEND = gql`
  mutation ADD_FRIEND($id: ID!) {
    addFriend(id: $id)
  }
`;

const ACCEPT_REQUEST = gql`
  mutation ACCEPT_REQUEST($id: ID!) {
    acceptRequest(id: $id)
  }
`;

export { GET_USER_DATA, FRIENDSHIP_STATUS, ADD_FRIEND, ACCEPT_REQUEST };
