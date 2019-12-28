import * as React from "react";
import { storiesOf } from "@storybook/react";
import Header from "../components/Header";

const stories = storiesOf("Header", module);

stories.add("guest", () => {
  return <Header />;
});

stories.add("auth", () => {
  return <Header />;
});
