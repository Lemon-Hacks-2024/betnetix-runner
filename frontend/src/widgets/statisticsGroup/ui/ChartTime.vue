<script lang="ts" setup>
import { Line } from "vue-chartjs";
import { TypeOptions } from "@/shared/types";

import { useChartTime } from "../model/useChartTime";

const chartTime = useChartTime();
const { options } = chartTime as { options: TypeOptions<"line"> };
const { chartData } = chartTime;
</script>

<template>
  <div class="chart h-[280px]">
    <a-typography-title :level="5">
      {{ $t.main.chartTime }}
    </a-typography-title>

    <Transition appear>
      <a-empty v-if="!chartData.labels?.length" class="empty" />
      <Line v-else id="my-chart-id" :options="options" :data="chartData" />
    </Transition>
  </div>
</template>

<style>
.empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
