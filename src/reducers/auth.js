import {
	LOGIN,
	LOGOUT,
	LOGIN_ERR,
	LOGOUT_ERR,
	CHECK_AUTH,
	CHECK_AUTH_ERR
} from '../actions/types';

const INITIAL_STATE = {
	auth: null,
	error: null
}

export default(state = INITIAL_STATE, action) => {
	switch(action.type) {
		case LOGIN:
			return { 
				...state, 
				auth: action.payload, 
				error: null };
		case LOGOUT:
			return { 
				...state, 
				auth: null,
				error: null
			};
		case LOGIN_ERR:
			return {
				...state,
				error: action.payload
			}
		case LOGOUT_ERR: 
			return {
				...state,
				error: action.payload
			}
		case CHECK_AUTH:
			return {
				...state,
				auth: action.payload,
				error: null
			}
		case CHECK_AUTH_ERR:
			return {
				...state,
				error: action.payload
			}
		default: 
			return INITIAL_STATE;
	}
}
