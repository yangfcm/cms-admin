import {
  READ_COMMENTS,
  READ_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case READ_COMMENTS:
      return [...action.payload.data];
    case READ_COMMENT:
      return [action.payload.data];
    case UPDATE_COMMENT:
      return state.map(comment => {
        if (comment._id === action.payload.data._id) {
          return {
            ...comment,
            ...action.payload.data
          };
        } else {
          return {
            ...comment
          };
        }
      });
    case DELETE_COMMENT:
      return state.filter(comment => {
        return comment._id !== action.payload.data._id;
      });
    default:
      return state;
  }
};
