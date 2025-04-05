<script lang="ts" setup>
import { h, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useTexts } from "@/app/locale/model";

import CreateGroup from "@/widgets/createGroup";
import GroupsTable from "@/widgets/groupsTable";

const openCreateGroup = ref(false);

const { $t } = useTexts();
</script>

<template>
  <div class="main-page-wrapper">
    <a-card class="table-wrapper" :bordered="false">
      <template #extra>
        <a-button
          class="card-btn"
          type="primary"
          :icon="h(PlusOutlined)"
          @click="openCreateGroup = true"
        >
          {{ $t.buttons.createGroup }}
        </a-button>
      </template>

      <CreateGroup v-model:open="openCreateGroup" />

      <GroupsTable />
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  border-radius: 40px;

  .card-btn {
    height: fit-content;
    padding: 8px 20px;
    border-radius: 16px;
  }

  :deep(.ant-card-head) {
    padding: 18px;
  }
}
</style>
