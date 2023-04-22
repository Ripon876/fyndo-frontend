import { useState, useEffect } from "react";
import { Fade } from "react-reveal";
import ClickOutside from "react-click-outside";
import socket from "../../socket/socket";
import Toast from "../../utils/ToastAlert";
import EditPost from "../editpost/EditPost";
import { useMutation, gql } from "@apollo/client";
import { Circle2 } from "react-preloaders2";
import { ShowError, ShowSuceess } from "../../utils/Alerts";

function PostOptions({ id }) {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const editPost = () => {
    socket.emit("editPost", id, (data) => {
      console.log(data);
    });
  };

  const query = gql`
    mutation DeletePost($id: ID!) {
      deletePost(id: $id)
    }
  `;
  const [DeletePost, { data, loading, error }] = useMutation(query);

  const deletePost = () => {
    DeletePost({
      variables: { id },
    });
  };

  if (data) {
    window.location.reload();
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
