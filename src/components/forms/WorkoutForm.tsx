import * as React from "react";
import _ from "lodash";
import useFrom from "react-hook-form";
import { useDispatch } from "react-redux";
import { Difficulty } from "../../utils/types";
import { Workout, Exercise, create } from "../../ducks/workoutDuck";

interface WorkoutFormProps {}

const WorkoutForm: React.FC = ({}: WorkoutFormProps) => {
  const dispatch = useDispatch();
  const [exercises, setExercises] = React.useState<number>(1);
  const [day, setDay] = React.useState<number>(1);
  const { handleSubmit, register } = useFrom();

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(create(data));
  };

  const createArrayWithNumbers = (length: number) => {
    return Array.from({ length }, (_, k) => k + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Create New Workout</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          ref={register({ required: "required" })}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          ref={register}
          className="form-control"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select name="difficulty" className="form-control">
          {_.map(Difficulty, i => {
            return <option value={i}>{_.capitalize(i)}</option>;
          })}
        </select>
      </div>

      <div className="form-row">
        <div className="col-md-8">
          <label htmlFor="setDay">Day</label>
          <select className="form-control" name="setDay">
            {_.times(day, d => {
              return (
                <option value={d} key={d} id={d.toString()}>
                  {d}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col">
          <button
            className="btn btn-primary form-control"
            onClick={() => setDay(day + 1)}
          >
            Add Day
          </button>
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={() => setDay(day - 1)}>
            Remove Day
          </button>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => setExercises(exercises + 1)}
      >
        Add Exercise
      </button>

      {createArrayWithNumbers(exercises).map(index => {
        return (
          <>
            <div className="form-row">
              <div className="col-md-6">
                <label htmlFor="exercise-name">Exercise Name</label>
                <input
                  type="text"
                  className="form-control"
                  name={`exercise[${index}]`}
                  placeholder={"Exercise Name"}
                  ref={register}
                />
              </div>
              <div className="col">
                <label htmlFor="exercise-sets">Sets</label>
                <input
                  type="number"
                  className="form-control"
                  name={`sets`}
                  ref={register}
                  min="1"
                  max="100"
                />
              </div>
              <div className="col">
                <label htmlFor="exercise-reps">Repititions</label>
                <input
                  type="number"
                  className="form-control"
                  name={`repetitions`}
                  ref={register}
                  min="1"
                  max="100"
                />
              </div>
              <div className="col">
                <label htmlFor="exercise-day">Day</label>
                <input
                  type="number"
                  className="form-control"
                  name={`day`}
                  ref={register}
                  min="1"
                  max={day}
                />
              </div>
            </div>
          </>
        );
      })}
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default WorkoutForm;
