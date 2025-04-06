<script lang="ts" setup>
import ChartPlace from "./ChartPlaces.vue";
import ChartTime from "./ChartTime.vue";
import { useTexts } from "@/app/locale/model";
const { $t } = useTexts();
</script>

<template>
  <a-card
    class="charts-wrapper"
    :title="$t.main.statisticRaces"
    :bordered="false"
  >
    <div class="chart">
      <ChartPlace />
    </div>

    <a-divider />

    <div class="chart">
      <ChartTime />
    </div>
  </a-card>
</template>

<style lang="scss" scoped>
.charts-wrapper {
  border-radius: 30px;
  box-shadow: 0 4px 10px var(--shadow-dark);
  background-color: var(--opacity-element-color);

  .chart {
    margin-bottom: 50px;

    :deep(.ant-typography) {
      font-size: 16px;
      font-weight: 600;
    }
  }

  :deep(.ant-card-head-title) {
    font-size: 20px;
    font-weight: bolder;
  }
}
</style>
