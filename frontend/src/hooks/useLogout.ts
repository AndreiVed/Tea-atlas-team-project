import { userInfoDefaults } from "@/constants/formsInitials";
import {
  updateIsLoggedIn,
  updateIsReauthRequired,
  updateUserInfo,
} from "@/features/profile/profileSlice";
import { clearTokens } from "@/handlers/clearTokens";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(updateIsReauthRequired(true));
    dispatch(updateIsLoggedIn(false));
    dispatch(updateUserInfo(userInfoDefaults));
    localStorage.removeItem("user");
    localStorage.removeItem("likedProducts");
    clearTokens();

    navigate("/", { state: { reason: "reauth" } });
  };
};
