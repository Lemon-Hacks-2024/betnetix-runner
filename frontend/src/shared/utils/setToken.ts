import api from "@/app/api/apiConfig";

export const setToken = (token: string) => {
  if (!token) localStorage.removeItem("token");
  else localStorage.token = token;

  api.defaults.headers.Authorization = `Bearer ${token}`;
};
