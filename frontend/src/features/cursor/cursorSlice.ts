import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cursorSlice = createSlice({
  name: "cursor",
  initialState: {
    cursorType: "small" as "small" | "big",
  },

  reducers: {
    changeCursorType(state, action: PayloadAction<"small" | "big">) {
      state.cursorType = action.payload;
    },
  },
});

export default cursorSlice.reducer;

export const { changeCursorType } = cursorSlice.actions;
