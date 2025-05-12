import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import contactReducer from '../features/contact/contactSlice';
import cursorReducer from '../features/cursor/cursorSlice';
import filterReducer from '../features/filter/filterSlice';
import loginReducer from '../features/login/loginSlice';
import passwordReducer from '../features/password/passwordSlice';
import productsReducer from '../features/products/productsSlice';
import profileReducer from '../features/profile/profileSlice';
import registrationReducer from '../features/registration/registrationSlice';
import searchReducer from '../features/search/searchSlice';

export const appStore = configureStore({
  reducer: {
    filter: filterReducer,
    products: productsReducer,
    profile: profileReducer,
    cursor: cursorReducer,
    search: searchReducer,
    registration: registrationReducer,
    login: loginReducer,
    password: passwordReducer,
    contact: contactReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;