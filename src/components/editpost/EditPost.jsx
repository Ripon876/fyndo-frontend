import { useState, useEffect } from "react";
import { Fade } from "react-reveal";
import EmojiPopUp from "../newpost/EmojiPopUp";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Circle2 } from "react-preloaders2";
import { ShowError, ShowSuceess } from "../../utils/Alerts";

function EditPost({ id, setShowModal }) {
  const [input, setInput] = useState("");

  const addEmoji = (e) => {
    setInput(input + e.native);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const query = gql`
    query GetPost($id: ID!) {
      post(id: $id) {
        content
      }
    }
  `;

  const { loading, error, data } = useQuery(query, {
    variables: { id: id },
  });

  useEffect(() => {
    console.log(error);
    if (data) {
      console.log(data);
      setInput(data.post.content);
    }
  }, [data, error]);

  const upQuery = gql`
    mutation UpdatePost($id: ID!, $content: String!) {
      updatePost(id: $id, content: $content) {
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

  const [updatePost, { data: upData, loading: upLoading, error: upError }] =
    useMutation(upQuery);

  const editPost = () => {
    updatePost({
      variables: {
        id,
        content: input,
      },
    });
  };
  if (upData || upError) {
    setShowModal(false);
  }

  return (
    <>
      <Fade duration={500}>
        <div
          className="modal d-block row"
          id="exampleModalCenter"
          tabindex="-1"
        >
          {(error || upError) && <ShowError />}
          {upData && <ShowSuceess msg="Post Edited successfully" />}
          {(loading || upLoading) && <Circle2 color={"#9ca3af"} />}
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
