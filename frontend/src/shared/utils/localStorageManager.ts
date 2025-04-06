import { LanguageType, ThemeType } from "@/entities/preferences";

export const localStorageManager = () => {
  const setStorageTheme = (mode: ThemeType) => {
    localStorage.setItem("theme_mode", mode);
  };

  const getStorageTheme = (): string | null => {
    return localStorage.getItem("theme_mode");
  };

  const setStorageLang = (mode: LanguageType) => {
    localStorage.setItem("language-preference", mode);
  };

  const getStorageLang = (): string | null => {
    return localStorage.getItem("language-preference");
  };

  return { setStorageTheme, getStorageTheme, setStorageLang, getStorageLang };
};
