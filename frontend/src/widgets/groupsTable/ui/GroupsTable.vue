<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ExportOutlined } from "@ant-design/icons-vue";

import { BaseNeumorphic, CellDate } from "@/shared/ui";
import { GroupsType } from "@/entities/groups";
import { useTable } from "../model/useTable";
import { columns } from "./columns";

const router = useRouter();

const { loadingGetGroups, pagination, dataGroups } = useTable();

const test = (record: GroupsType) => {
  return {
    ...record,
    onClick: () => {
      router.push(`/group/${record.id}`);
    },
  };
};
</script>

<template>
  <BaseNeumorphic class="table-wrapper" radius="24px" padding="0">
    <a-table
      class="table"
      :data-source="dataGroups"
      :columns="columns"
      :pagination="pagination"
      :loading="loadingGetGroups"
      :customRow="test"
      size="large"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a-space :size="16">
            <ExportOutlined class="opacity-50" />
            <span>{{ text }}</span>
          </a-space>
        </template>

        <template v-if="column.dataIndex === 'date_time_last_race'">
          <CellDate :date="text" />
        </template>
      </template>
    </a-table>
  </BaseNeumorphic>
</template>

<style lang="scss" scoped>
.table {
  width: 100%;
}

.table-wrapper {
  :deep(.ant-table) {
    background: transparent;
    border-radius: 24px;
  }

  :deep(.ant-table-container),
  :deep(.ant-table-content),
  :deep(.ant-table-body) {
    background-color: transparent;
  }

  :deep(.ant-table-thead > tr > th) {
    background: none;
    border-bottom: none;
    color: var(--text-color);
    font-weight: 600;
    padding: 12px;
  }

  :deep(.ant-table-tbody > tr > td) {
    background-color: transparent;
    border-bottom: none;
    padding: 14px;
    transition: background-color 0.3s ease;
  }

  :deep(.ant-table-tbody > tr.custom-row) {
    transition: all 0.3s ease;
    border-radius: 12px;

    &:hover {
      background-color: rgba(var(--color-primary-rgb), 0.04);
      box-shadow: inset 2px 2px 4px var(--shadow-dark),
        inset -2px -2px 4px var(--shadow-light);
    }
  }

  :deep(.ant-table-tbody > tr > td) {
    padding: 20px;
  }

  :deep(.ant-table-tbody > tr:last-child > td:last-child) {
    border-bottom-right-radius: 20px;
  }

  :deep(.ant-table-tbody > tr:last-child > td:first-child) {
    border-bottom-left-radius: 20px;
  }
}

:deep(.ant-table-thead > tr > th) {
  padding: 20px !important;
}

:deep(.ant-table-pagination.ant-pagination) {
  margin: 16px 20px;
}

:deep(.ant-pagination-item) {
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
