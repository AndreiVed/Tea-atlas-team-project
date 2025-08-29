import { updateAccessToken } from "@/features/profile/profileSlice";
import { useLogout } from "@/hooks/useLogout";
import { RootState } from "@/store/appStore";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS } from "../constants/endpoints";

export const useFetchWithAuth = () => {
  const dispatch = useDispatch();
  const logout = useLogout();
  const { access } = useSelector((state: RootState) => state.profile);

  const fetchWithAuth = async <T>(url: string, options: RequestInit): Promise<T> => {
    let response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 401) {
      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        logout();
        throw new Error("No refresh token");
      }

      const refreshResponse = await fetch(API_ENDPOINTS.auth.refreshToken, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!refreshResponse.ok) {
        logout();
        throw new Error("Unable to refresh token");
      }

      const { access: newAccess } = await refreshResponse.json();
      localStorage.setItem("access_token", newAccess);
      dispatch(updateAccessToken(newAccess));

      response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${newAccess}`,
        },
      });
    }

    if (!response.ok) {
      let errMessage = "Request failed";
      try {
        const err = await response.json();
        errMessage = err?.message || errMessage;
      } catch {
        // nothing for now
      }
      throw new Error(errMessage);
    }

    return (await response.json()) as T;
  };

  return fetchWithAuth;
};
