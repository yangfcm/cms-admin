import axios from "../settings";
import Cookies from "js-cookie";

import {
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  READ_POSTS,
  READ_POST,
  OPER_POST_ERR,
  CLEAR_POST
} from "./types";

/**
 * Create a post
 */
export const createPost = postData => {
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.post("/api/posts", postData, {
        headers: { "x-auth": `Bearer ${token}` }
      });
      dispatch({
        type: CREATE_POST,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_POST_ERR,
        payload: e.message
      });
    }
  };
};

/** Delete a post by id */
export const deletePost = id => {
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.delete(`/api/posts/${id}`, {
        headers: { "x-auth": `Bearer ${token}` }
      });
      dispatch({
        type: DELETE_POST,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_POST_ERR,
        payload: e.message
      });
    }
  };
};

/** Read all posts */
export const readPosts = () => {
  return async dispatch => {
    try {
      const response = await axios.get("/api/posts?all=all");
      dispatch({
        type: READ_POSTS,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_POST_ERR,
        payload: e.message
      });
    }
  };
};

/** Read a post by id */
export const readPost = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      dispatch({
        type: READ_POST,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_POST_ERR,
        payload: e.message
      });
    }
  };
};

/** Update a post by id */
export const updatePost = (id, data) => {
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.patch(`/api/posts/${id}`, data, {
        headers: { "x-auth": token }
      });
      dispatch({
        type: UPDATE_POST,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_POST_ERR,
        payload: e.message
      });
    }
  };
};

/** Clear data in post reducer */
export const clearPost = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_POST
    });
  };
};
