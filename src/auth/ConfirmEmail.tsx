import * as React from "react";
import _ from "lodash";
import { useParams, Redirect, useHistory } from "react-router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { confirmEmail } from "../ducks/authDuck";

const ConfirmEmail: React.FC = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(confirmEmail(token));
  }, []);

  const { isConfirmed } = useSelector(
    state => ({
      isConfirmed: _.get(state, ["auth", "user", "confirmed"])
    }),
    shallowEqual
  );

  const mounted = React.useRef<boolean>();
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (isConfirmed) {
        setTimeout(() => {
          history.push("/dashboard");
        }, 5000);
      }
    }
  }, [isConfirmed]);

  return <div className="container"></div>;
};
export default ConfirmEmail;
