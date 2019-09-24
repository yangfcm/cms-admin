import { CHANGE_PASSWORD } from "../actions/types";

const INITIAL_STATE = {
  profile: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};
