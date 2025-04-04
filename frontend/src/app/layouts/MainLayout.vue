<template>
  <a-layout class="layout">
    <router-view v-slot="{ Component }">
      <Transition appear>
        <component :is="Component" />
      </Transition>
    </router-view>
  </a-layout>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
}
</style>
