import * as React from "react";
import useForm from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePassword } from "../ducks/authDuck";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const onSubmit = ({ old_password, new_password }: any) => {
    dispatch(changePassword(old_password, new_password));
  };
  return (
    <div>
      <h1>password change form!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="old_password">Old Password</label>
          <input
            className="form-control"
            type="password"
            name="old_password"
            ref={register}
          />
        </div>
        <div className="form-group">
          <label htmlFor="new_password">New Password</label>
          <input
            className="form-control"
            type="password"
            name="new_password"
            ref={register}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
