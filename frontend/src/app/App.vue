<script setup lang="ts">
import { computed, defineAsyncComponent, ref, onMounted } from "vue";
import { theme } from "ant-design-vue";
import ruRU from "ant-design-vue/es/locale/ru_RU";
import { useRoute } from "vue-router";

import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

const route = useRoute();

const layouts = {
  auth: defineAsyncComponent(() => import("./layouts/AuthLayout.vue")),
  main: defineAsyncComponent(() => import("./layouts/MainLayout.vue")),
};

const layout = computed(() => {
  const layoutName = route.meta.layout as keyof typeof layouts;
  return layouts[layoutName] ?? layouts.main;
});

const myTheme = {
  light: {
    colorBgLayout: "#E6E8F0",
    colorPrimary: "#30acde",
    colorBgContainer: "#F2F4F6",
    colorInfo: "#7ec4ee",
    colorTextBase: "#121517",
    colorError: "#ff7c7c",
    colorSuccess: "#c0ff8f",
  },
  dark: {
    colorBgLayout: "#0B0D0F",
    colorPrimary: "#30acde",
    colorBgContainer: "#0F1316",
    colorInfo: "#2A9BD6",
    colorTextBase: "#D7DCE1",
    colorError: "#ff7c7c",
    colorSuccess: "#c0ff8f",
  },
};

const token = ref(myTheme.dark);
const algorithm = ref(theme.darkAlgorithm);

const updateTheme = () => {
  const isDarkMode = false;
  // document.documentElement.getAttribute("data-color-scheme") === "dark";

  token.value = isDarkMode ? myTheme.dark : myTheme.light;
  algorithm.value = isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;
};

const observer = new MutationObserver(updateTheme);

onMounted(() => {
  updateTheme();

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-color-scheme"],
  });
});
</script>

<template>
  <a-config-provider :locale="ruRU" :theme="{ token, algorithm }">
    <a-app>
      <component :is="layout">
        <RouterView />
      </component>
    </a-app>
  </a-config-provider>
</template>

<style lang="scss">
@use "./styles/vars.scss";
@use "./styles/main.scss";


</style>
