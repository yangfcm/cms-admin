import {
	CREATE_CATEGORY,
	DELETE_CATEGORY,
	UPDATE_CATEGORY,
	READ_CATEGORIES,
	READ_CATEGORY,
} from '../actions/types';

export default (state = [], action) => {
	switch(action.type) {
		case CREATE_CATEGORY:
			return [...state, action.payload.data];

		case DELETE_CATEGORY:
			return state.filter((category) => {
				return category._id !== action.payload.data._id;
			});

		case UPDATE_CATEGORY:
			return state.map((category) => {
				if(category._id === action.payload.data._id) {
					return {
						...category,
						...action.payload.data
					}
				}
			});

		case READ_CATEGORIES:
			return [...action.payload.data];

		case READ_CATEGORY:
			return [action.payload.data];
		
		default: 
			return state;
	}
}