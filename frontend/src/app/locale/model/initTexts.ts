import { App, watch } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/en";
import { usePreferencesStore } from "@/entities/preferences";
import { useTexts } from "./useTexts";
import { storeToRefs } from "pinia";

export const initTexts = (app: App) => {
  const { $t } = useTexts();
  const { language } = storeToRefs(usePreferencesStore());

  // Глобально — $t.value
  watch($t, (val) => (app.config.globalProperties.$t = val), {
    immediate: true,
  });

  // dayjs — по language из стора
  watch(
    () => language.value,
    (lang) => dayjs.locale(lang),
    { immediate: true }
  );
};
