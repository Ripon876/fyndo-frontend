import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import socket from "../../socket/socket";
import Toast from "../../utils/ToastAlert";

function Contacts() {
  const [cookies, setCookie] = useCookies([]);
  const user = jwt_decode(cookies.token);
  const [contacts, setContacts] = useState({
    phone_num: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    socket.emit("getUserInfo", user.id, (res) => {
      if (res.status) {
        setContacts({
          phone_num: res.data?.contacts?.phone_num ?? "",
          email: res.data?.contacts?.email ?? "",
          address: res.data?.contacts?.address ?? "",
        });
      }
    });
  }, []);

  const saveContacts = () => {
    if (Object.values(contacts).some((i) => i !== "")) {
      socket.emit("saveContacts", user.id, contacts, (res) => {
        if (res.status) {
          setContacts({
            phone_num: res.data?.contacts?.phone_num,
            email: res.data?.contacts?.email,
            address: res.data?.contacts?.address,
          });
          Toast({
            type: "success",
            icon: "success",
            title: "Contacts updated",
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
    <div className="row mt-5">
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
                  defaultValue={contacts?.phone_num}
                  onChange={(e) => {
                    setContacts({ ...contacts, phone_num: e.target.value });
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
