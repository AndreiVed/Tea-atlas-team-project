import { PasswordRequirements } from "@/types/PasswordRequirements";
import { RegistrationForm } from "@/types/RegistrationForm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const registrationSlice = createSlice({
  name: "register",
  initialState: {
    registrationForm: {
      email: "",
      password1: "",
      password2: "",
      first_name: "",
      last_name: "",
    } as RegistrationForm,

    registrationErrors: {
      email: "",
      password1: "",
      password2: "",
      first_name: "",
      last_name: "",
    } as RegistrationForm,

    passwordRequirements: {
      isMinLength: false,
      isLettersTyped: false,
      isNumberTyped: false,
    } as PasswordRequirements,

    signUpError: "",

    confirmationEmail: localStorage.getItem("confirmationEmail") || "",
  },
  reducers: {
    updateRegistrationForm(
      state,
      action: PayloadAction<Partial<RegistrationForm>>
    ) {
      state.registrationForm = {
        ...state.registrationForm,
        ...action.payload,
      };
    },

    updateRegistrationErrors(
      state,
      action: PayloadAction<Partial<RegistrationForm>>
    ) {
      state.registrationErrors = {
        ...state.registrationErrors,
        ...action.payload,
      };
    },

    updatePasswordRequirements(
      state,
      action: PayloadAction<PasswordRequirements>
    ) {
      state.passwordRequirements = action.payload;
    },

    updateSignUpError(state, action: PayloadAction<string>) {
      state.signUpError = action.payload;
    },

    updateConfirmationEmail(state, action: PayloadAction<string>) {
      state.confirmationEmail = action.payload;
    },
  },
});

export default registrationSlice.reducer;

export const {
  updateRegistrationForm,
  updateRegistrationErrors,
  updatePasswordRequirements,
  updateSignUpError,
  updateConfirmationEmail,
} = registrationSlice.actions;
