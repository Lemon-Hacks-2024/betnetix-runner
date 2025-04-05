<script lang="ts" setup>
import { BaseNeumorphic } from "@/shared/ui";
import { useRouter } from "vue-router";

defineProps<{
  title: string;
  path: string;
  active: boolean;
  disabled?: boolean;
}>();

const router = useRouter();

const routeTo = (path: string) => router.push(path);
</script>

<template>
  <BaseNeumorphic pressable :hover="!disabled">
    <a-button
      type="text"
      :class="['menu-btn', { active: active }]"
      :disabled="disabled"
      @click="routeTo('/')"
    >
      <span class="btn-text">{{ title }}</span>
    </a-button>
  </BaseNeumorphic>
</template>

<style lang="scss" scoped>
.menu-btn {
  width: 100%;
  height: fit-content;
  border-radius: 12px;
  padding: 8px 25px;

  .btn-text {
    font-size: 16px;
  }

  &.active {
    color: var(--primary-color);
  }

  &:hover {
    background-color: transparent;
  }
}
</style>
