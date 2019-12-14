import * as React from "react";
import { useDispatch } from "react-redux";
import authDuck from "../ducks/authDuck";
import { Link } from "react-router-dom";
import useForm from "react-hook-form";

const Login = () => {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: "onChange"
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8">
            <div className="my-5">
              <div className="mt-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Login</h1>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>

                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      ref={register}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      ref={register}
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
                <div className="d-flex justify-content-start my-1">
                  <Link to="/register" className="">
                    Don't have an account?
                  </Link>
                </div>
                <div className="d-flex justify-content-start my-1">
                  <Link to="/forgot-password" className="">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
