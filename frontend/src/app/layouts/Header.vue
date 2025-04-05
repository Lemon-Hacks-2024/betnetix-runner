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
        <BaseNeumorphic
          variant="neu"
          width="100px"
          height="100px"
          radius="999px"
          padding="20px"
          hover
          border
        >
          <div class="logo-wrapper">
            <img v-if="isDark" class="logo" :src="DarkLogo" />
            <img v-else class="logo" :src="LightLogo" />
          </div>
        </BaseNeumorphic>

        <BaseNeumorphic
          variant="flat"
          width="56px"
          height="32px"
          radius="999px"
          reverse
          inset
          hover
        >
          <ThemeToggle />
        </BaseNeumorphic>
      </a-flex>
    </a-card>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  top: 30px;
  left: 70px;
  right: 70px;
  border: none;
  border-radius: 80px;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 0 4px 10px var(--shadow-dark);
  backdrop-filter: blur(10px);
  z-index: 1000;

  .header-content-wrapper {
    border-radius: 80px;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;

    .logo-wrapper {
      cursor: pointer;
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
      max-width: 80px;
      max-height: 80px;
    }
  }
}

:deep(.ant-card-body) {
  padding: 10px;
  padding-right: 30px;
}
</style>
