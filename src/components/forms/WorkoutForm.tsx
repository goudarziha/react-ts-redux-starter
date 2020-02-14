import * as React from "react";
import _ from "lodash";
import useFrom from "react-hook-form";
import { useDispatch } from "react-redux";
import { Difficulty } from "../../utils/types";
import Select from "react-select";
import { Workout, Exercise, create } from "../../ducks/workoutDuck";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const WorkoutForm: React.FC = () => {
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
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          name="tags"
          ref={register({})}
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
        <select name="difficulty" className="form-control" ref={register}>
          {_.map(Difficulty, i => {
            return (
              <option value={i} key={i}>
                {_.capitalize(i)}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-row">
        <div className="col-md-8">
          <label htmlFor="setDay">Day</label>

          {day}
          <input type="hidden" name="days" ref={register} value={day} />
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
          <div className="form-row" key={index}>
            <div className="col-md-6">
              <label htmlFor="exercise-name">Exercise Name</label>
              <input
                type="text"
                className="form-control"
                name={`exercises[${index}].name`}
                placeholder={"Exercise Name"}
                ref={register}
              />
            </div>
            <div className="col">
              <label htmlFor="exercise-sets">Sets</label>
              <input
                type="number"
                className="form-control"
                name={`exercises[${index}].sets`}
                ref={register}
                min="1"
                value={1}
                max="100"
                onChange={() => _.noop()}
              />
            </div>
            <div className="col">
              <label htmlFor="exercise-reps">Repititions</label>
              <input
                type="number"
                className="form-control"
                name={`exercises[${index}].repititions`}
                ref={register}
                min="1"
                value={1}
                max="100"
                onChange={() => _.noop()}
              />
            </div>
            <div className="col">
              <label htmlFor="exercise-day">Day</label>
              <input
                type="number"
                className="form-control"
                name={`exercises[${index}].day`}
                ref={register}
                min="1"
                value={1}
                max={day}
                onChange={() => _.noop()}
              />
            </div>
          </div>
        );
      })}

      {_.times(day, d => {
        return <h1 key={d}>{d}</h1>;
      })}

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default WorkoutForm;
