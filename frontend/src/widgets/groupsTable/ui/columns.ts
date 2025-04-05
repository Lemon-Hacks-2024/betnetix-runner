import { useTexts } from "@/app/locale/model";
import { computed } from "vue";

const { $t } = useTexts();

export const columns = computed(() => [
  {
    title: $t.value.main.title,
    dataIndex: "name",
  },
  {
    title: $t.value.main.lastRace,
    dataIndex: "date_time_last_race",
  },
]);
