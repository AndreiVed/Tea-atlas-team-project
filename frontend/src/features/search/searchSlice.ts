import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    showSearch: false,
  },
  reducers: {
    changeShowSearch(state, action: PayloadAction<boolean>) {
      state.showSearch = action.payload;
    }
  }
});

export default searchSlice.reducer;
export const { changeShowSearch } = searchSlice.actions;