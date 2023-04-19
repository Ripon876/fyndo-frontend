import { useState, useEffect } from "react";
import { Fade } from "react-reveal";
import EmojiPopUp from "../newpost/EmojiPopUp";
import { userPostsAtom } from "../../store/store";
import { useRecoilState } from "recoil";
import socket from "../../socket/socket";
import Toast from "../../utils/ToastAlert";

function EditPost({ id, setShowModal }) {
  const [input, setInput] = useState("");
  const [userPosts, setUserPost] = useRecoilState(userPostsAtom);

  const addEmoji = (e) => {
    setInput(input + e.native);
  };

  const getPost = () => {
    socket.emit("getPostToEdit", id, (post) => {
      setInput(post.content);
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getPost();
  }, []);

  const editPost = () => {
    socket.emit("editPost", id, input, (res) => {
      console.log(res);

      if (res.status) {
        var posts = [...userPosts];
        const index = posts.findIndex((post) => post._id === res.post._id);
        posts.splice(index, 1, res.post);
        // console.log(posts);

        setUserPost(posts);
        setShowModal(false);

        Toast({
          type: "success",
          icon: "success",
          title: "Post Edited successfully",
        });
      } else {
        setShowModal(false);
        Toast({
          type: "error",
          icon: "error",
          title: "Something went wrong",
        });
      }
    });
  };

  return (
    <>
      <Fade duration={500}>
        <div
          className="modal d-block row"
          id="exampleModalCenter"
          tabindex="-1"
        >
          <div
            className="col-md-7 col-sm-10 m-auto modal-dialog-centered px-5"
            role="document"
          >
            <div className="modal-content p-3">
              <h1 className="small text-end closeModal" onClick={closeModal}>
                <i class="fa-solid fa-xmark"></i>
              </h1>
              <div className="modal-body">
                <div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                      Edit Your Post
                    </label>
                    <EmojiPopUp f={addEmoji} />
                    <textarea
                      autoFocus
                      onChange={(e) => setInput(e.target.value)}
                      className="form-control"
                      id=""
                      cols="30"
                      rows="10"
                      value={input}
                    />
                  </div>
                  <button onClick={editPost} className="btn t-btn">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default EditPost;
