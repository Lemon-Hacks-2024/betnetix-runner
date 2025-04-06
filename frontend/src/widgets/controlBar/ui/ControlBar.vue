<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import MembersButton from "./MembersButton.vue";
import RaceGeneratorInput from "./RaceGeneratorInput.vue";

const route = useRoute();

const currentGroupId = computed(() =>
  typeof route.params.groupId === "string" ? route.params.groupId : undefined
);
</script>

<template>
  <a-card class="control-bar-wrapper">
    <a-flex justify="space-between" align="center">
      <RaceGeneratorInput :groupId="currentGroupId" />
      <MembersButton :groupId="currentGroupId" />
    </a-flex>
  </a-card>
</template>

<style lang="scss" scoped>
.control-bar-wrapper {
  width: 100%;
  border-radius: 30px;
  box-shadow: 0 4px 10px var(--shadow-dark);
  background-color: var(--opacity-element-color);
}
</style>
