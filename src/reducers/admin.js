import {
  READ_ADMINS,
  CREATE_ADMIN,
  UPDATE_ADMIN,
  DELETE_ADMIN,
  FIND_ADMIN,
  RESET_PASSWORD
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case READ_ADMINS:
      return [...action.payload.data];
    case CREATE_ADMIN:
      return [...state, action.payload.data];
    case UPDATE_ADMIN:
      return state.map(admin => {
        if (admin._id === action.payload.data._id) {
          return {
            ...admin,
            ...action.payload.data
          };
        } else {
          return {
            ...admin
          };
        }
      });
    case FIND_ADMIN:
      return [action.payload.data];
    case RESET_PASSWORD:
      return [action.payload.data];
    case DELETE_ADMIN:
      return state.filter(admin => {
        return admin._id !== action.payload.data._id;
      });
    default:
      return state;
  }
};
