import axios from "axios";
import { string } from "prop-types";
import { useDispatch } from "react-redux";

const createPostRequest = (
  action: string,
  url: string,
  data: Object,
  config: any,
  dispatch: any
) => {
  dispatch({ type: action, payload: "yes" });
  axios
    .post(url, data, config)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export { createPostRequest };
