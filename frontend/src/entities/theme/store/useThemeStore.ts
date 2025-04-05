import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import { theme } from "ant-design-vue";
import { themeTokens } from "../model/themeTokens";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref<boolean>(true);

  const token = computed(() =>
    isDark.value ? themeTokens.dark : themeTokens.light
  );
  const algorithm = computed(() =>
    isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm
  );

  const setTheme = (darkMode: boolean) => {
    isDark.value = darkMode;

    document.documentElement.setAttribute(
      "data-color-scheme",
      darkMode ? "dark" : "light"
    );
  };

  watch(isDark, (val) => setTheme(val), { immediate: true });

  return {
    isDark,
    token,
    algorithm,
    setTheme,
  };
});
