import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import authReducer from "../reducers/auth";
import postReducer from "../reducers/post";
import categoryReducer from "../reducers/category";
import tagReducer from "../reducers/tag";
import commentReducer from "../reducers/comment";
import errorReducer from "../reducers/error";
import { reducer as formReducer } from "redux-form";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      form: formReducer,
      post: postReducer,
      category: categoryReducer,
      tag: tagReducer,
      comment: commentReducer,
      error: errorReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

const store = configStore();

export default store;
