import * as React from "react";
import { render } from "@testing-library/react";
import { Avatar } from "..";

test("footer test", () => {
  const { getByTestId, getByAltText } = render(<Avatar name={"t"} size={32} />);
  const linkElement = getByTestId("avatar-test");
  expect(linkElement).toBeDefined();
  const textElement = getByAltText("t");
  expect(textElement).toBeDefined();
});
