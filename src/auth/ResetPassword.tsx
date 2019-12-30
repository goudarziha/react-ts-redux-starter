import * as React from "react";
import _ from "lodash";
import useForm from "react-hook-form";
import { FormErrorMessage } from "../components";
import { requestPasswordReset } from "../ducks/authDuck";
import { useDispatch } from "react-redux";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const [sent, setSent] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<String>();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (data: any) => {
    setEmail(data.email);
    setSent(true);
    dispatch(requestPasswordReset(data.email));
  };

  if (sent) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8">
            <div className="my-5">
              <div className="mt-3">
                <h1>Reset Password</h1>

                <h4>Your request has been emailed to {email}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-8">
          <div className="my-5">
            <div className="mt-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Reset Password</h1>
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
                  <FormErrorMessage errors={errors} name="email" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
