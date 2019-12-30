import * as React from "react";
import * as _ from "lodash";
import { Redirect, Link } from "react-router-dom";
import useForm from "react-hook-form";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { register as RegisterCall, sendConfirmEmail } from "../ducks/authDuck";

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<string>("");
  const { handleSubmit, register, watch, errors } = useForm({
    mode: "onChange"
  });

  const { isAuthenticated } = useSelector(
    state => ({
      isAuthenticated: _.get(state, ["auth", "isAuthenticated"])
    }),
    shallowEqual
  );

  if (isAuthenticated) {
    dispatch(sendConfirmEmail());
    return <Redirect to="/dashboard" />;
  }
  const onSubmit = (data: any) => {
    setEmail(data.email);
    dispatch(RegisterCall(data.username, data.email, data.password));
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-8">
          <div className="my-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Register</h1>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  ref={register({
                    required: "Required",
                    minLength: 3
                  })}
                />
                {errors.username && errors.username.message}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  ref={register({
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "invalid email address"
                    }
                  })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  ref={register({ required: "Required", minLength: 8 })}
                />
                {errors.password && errors.password.message}
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password2"
                  ref={register({
                    required: "Required",
                    validate: value => {
                      return value === watch("password");
                    }
                  })}
                />
                {errors.password2 && errors.password2.message}
              </div>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
            <div className="d-flex justify-content-start my-1">
              <Link to="/login" className="">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
