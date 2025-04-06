import { computed, inject, Ref } from "vue";
import { ChartData } from "chart.js";
import { useChart, getLabelsDate } from "@/shared/charts";
import { Group } from "@/entities/groups";
import { usePreferencesStore } from "@/entities/preferences";
import { storeToRefs } from "pinia";

export const useChartTime = () => {
  const { language } = storeToRefs(usePreferencesStore());

  const { options, defaultDataset } = useChart("line");
  const dataGroup = inject<Ref<Group | null>>("dataGroup");

  const labels = computed(() => {
    if (language.value === "ru")
      return getLabelsDate(dataGroup?.value?.races ?? []);
    else return getLabelsDate(dataGroup?.value?.races ?? []);
  });

  const datasets = computed(() => {
    if (!dataGroup?.value) return [];

    return (
      dataGroup.value.players?.map((player, i) => {
        const data =
          dataGroup.value?.races?.map((race) => {
            return race.results.find((r) => r.player_id == player.id)
              ?.race_time!;
          }) ?? [];

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
      labels: labels.value,
      datasets: datasets.value,
    };
  });

  Object.assign(options.scales!.y!.ticks!, {
    stepSize: 1,
  });

  return { options, chartData };
};
