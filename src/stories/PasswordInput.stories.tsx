import * as React from "react";
import { storiesOf } from "@storybook/react";
import PasswordInput from "../components/PasswordInput";

const stories = storiesOf("PasswordInput", module);

stories.add("default", () => {
  return (
    <div className="mt-5">
      <PasswordInput className={"form-control"} />
    </div>
  );
});
