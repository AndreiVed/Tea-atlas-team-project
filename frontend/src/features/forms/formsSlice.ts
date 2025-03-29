import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginForm } from "../../types/LoginForm";

export const formsSlice = createSlice({
  name: "forms",
  initialState: {
    loginForm: {} as LoginForm,
  },
  reducers: {
    setLoginForm(state, action: PayloadAction<LoginForm>) {
      state.loginForm = action.payload;
    },
  },
});

export default formsSlice.reducer;
export const { setLoginForm } = formsSlice.actions;
