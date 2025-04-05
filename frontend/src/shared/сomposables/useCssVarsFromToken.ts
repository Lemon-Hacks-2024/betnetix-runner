import { watchEffect } from "vue";
import { useThemeStore } from "@/entities/theme";
import { storeToRefs } from "pinia";
import { themeTokens } from "@/entities/theme/model";

export const useCssVarsFromToken = () => {
  const { isDark, token } = storeToRefs(useThemeStore());

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
      isDark.value ? "#0F1316CC" : "#F2F4F6CC"
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
