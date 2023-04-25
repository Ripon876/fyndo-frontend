import { useState } from "react";
import { Fade } from "react-reveal";
import ClickOutside from "react-click-outside";
import EditPost from "../editpost/EditPost";
import { useMutation } from "@apollo/client";
import { Circle2 } from "react-preloaders2";
import { ShowError, ShowSuceess } from "../../utils/Alerts";
import { GET_ALL_POSTS, DELETE_POST } from "../../queries/post";
import { GET_USER_DATA } from "../../queries/profile";
import { useSelector } from "react-redux";

function PostOptions({ id }) {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const uId = useSelector((state) => state.user.id);

  const [DeletePost, { data, loading, error }] = useMutation(DELETE_POST, {
    update: (cache) => {
      const { user } = cache.readQuery({
        query: GET_USER_DATA,
        variables: { id: uId },
      });
      const { posts } = cache.readQuery({
        query: GET_ALL_POSTS,
      });

      if (user) {
        const postsNowExists = user?.posts.filter((post) => post.id !== id);
        cache.writeQuery({
          query: GET_USER_DATA,
          variables: { id: uId },
          data: {
            user: {
              ...user,
              posts: [...postsNowExists],
            },
          },
        });
      }
      if (posts) {
        const postsNowExistsOnHome = posts.filter((post) => post.id !== id);
        cache.writeQuery({
          query: GET_ALL_POSTS,
          data: {
            posts: [...postsNowExistsOnHome],
          },
        });
      }
    },
  });

  const deletePost = () => {
    DeletePost({
      variables: { id },
    });
  };

  if (data) {
    // window.location.reload();
  }
  return (
    <div class="float-end position-absolute postOption">
      <i
        class="fa-solid fa-ellipsis postOptionIcon"
        onClick={() => {
          setShow(true);
        }}
      ></i>

      {show && (
        <ClickOutside
          onClickOutside={() => {
            setShow(false);
          }}
        >
          {error && <ShowError />}
          {data && <ShowSuceess msg="Post Deleted successfully" />}
          {loading && <Circle2 color={"#9ca3af"} />}
          <Fade duration={500}>
            <div className="post-options-list position-absolute">
              <ul class="list-group">
                <li
                  class="list-group-item"
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </li>
                <li class="list-group-item">
                  <i class="fa-solid fa-share"></i> Share
                </li>
                <li class="list-group-item" onClick={deletePost}>
                  <i class="fa-solid fa-trash-can"></i> Delete
                </li>
              </ul>
            </div>
          </Fade>
        </ClickOutside>
      )}

      {edit && (
        <ClickOutside
          onClickOutside={() => {
            setEdit(false);
          }}
        >
          <EditPost id={id} setShowModal={setEdit} />
        </ClickOutside>
      )}
    </div>
  );
}

export default PostOptions;
