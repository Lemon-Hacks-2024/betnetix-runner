export const routes = [
  {
    path: "/main",
    name: "main",
    meta: {
      layout: "main",
      title: "Лобби",
    },
    component: () => import("@/pages/main"),
  },
];
