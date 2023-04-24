import { gql } from "@apollo/client";

const GET_ALL_POSTS = gql`
  query GET_ALL_POSTS($page: Int!, $limit: Int!) {
    getPosts(page: $page, limit: $limit) {
      total
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

export { GET_ALL_POSTS, CREATE_POST };
