import { updateToken } from "@/features/profile/profileSlice";
import { AppDispatch } from "@/store/appStore";
import { API_ENDPOINTS } from "../constants/endpoints";

export const fetchWithAuth = async <T>(
  url: string,
  options: RequestInit,
  token: string,
  dispatch: AppDispatch,
): Promise<T> => {

  let response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) throw new Error("No refresh token");

    const refreshResponse = await fetch(API_ENDPOINTS.auth.refreshToken, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!refreshResponse.ok) throw new Error("Unable to refresh token");

    const { access, refresh } = await refreshResponse.json();
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh", refresh);
    dispatch(updateToken(access));

    response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${access}`,
      },
    });
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.message || "Request failed");
  }

  return response.json();
};
