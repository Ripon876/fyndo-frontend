import { useState } from "react";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { Circle2 } from "react-preloaders2";
import Post from "./Post";
import "./Posts.css";
import { GET_ALL_POSTS } from "../../queries/post";

function Posts() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  useQuery(GET_ALL_POSTS, {
    variables: {
      page,
      limit: 10,
    },
    errorPolicy: "all",
    onCompleted: (data) => {
      setPosts(posts.concat(data.getPosts.posts));
      if (total === 0) {
        setTotal((old) => data.getPosts.total);
      }
    },
  });

  return (
    <>
      {posts && (
        <InfiniteScroll
          dataLength={posts.length}
          next={() => {
            setPage((old) => old + 1);
          }}
          hasMore={posts.length === total ? false : true}
          loader={<Circle2 color={"#9ca3af"} />}
          endMessage={
            <p className="mb-3 mt-2 small text-center text-secondary">
              No more posts
            </p>
          }
        >
          {posts.map((post, i) => (
            <Post post={post} key={"post" + i} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}

export default Posts;
