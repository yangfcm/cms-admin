import {
	LOGIN,
	LOGOUT,
	LOGIN_ERR,
	LOGOUT_ERR
} from '../actions/types';

const INITIAL_STATE = {
	auth: null,
	loginErr: null,
	logoutErr: null
}

export default(state = INITIAL_STATE, action) => {
	switch(action.type) {
		case LOGIN:
			return { 
				...state, 
				auth: action.payload, 
				loginErr: null, 
				logoutErr: null };
		case LOGOUT:
			return { 
				...state, 
				auth: null,
				loginErr: null,
				logoutErr: null };
		case LOGIN_ERR:
			return {
				...state,
				loginErr: action.payload
			}
		case LOGOUT_ERR: 
			return {
				...state,
				logoutErr: action.payload
			}
		default: 
			return INITIAL_STATE;
	}
}
