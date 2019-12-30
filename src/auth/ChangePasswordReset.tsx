import * as React from "react";
import _ from "lodash";
import useForm from "react-hook-form";
import { FormErrorMessage } from "../components";
import { useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router";
import { changePasswordResetToken } from "../ducks/authDuck";

const ChangePasswordReset: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [toLogin, setToLogin] = React.useState<boolean>();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (data: any) => {
    setToLogin(true);
    dispatch(changePasswordResetToken(data.token, data.password));
  };

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Change Password</h1>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              ref={register({ required: "Required" })}
            />
            <FormErrorMessage errors={errors} name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              ref={register({ required: "Required" })}
            />
          </div>
          <input type="hidden" name="token" ref={register} value={token} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordReset;
