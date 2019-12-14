import * as React from "react";
import { render } from "@testing-library/react";
import { Footer } from ".";

test("footer test", () => {
  const { getByTestId } = render(<Footer />);
  const linkElement = getByTestId("footer-test");
  expect(linkElement).toBeDefined();
});
