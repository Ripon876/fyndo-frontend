import { useState } from "react";

function Institute({ institute }) {
  const [show, setShow] = useState(true);

  const removeForm = (e) => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="d-flex gap-3">
          <div className=" w-75">
            <label className="form-label">Name</label>
            <input
              defaultValue={institute ? institute.name : ""}
              type="text"
              name="name"
              required
              className="form-control"
              placeholder="School / Collage name"
            />
          </div>
          <div className=" w-25">
            <label className="form-label">Status</label>
            <select name="status" class="form-select form-select mb-3" required>
              <option selected>select</option>
              <option
                value="Currently In"
                selected={
                  institute && institute.status == "Currently In" ? true : false
                }
              >
                Currently In
              </option>
              <option
                value="Went out"
                selected={
                  institute && institute.status == "Went out" ? true : false
                }
              >
                Went out
              </option>
            </select>
          </div>
          <div
            className="clearInput"
            onClick={(e) => {
              removeForm(e);
            }}
          >
            <i className="fa-solid fa-x"></i>
          </div>
        </div>
      )}
    </>
  );
}

export default Institute;
