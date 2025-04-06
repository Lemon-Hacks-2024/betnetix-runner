<script lang="ts" setup>
import { Bar } from "vue-chartjs";
import { TypeOptions } from "@/shared/types";
import { useTexts } from "@/app/locale/model";

import { useChartTop } from "../model/useChartTop";

const chartTop = useChartTop();
const { options } = chartTop as { options: TypeOptions<"bar"> };
const { chartData, loadingAnalyticsTop2, loadingAnalyticsTop3 } = chartTop;
const { $t } = useTexts();
</script>

<template>
  <div class="chart h-[350px] w-full">
    <a-typography-title :level="5">
      {{ $t.main.probabilityTop }}
    </a-typography-title>

    <a-spin :spinning="loadingAnalyticsTop2 || loadingAnalyticsTop3">
      <div class="h-[320px]">
        <Transition appear>
          <a-empty v-if="!chartData.datasets?.length" class="empty" />
          <Bar v-else id="my-chart-id" :options="options" :data="chartData" />
        </Transition>
      </div>
    </a-spin>
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
