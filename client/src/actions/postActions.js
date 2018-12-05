import axios from "axios";
import {
  ADD_POST,
  GET_POSTS,
  GET_POST_BY_ID,
  GET_ERRORS,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";

//add post
export const addPost = (postData, history) => dispatch => {
  // dispatch(clearErrors());

  console.log("postData", postData);

  axios
    .post("/api/posts", postData)
    .then(res => {
      console.log(res);
      // prompt("data", res.data);
      // dispatch({
      //   type: ADD_POST,
      //   payload: {}
      // });
      history.push(`/post/${res.data._id}`);
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get all posts
export const getPosts = page => dispatch => {
  dispatch(setPostLoading());
  console.log("actions page", page);
  axios
    .get(`/api/posts/?page=${page}`)
    .then(res => {
      console.log("reponse", res);
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_POSTS,
        payload: []
      });
    });
};

//get posts by details
export const getPostsByDetails = query => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`/api/posts/details/query${query}`)
    .then(res => {
      console.log("res", res);
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err);
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

//get post by tag
export const getPostsByTag = tag => dispatch => {
  dispatch(setPostLoading());
  console.log("getPostsByTag", tag);
  axios
    .get(`/api/posts/tag/${tag}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//SINGLE POST
export const getPostById = id => dispatch => {
  dispatch(setPostLoading());
  console.log("id", id);
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_POST_BY_ID,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POST_BY_ID,
        payload: null
      })
    );
};

export const getPostsByUser = id => dispatch => {
  dispatch(setPostLoading());
  console.log("getPostsByUser", id);
  axios
    .get(`/api/posts/user/${id}`)
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

//delete post
export const deletePost = id => dispatch => {
  console.log("deletePost", id);

  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
