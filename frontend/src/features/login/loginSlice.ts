import { LoginForm } from "@/types/LoginForm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginForm: {
      email: "",
      password: "",
    } as LoginForm,

    loginError: "",
  },
  reducers: {
    updateLoginForm(state, action: PayloadAction<Partial<LoginForm>>) {
      state.loginForm = {
        ...state.loginForm,
        ...action.payload,
      };
    },

    updateLoginError(state, action: PayloadAction<string>) {
      state.loginError = action.payload;
    }
  },
});

export default loginSlice.reducer;
export const { updateLoginForm, updateLoginError } = loginSlice.actions;
export const loginActions = loginSlice.actions;
