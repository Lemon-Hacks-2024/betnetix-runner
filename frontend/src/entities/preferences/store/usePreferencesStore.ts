import { computed, ref, watch, WatchStopHandle } from "vue";
import { defineStore } from "pinia";

import { theme } from "ant-design-vue";
import { useColorMode } from "@vueuse/core";
import { localStorageManager } from "@/shared/utils";
import { LanguageType, themeTokens, ThemeType } from "../model";

export const usePreferencesStore = defineStore("theme", () => {
  const { setStorageTheme, getStorageTheme, setStorageLang, getStorageLang } =
    localStorageManager();

  // ========== ТЕМА ==========
  const isDark = ref<boolean>(false);

  const userHasChosenTheme = computed(() => {
    return !!getStorageTheme();
  });

  const setTheme = (val: boolean) => {
    isDark.value = val;
    const themeValue: ThemeType = val ? "dark" : "light";
    setStorageTheme(themeValue);
    document.documentElement.setAttribute("data-color-scheme", themeValue);
  };

  const toggleTheme = () => setTheme(!isDark.value);

  const initTheme = () => {
    const { system } = useColorMode();
    const stored = getStorageTheme();

    if (stored) {
      isDark.value = stored === "dark";
      setTheme(isDark.value);
    } else {
      let stop: WatchStopHandle;

      stop = watch(
        () => system.value,
        (val) => {
          isDark.value = val === "dark";
          if (userHasChosenTheme.value && stop) stop();
        },
        { immediate: true }
      );
    }
  };

  const token = computed(() =>
    isDark.value ? themeTokens.dark : themeTokens.light
  );

  const algorithm = computed(() =>
    isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm
  );

  // ======== ЯЗЫК =========
  const language = ref<LanguageType>("ru");
  const isRu = computed(() => language.value === "ru");

  const setLanguage = (lang: LanguageType) => {
    language.value = lang;
    setStorageLang(lang);
  };

  const toggleLanguage = () => {
    language.value = isRu.value ? "en" : "ru";
    setStorageLang(language.value);
  };

  const initLanguage = () => {
    const saved = getStorageLang();
    const lang = saved === "en" || saved === "ru" ? saved : "ru";
    setLanguage(lang);
  };

  initTheme();
  initLanguage();

  return {
    isDark,
    toggleTheme,
    token,
    algorithm,

    language,
    isRu,
    setLanguage,
    toggleLanguage,
  };
});
