export const colors = [
  "#0088FF",
  "#2CD9C5",
  "#FFC107",
  "#A855F7",
  "#F87171",
  "#FB923C",
  "#C2410C",
  "#A16207",
  "#84CC16",
  "#15803D",
  "#4ADE80",
  "#DB2777",
];

export const getColor = (i: number) => {
  return colors[i % colors.length];
};
