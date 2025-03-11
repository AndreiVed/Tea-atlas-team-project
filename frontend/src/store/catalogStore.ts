import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import filterReducer from '../features/filter/filterSlice';

export const catalogStore = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

export type AppDispatch = typeof catalogStore.dispatch;
export type RootState = ReturnType<typeof catalogStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;