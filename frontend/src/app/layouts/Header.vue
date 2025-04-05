<script lang="ts" setup>
import { BaseNeumorphic } from "@/shared/ui";
import DarkLogo from "@/assets/images/DarkLogo.webp";
import LightLogo from "@/assets/images/LightLogo.webp";
import { ThemeToggle } from "@/widgets";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/entities/theme";

const { isDark } = storeToRefs(useThemeStore());
</script>

<template>
  <header class="header-container">
    <a-card class="header-content-wrapper" :bordered="false">
      <a-flex class="header-content" justify="space-between" align="center">
        <BaseNeumorphic width="80px" height="80px">
          <div class="logo-wrapper">
            <img v-if="isDark" class="logo" :src="DarkLogo" />
            <img v-else class="logo" :src="LightLogo" />
          </div>
        </BaseNeumorphic>
        <ThemeToggle />
      </a-flex>
    </a-card>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  left: 70px;
  right: 70px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 10px var(--shadow-dark);
  backdrop-filter: blur(10px);
  z-index: 1000;

  .header-content-wrapper {
    border-radius: 12px;
    background-color: var(--opacity-element-color);

    .logo-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .title {
      color: var(--primary-color);
      font-weight: bold;
    }

    .logo {
      max-width: 70px;
      max-height: 70px;
    }
  }
}
</style>
