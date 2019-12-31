import * as React from "react";
import { ExerciseButton } from ".";

interface ExerciseCardProps {
  sets: number;
  repititions: number;
  name: string;
  weight: number;
}

const ExerciseCard = ({
  sets,
  repititions,
  name,
  weight
}: ExerciseCardProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5>{name}</h5>
          <h5>{`${sets}x${repititions}`}</h5>
          <h5>{weight}</h5>
        </div>
        <div style={{ display: "inline-flex" }}>
          {Array.from(Array(sets), (e, i) => {
            return <ExerciseButton sets={sets} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
