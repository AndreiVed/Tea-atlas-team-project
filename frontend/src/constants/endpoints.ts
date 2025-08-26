export const screenEndpoints = {
  mobile: 375,
  tablet: 744,
  desktop: 1440,
};

// const BASE_URL = "http://localhost:8000/"; // for local
const BASE_URL = "https://tea-atlas-backend.onrender.com/";
const API_VERSION = "api/v1";

const getEndpoint = (path: string) => `${BASE_URL}${API_VERSION}${path}`;

export const API_ENDPOINTS = {
  auth: {
    login: getEndpoint("/auth/login/"),
    logout: getEndpoint("/auth/logout/"),
    registration: getEndpoint("/auth/registration/"),
    refreshToken: getEndpoint("/auth/token/refresh/"),
    verifyToken: getEndpoint("/auth/token/verify/"),
    changePassword: getEndpoint("/auth/password/change/"),
    changeUserData: getEndpoint("/auth/user/"),
    favoriteList: getEndpoint("/auth/user/favorite_list/"),
  },

  catalog: {
    loadProducts: getEndpoint("/catalog/"),
    loadProductPage: (id: string) => getEndpoint(`/catalog/${id}/`),
    favoritesOperations: (id: string) =>
      getEndpoint(`/catalog/${id}/add_favorite/`),
    applyFilters: (filters: string) => getEndpoint(`/catalog?${filters}`),
  },

  google_auth: {
    login: getEndpoint("/google_auth/login/"),
    callback: getEndpoint("/google_auth/callback/"),
    redirect: getEndpoint("/google_auth/redirect/"),
  },
};
