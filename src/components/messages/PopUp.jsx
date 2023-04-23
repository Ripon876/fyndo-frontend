import React from "react";
import ClickOutside from "react-click-outside";

function PopUp({ imgSrc, closePopUP }) {
  return (
    <div className="img-popup">
      <div className="popUpContent">
        <ClickOutside onClickOutside={closePopUP}>
          <div>
            <i className="fa fa-xmark mb-2 clearImg" onClick={closePopUP}></i>
            <div className="w-75 m-auto">
              <img src={imgSrc} className="img-fluid" alt="" />
            </div>
          </div>
        </ClickOutside>
      </div>
    </div>
  );
}

export default PopUp;
