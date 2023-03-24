import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userApi from '../features/user/services';
import userReducer from '../features/user/userSlice';
import preferenceReducer from '../features/preference/preferenceSlice';

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
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware)
});

export default store;