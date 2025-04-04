import axios from "axios";
import { message } from "ant-design-vue";
import { setToken } from "@/shared/utils";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.token ? `Bearer ${localStorage.token}` : "",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status == 401) {
      setToken("");
      location.reload();
    } else {
      message.error("Что-то пошло не так");
    }
    return Promise.reject(error);
  }
);

export default api;
