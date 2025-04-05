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
    root.style.setProperty(
      "--bg-inverse",
      isDark.value ? themeTokens.light.colorBgLayout : "#36587A"
    );
    if (isDark.value) {
      root.style.setProperty("--shadow-dark", "rgba(0, 0, 0, 0.6)");
      root.style.setProperty("--shadow-light", "rgba(255, 255, 255, 0.04)");
      root.style.setProperty("--shadow-border", "rgba(255, 255, 255, 0.1)");
    } else {
      root.style.setProperty("--shadow-dark", "rgba(0, 0, 0, 0.1)");
      root.style.setProperty("--shadow-light", "rgba(255, 255, 255, 0.5)");
      root.style.setProperty("--shadow-border", "rgba(0, 0, 0, 0.06)");
    }
    root.style.setProperty("--primary-color", t.colorPrimary);
    root.style.setProperty("--element-color", t.colorBgContainer);
    root.style.setProperty(
      "--opacity-element-color",
      isDark.value ? "#0F1316CC" : "#F2F4F6CC"
    );
    root.style.setProperty("--accent-color", t.colorInfo);
    root.style.setProperty("--text-color", t.colorTextBase);
    root.style.setProperty("--error-color", t.colorError);
    root.style.setProperty("--success-color", t.colorSuccess);
  });
};
