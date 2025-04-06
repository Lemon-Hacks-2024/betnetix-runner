import { watchEffect } from "vue";
import { usePreferencesStore } from "@/entities/preferences";
import { storeToRefs } from "pinia";
import { themeTokens } from "@/entities/preferences/model";

export const useCssVarsFromToken = () => {
  const { isDark, token } = storeToRefs(usePreferencesStore());

  watchEffect(() => {
    const root = document.documentElement;
    const t = token.value;

    root.style.setProperty("--bg-color", t.colorBgLayout);
    root.style.setProperty("--primary-color", t.colorPrimary);
    root.style.setProperty("--element-color", t.colorBgContainer);
    root.style.setProperty(
      "--element-color-reverse",
      isDark.value ? themeTokens.light.colorBgContainer : "#36587A"
    );
    root.style.setProperty(
      "--opacity-element-color",
      isDark.value ? "#3F3F3FB3" : "#FEFFF1B3"
    );
    root.style.setProperty("--accent-color", t.colorInfo);
    root.style.setProperty("--text-color", t.colorTextBase);

    root.style.setProperty("--shadow-dark", t.shadowDark);
    root.style.setProperty("--shadow-light", t.shadowLight);
    root.style.setProperty("--shadow-border", t.shadowBorder);

    root.style.setProperty("--error-color", t.colorError);
    root.style.setProperty("--success-color", t.colorSuccess);
  });
};
