import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";

const Detail = () => {
  const { id } = useParams();

  const workout = useSelector(state => {
    _.get(state, ["workouts", "users"]);
  });
  return <div>{id}</div>;
};

export default Detail;
