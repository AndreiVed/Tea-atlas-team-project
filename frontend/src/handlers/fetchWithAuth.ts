// import { updateAccessToken } from "@/features/profile/profileSlice";
// import { AppDispatch } from "@/store/appStore";
// import { API_ENDPOINTS } from "../constants/endpoints";

// export const fetchWithAuth = async <T>(
//   url: string,
//   options: RequestInit,
//   access: string,
//   dispatch: AppDispatch,
//   logout: () => void,
// ): Promise<T> => {
//   let response = await fetch(url, {
//     ...options,
//     credentials: "include",
//     headers: {
//       ...(options.headers || {}),
//       Authorization: `Bearer ${access}`,
//     },
//   });

//   if (response.status === 401) {
//     const refreshToken = localStorage.getItem("refresh");

//     if (!refreshToken) {
//       logout();
//     };

//     const refreshResponse = await fetch(API_ENDPOINTS.auth.refreshToken, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refresh: refreshToken }),
//     });

//     if (!refreshResponse.ok) throw new Error("Unable to refresh token");

//     const { access: newAccess } = await refreshResponse.json();
//     localStorage.setItem("access_token", newAccess);
//     dispatch(updateAccessToken(access));

//     response = await fetch(url, {
//       ...options,
//       credentials: "include",
//       headers: {
//         ...(options.headers || {}),
//         Authorization: `Bearer ${access}`,
//       },
//     });
//   }

//   if (!response.ok) {
//     const err = await response.json();
//     throw new Error(err?.message || "Request failed");
//   }

//   return response.json();
// };
