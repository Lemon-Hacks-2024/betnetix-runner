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
  <button
    class="theme-toggle"
    :class="{ active: isDark }"
    @click="toggleTheme"
    aria-label="Toggle Theme"
  >
    <div class="circle">
      <component :is="isDark ? DarkModeIcon : LightModeIcon" class="icon" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.theme-toggle {
  width: 56px;
  height: 32px;
  border: none;
  border-radius: 999px;
  background: var(--bg-inverse);
  box-shadow: inset 4px 4px 6px rgba(#000000, 0.5),
    inset -4px -4px 6px rgba(#ffffff, 0.05);
  cursor: pointer;
  padding: 4px;
  position: relative;
  display: flex;
  align-items: center;
  transition: background 0.3s ease;

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
    transition: left 0.3s ease, background 0.3s ease;
    box-shadow: 3px 3px 6px rgba(#000000, 0.4),
      -3px -3px 6px rgba(#ffffff, 0.08);

    .icon {
      width: 16px;
      height: 16px;
      fill: var(--text-color);
    }
  }

  &.active .circle {
    left: 28px;
  }
}
</style>
