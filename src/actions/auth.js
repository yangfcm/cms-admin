import axios from '../settings';

import {
	LOGIN,
	LOGOUT,
	LOGIN_ERR,
	LOGOUT_ERR
} from './types';

export const login = (data, callback) => {
	return async(dispatch) => {
		try {
			const response = await axios.post('/api/admins/login', data);
			const token = response.get('x-auth');
			// const aid = response.data.admin._id;			
			dispatch({
				type: LOGIN,
				payload: response.data
			});
			Cookies.set('admin_token', token);	// Save admin token to cookies
			callback();
		} catch(e) {
			dispatch({
				type: LOGIN_ERR,
				payload: e.message
			})
		}
	};
}

export const logout = (callback) => {
	return async (dispatch) => {
		try {
			const token = Cookies.get('admin_token');
			const response = await axios.post('/api/admins/logout', null, {
				headers: {'x-auth': `Bearer ${token}`}
			});
			dispatch({
				type: LOGOUT,
				payload: response.data
			});
			callback();
		} catch(e) {
			dispatch({
				type: LOGOUT_ERR,
				payload: e.message
			})
		}
	} 
}