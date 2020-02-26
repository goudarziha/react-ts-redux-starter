import * as React from "react";
import _ from "lodash";

// export interface Exercise extends Array<Exercise> {
//   name: string;
//   sets: number;
//   repititions: number;
//   day: number;
// }

export const WorkoutDisplay = (props: any) => {
  const { name, sets, repititions, day } = props;
  return (
    <div className="card" style={{ marginBottom: 15 }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5>{name}</h5>
          <p>
            {sets} x {repititions}{" "}
          </p>
          <p>{day}</p>
        </div>
      </div>
    </div>
  );
};
