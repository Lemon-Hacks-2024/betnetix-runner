import {
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
  BarControllerChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "node_modules/chart.js/dist/types/utils";

export type TypeOptions<T extends "line" | "bar"> = _DeepPartialObject<
  CoreChartOptions<T> &
    ElementChartOptions<T> &
    PluginChartOptions<T> &
    DatasetChartOptions<T> &
    ScaleChartOptions<T> &
    (T extends "line"
      ? LineControllerChartOptions
      : T extends "bar"
      ? BarControllerChartOptions
      : never)
>;
