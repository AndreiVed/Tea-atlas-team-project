import { API_ENDPOINTS } from "@/constants/endpoints";
import { updateUserInfo } from "@/features/profile/profileSlice";
import { fetchWithAuth } from "@/handlers/fetchWithAuth";
import { AppDispatch } from "@/store/appStore";
import { UserInfo } from "@/types/UserInfo";
import { ChangeEvent } from "react";

export const handleFileSelect = (
  e: ChangeEvent<HTMLInputElement>,
  userInfo: UserInfo,
  access: string,
  dispatch: AppDispatch
) => {
  const formData = new FormData();

  const file = e.target.files?.item(0);
  formData.append("avatar", file as File);

  // map through userInfo to fill formData w everything we have in userInfo
  Object.entries(userInfo).forEach(([key, value]) => {
    formData.append(key, value);
  });

  fetchWithAuth(
    API_ENDPOINTS.auth.changeUserData,
    {
      method: "PATCH",
      body: formData,
    },
    access,
    dispatch
  ).then((data) => {
    dispatch(updateUserInfo(data as UserInfo));
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(data));
  });
};
