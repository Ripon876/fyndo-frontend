import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
      id
      content
      createdAt
      creator {
        id
        firstName
        lastName
        profilePhoto
      }
    }
  }
`;

export {
    CREATE_POST
}