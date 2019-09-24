import axios from "../settings";
import Cookies from "js-cookie";

import {
  READ_COMMENTS,
  READ_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  OPER_COMMENT_ERR
} from "./types";

/** Read all comments */
export const readComments = () => {
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.get("/api/comments", {
        headers: { "x-auth": `Bearer ${token}` }
      });
      dispatch({
        type: READ_COMMENTS,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_COMMENT_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};

/** Read one comment by id */
export const readComment = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/comments/${id}`);
      dispatch({
        type: READ_COMMENT,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_COMMENT_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};

/** Update a comment */
export const updateComment = (id, data) => {
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.patch(`/api/comments/${id}`, data, {
        headers: { "x-auth": `Bearer ${token}` }
      });
      dispatch({
        type: UPDATE_COMMENT,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_COMMENT_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};

/** Delete a comment */
export const deleteComment = id => {
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.delete(`/api/comments/${id}`, {
        headers: { "x-auth": `Bearer ${token}` }
      });
      dispatch({
        type: DELETE_COMMENT,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_COMMENT_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};
