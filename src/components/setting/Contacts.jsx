import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Circle2 } from "react-preloaders2";
import { ShowError, ShowSuceess } from "../../utils/Alerts";

function Contacts({ user }) {
  const [contacts, setContacts] = useState({
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    setContacts({
      phone: user?.phone,
      email: user?.email,
      address: user?.address,
    });
 
  }, [user]);

  const query = gql`
    mutation UpdateUser($phone: String!, $email: String!, $address: String!) {
      updateUser(phone: $phone, email: $email, address: $address) {
        firstName
        lastName
        bio
      }
    }
  `;

  const [updateInfo, { data, loading, error }] = useMutation(query);

  const saveContacts = () => {
    if (Object.values(contacts).some((i) => i !== "")) {
      updateInfo({ variables: { ...contacts } });
    }
  };

  return (
    <div className="row mt-5">
      {loading && <Circle2 color={"#9ca3af"} />}
      {error && <ShowError />}
      {error && <ShowError />}
      {data && <ShowSuceess msg="Contact details updated" />}
      <div className="col-10 m-auto">
        <div className="row">
          <div className=" settingSections col-12 col-md-8 p-5">
            <h4 className="border-start ps-2 mb-4">
              <strong>Contacts</strong>
            </h4>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <div className="d-flex gap-3">
                <input
                  type="number"
                  defaultValue={contacts?.phone}
                  onChange={(e) => {
                    setContacts({ ...contacts, phone: e.target.value });
                  }}
                  className="form-control"
                  placeholder="number"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="d-flex gap-3">
                <input
                  type="email"
                  defaultValue={contacts?.email}
                  onChange={(e) => {
                    setContacts({ ...contacts, email: e.target.value });
                  }}
                  className="form-control"
                  placeholder="email"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <div className="d-flex gap-3">
                <input
                  type="text"
                  defaultValue={contacts?.address}
                  onChange={(e) => {
                    setContacts({ ...contacts, address: e.target.value });
                  }}
                  className="form-control"
                  placeholder="address"
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={saveContacts}
              className="btn formSubBtn"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
