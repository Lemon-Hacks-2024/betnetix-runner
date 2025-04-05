<script lang="ts" setup>
import { storeToRefs } from "pinia";
import LightModeIcon from "@/assets/icons/LightModeIcon.vue";
import DarkModeIcon from "@/assets/icons/DarkModeIcon.vue";
import { useThemeStore } from "@/entities/theme";

const { isDark } = storeToRefs(useThemeStore());
const { setTheme } = useThemeStore();

const toggleTheme = () => setTheme(!isDark.value);
</script>

<template>
  <div class="toggle" @click="toggleTheme">
    <div class="circle" :class="{ active: isDark }">
      <component :is="isDark ? DarkModeIcon : LightModeIcon" class="icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toggle {
  position: relative;
  width: 56px;
  height: 32px;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}

.circle {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease;
  box-shadow: 3px 3px 6px rgba(#000000, 0.4), -3px -3px 6px rgba(#ffffff, 0.08);

  .icon {
    width: 16px;
    height: 16px;
    fill: var(--text-color);
  }
}

.circle.active {
  left: 28px;
}
</style>
