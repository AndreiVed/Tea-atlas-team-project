import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showLoginRequiredModal: false
  },
  reducers: {
    updateShowLoginRequiredModal(state, action: PayloadAction<boolean>) {
      state.showLoginRequiredModal = action.payload;
    }
  }
})

export const { updateShowLoginRequiredModal } = modalSlice.actions;
export default modalSlice.reducer;