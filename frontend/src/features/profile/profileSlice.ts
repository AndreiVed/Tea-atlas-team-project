import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditingDetails } from "../../types/EditingDetails";
import { EditingForm } from "../../types/EditingForm";
import { EditingPassword } from "../../types/EditingPassword";
import { UserInfo } from "../../types/UserInfo";

type SetDetails = { field: keyof EditingDetails; value: boolean };

const localUser = localStorage.getItem("user");

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoggedIn: localUser ? true : false,

    userInfo: localUser
      ? JSON.parse(localUser)
      : ({
          id: "",
          first_name: "",
          last_name: "",
          email: "",
          avatar: "",
        } as UserInfo),

    editingDetails: {
      name: false,
      email: false,
      password: false,
    } as EditingDetails,

    editingForm: {
      first_name: "",
      last_name: "",
      email: "",
    } as EditingForm,

    editingPassword: {
      new_password1: "",
      new_password2: "",
    } as EditingPassword,

    token: localStorage.getItem("token") || "",
  },
  reducers: {
    updateIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },

    updateUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    },

    updateEditingDetails(state, action: PayloadAction<SetDetails>) {
      state.editingDetails[action.payload.field] = action.payload.value;
    },

    updateEditingPassword(state, action: PayloadAction<EditingPassword>) {
      state.editingPassword = action.payload;
    },

    updateEditingForm(state, action: PayloadAction<EditingForm>) {
      state.editingForm = action.payload;
    },

    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export default profileSlice.reducer;

export const {
  updateIsLoggedIn,
  updateEditingDetails,
  updateEditingPassword,
  updateEditingForm,
  updateUserInfo,
  updateToken,
} = profileSlice.actions;
