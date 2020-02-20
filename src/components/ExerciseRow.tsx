/** @jsx jsx */
import * as React from "react";
import _ from "lodash";
import { DifficultyCircle, Badge } from ".";
import { Link } from "react-router-dom";
import { Workout } from "../ducks/workoutDuck";
import { jsx, css } from "@emotion/core";

interface ExerciseRowProps {
  workout: Workout;
  style?: any;
}

const ExerciseRow = ({ workout, style }: ExerciseRowProps) => {
  const {
    name,
    tags,
    created,
    user,
    difficulty,
    reviews,
    comments,
    exercises,
    liked
  } = workout;
  console.log(tags);
  return (
    <div className="w-75 mb-3" data-testid="exercise-row">
      <div
        className="card"
        css={[
          css`
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
              0 3px 6px rgba(0, 0, 0, 0.23);
          `,
          style
        ]}
      >
        <div className="d-flex flex-row justify-content-between m-2">
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <h5>{name}</h5>
              {_.map(tags, tag => {
                return <Badge text={_.get(tag, ["name"])} />;
              })}
            </div>
            <small>{/* Updated {created} by {user.username} */}</small>
            <div className="d-flex flex-row">
              {/* <small>{reviews.length} Reviews</small> */}
              <small>
                {/* {comments.length} */}
                <i className="fa fa-comment ml-1" aria-hidden="true"></i>
              </small>
              <small>
                {liked} <i className="fa fa-heart" aria-hidden="true"></i>
              </small>
              <small>
                {/* {exercises.length} */}
                Exercises
              </small>
            </div>
          </div>
          <div
            className="align-items-center h-100"
            style={{ alignSelf: "center" }}
          >
            <DifficultyCircle difficulty={difficulty} size={48} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseRow;
