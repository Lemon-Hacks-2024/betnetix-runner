<script lang="ts" setup>
import { h, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useTexts } from "@/app/locale/model";

import CreateGroup from "@/widgets/createGroup";
import GroupsTable from "@/widgets/groupsTable";
import { BaseNeumorphic } from "@/shared/ui";

const openCreateGroup = ref(false);

const { $t } = useTexts();
</script>

<template>
  <div class="main-page-wrapper">
    <a-card class="table-wrapper" :bordered="false">
      <template #extra>
        <BaseNeumorphic pressable primary hover>
          <a-button
            class="card-btn"
            type="primary"
            :icon="h(PlusOutlined)"
            @click="openCreateGroup = true"
          >
            {{ $t.buttons.createGroup }}
          </a-button>
        </BaseNeumorphic>
      </template>

      <CreateGroup v-model:open="openCreateGroup" />

      <GroupsTable />
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.main-page-wrapper {
  border-radius: 30px;
  box-shadow: 0 4px 10px var(--shadow-dark);
  overflow: hidden;

  .table-wrapper {
    background-color: var(--opacity-element-color);

    .card-btn {
      height: fit-content;
      padding: 8px 20px;
      border-radius: 12px;
    }

    :deep(.ant-card-head) {
      padding: 18px;
    }
  }

  .table-container {
    width: 100%;
  }
}
</style>
