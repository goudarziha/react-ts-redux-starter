import * as React from "react";
import { storiesOf } from "@storybook/react";
import Avatar from "../components/Avatar";

const stories = storiesOf("Avatar", module);

stories.add("default", () => {
  return <Avatar name="bob" />;
});

stories.add("Url", () => {
  return <Avatar name="bob" url="https://via.placeholder.com/32" />;
});
