import { API_ENDPOINTS } from "../endpoints";

export const refreshToken = () => {
  fetch(API_ENDPOINTS.auth.refreshToken, {
    method: "GET",
    
  })
    .then((response) => {
      if (!response.ok) {
        return;
      }

      return response.json();
    })
    .then((data) => {
      document.cookie = `refresh=${data.access}`;
    })
    .catch((error) => {
      return error;
    });
};
