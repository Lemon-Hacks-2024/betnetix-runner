<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ExportOutlined } from "@ant-design/icons-vue";

import { CellDate } from "@/shared/ui";
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
  <a-table
    :data-source="dataGroups"
    :columns="columns"
    :pagination="pagination"
    :loading="loadingGetGroups"
    size="small"
    :customRow="test"
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
</template>
