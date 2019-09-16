import axios from '../settings';
import Cookies from 'js-cookie';

import {
	CREATE_CATEGORY,
	DELETE_CATEGORY,
	UPDATE_CATEGORY,
	READ_CATEGORIES,
	READ_CATEGORY,
	OPER_CATEGORY_ERR
} from './types';

/** Create a category */
export const createCategory = (data) => {
	return async(dispatch) => {
		try {
			const token = Cookies.get('admin_token');
			const response = await axios.post(
				'/api/categories',
				data, 
				{ headers: {'x-auth': `Bearer ${token}`}}
			);
			dispatch({
				type: CREATE_CATEGORY,
				payload: response.data
			});
		} catch(e) {
			dispatch({
				type: OPER_CATEGORY_ERR,
				payload: e.response ? e.response.data : e.message
			})
		}
	}
}

/** Delete a category by id */
export const deleteCategory = (id) => {
	return async(dispatch) => {
		try {
      const token = Cookies.get('admin_token');
      const response = await axios.delete(
				`/api/categories/${id}`, 
				{ headers: {'x-auth': `Bearer ${token}`} });
      dispatch({
        type: DELETE_CATEGORY,
        payload: response.data
      }); 
    } catch(e) {
      dispatch({
        type: OPER_CATEGORY_ERR,
        payload: e.response ? e.response.data : e.message
      })
    }
	}
}

/** Update a category by id */
export const updateCategory = (id, data) => {
	return async(dispatch) => {
		try {
			const token = Cookies.get('admin_token');
			const response = await axios.patch(
				`/api/categories/${id}`,
				data,
				{ headers: {'x-auth': `Bearer ${token}`} }
			);
			dispatch({
				type: UPDATE_CATEGORY,
				payload: response.data
			})
		} catch(e) {
			dispatch({
				type: OPER_CATEGORY_ERR,
				payload: e.response ? e.response.data : e.message
			})
		}
	}
}

/** Read all categories */
export const readCategories = () => {
	return async (dispatch) => {
    try {
      const response = await axios.get('/api/categories');
      dispatch({
        type: READ_CATEGORIES,
        payload: response.data 
      }); 
    } catch(e) {
      dispatch({
        type: OPER_CATEGORY_ERR,
        payload: e.response ? e.response.data : e.message
      })
    }
  }
}

/** Read a category by id */
export const readCategory = (id) => {
	return async (dispatch) => {
    try {
      const response = await axios.get(`/api/categories/${id}`);
      dispatch({
        type: READ_CATEGORY,
        payload: response.data 
      }); 
    } catch(e) {
      dispatch({
        type: OPER_CATEGORY_ERR,
        payload: e.response ? e.response.data : e.message
      })
    }
  }
}