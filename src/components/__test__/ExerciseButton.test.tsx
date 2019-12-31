import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ExerciseButton } from "..";

test("default", () => {
  const { getByTestId } = render(
    <ExerciseButton sets={5} onClick={() => true} />
  );
  const diffEl = getByTestId("exercise-button");
  expect(diffEl).toBeDefined();
});

test("test text", () => {
  const { getByTestId, getByText } = render(
    <ExerciseButton sets={5} onClick={() => true} />
  );
  const diffEl = getByTestId("exercise-button");
  expect(diffEl).toBeDefined();
  const textEl = getByText("0");
  expect(textEl).toBeDefined();
});

test("test click", () => {
  const { getByTestId, getByText } = render(
    <ExerciseButton sets={5} onClick={() => true} />
  );
  const diffEl = getByTestId("exercise-button");
  expect(diffEl).toBeDefined();
  const textEl = getByText("0");
  expect(textEl).toBeDefined();
  fireEvent.click(diffEl);
  const newTextEl = getByText("1");
  expect(newTextEl).toBeDefined();
});
