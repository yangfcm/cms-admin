import {
	CREATE_POST,
	DELETE_POST,
	UPDATE_POST,
	READ_POSTS,
	READ_POST,
	CLEAR_POST
} from '../actions/types';

export default (state = [], action) => {
	switch(action.type) {
		case CREATE_POST:
			return [...state, action.payload.data];
		case DELETE_POST:
			return state.filter((post) => {
				return post._id !== action.payload.data._id;
			});
		case UPDATE_POST:
			return state.map((post) => {
				if(post._id === action.payload.data._id) {
					return {
						...post,
						...action.payload.data
					};
				} else {
					return {
						...post
					};
				}
			});
		case READ_POSTS:
			return [...action.payload.data];
		case READ_POST:
			return [action.payload.data];
		case CLEAR_POST:
			return [];
		default: 
			return state;
	}
}