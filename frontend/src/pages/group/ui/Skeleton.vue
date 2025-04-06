<script lang="ts" setup>
import SkeletonItem from "./SkeletonItem.vue";
</script>

<template>
  <a-flex vertical :gap="30">
    <a-card :bordered="false">
      <a-flex :gap="20">
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </a-flex>
    </a-card>

    <a-card :bordered="false">
      <SkeletonItem />
    </a-card>

    <a-card :bordered="false">
      <a-flex vertical :gap="20">
        <SkeletonItem />
        <SkeletonItem />
      </a-flex>
    </a-card>
  </a-flex>
</template>
