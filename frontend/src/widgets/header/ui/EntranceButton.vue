<script lang="ts" setup>
import { h } from "vue";
import { BaseNeumorphic } from "@/shared/ui";
import { useTexts } from "@/app/locale/model";

import LockIcon from "@/assets/icons/LockIcon.vue";
const { $t } = useTexts();
</script>

<template>
  <BaseNeumorphic variant="neu" glass>
    <a-button class="entrance-btn" :icon="h(LockIcon)" disabled>
      <span class="btn-text">{{ $t.buttons.entrance }}</span>
    </a-button>
  </BaseNeumorphic>
</template>

<style lang="scss" scoped>
.entrance-btn {
  cursor: not-allowed;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  height: fit-content;
  padding: 8px 25px;
  color: rgba(var(--text-color-rgb), 0.5);
  border-radius: 12px;
  // background-color: transparent;
  user-select: none;

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

[data-color-scheme="dark"] {
  .entrance-btn {
    .btn-text {
      color: rgba($color: #000000, $alpha: 0.4);
    }

    svg {
      fill: rgba($color: #000000, $alpha: 0.4);
    }
  }
}
</style>
