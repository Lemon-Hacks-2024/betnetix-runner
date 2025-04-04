<template>
  <router-view v-slot="{ Component }">
    <Transition appear>
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}
</style>
