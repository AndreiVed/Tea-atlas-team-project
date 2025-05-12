import { createSlice, PayloadAction } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { PasswordRequirements } from "../../types/PasswordRequirements";
=======
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
import { RegistrationForm } from "../../types/RegistrationForm";

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

<<<<<<< HEAD
    passwordRequirements: {
      isMinLength: false,
      isLetterTyped: false,
      isNumberTyped: false,
    } as PasswordRequirements,

=======
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
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

<<<<<<< HEAD
    updatePasswordRequirements(
      state,
      action: PayloadAction<PasswordRequirements>
    ) {
      state.passwordRequirements = action.payload;
    },

=======
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
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
<<<<<<< HEAD
  updatePasswordRequirements,
=======
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
  updateSignUpError,
  updateConfirmationEmail,
} = registrationSlice.actions;
