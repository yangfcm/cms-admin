import axios from "../settings";
import Cookies from "js-cookie";

import {
  CREATE_ADMIN,
  READ_ADMINS,
  UPDATE_ADMIN,
  DELETE_ADMIN,
  FIND_ADMIN,
  RESET_PASSWORD,
  OPER_ADMIN_ERR
} from "./types";

/** Read all admins  */
export const readAdmins = () => {
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.get("/api/admins", {
        headers: { "x-auth": `Bearer ${token}` }
      });
      dispatch({
        type: READ_ADMINS,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_ADMIN_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};

/** Create an admin */
export const createAdmin = data => {
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.post("/api/admins", data, {
        headers: { "x-auth": `Bearer ${token}` }
      });
      dispatch({
        type: CREATE_ADMIN,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_ADMIN_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};

/** Update an admin */
export const updateAdmin = (id, data) => {
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.patch(`/api/admins/${id}`, data, {
        headers: { "x-auth": `Bearer ${token}` }
      });
      dispatch({
        type: UPDATE_ADMIN,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_ADMIN_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};

/** Delete an admin */
export const deleteAdmin = id => {
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.delete(`/api/admins/${id}`, {
        headers: { "x-auth": `Bearer ${token}` }
      });
      dispatch({
        type: DELETE_ADMIN,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_ADMIN_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};

/** Find an admin by email or username */
export const findAdmin = findBy => {
  return async dispatch => {
    try {
      const { email, username } = findBy;
      const token = Cookies.get("admin_token");
      let response;
      if (email) {
        response = await axios.get(`/api/admins?email=${email}`, {
          headers: { "x-auth": `Bearer ${token}` }
        });
      }
      if (username) {
        response = await axios.get(`/api/admins?username={username}`, {
          headers: { "x-auth": `Bearer ${token}` }
        });
      }
      dispatch({
        type: FIND_ADMIN,
        payload: response ? response.data : null
      });
    } catch (e) {
      dispatch({
        type: OPER_ADMIN_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};

/** Reset password */
export const resetPassword = data => {
  const { id, password } = data;
  return async dispatch => {
    try {
      const token = Cookies.get("admin_token");
      const response = await axios.post(
        `/api/admins/resetPassword`,
        { id, password },
        {
          headers: { "x-auth": `Bearer ${token}` }
        }
      );
      dispatch({
        type: RESET_PASSWORD,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: OPER_ADMIN_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};
