import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Detail = () => {
  const { id } = useParams();
  const workouts = useSelector(state => _.get(state, ["workouts", "users"]));

  let workout;
  if (id !== undefined) {
    workout = workouts[_.findIndex(workouts, { id: parseInt(id) })];
  }
  console.log(workout);
  return (
    <div className="container">
      <h1>{workout.name}</h1>
      <Link to={`/user/${workout.user.username}`}>
        <span>by: {workout.user.username}</span>
      </Link>
      <span>yes</span>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Reviews</Tab>
          <Tab>Comments</Tab>
          <Tab>Variants</Tab>
        </TabList>

        <TabPanel>
          <h2>{workout.description}</h2>

          {!_.isEmpty(workout.exercises) &&
            _.map(workout.exercises, exercise => {
              return <div>{exercise.name}</div>;
            })}
        </TabPanel>
        <TabPanel>
          <h2>yes</h2>
          <form>
            <div className="form-group">
              <textarea name="review" className="form-control"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </TabPanel>
        <TabPanel>
          <h3>yes</h3>
        </TabPanel>
        <TabPanel>
          <h3>YES</h3>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Detail;
