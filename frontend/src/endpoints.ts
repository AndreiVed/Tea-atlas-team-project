export const screenEndpoints = {
  'mobile': 375,
  'tablet': 744,
  'desktop': 1440,
}

const BASE_URL = 'http://127.0.0.1:8000/';
const API_VERSION = 'api/v1';

const getEndpoint = (path: string) => `${BASE_URL}${API_VERSION}${path}`;

export const API_ENDPOINTS = {
  auth: {
    login: getEndpoint('/auth/login/'),
    logout: getEndpoint('/auth/logout/'),
    registration: getEndpoint('/auth/registration/'),
    refreshToken: getEndpoint('/auth/token/refresh/'),
    verifyToken: getEndpoint('/auth/token/verify/'),
    changePassword: getEndpoint('/auth/password/change/'),
    changeUserData: getEndpoint('/auth/user/'),
  },

  catalog: {
    loadProducts: getEndpoint('/catalog/'),
  },
};
