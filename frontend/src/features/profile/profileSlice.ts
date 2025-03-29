import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditingDetails } from "../../types/EditingDetails";
import { UserInfo } from "../../types/UserInfo";

type SetUserInfo = { info: keyof UserInfo; value: string };
type SetDetails = { field: keyof EditingDetails; value: boolean };

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userInfo: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    } as UserInfo,

    editingDetails: {
      name: false,
      email: false,
      password: false,
    } as EditingDetails,
  },
  reducers: {
    updateUserInfo(state, action: PayloadAction<SetUserInfo>) {
      state.userInfo[action.payload.info] = action.payload.value;
    },

    updateEditingDetails(state, action: PayloadAction<SetDetails>) {
      state.editingDetails[action.payload.field] = action.payload.value;
    },
  },
});

export default profileSlice.reducer;
export const { updateEditingDetails } = profileSlice.actions;
