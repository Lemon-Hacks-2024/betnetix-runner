<script setup lang="ts">
import MembersButton from "./MembersButton.vue";
import RaceGeneratorInput from "./RaceGeneratorInput.vue";
</script>

<template>
  <a-card class="control-bar-wrapper">
    <a-flex justify="space-between" align="center">
      <RaceGeneratorInput />
      <MembersButton />
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
