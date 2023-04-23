import { useQuery, gql } from "@apollo/client";
import { Circle2 } from "react-preloaders2";
import "./Setting.css";
import BasicInfo from "./BasicInfo";
import Contacts from "./Contacts";
import Education from "./Education";
import { useEffect } from "react";

function Setting() {
  const query = gql`
    {
      user {
        firstName
        lastName
        bio
        email
        phone
        address
        education {
          name
          status
        }
      }
    }
  `;

  const { loading, data } = useQuery(query);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [data?.user]);

  return (
    <div className="settings py-4">
      {loading && <Circle2 color={"#9ca3af"} />}
      <div className="container">
        <BasicInfo user={data?.user} />
        <Contacts user={data?.user} />
        <Education user={data?.user} />
      </div>
    </div>
  );
}

export default Setting;
