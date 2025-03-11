import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "author",
  initialState: {
    isFilterOpened: false,
    selectedFilters: {
      countries: [],
      impacts: [],
      fermentation: [],
    },
  },
  reducers: {
    setIsFilterOpened(state, action) {
      state.isFilterOpened = action.payload;
    },
  },
});

export const { setIsFilterOpened } = filterSlice.actions;
export default filterSlice.reducer;
