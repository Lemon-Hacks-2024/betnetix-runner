import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

import { useOptions } from "./options";
import { defaultDatasetLine, defaultDatasetBar } from "./defaultDataset";

export const useChart = (typeChart: "line" | "bar") => {
  const { optionsLine, optionsBar } = useOptions();

  switch (typeChart) {
    case "line":
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      break;

    case "bar":
      ChartJS.register(
        CategoryScale,
        LinearScale,
        Title,
        Tooltip,
        Legend,
        BarElement
      );
      break;
  }

  const options = typeChart == "line" ? optionsLine.value : optionsBar.value;

  const defaultDataset =
    typeChart == "line" ? defaultDatasetLine : defaultDatasetBar;

  return { options, defaultDataset };
};
