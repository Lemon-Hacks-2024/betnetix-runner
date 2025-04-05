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

import { optionsLine, optionsBar } from "./options";
import { defaultDatasetLine, defaultDatasetBar } from "./defaultDataset";

export const useChart = (typeChart: "line" | "bar") => {
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

  const options = typeChart == "line" ? optionsLine : optionsBar;

  const defaultDataset =
    typeChart == "line" ? defaultDatasetLine : defaultDatasetBar;

  return { options, defaultDataset };
};
