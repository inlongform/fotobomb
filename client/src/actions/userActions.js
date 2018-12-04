import { GET_ERRORS, GET_USERS, SHOW_UPLOAD_PANEL } from "./types";
import axios from "axios";

export const getUsers = () => dispatch => {
  axios
    .get("/api/v1/users")
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const toggleUploadPanel = bool => dispatch => {
  console.log("hello");
  dispatch({
    type: SHOW_UPLOAD_PANEL,
    payload: bool
  });
};
