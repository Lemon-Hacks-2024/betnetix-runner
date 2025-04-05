<script setup lang="ts">
import Header from "./Header.vue";
</script>

<template>
  <a-layout class="layout-wrapper">
    <div class="layout-container">
      <Header />
      <div class="layout-content">
        <router-view v-slot="{ Component }">
          <Transition appear>
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </div>
  </a-layout>
</template>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding-top: 150px;

  .layout-container {
    width: 100%;
    height: 100%;
    max-width: 1440px;
    padding: 30px 70px;

    .layout-content {
      padding: 0 20px;
    }
  }
}
</style>
