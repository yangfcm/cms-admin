import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userApi from '../features/user/services';
import userReducer from '../features/user/userSlice';
import preferenceReducer from '../features/preference/preferenceSlice';
import blogReducer from '../features/blog/blogSlice';
import blogApi from '../features/blog/services';
import categoryApi from '../features/category/services';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = configureStore({
  reducer: {
    user: userReducer,
    preference: preferenceReducer,
    blog: blogReducer,
    [userApi.reducerPath]: userApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    [
      userApi.middleware,
      blogApi.middleware,
      categoryApi.middleware,
    ]
  )
});

export default store;