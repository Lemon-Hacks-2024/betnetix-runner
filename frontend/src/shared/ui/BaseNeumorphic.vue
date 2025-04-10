<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
  width?: string;
  height?: string;
  pressable?: boolean;
  variant?: "flat" | "soft" | "neu";
  inset?: boolean;
  primary?: boolean;
  glass?: boolean;
  border?: boolean;
  reverse?: boolean;
  radius?: string;
  padding?: string;
  hover?: boolean;
}>();

const isPressed = ref<boolean>(false);

const onPress = () => {
  if (props.pressable) isPressed.value = true;
};
const onRelease = () => {
  if (props.pressable) isPressed.value = false;
};
</script>

<template>
  <div
    class="neumorphic"
    :class="[
      variant || 'neu',
      {
        inset: inset || (pressable && isPressed),
        pressed: pressable && isPressed,
        glass,
        primary,
        'has-border': border,
        'has-hover': hover,
        reverse,
      },
    ]"
    :style="{
      width: width || '100%',
      height: height || '100%',
      background: reverse
        ? 'var(--element-color-reverse)'
        : 'var(--element-color)',
      borderRadius: radius || '12px',
      padding: padding || '0',
    }"
    @mousedown="onPress"
    @mouseup="onRelease"
    @mouseleave="onRelease"
    @touchstart="onPress"
    @touchend="onRelease"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.neumorphic {
  position: relative;
  transition: box-shadow 0.15s ease, transform 0.15s ease;

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

    &.reverse {
      box-shadow: inset 4px 4px 6px rgba(#000000, 0.5),
        inset -4px -4px 6px rgba(#ffffff, 0.05);
    }
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

  &.primary {
    box-shadow: 6px 6px 10px var(--shadow-dark),
      -6px -6px 10px var(--shadow-light);

    &.inset {
      box-shadow: inset 4px 4px 6px var(--shadow-dark),
        inset -4px -4px 6px var(--shadow-light);
    }

    &.has-hover:hover {
      box-shadow: 8px 8px 12px var(--shadow-dark),
        -8px -8px 12px var(--shadow-light);
    }
  }

  &.inset.has-hover:hover {
    box-shadow: inset 6px 6px 10px var(--shadow-dark),
      inset -6px -6px 10px var(--shadow-light), 0 0 0 1px var(--shadow-border);

    &.reverse {
      box-shadow: inset 6px 6px 10px rgba(#000000, 0.5),
        inset -6px -6px 10px rgba(#ffffff, 0.05);
    }
  }

  &.pressed {
    transform: scale(0.98);
  }
}
</style>
