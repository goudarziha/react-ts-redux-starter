import * as React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  const user = useSelector(state => _.get(state, ["auth", "user"]));
  return (
    <div className="container">
      <h1>PROFILE!</h1>
      <div className="card">
        <div className="card-body">{user.username}</div>
      </div>
    </div>
  );
};
export default Profile;
