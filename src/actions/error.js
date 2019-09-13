import { CLEAR_ERR} from './types';

export const clearError = () => {
	return (dispatch) => {
		dispatch({
			type: CLEAR_ERR
		})
	}
};