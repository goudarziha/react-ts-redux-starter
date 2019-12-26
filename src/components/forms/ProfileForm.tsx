import * as React from "react";
import * as _ from "lodash";
import useForm from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../ducks/authDuck";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register, setValue } = useForm();

  const { first_name, last_name, bio } = useSelector(state => ({
    first_name: _.get(state, ["auth", "user", "first_name"]),
    last_name: _.get(state, ["auth", "user", "last_name"]),
    bio: _.get(state, ["auth", "user", "bio"])
  }));

  React.useEffect(() => {
    setValue("first_name", first_name);
    setValue("last_name", last_name);
    setValue("bio", bio);
  });

  const onSubmit = ({ first_name, last_name, bio }: any) => {
    dispatch(update(first_name, last_name, bio));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          name="avatar"
          ref={register}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          className="form-control"
          type="text"
          name="first_name"
          ref={register}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          className="form-control"
          type="text"
          name="last_name"
          ref={register}
        />
      </div>
      <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <textarea className="form-control" name="bio" ref={register}></textarea>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default ProfileForm;
