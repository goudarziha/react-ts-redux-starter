import * as React from "react";
import { render } from "@testing-library/react";
import { FormErrorMessage } from "..";

test("Form Error Message - no errors", () => {
  const errors = {
    text: ""
  };
  const { getByTestId } = render(
    <FormErrorMessage errors={errors} name="email" />
  );
  const linkElement = getByTestId("form-error-message-none");
  expect(linkElement).toBeDefined();
});

test("Form Error Message - w/ errors", () => {
  const errors = {
    email: {
      message: "yes"
    }
  };
  const { getByTestId, getByText } = render(
    <FormErrorMessage errors={errors} name="email" />
  );
  const linkElement = getByTestId("form-error-message");
  expect(linkElement).toBeDefined();
  const textElement = getByText("yes");
  expect(textElement).toBeVisible();
});
