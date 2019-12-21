import * as React from "react";

interface ErrorMessageProps {
  errors: any;
  name: any;
}

const FormErrorMessage = ({ errors, name }: ErrorMessageProps) => {
  if (!errors[name])
    return <small data-testid="form-error-message-none"></small>;
  return (
    <small style={{ color: "red" }} data-testid="form-error-message">
      {errors[name].message}
    </small>
  );
};
export default FormErrorMessage;
