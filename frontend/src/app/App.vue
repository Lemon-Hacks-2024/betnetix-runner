<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
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
</script>

<template>
  <a-config-provider :locale="ruRU">
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
