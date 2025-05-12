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
<<<<<<< HEAD
      document.cookie = `refresh=${data.refresh}`;
=======
      document.cookie = `refresh=${data.access}`;
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
    })
    .catch((error) => {
      return error;
    });
};
