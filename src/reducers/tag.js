import {
	CREATE_TAG,
	DELETE_TAG, 
	UPDATE_TAG,
	READ_TAGS,
	READ_TAG
} from '../actions/types';

export default (state = [], action) => {
	switch(action.type) {
		case CREATE_TAG:
			return [...state, action.payload.data];
		case DELETE_TAG:
			return state.filter((tag) => {
				return tag._id !== action.payload.data._id;
			});
		case UPDATE_TAG:
			return state.map((tag) => {
				if(tag._id === action.payload.data._id) {
					return {
						...tag,
						...action.payload.data
					};
				} else {
					return {
						...tag
					};
				}
			});
		case READ_TAGS:
			return [...action.payload.data];
		case READ_TAG:
			return [action.payload.data];
		default:
			return state;
	}
}