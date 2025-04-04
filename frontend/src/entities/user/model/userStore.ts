import { defineStore } from "pinia";
import { setToken } from "@/shared/utils";
import { signin } from "../api";
import { LoginData } from "./AuthData";

export const useUserStore = defineStore("user", () => {
  const fetchSignin = async (data: LoginData) => {
    const token = await signin(data);
    setToken(token);
  };

  return {
    fetchSignin,
  };
});
