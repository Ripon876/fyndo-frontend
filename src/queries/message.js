import { gql } from "@apollo/client";

const CREATE_MESSAGE = gql`
  mutation CM($receiver: ID!, $conversation: ID!, $message: String!) {
    createMessage(
      receiver: $receiver
      conversation: $conversation
      message: $message
    ) {
      id
      message
    }
  }
`;

const GET_MESSAGES = gql`
  query GetMsgs($id: ID!) {
    getMesseges(id: $id) {
      id
      receiver {
        id
      }
      message
    }
  }
`;

export { CREATE_MESSAGE, GET_MESSAGES };
