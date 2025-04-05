import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import { theme } from "ant-design-vue";
import { themeTokens, ThemeType } from "../model";
import { localStorageManager } from "@/shared/utils";

export const useThemeStore = defineStore("theme", () => {
  const { setStorageTheme, getStorageTheme } = localStorageManager();
  const isDark = ref<boolean>(true);

  const token = computed(() =>
    isDark.value ? themeTokens.dark : themeTokens.light
  );
  const algorithm = computed(() =>
    isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm
  );

  const setTheme = (darkMode: boolean) => {
    isDark.value = darkMode;
    const currentMode: ThemeType = darkMode ? "dark" : "light";

    document.documentElement.setAttribute("data-color-scheme", currentMode);
    setStorageTheme(currentMode);
  };

  watch(
    isDark,
    (val) => {
      const currentTheme = getStorageTheme();
      if (!!currentTheme) val = currentTheme === "dark" ? true : false;
      setTheme(val);
    },
    { immediate: true }
  );

  return {
    isDark,
    token,
    algorithm,
    setTheme,
  };
});
