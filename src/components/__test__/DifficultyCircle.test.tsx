import * as React from "react";
import { render } from "@testing-library/react";
import { DifficultyCircle } from "..";

test("default - beginner", () => {
  const { getByTestId } = render(<DifficultyCircle difficulty={3} />);
  const diffEl = getByTestId("difficulty-test");
  expect(diffEl).toBeDefined();
});

test("default - beginner", () => {
  const { getByTestId, getByText } = render(
    <DifficultyCircle text difficulty={3} />
  );
  const diffEl = getByTestId("difficulty-test");
  expect(diffEl).toBeDefined();
  const textEl = getByText("Advanced");
  expect(textEl).toBeDefined();
});
