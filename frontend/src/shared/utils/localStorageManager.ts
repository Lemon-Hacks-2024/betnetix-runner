import { ThemeType } from "@/entities/theme/model";

export const localStorageManager = () => {
  const setStorageTheme = (mode: ThemeType) => {
    localStorage.setItem("theme_mode", mode);
  };

  const getStorageTheme = (): string | null => {
    return localStorage.getItem("theme_mode");
  };

  return { setStorageTheme, getStorageTheme };
};
