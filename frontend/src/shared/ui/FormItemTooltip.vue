<script lang="ts" setup>
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <a-tooltip placement="right">
    <template #title>
      <slot />
    </template>

    <QuestionCircleOutlined class="ml-2 opacity-50" />
  </a-tooltip>
</template>
