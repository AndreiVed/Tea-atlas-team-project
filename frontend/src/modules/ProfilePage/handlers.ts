import { ChangeEvent } from "react";
import { API_ENDPOINTS } from "../../endpoints";
import { updateUserInfo } from "../../features/profile/profileSlice";
import { AppDispatch } from "../../store/appStore";
import { UserInfo } from "../../types/UserInfo";

export const handleFileSelect = (
  e: ChangeEvent<HTMLInputElement>,
  userInfo: UserInfo,
  token: string,
  dispatch: AppDispatch,
) => {
  const formData = new FormData();

  const file = e.target.files?.item(0);
  formData.append("avatar", file as File);

  // map through userInfo to fill formData w everything we have in userInfo
  Object.entries(userInfo).forEach(([key, value]) => {
    formData.append(key, value);
  });

  fetch(API_ENDPOINTS.auth.changeUserData, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        return;
      }

      return response.json();
    })
    .then((data: UserInfo) => {
      dispatch(updateUserInfo(data));
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data));
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};
