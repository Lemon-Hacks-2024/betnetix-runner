import { AxiosError } from "axios";
import { ApiError } from "../types";

export const handleApiError = (error: unknown): ApiError => {
  const axiosError = error as AxiosError<ApiError>;
  const apiError = axiosError.response?.data;

  if (apiError?.message) {
    console.error("API Error:", apiError);
    return apiError;
  }

  const defaultMessage = {
    ERR_NETWORK: "Ошибка соединения. Проверьте интернет",
  };

  let message = "Произошла неизвестная ошибка";
  message =
    defaultMessage[axiosError.code as keyof typeof defaultMessage] ||
    axiosError.message;

  const unknownError: ApiError = {
    message,
  };

  console.error("Unknown Error:", error);

  return unknownError;
};
