import { getColor } from "@/shared/utils";

export const defaultDatasetLine = (i: number, length: number) => ({
  borderColor: getColor(i),
  backgroundColor: getColor(i),
  tension: 0.25,
  pointRadius: 2,
  borderWidth: 3,
  pointStyle: (length > 1 ? false : "circle") as "circle" | false,
});

export const defaultDatasetBar = (i: number) => ({
  borderColor: getColor(i),
  backgroundColor: getColor(i),
  borderRadius: 5,
  borderWidth: 3,
});
