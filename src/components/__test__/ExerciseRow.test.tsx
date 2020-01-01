import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ExerciseRow } from "..";
import { workout } from "../../utils/testModels";

test("default", () => {
  const { getByTestId } = render(<ExerciseRow workout={workout} />);
  const diffEl = getByTestId("exercise-row");
  expect(diffEl).toBeDefined();
});
