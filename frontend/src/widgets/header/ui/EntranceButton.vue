<script lang="ts" setup>
import { h } from "vue";
import DisableIcon from "@/assets/icons/DisableIcon.vue";
</script>

<template>
  <a-button class="entrance-btn" :icon="h(DisableIcon)" disabled>
    <span class="btn-text">{{ $t.buttons.entrance }}</span>
  </a-button>
</template>

<style lang="scss" scoped>
.entrance-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  height: fit-content;
  padding: 8px 25px;
  border-radius: 16px;
  border: 2px solid rgba($color: #000000, $alpha: 0.2);

  .btn-text {
    font-size: 14px;
    color: rgba($color: #000000, $alpha: 0.2);
  }

  svg {
    max-width: 18px;
    max-height: 18px;
    fill: rgba($color: #000000, $alpha: 0.2);
  }
}
</style>
