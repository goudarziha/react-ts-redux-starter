import * as React from "react";
import _ from "lodash";
import useFrom from "react-hook-form";
import { useDispatch } from "react-redux";
import { Difficulty } from "../../utils/types";

interface WorkoutFormProps {}

const WorkoutForm = ({}: WorkoutFormProps) => {
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(0);
  const [exercises, setExercises] = React.useState<{}>();
  const [day, setDay] = React.useState<number[]>([1]);
  const { handleSubmit, register, setValue } = useFrom();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const exerciseRow = () => {
    return (
      <div className="form-group">
        <label htmlFor={count.toString()}>Exercise</label>
        <input
          type="text"
          name={`${count}-exercise`}
          className="form-control"
          ref={register}
        />
      </div>
    );
  };

  const handleAdd = () => {
    setCount(prev => prev + 1);
    setDay(day => [...day, day.length + 1]);
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

      <div className="form-group">
        <label htmlFor="setDay">Day</label>
        <select className="form-control" name="setDay">
          {day.map(d => {
            return (
              <option key={d} id={d.toString()}>
                {d}
              </option>
            );
          })}
        </select>
      </div>

      <button onClick={() => handleAdd()}>Add Day</button>

      {day.map(d => {
        return (
          <div key={d}>
            <h1>{d}</h1>
          </div>
        );
      })}
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default WorkoutForm;
