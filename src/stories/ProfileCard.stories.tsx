import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ProfileCard, ProfileForm } from "../components";

const stories = storiesOf("ProfileCard", module);

stories.add("blah", () => {
  return (
    <ProfileCard
      avatar={"yes"}
      username={"bob"}
      created={"yes"}
      email={"email"}
    />
  );
});
