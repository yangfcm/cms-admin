import {  
	OPER_CATEGORY_ERR,
	OPER_POST_ERR
} from '../actions/types';

const INITIAL_STATE = {
	type: null,
	error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case OPER_CATEGORY_ERR: 
      return {
				...INITIAL_STATE,
				type: 'category',
				error: action.payload
			};
		case OPER_POST_ERR: 
			return {
				...INITIAL_STATE,
				type: 'post',
				error: action.payload
			};
    default: 
      return state;
  }
}