import * as React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import ExerciseRow from "../components/ExerciseRow";
import { Link } from "react-router-dom";

const Main = () => {
  const workouts = useSelector(state => _.get(state, ["workouts", "users"]));

  return (
    <div>
      <h1>Workouts</h1>
      {_.map(workouts, (workout, index) => {
        return (
          <div key={index}>
            <Link
              to={`/detail/${workout.id}`}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ExerciseRow workout={workout} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Main;
