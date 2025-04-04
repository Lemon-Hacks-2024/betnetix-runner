import api from "@/app/api/apiConfig";
import { LoginData } from "../model/AuthData";

export const signin = async (data: LoginData): Promise<string> => {
  const res = await api.post("/sign-in", data);
  return res.data.data.token;
};
