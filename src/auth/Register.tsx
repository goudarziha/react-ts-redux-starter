import * as React from "react";
import useForm from "react-hook-form";

const Register = () => {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
                  ref={register}
                />
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
                  ref={register}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  className="form-control"
                  type="password2"
                  name="password2"
                  ref={register}
                />
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
