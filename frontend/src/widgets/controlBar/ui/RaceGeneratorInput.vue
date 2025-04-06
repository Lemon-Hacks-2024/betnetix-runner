<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTexts } from "@/app/locale/model";
import { BaseNeumorphic } from "@/shared/ui";
import {
  GenerateRacesRequest,
  useGroupContext,
  useGroupsStore,
} from "@/entities/groups";

const props = defineProps<{ groupId: string | undefined }>();

const { loadingGenerateRaces } = storeToRefs(useGroupsStore());
const { fetchGenerateRaces } = useGroupsStore();
const { $t } = useTexts();
const { reloadGroup } = useGroupContext();

const racesCount = ref<number | null>(null);

const handleClick = async () => {
  const groupId = props.groupId;
  if (!racesCount.value || !groupId) return;

  const data: GenerateRacesRequest = {
    groupId: groupId as string,
    quantity: racesCount.value,
  };
  await fetchGenerateRaces(data);

  if (reloadGroup) await reloadGroup(groupId as string);
};
</script>

<template>
  <a-flex class="races-generator-input" justify="center" align="center">
    <BaseNeumorphic height="42px">
      <a-input-number
        class="races-input"
        v-model:value="racesCount"
        :placeholder="$t.placeholders.enterRacesCount"
        :min="1"
        :max="10"
      />
    </BaseNeumorphic>
    <BaseNeumorphic width="fit-content" pressable>
      <a-button
        class="generate-btn"
        :loading="loadingGenerateRaces"
        @click="handleClick"
      >
        <span>{{ $t.buttons.generate }}</span>
      </a-button>
    </BaseNeumorphic>
  </a-flex>
</template>

<style lang="scss" scoped>
.races-generator-input {
  width: 40%;
  gap: 20px;

  .races-input {
    width: 100%;
    height: 42px;
    border-radius: 12px;
    overflow: hidden;
  }

  .generate-btn {
    height: fit-content;
    padding: 8px 20px;
    border-radius: 12px;
  }

  :deep(.ant-input-number-input) {
    height: 42px;
    font-size: 16px;
  }

  :deep(.ant-input-number-handler-up) {
    border-top-right-radius: 12px;
  }
}
</style>
