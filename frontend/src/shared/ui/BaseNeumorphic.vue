<script lang="ts" setup>
defineProps<{
  width?: string;
  height?: string;
  variant?: "flat" | "soft" | "neu";
  inset?: boolean;
  glass?: boolean;
  border?: boolean;
  radius?: string;
  padding?: string;
  hover?: boolean;
}>();
</script>

<template>
  <div
    class="neumorphic"
    :class="[
      variant || 'neu',
      { inset, glass, 'has-border': border, 'has-hover': hover },
    ]"
    :style="{
      width: width || '100%',
      height: height || '100%',
      borderRadius: radius || '12px',
      padding: padding || '0',
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.neumorphic {
  background: var(--element-color);
  position: relative;

  &.flat {
    box-shadow: none;
  }

  &.neu {
    box-shadow: 4px 4px 8px var(--shadow-dark),
      -4px -4px 6px var(--shadow-light),
      0.5px 0.2px 2px 1px var(--shadow-border);
  }

  &.inset {
    box-shadow: inset 4px 4px 10px var(--shadow-dark),
      inset -4px -4px 10px var(--shadow-light);
  }

  &.glass {
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(6px);
  }

  &.has-border {
    border: 1px solid var(--shadow-border);
  }

  &.has-hover:hover {
    box-shadow: 8px 8px 16px var(--shadow-dark),
      -8px -8px 16px var(--shadow-light);
  }

  &.inset.has-hover:hover {
    box-shadow: inset 6px 6px 10px var(--shadow-dark),
      inset -6px -6px 10px var(--shadow-light), 0 0 0 1px var(--shadow-border);
  }
}
</style>
