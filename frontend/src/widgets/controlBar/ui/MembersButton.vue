<script lang="ts" setup>
import { ref } from "vue";
import { useTexts } from "@/app/locale/model";
import { BaseNeumorphic } from "@/shared/ui";
import CreateGroup from "@/widgets/createGroup";

const { $t } = useTexts();
const modalVisible = ref<boolean>(false);

const openModal = () => (modalVisible.value = true);
</script>

<template>
  <BaseNeumorphic width="fit-content" pressable hover>
    <a-button class="members-button" type="primary" @click="openModal">
      <span class="btn-text">{{ $t.buttons.members }}</span>
    </a-button>
    <CreateGroup v-model:open="modalVisible" />
  </BaseNeumorphic>
</template>

<style lang="scss" scoped>
.members-button {
  height: fit-content;
  padding: 8px 20px;
  border-radius: 12px;

  .btn-text {
    font-size: 16px;
  }
}
</style>
