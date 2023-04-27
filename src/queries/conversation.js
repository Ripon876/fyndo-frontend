import { gql } from "@apollo/client";

const GET_CONVERSATION = gql`
  mutation ($participant: ID!) {
    getConversation(participant: $participant) {
      id
      participants {
        id
        firstName
        lastName
        profilePhoto
      }
    }
  }
`;

const GET_CONVERSATIONS = gql`
  {
    getConversations {
      id
      participants {
        id
        firstName
        lastName
        profilePhoto
      }
      lastMessage {
        id
        message
      }
    }
  }
`;

export { GET_CONVERSATION, GET_CONVERSATIONS };
