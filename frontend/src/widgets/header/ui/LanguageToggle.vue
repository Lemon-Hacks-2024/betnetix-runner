<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { BaseNeumorphic } from "@/shared/ui";
import { usePreferencesStore } from "@/entities/preferences";

const { isRu } = storeToRefs(usePreferencesStore());
const { toggleLanguage } = usePreferencesStore();
</script>

<template>
  <BaseNeumorphic
    variant="flat"
    width="70px"
    height="42px"
    radius="999px"
    reverse
    inset
    hover
  >
    <div class="toggle" @click="toggleLanguage">
      <div class="circle" :class="{ active: isRu }">
        <span class="label">{{ isRu ? "РУ" : "EN" }} </span>
      </div>
    </div>
  </BaseNeumorphic>
</template>

<style lang="scss" scoped>
.toggle {
  position: relative;
  width: 70px;
  height: 42px;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}

.circle {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.2s ease-in-out;
  box-shadow: 3px 3px 6px rgba(#000000, 0.4), -3px -3px 6px rgba(#ffffff, 0.08);

  .label {
    font-weight: bold;
  }
}

.circle.active {
  left: 32px;
}
</style>
