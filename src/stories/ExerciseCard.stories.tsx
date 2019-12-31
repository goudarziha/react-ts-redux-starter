import * as React from "react";
import { storiesOf } from "@storybook/react";
import ExerciseCard from "../components/ExerciseCard";

const stories = storiesOf("ExerciseCArd", module);

stories.add("default", () => {
  return (
    <ExerciseCard sets={5} repititions={5} name={"Deadlift"} weight={250} />
  );
});
