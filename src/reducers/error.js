import {  
	OPER_CATEGORY_ERR,
	OPER_POST_ERR,
	OPER_TAG_ERR,
	CLEAR_ERR,
} from '../actions/types';

const INITIAL_STATE = {
	type: null,
	errorMsg: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case OPER_CATEGORY_ERR: 
      return {
				...INITIAL_STATE,
				type: 'category',
				errorMsg: action.payload.message
			};
		case OPER_POST_ERR: 
			return {
				...INITIAL_STATE,
				type: 'post',
				errorMsg: action.payload
			};
		case OPER_TAG_ERR:
			return {
				...INITIAL_STATE,
				type: 'tag',
				errorMsg: action.payload
			}
		case CLEAR_ERR:
			return {
				...INITIAL_STATE,
				type: null,
				errorMsg: ''
			}
    default: 
      return state;
  }
}