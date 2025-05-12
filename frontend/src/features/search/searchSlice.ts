import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    showSearch: false,
  },
  reducers: {
    updateShowSearch(state, action: PayloadAction<boolean>) {
      state.showSearch = action.payload;
    }
  }
});

export default searchSlice.reducer;
export const { updateShowSearch } = searchSlice.actions;