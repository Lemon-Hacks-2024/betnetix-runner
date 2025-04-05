<script lang="ts" setup>
import { useRoute } from "vue-router";
import MenuButton from "./MenuButton.vue";
import { useTexts } from "@/app/locale/model";

const route = useRoute();

const isActiveRoute = (routePath: string) => route.path === routePath;
const { $t } = useTexts();
</script>

<template>
  <div class="menu-buttons">
    <MenuButton
      path="/"
      :title="$t.buttons.main"
      :active="isActiveRoute('/')"
    />
    <MenuButton
      path="/test"
      :title="`${$t.buttons.placeholder} 1`"
      :active="isActiveRoute('/test')"
      disabled
    />
    <MenuButton
      path="/test1"
      :title="`${$t.buttons.placeholder} 2`"
      :active="isActiveRoute('/test1')"
      disabled
    />
  </div>
</template>

<style lang="scss" scoped>
.menu-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
</style>
