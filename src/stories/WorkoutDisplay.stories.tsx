import * as React from "react";
import _ from "lodash";
import { storiesOf } from "@storybook/react";
import { WorkoutDisplay } from "../components";

const stories = storiesOf("WorkoutDisplay", module);

stories.add("blah", () => {
  const exercises = [
    {
      name: "yes",
      sets: 4,
      repititions: 4,
      day: 2
    },
    {
      name: "another one",
      sets: 5,
      repititions: 2,
      day: 1
    }
  ];

  return (
    <div>
      {_.map(
        _.sortBy(exercises, x => x.day),
        x => {
          return (
            <WorkoutDisplay
              name={x.name}
              sets={x.sets}
              repititions={x.repititions}
              day={x.day}
            />
          );
        }
      )}
    </div>
  );
});
