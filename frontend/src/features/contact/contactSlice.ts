import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { contactFormDefaults } from "../../constants/formsInitials";
import { ContactForm } from "../../types/ContactForm";

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contactForm: contactFormDefaults as ContactForm,
  },
  reducers: {
    updateContactForm(state, action: PayloadAction<Partial<ContactForm>>) {
      state.contactForm = {
        ...state.contactForm,
        ...action.payload,
      };
    },
  },
});

export default contactSlice.reducer;
export const { updateContactForm } = contactSlice.actions;
