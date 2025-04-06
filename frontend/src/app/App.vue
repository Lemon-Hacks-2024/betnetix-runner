<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { usePreferencesStore } from "@/entities/preferences";
import { useCssVarsFromToken } from "@/shared/сomposables";

import { useTexts } from "./locale/model";

const { token, algorithm } = storeToRefs(usePreferencesStore());

const { antLocale } = useTexts();
const route = useRoute();

const layouts = {
  auth: defineAsyncComponent(() => import("./layouts/AuthLayout.vue")),
  main: defineAsyncComponent(() => import("./layouts/MainLayout.vue")),
};

const layout = computed(() => {
  const layoutName = route.meta.layout as keyof typeof layouts;
  return layouts[layoutName] ?? layouts.main;
});

useCssVarsFromToken();
</script>

<template>
  <a-config-provider :locale="antLocale" :theme="{ token, algorithm }">
    <a-app>
      <component :is="layout">
        <RouterView />
      </component>
    </a-app>
  </a-config-provider>
</template>

<style lang="scss">
@use "./styles/main.scss";
@use "./styles/custom.scss";
</style>
