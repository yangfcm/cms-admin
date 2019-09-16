import axios from '../settings';
import Cookies from 'js-cookie';

import {
	LOGIN,
	LOGOUT,
	LOGIN_ERR,
	LOGOUT_ERR,
	CHECK_AUTH,
	CHECK_AUTH_ERR
} from './types';

export const login = (data, callback) => {
	return async(dispatch) => {
		try {
			const response = await axios.post('/api/admins/login', data);
			const { token } = response.data.data;
			Cookies.set('admin_token', token);	// Save admin token to cookies
			// const aid = response.data.admin._id;			
			dispatch({
				type: LOGIN,
				payload: response.data
			});
			callback();
		} catch(e) {  
			dispatch({
				type: LOGIN_ERR,
				payload: e.response.data
			})
		}
	};
}

export const logout = (callback) => {
	return async (dispatch) => {
		try {
			const token = Cookies.get('admin_token');
			const response = await axios.post('/api/admins/logout', {
				headers: {'x-auth': `Bearer ${token}`}
			});
			dispatch({
				type: LOGOUT,
				payload: response.data
			});
			if(callback) {
				callback();
			}
		} catch(e) {
			dispatch({
				type: LOGOUT_ERR,
				payload: e.response.data
			})
		}
	} 
}

/** Check the validity of token and get current admin info */
export const checkAuth = () => {
	const token = Cookies.get('admin_token');
	if(!token) {
		return {
			type: CHECK_AUTH_ERR,
			payload: 'No token available'
		};
	}

	return async (dispatch) => {
		try {
			const response = await axios.get('/api/admins/me', {
				headers: {'x-auth': `Bearer ${token}`}
			});
			dispatch({
				type: CHECK_AUTH,
				payload: response.data
			})
		}catch(e) {
			dispatch({
				type: CHECK_AUTH_ERR,
				payload: e.response ? e.response.data : e.message
			})
		}
	}
}