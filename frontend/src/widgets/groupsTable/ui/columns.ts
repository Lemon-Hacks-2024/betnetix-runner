import { useTexts } from "@/app/locale/model";

const { $t } = useTexts();
export const columns = [
  {
    title: $t.value.main.title,
    dataIndex: "name",
  },
  {
    title: $t.value.main.lastRace,
    dataIndex: "date_time_last_race",
  },
];
