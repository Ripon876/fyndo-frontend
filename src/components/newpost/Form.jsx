import { useState, useEffect } from "react";
import { Fade } from "react-reveal";
import EmojiPopUp from "../../utils/EmojiPopUp";
import { useMutation } from "@apollo/client";
import { ShowError, ShowSuceess } from "../../utils/Alerts";
import { Circle2 } from "react-preloaders2";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_POST } from "../../queries/post";

function Form({ close, profile }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);

  const addEmoji = (e) => {
    setInput(input + e.native);
  };

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const post = () => {
    if (input !== "") {
      createPost({ variables: { content: input } });
    }
  };

  useEffect(() => {
    if (data?.createPost) {
      setInput("");
      close();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [data]);

  return (
    <>
      <Fade duration={350}>
        <div
          className="modal d-block row"
          id="exampleModalCenter"
          tabindex="-1"
        >
          {loading && <Circle2 color={"#9ca3af"} />}
          {error && <ShowError />}
          {data && <ShowSuceess msg="Post created" />}
          <div
            className="col-md-7 col-sm-10 m-auto modal-dialog-centered px-5"
            role="document"
          >
            <div className="modal-content p-3">
              <h1 className="small text-end closeModal" onClick={close}>
                <i class="fa-solid fa-xmark"></i>
              </h1>
              <div className="modal-body">
                <div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                      Write what you want
                    </label>
                    <i className="fa-solid fa-image float-end addImgToPost"></i>
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
                    <div class="mt-2">
                      <img
                        src="https://via.placeholder.com/200x200"
                        class="img-thumbnail m-1"
                        style={{
                          width: "70px",
                          backgroundColor: "#121212",
                          border: "1px solid #121212",
                        }}
                      />
                    </div>
                  </div>
                  <button onClick={post} className="btn t-btn">
                    Post
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

export default Form;
