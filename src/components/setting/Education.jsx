import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Institute from "./Institute";
import socket from "../../socket/socket";
import Toast from "../../utils/ToastAlert";

function Education() {
  const [formsList, setFormsList] = useState([]);
  const [cookies, setCookie] = useCookies([]);
  const user = jwt_decode(cookies.token);
  const [institutes, setInstitutes] = useState([]);

  const onAddBtnClick = () => {
    setFormsList(formsList.concat(<Institute key={formsList.length} />));
  };

  const parseData = (arr) => {
    var parsedData = [];
    for (var i = 0; i < arr.length / 2 + 1; i++) {
      parsedData[i] = { name: arr[i][1], status: arr[i + 1][1] };
      i++;
    }
    return parsedData.filter((i) => i);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const values = [...data.entries()];
    // console.log(parseData(values))

    socket.emit("saveEducationInfo", user.id, parseData(values), (res) => {
      if (res.status) {
        Toast({
          type: "success",
          icon: "success",
          title: "Education updated",
        });
      } else {
        Toast({
          type: "error",
          icon: "error",
          title: "Something went wrong",
        });
      }
    });
  };

  useEffect(() => {
    socket.emit("getUserInfo", user.id, (res) => {
      if (res.status) {
        setInstitutes(res.data.education);
      }
    });
  }, []);

  return (
    <div className="row mt-5">
      <div className="col-10 m-auto">
        <div className="row">
          <div className="settingSections col-12 col-md-8 p-5">
            <h4 className="border-start ps-2 mb-4">
              <strong>Education</strong>
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                {institutes?.map((institute) => (
                  <Institute institute={institute} />
                ))}

                {formsList && formsList}
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  onClick={onAddBtnClick}
                  className="btn formSubBtn"
                >
                  <i className="fa fa-plus"></i> Add
                </button>
              </div>
              <button type="submit" className="btn formSubBtn">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
