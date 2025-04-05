<script lang="ts" setup>
import { BaseNeumorphic } from "@/shared/ui";

const isSelf = defineModel("isSelf", { required: true });

const toggleParams = () => (isSelf.value = !isSelf.value);
</script>

<template>
  <BaseNeumorphic
    variant="flat"
    width="60px"
    height="28px"
    radius="999px"
    reverse
    inset
    hover
  >
    <div class="toggle" @click="toggleParams">
      <div class="circle" :class="{ active: isSelf }" />
    </div>
  </BaseNeumorphic>
</template>

<style lang="scss" scoped>
.toggle {
  position: relative;
  width: 60px;
  height: 28px;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}

.circle {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease;
  box-shadow: 3px 3px 6px rgba(#000000, 0.4), -3px -3px 6px rgba(#ffffff, 0.08);

  .icon {
    width: 18px;
    height: 18px;
    fill: var(--text-color);
  }
}

.circle.active {
  left: 36px;
}
</style>
