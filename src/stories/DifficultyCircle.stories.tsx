import * as React from "react";
import { storiesOf } from "@storybook/react";
import DifficultyCircle from "../components/DifficultyCircle";

const stories = storiesOf("PasswordInput", module);

stories.add("Advance /w text", () => {
  return (
    <div className="mt-5">
      <DifficultyCircle difficulty={3} text />
    </div>
  );
});

stories.add("Beginner", () => {
  return (
    <div className="mt-5">
      <DifficultyCircle difficulty={1} />
    </div>
  );
});
