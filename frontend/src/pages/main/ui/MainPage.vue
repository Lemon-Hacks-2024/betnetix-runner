<script lang="ts" setup>
import { h, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

import CreateGroup from "@/widgets/createGroup";
import GroupsTable from "@/widgets/groupsTable";

const openCreateGroup = ref(false);
</script>

<template>
  <div>
    <a-flex align="center" justify="flex-end" class="mb-5">
      <a-button
        @click="openCreateGroup = true"
        type="primary"
        :icon="h(PlusOutlined)"
      >
        {{ $t.buttons.createGroup }}
      </a-button>
    </a-flex>

    <CreateGroup v-model:open="openCreateGroup" />

    <a-card :bordered="false">
      <GroupsTable />
    </a-card>
  </div>
</template>
