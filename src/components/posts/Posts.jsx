import { useEffect } from "react";
import Post from "./Post";
import "./Posts.css";
import { useQuery, gql } from "@apollo/client";
import { postsAtom } from "../../store/store";
import { useRecoilState } from "recoil";

function Posts() {
  const [posts, setPost] = useRecoilState(postsAtom);

  const query = gql`
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
  const { loading, error, data } = useQuery(query);

  // useEffect(() => {
  //   if (data) {
  //     setPost(data.posts.reverse());
  //   }
  // }, [data]);

  return (
    <>
      {posts?.map((post, i) => (
        <Post post={post} key={"post" + i} />
      ))}
    </>
  );
}

export default Posts;
