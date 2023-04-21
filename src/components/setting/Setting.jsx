import { useQuery, gql } from "@apollo/client";
import "./Setting.css";
import BasicInfo from "./BasicInfo";
import Contacts from "./Contacts";
import Education from "./Education";



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
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  return (
    <div className="settings py-4">
      <div className="container">
        <BasicInfo user={data?.user} />
        <Contacts user={data?.user} />
        <Education user={data?.user} />
      </div>
    </div>
  );
}

export default Setting;
