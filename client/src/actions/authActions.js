import axios from "axios";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

import jwt from "jwt-simple";
import { JWT_KEY } from "../utils/constants";

// Login - Get User Token

export const loginUser = user => dispatch => {
  const encoded = jwt.encode(user, JWT_KEY);
  setAuthToken(encoded);
  // console.log(encoded);
  axios
    .get("/api/users/auth/google")
    .then(res => {
      console.log(res);

      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt.decode(token, JWT_KEY);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: err
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const updateProfile = (id, postData) => dispatch => {
  console.log(postData);

  axios
    .post(`/api/users/update/${id}`, postData)
    .then(res => {
      console.log(res);
      if (res.errors) {
        return {
          type: GET_ERRORS,
          payload: res.data.message
        };
      } else {
        dispatch(setCurrentUser(res.data));
      }
    })
    .catch(err => console.log(err));
};

export const updateDisplayName = (id, postData) => dispatch => {
  axios
    .post(`/api/users/update/display${id}`, postData)
    .then(res => {
      console.log(res);
      if (!res.success) {
        return {
          type: GET_ERRORS,
          payload: res.data.message
        };
      } else {
        dispatch(setCurrentUser(res.data));
      }
    })
    .catch(err => console.log(err));
};

// Log user out
export const logoutUser = () => dispatch => {
  console.log("logout please");
  // // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // // Remove auth header for future requests
  setAuthToken(false);
  // // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
