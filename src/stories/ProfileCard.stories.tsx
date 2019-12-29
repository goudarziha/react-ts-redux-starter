import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ProfileCard, ProfileForm } from "../components";

const stories = storiesOf("ProfileCard", module);

stories.add("blah", () => {
  return (
    <ProfileCard
      avatar={"yes"}
      bio={"this is a bio of a thing"}
      username={"bob"}
      created={"2019-12-26 11:13:21.939055"}
      email={"email"}
    />
  );
});
