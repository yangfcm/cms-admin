import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userApi from '../features/user/services';
import userReducer from '../features/user/userSlice';
import preferenceReducer from '../features/preference/preferenceSlice';
import blogReducer from '../features/blog/blogSlice';
import blogApi from '../features/blog/services';

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
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([userApi.middleware])
});

export default store;