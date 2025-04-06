import { ref, computed, inject, Ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { useChart } from "@/shared/charts";
import { Group, useGroupsStore, AnalyticsPairs } from "@/entities/groups";

export const useChartPairs = () => {
  const groupsStore = useGroupsStore();
  const { fetchAnalyticsPairs } = groupsStore;
  const { loadingAnalyticsPairs } = storeToRefs(groupsStore);

  const dataAnalytics = ref<AnalyticsPairs>([]);

  const { options } = useChart("bar");
  const dataGroup = inject<Ref<Group | null>>("dataGroup");

  const labels = computed(() => {
    return dataAnalytics.value.map(([a, b]) => {
      const name1 = dataGroup?.value?.players?.find((p) => p.id === a.id)?.name;
      const name2 = dataGroup?.value?.players?.find((p) => p.id === b.id)?.name;

      return `${name1} - ${name2}`;
    });
  });

  const datasetA = computed(() =>
    dataAnalytics.value.map(([a]) => (a.chance * 100).toFixed(2))
  );
  const datasetB = computed(() =>
    dataAnalytics.value.map(([, b]) => (b.chance * 100).toFixed(2))
  );

  const chartData = computed(() => ({
    labels: labels.value,
    datasets: [
      {
        label: "Первый в паре",
        backgroundColor: "#30ACDE",
        data: datasetA.value,
        stack: "stacked",
        borderRadius: 4,
      },
      {
        label: "Второй в паре",
        backgroundColor: "#7EC4EE",
        data: datasetB.value,
        stack: "stacked",
        borderRadius: 4,
      },
    ],
  }));

  watch(
    () => dataGroup?.value?.id,
    async (id) => {
      if (!id) return [];
      dataAnalytics.value = (await fetchAnalyticsPairs(id as string)) ?? [];
    },
    {
      immediate: true,
    }
  );

  options.scales!.x!.ticks!.display = false;

  return { options, chartData, loadingAnalyticsPairs };
};
