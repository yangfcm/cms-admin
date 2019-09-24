import {
  OPER_CATEGORY_ERR,
  OPER_POST_ERR,
  OPER_TAG_ERR,
  OPER_COMMENT_ERR,
  OPER_PROFILE_ERR,
  CLEAR_ERR
} from "../actions/types";

const INITIAL_STATE = {
  type: null,
  errorMsg: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPER_CATEGORY_ERR:
      return {
        ...INITIAL_STATE,
        type: "category",
        errorMsg: action.payload.message
      };
    case OPER_POST_ERR:
      return {
        ...INITIAL_STATE,
        type: "post",
        errorMsg: action.payload.message
      };
    case OPER_TAG_ERR:
      return {
        ...INITIAL_STATE,
        type: "tag",
        errorMsg: action.payload.message
      };
    case OPER_COMMENT_ERR:
      return {
        ...INITIAL_STATE,
        type: "comment",
        errorMsg: action.payload.message
      };
    case OPER_PROFILE_ERR:
      return {
        ...INITIAL_STATE,
        type: "profile",
        errorMsg: action.payload.message
      };
    case CLEAR_ERR:
      return {
        ...INITIAL_STATE,
        type: null,
        errorMsg: ""
      };
    default:
      return state;
  }
};
