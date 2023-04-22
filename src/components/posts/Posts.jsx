import { useEffect } from "react";
import Post from "./Post";
import "./Posts.css";
import { useQuery, gql } from "@apollo/client";
import { postsAtom } from "../../store/store";
import { useRecoilState } from "recoil";
import { useSelector, useDispatch } from "react-redux";

function Posts() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
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

  return (
    <>
      {data &&
        data.posts?.map((post, i) => <Post post={post} key={"post" + i} />)}
    </>
  );
}

export default Posts;
