import { PasswordRequirements } from "@/types/PasswordRequirements";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const passwordSlice = createSlice({
  name: "password",
  initialState: {
    passwordRequirements: {
      isMinLength: false,
      isLettersTyped: false,
      isNumberTyped: false,
    } as PasswordRequirements,
  },
  reducers: {
    updatePasswordRequirements(
      state,
      action: PayloadAction<PasswordRequirements>
    ) {
      state.passwordRequirements = action.payload;
    },
  },
});

export default passwordSlice.reducer;
export const { updatePasswordRequirements } =
  passwordSlice.actions;
