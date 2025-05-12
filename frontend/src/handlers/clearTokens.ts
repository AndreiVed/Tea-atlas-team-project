export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh");
};
