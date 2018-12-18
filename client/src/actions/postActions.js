import axios from "axios";
import {
  ADD_POST,
  GET_POSTS,
  GET_POST_BY_ID,
  GET_ERRORS,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS,
  UPLOADING,
  SHOW_UPLOAD_PANEL,
  LOADING_COMPLETE
} from "./types";

//add post
export const addPost = (postData, history) => dispatch => {
  console.log("postData", postData);
  dispatch(togglePostUpload(true));
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res => {
      dispatch(togglePostUpload(false));
      dispatch({
        type: SHOW_UPLOAD_PANEL,
        payload: false
      });

      dispatch({
        type: ADD_POST,
        payload: res.data
      });

      history.push(`/post/${res.data._id}`);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const togglePostUpload = bool => dispatch => {
  dispatch({
    type: UPLOADING,
    payload: bool
  });
};

//get all posts
export const getPosts = page => dispatch => {
  dispatch(setPostLoading());
  dispatch(clearErrors());
  axios
    .get(`/api/posts/?page=${page}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get posts by details
export const getPostsByDetails = (query, page) => dispatch => {
  dispatch(setPostLoading());
  dispatch(clearErrors());
  axios
    .get(`/api/posts/details/query${query}&page=${page}`)
    .then(res => {
      console.log("res", res);
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      // console.log("err", { err });
      dispatch(setLoadingComplete());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get post by tag
export const getPostsByTag = (tag, page) => dispatch => {
  dispatch(setPostLoading());
  dispatch(clearErrors());
  console.log("getPostsByTag", tag);
  axios
    .get(`/api/posts/tag/${tag}?page=${page}`)
    .then(res => {
      console.log("ther are no errors");
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("there are the errors");
      dispatch(setLoadingComplete());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//SINGLE POST
export const getPostById = id => dispatch => {
  dispatch(setPostLoading());
  dispatch(clearErrors());
  console.log("get post by id id", id);
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
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

export const getPostsByUser = (id, page) => dispatch => {
  dispatch(setPostLoading());
  dispatch(clearErrors());
  console.log("getPostsByUser", id);
  axios
    .get(`/api/posts/user/${id}?page=${page}`)
    .then(res => {
      dispatch({
        type: GET_POSTS,
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

export const setLoadingComplete = () => {
  console.log("loading complete");
  return {
    type: LOADING_COMPLETE
  };
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
