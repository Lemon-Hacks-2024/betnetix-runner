import { computed } from "vue";

import { TypeOptions } from "@/shared/types";

export const useOptions = () => {
  const defaultOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#919EAB",
          font: {
            size: 12,
            lineHeight: "18px",
          },
        },
      },
      y: {
        grid: {
          color: "#919EAB3D",
        },
        border: {
          display: false,
          dash: [4, 2],
        },
        ticks: {
          stepSize: 20,
          color: "#919EAB",
          font: {
            size: 12,
            lineHeight: "18px",
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#606060",
        titleFont: { weight: 600 },
        padding: 12,
        cornerRadius: 7,
        borderColor: "#ccc",
        borderWidth: 1,
        boxPadding: 6,
        boxWidth: 8,
        boxHeight: 8,
        callbacks: {
          labelColor: (context: any) => ({
            backgroundColor: context.dataset.backgroundColor,
            borderColor: context.dataset.borderColor,
            borderWidth: 3,
            borderRadius: 4,
          }),
        },
      },
      legend: {
        position: "bottom" as "bottom",
        align: "start" as "start",
        labels: {
          color: "#919EAB",
          boxWidth: 12,
          boxHeight: 12,
          useBorderRadius: true,
          borderRadius: 6,
          font: {
            size: 14,
            lineHeight: "22px",
          },
          padding: 12,
        },
      },
    },
  }));

  const optionsLine = computed<TypeOptions<"line">>(() => ({
    ...defaultOptions.value,
    interaction: {
      intersect: false,
      mode: "nearest",
      axis: "x",
    },
  }));
  const optionsBar = computed<TypeOptions<"bar">>(() => ({
    ...defaultOptions.value,
    animation: {
      duration: 500,
    },
  }));

  return {
    defaultOptions,
    optionsLine,
    optionsBar,
  };
};
