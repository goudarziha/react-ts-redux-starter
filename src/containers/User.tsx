import * as React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const User = () => {
  const { user } = useParams();
  //   const userData = useSelector(state => _.get())
  return (
    <div>
      <h1>USER!</h1>
      hello {user}
    </div>
  );
};
export default User;
