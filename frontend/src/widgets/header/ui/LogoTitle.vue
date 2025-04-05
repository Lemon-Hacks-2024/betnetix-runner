<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { BaseNeumorphic } from "@/shared/ui";
import DarkLogo from "@/assets/images/DarkLogo.webp";
import LightLogo from "@/assets/images/LightLogo.webp";
import { useThemeStore } from "@/entities/theme";

const { isDark } = storeToRefs(useThemeStore());
</script>

<template>
  <a-flex align="center" gap="20">
    <BaseNeumorphic
      variant="neu"
      width="100px"
      height="100px"
      radius="999px"
      hover
    >
      <div class="logo-wrapper">
        <img v-if="isDark" class="logo" :src="DarkLogo" />
        <img v-else class="logo" :src="LightLogo" />
      </div>
    </BaseNeumorphic>
    <span class="title">ЧТО_ТА</span>
  </a-flex>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.logo {
  max-width: 80px;
  max-height: 80px;
}

.title {
  font-size: 40px;
  font-weight: bolder;
}
</style>
