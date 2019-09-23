import {
  LOGIN,
  LOGOUT,
  LOGIN_ERR,
  LOGOUT_ERR,
  CHECK_AUTH,
  CHECK_AUTH_ERR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERR,
  CLEAR_AUTH_ERR
} from "../actions/types";

const INITIAL_STATE = {
  auth: null,
  error: null,
  changePasswordErr: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        auth: action.payload,
        error: null,
        changePasswordErr: null
      };
    case LOGOUT:
      return {
        ...state,
        auth: null,
        error: null,
        changePasswordErr: null
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: action.payload
      };
    case LOGOUT_ERR:
      return {
        ...state,
        error: action.payload
      };
    case CHECK_AUTH:
      return {
        ...state,
        auth: action.payload,
        error: null,
        changePasswordErr: null
      };
    case CHECK_AUTH_ERR:
      return {
        ...state,
        error: action.payload
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        error: null,
        changePasswordErr: null
      };
    case CHANGE_PASSWORD_ERR:
      return {
        ...state,
        error: null,
        changePasswordErr: action.payload
      };
    case CLEAR_AUTH_ERR:
      return {
        ...state,
        error: null,
        changePasswordErr: null
      };
    default:
      return state;
  }
};
