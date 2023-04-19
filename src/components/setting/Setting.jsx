import "./Setting.css";
import BasicInfo from "./BasicInfo";
import Contacts from "./Contacts";
import Education from "./Education";

function Setting() {
  return (
    <div className="settings py-4">
      <div className="container">
        <BasicInfo />
        <Contacts />
        <Education />
      </div>
    </div>
  );
}

export default Setting;
