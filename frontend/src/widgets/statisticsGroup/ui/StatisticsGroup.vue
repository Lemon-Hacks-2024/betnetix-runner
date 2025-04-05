<script lang="ts" setup>
import ChartPlace from "./ChartPlaces.vue";
import ChartTime from "./ChartTime.vue";
</script>

<template>
  <a-card :title="$t.main.statisticRaces" :bordered="false">
    <div class="chart">
      <ChartPlace />
    </div>

    <a-divider />

    <div class="chart">
      <ChartTime />
    </div>
  </a-card>
</template>

<style scoped>
.chart {
  margin-bottom: 50px;
}
</style>
