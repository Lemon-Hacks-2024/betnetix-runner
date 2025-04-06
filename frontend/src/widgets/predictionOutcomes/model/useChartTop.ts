import { ref, computed, inject, Ref, watch } from "vue";
import { ChartData } from "chart.js";
import { storeToRefs } from "pinia";

import { useChart } from "@/shared/charts";
import { Group, useGroupsStore, AnalyticsTop } from "@/entities/groups";

export const useChartTop = () => {
  const groupsStore = useGroupsStore();
  const { fetchAnalyticsTop2, fetchAnalyticsTop3 } = groupsStore;
  const { loadingAnalyticsTop2, loadingAnalyticsTop3 } =
    storeToRefs(groupsStore);

  const dataAnalytics2 = ref<AnalyticsTop[]>([]);
  const dataAnalytics3 = ref<AnalyticsTop[]>([]);

  const { options, defaultDataset } = useChart("bar");
  const dataGroup = inject<Ref<Group | null>>("dataGroup");

  const labels = ["Топ 2", "Топ 3"];

  const datasets = computed(() => {
    if (!dataAnalytics2.value || !dataAnalytics3.value || !dataGroup?.value)
      return [];

    return (
      dataGroup.value.players?.map((player, i) => {
        const val2 = dataAnalytics2.value.find(
          (d) => d.player_id === player.id
        );
        const val3 = dataAnalytics3.value.find(
          (d) => d.player_id === player.id
        );
        const top2 = val2?.top_probability ?? 0;
        const top3 = val3?.top_probability ?? 0;

        return {
          ...defaultDataset(i, 2),
          label: player.name,
          data: [(top2 * 100).toFixed(2), (top3 * 100).toFixed(2)],
        };
      }) ?? []
    );
  });

  const chartData = computed<ChartData<"bar">>(() => {
    return {
      labels,
      datasets: datasets.value,
    };
  });

  watch(
    () => dataGroup?.value?.id,
    async (id) => {
      if (!id) return [];
      dataAnalytics2.value = (await fetchAnalyticsTop2(id as string)) ?? [];
      dataAnalytics3.value = (await fetchAnalyticsTop3(id as string)) ?? [];
    },
    {
      immediate: true,
    }
  );

  return { options, chartData, loadingAnalyticsTop2, loadingAnalyticsTop3 };
};
