import { computed, inject, Ref } from "vue";
import { ChartData } from "chart.js";
import { useChart, getLabelsDate } from "@/shared/charts";
import { Group } from "@/entities/groups";

export const useChartPlaces = () => {
  const { options, defaultDataset } = useChart("line");
  const dataGroup = inject<Ref<Group | null>>("dataGroup");

  const labels = computed(() => {
    return getLabelsDate(dataGroup?.value?.races ?? []);
  });

  const datasets = computed(() => {
    if (!dataGroup?.value) return [];

    return (
      dataGroup.value.players?.map((player, i) => {
        const data =
          dataGroup.value?.races?.map((race) => {
            return race.results.find((r) => r.player_id == player.id)
              ?.position!;
          }) ?? [];

        return {
          ...defaultDataset(i, data.length),
          label: player.name,
          data,
        };
      }) ?? []
    );
  });

  const chartData = computed<ChartData<"bar">>(() => {
    return {
      labels: labels.value,
      datasets: datasets.value,
    };
  });

  Object.assign(options.scales!.y!.ticks!, {
    stepSize: 1,
  });

  return { options, chartData };
};
