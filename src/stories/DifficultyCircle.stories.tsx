import * as React from "react";
import { storiesOf } from "@storybook/react";
import DifficultyCircle from "../components/DifficultyCircle";

const stories = storiesOf("DifficultyCircle", module);

stories.add("default", () => {
  return <DifficultyCircle size={40} difficulty={3} />;
});

stories.add("text", () => {
  return <DifficultyCircle size={40} text difficulty={3} />;
});

stories.add("beginner", () => {
  return <DifficultyCircle size={40} text difficulty={1} />;
});
