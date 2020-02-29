import * as React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ProfileCard } from "../components";

const User = () => {
  const { username } = useParams();
  const user = useSelector(state =>
    _.find(_.get(state, ["user", "users"]), { username: username })
  );

  return (
    <div>
      <h1>USER!</h1>
      {user && (
        <ProfileCard
          avatar={user.avatar}
          bio={user.bio}
          username={user.username}
          created={user.created}
        />
      )}
      hello {username}
    </div>
  );
};
export default User;
