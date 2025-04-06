<script lang="ts" setup>
import ChartPlacement from "./ChartPlacement.vue";
import ChartTop from "./ChartTop.vue";
import ChartPairs from "./ChartPairs.vue";
import { useTexts } from "@/app/locale/model";
const { $t } = useTexts();
</script>

<template>
  <a-card :title="$t.main.predictionOutcomes" :bordered="false">
    <a-flex :gap="30" align-items="center">
      <ChartPlacement />
      <ChartTop />
      <ChartPairs />
    </a-flex>
  </a-card>
</template>
