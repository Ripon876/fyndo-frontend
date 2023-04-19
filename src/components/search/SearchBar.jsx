import React from "react";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div>
      <div className="container py-3">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-5 col-md-2">
            <div>
              <img src="./logo.png" alt="Fyndo Logo" className="img-fluid" />
            </div>
          </div>
          <div className="col-9 col-md-6">
            <div className="form">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control form-input"
                placeholder="Search anything..."
              />
              <span className="left-pan">
                <i className="fa fa-microphone"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
