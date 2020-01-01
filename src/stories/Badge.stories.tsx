import * as React from "react";
import { storiesOf } from "@storybook/react";
import Badge from "../components/Badge";
import _ from "lodash";
import { BadgeType } from "../utils/types";

const stories = storiesOf("Badge", module);

stories.add("default", () => {
  return <Badge text={"test"} />;
});

stories.add("danger", () => {
  return <Badge text={"test"} type={BadgeType.DANGER} />;
});

stories.add("warning", () => {
  return <Badge text={"test"} type={BadgeType.WARNING} />;
});
