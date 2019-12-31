import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PasswordInput } from "..";

test("Password Input Default", () => {
  const { getByTestId } = render(<PasswordInput />);
  const passElement = getByTestId("password-input");
  expect(passElement).toBeDefined();
  const iconEl = getByTestId("password-icon");
  expect(iconEl).toBeDefined();
});

test("Password Input click", () => {
  const { getByTestId } = render(<PasswordInput />);
  const passElement = getByTestId("password-input");
  expect(passElement).toBeDefined();
  const iconEl = getByTestId("password-icon");
  expect(iconEl).toBeDefined();
  //   expect(iconEl).toHaveStyle("color: gray");
  //   fireEvent.click(iconEl);
  //   expect(iconEl).toHaveStyle("color: black");
});
