import * as React from "react";
import { storiesOf } from "@storybook/react";
import ExerciseButton from "../components/ExerciseButton";

const stories = storiesOf("ExerciseButton", module);

stories.add("default", () => {
  return <ExerciseButton sets={5} onClick={() => console.log("yes")} />;
});
