<script lang="ts" setup>
import {
  EntranceButton,
  LanguageToggle,
  LogoTitle,
  MenuButtons,
  ThemeToggle,
} from "@/widgets/header";
</script>

<template>
  <header class="header-container">
    <a-card class="header-content-wrapper" :bordered="false">
      <a-flex justify="space-between" align="center">
        <LogoTitle />
        <a-flex align="center" :gap="30">
          <MenuButtons />
          <div class="divider" />
          <LanguageToggle />
          <ThemeToggle />
          <div class="divider" />
          <EntranceButton />
        </a-flex>
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
  }

  .divider {
    width: 2px;
    height: 40px;
    border-radius: 2px;
    background-color: rgba($color: #000000, $alpha: 0.2);
  }
}

:deep(.ant-card-body) {
  padding: 10px;
  padding-right: 30px;
}
</style>
