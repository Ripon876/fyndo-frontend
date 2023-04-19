import { useState, useEffect, useRef } from "react";
import { Picker } from "emoji-mart";
import data from "@emoji-mart/data";
import ClickOutside from "react-click-outside";

function EmojiPopUp({ f, children }) {
  const [showEmojis, setShowEmojis] = useState(false);

  function EmojiPicker(props) {
    const ref = useRef();

    useEffect(() => {
      new Picker({ ...props, data, ref });
    }, []);

    return (
      <div
        className={`position-absolute emojiPicker ${
          children ? "emojiInmsg" : ""
        }`}
        ref={ref}
      />
    );
  }

  const closePopUp = () => {
    setShowEmojis(false);
  };

  return (
    <>
      <button
        className="button float-end"
        onClick={() => setShowEmojis(!showEmojis)}
      >
        {children ? (
          children
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>

      <ClickOutside onClickOutside={closePopUp}>
        {showEmojis && (
          <div>
            <EmojiPicker onEmojiSelect={f} />
          </div>
        )}
      </ClickOutside>
    </>
  );
}

export default EmojiPopUp;
