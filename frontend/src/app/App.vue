<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import ruRU from "ant-design-vue/es/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { storeToRefs } from "pinia";

import { useThemeStore } from "@/entities/theme";
import { useCssVarsFromToken } from "@/shared/сomposables";

dayjs.locale("ru");

const route = useRoute();

const layouts = {
  auth: defineAsyncComponent(() => import("./layouts/AuthLayout.vue")),
  main: defineAsyncComponent(() => import("./layouts/MainLayout.vue")),
};

const { token, algorithm } = storeToRefs(useThemeStore());

const layout = computed(() => {
  const layoutName = route.meta.layout as keyof typeof layouts;
  return layouts[layoutName] ?? layouts.main;
});

useCssVarsFromToken();
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
@use "./styles/custom.scss";
</style>
