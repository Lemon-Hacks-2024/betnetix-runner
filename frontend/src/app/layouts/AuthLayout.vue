<template>
  <div class="auth-layout">
    <div class="auth-layout__content">
      <router-view v-slot="{ Component }">
        <Transition appear>
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;

  &__content {
    max-width: 100%;
    width: 400px;
  }
}
</style>
