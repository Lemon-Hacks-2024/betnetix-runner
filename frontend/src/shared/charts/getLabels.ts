import dayjs from "dayjs";
import { Race } from "@/entities/groups";

export const getLabelsDate = (races: Race[]) => {
  return races.map((race) => {
    return dayjs.unix(race.started_at).format("D MMM YY, HH:mm");
  });
};
