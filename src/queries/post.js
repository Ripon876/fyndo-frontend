import { gql } from "@apollo/client";

const GET_ALL_POSTS = gql`
  {
    posts {
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

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export { GET_ALL_POSTS, CREATE_POST ,DELETE_POST};
