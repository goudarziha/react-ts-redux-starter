import * as React from "react";
import { storiesOf } from "@storybook/react";
import ExerciseRow from "../components/ExerciseRow";
import { Workout } from "../ducks/workoutDuck";
import {
  testUser,
  sampleExercises,
  comments,
  reviews
} from "../utils/testModels";

const stories = storiesOf("ExerciseRow", module);

stories.add("default", () => {
  const workout: Workout = {
    name: "Example Workout Sample",
    user: testUser,
    difficulty: 3,
    tags: ["test1", "test2", "test3"],
    created: "2019-12-31T21:42:47.912Z",
    exercises: sampleExercises,
    comments: comments,
    reviews: reviews,
    rating: 5,
    liked: 10
  };
  return <ExerciseRow workout={workout} />;
});

stories.add("list", () => {
  const workout: Workout = {
    name: "Example Workout Sample",
    user: testUser,
    difficulty: 3,
    tags: ["test1", "test2", "test3"],
    created: "2019-12-31T21:42:47.912Z",
    exercises: sampleExercises,
    comments: comments,
    reviews: reviews,
    rating: 5,
    liked: 10
  };
  const workout2: Workout = {
    name: "Example Workout Sample",
    user: testUser,
    difficulty: 3,
    tags: ["test1", "test2", "test3"],
    created: "2019-12-31T21:42:47.912Z",
    exercises: sampleExercises,
    comments: comments,
    reviews: reviews,
    rating: 5,
    liked: 10
  };

  return (
    <div>
      <ExerciseRow workout={workout} />
      <ExerciseRow workout={workout2} />
    </div>
  );
});
