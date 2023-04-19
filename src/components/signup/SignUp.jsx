import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../../utils/ToastAlert";

function SignUp() {
  const [first_name, setFn] = useState("");
  const [last_name, setLn] = useState("");
  const [username, setUn] = useState("");
  const [password, setPwd] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (first_name && password && username) {
      axios
        .post(
          process.env.REACT_APP_HOST + "/signup",
          {
            first_name,
            last_name,
            username,
            password,
          }
          // { withCredentials: true }
        )

        .then((data) => {
          Toast({
            type: "success",
            icon: "success",
            title: "Signup Successful",
          });
          navigate("/login");
        })
        .catch((err) => {
          if (err && err.response.status === 406) {
            Toast({
              type: "warning",
              icon: "warning",
              title: "Username already exits",
            });
          } else {
            Toast({
              type: "error",
              icon: "error",
              title: "Something went wrong",
            });
          }
        });
    }
  };

  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div
                      className="card-back"
                      style={{ backgroundImage: "url(form-bg.svg)" }}
                    >
                      <div className="center-wrap">
                        <div className="section text-center">
                          <form onSubmit={handleSubmit}>
                            <img
                              src="./logo.png"
                              alt="Fyndo Logo"
                              className="img-fluid w-75"
                            />
                            <h4 className="mb-4 pb-3 text-white">Sign Up</h4>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-style"
                                onChange={(e) => {
                                  setFn(e.target.value);
                                }}
                                placeholder="First Name"
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group  mt-2">
                              <input
                                type="text"
                                className="form-style"
                                onChange={(e) => {
                                  setLn(e.target.value);
                                }}
                                placeholder="Last Name"
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="text"
                                className="form-style"
                                onChange={(e) => {
                                  setUn(e.target.value);
                                }}
                                placeholder="Username"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                className="form-style"
                                onChange={(e) => {
                                  setPwd(e.target.value);
                                }}
                                placeholder="Password"
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="subBtn mt-4">
                              submit
                            </button>
                            <p className="mb-0 mt-4 text-center">
                              {" "}
                              <span className="form-footer">
                                Already have an account ?{" "}
                              </span>{" "}
                              <Link to="/login" className="link">
                                {" "}
                                Login
                              </Link>
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
