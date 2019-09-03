import axios from '../settings';
import Cookies from 'js-cookie';

import {
	CREATE_TAG,
	DELETE_TAG, 
	READ_TAGS,
	READ_TAG,
	OPER_TAG_ERR
} from './types';

/**
 * Create a tag
 */
export const createTag = (data, callback) => {
	console.log(data);
	return async(dispatch) => {
		try {
			const token = Cookies.get('admin_token');
			const response = await axios.post(
				'/api/tags',
				data,
				{ headers: {'x-auth': `Bearer ${token}`}}
			);
			dispatch({
				type: CREATE_TAG,
				payload: response.data
			});
			if(callback) {
				callback();
			}
		} catch(e) {
			dispatch({
				type: OPER_TAG_ERR,
				payload: e.response.data
			})
		}
	};
}

/**
 * Delete a tag by id
 */
export const deleteTag = (id) => {
	return async(dispatch) => {
		try {
			const token = Cookies.get('admin_token');
			const response = await axios.delete(
				`/api/tags/${id}`,
				{ headers: {'x-auth': `Bearer ${token}`}}
			);
			dispatch({
				type: DELETE_TAG,
				payload: response.data
			})
		} catch(e) {
			dispatch({
				type: OPER_TAG_ERR,
				payload: e.response.data
			});
		}
	}
};

/**
 * Read all tags
 */
export const readTags = () => {
	return async(dispatch) => {
		try {
			const response = await axios.get('/api/tags');
			dispatch({
				type: READ_TAGS,
				payload: response.data
			});
		} catch(e) {
			dispatch({
				type: OPER_TAG_ERR,
				payload: e.response.data
			});
		}
	}
}

/**
 * Read a tag by id
*/
export const readTag = (id) => {
	return async(dispatch) => {
		try {
			const response = await axios.get(`/api/tags/${id}`);
			dispatch({
				type: READ_TAG,
				payload: response.data
			});
		} catch(e) {
			dispatch({
				type: OPER_TAG_ERR,
				payload: e.response.data
			})
		}
	}
}