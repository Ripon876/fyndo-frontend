import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import Institute from "./Institute";
import { Circle2 } from "react-preloaders2";
import { ShowError, ShowSuceess } from "../../utils/Alerts";

function Education({ user }) {
  const [formsList, setFormsList] = useState([]);
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

  useEffect(() => {
    setInstitutes(user?.education);
  }, [user]);

  const query = gql`
    mutation UpdateUser($education: String) {
      updateUser(education: $education) {
        firstName
      }
    }
  `;

  const [updateInfo, { data, loading, error }] = useMutation(query);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = [...data.entries()];
    console.log(parseData(values));
    updateInfo({ variables: { education: JSON.stringify(parseData(values)) } });
  };

  return (
    <div className="row mt-5">
      {loading && <Circle2 color={"#9ca3af"} />}
      {error && <ShowError />}
      {error && <ShowError />}
      {data && <ShowSuceess msg="Education details updated" />}
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
