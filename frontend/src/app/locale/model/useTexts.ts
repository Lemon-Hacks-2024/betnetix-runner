import { computed } from "vue";
import { storeToRefs } from "pinia";
import ruRU from "ant-design-vue/es/locale/ru_RU";
import enUS from "ant-design-vue/es/locale/en_US";
// import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/en";

import * as ru from "@/app/locale/ru";
import * as en from "@/app/locale/en";
import { usePreferencesStore } from "@/entities/preferences";

export const useTexts = () => {
  const { language } = storeToRefs(usePreferencesStore());

  const $t = computed(() =>
    language.value === "ru" ? ru.GlobalTexts : en.GlobalTexts
  );
  const antLocale = computed(() => (language.value === "ru" ? ruRU : enUS));

  // watch(
  //   () => language.value,
  //   (lang) => dayjs.locale(lang),
  //   { immediate: true }
  // );

  return { $t, antLocale };
};
