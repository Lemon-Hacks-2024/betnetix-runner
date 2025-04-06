import { ref, computed, inject, Ref, watch } from "vue";
import { ChartData } from "chart.js";
import { storeToRefs } from "pinia";

import { useChart } from "@/shared/charts";
import { Group, useGroupsStore, AnalyticsPlace } from "@/entities/groups";

export const useChartPlacement = () => {
  const groupsStore = useGroupsStore();
  const { fetchAnalyticsPlaces } = groupsStore;
  const { loadingAnalyticsPlaces } = storeToRefs(groupsStore);

  const dataAnalytics = ref<AnalyticsPlace[]>([]);

  const { options, defaultDataset } = useChart("line");
  const dataGroup = inject<Ref<Group | null>>("dataGroup");

  const labels = [1, 2, 3, 4, 5, 6];

  const datasets = computed(() => {
    if (!dataAnalytics.value || !dataGroup?.value) return [];

    return (
      dataGroup.value.players?.map((player, i) => {
        const data =
          dataAnalytics.value
            .find((d) => d.player_id == player.id)
            ?.places_probability!.map((p) => p * 100)
            .map((p) => p.toFixed(2)) ?? [];

        return {
          ...defaultDataset(i, data.length),
          label: player.name,
          data,
        };
      }) ?? []
    );
  });

  const chartData = computed<ChartData<"line">>(() => {
    return {
      labels,
      datasets: datasets.value,
    };
  });

  watch(
    () => dataGroup?.value?.id,
    async (id) => {
      if (!id) return [];
      dataAnalytics.value = (await fetchAnalyticsPlaces(id as string)) ?? [];
    },
    {
      immediate: true,
    }
  );

  return { options, chartData, loadingAnalyticsPlaces };
};
