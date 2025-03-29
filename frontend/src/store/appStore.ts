import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import cursorReducer from '../features/cursor/cursorSlice';
import filterReducer from '../features/filter/filterSlice';
import formsReducer from '../features/forms/formsSlice';
import productsReducer from '../features/products/productsSlice';
import profileReducer from '../features/profile/profileSlice';
import searchReducer from '../features/search/searchSlice';

export const appStore = configureStore({
  reducer: {
    filter: filterReducer,
    products: productsReducer,
    forms: formsReducer,
    profile: profileReducer,
    cursor: cursorReducer,
    search: searchReducer,
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