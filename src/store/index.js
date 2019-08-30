import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import postReducer from '../reducers/post';
import categoryReducer from '../reducers/category';
import errorReducer from '../reducers/error';
import { reducer as formReducer } from 'redux-form';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			form: formReducer,
			post: postReducer,
			category: categoryReducer,
			error: errorReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);
	return store;
}

const store = configStore();

export default store;