export const routes = [
  {
    path: "/",
    name: "main",
    meta: {
      layout: "main",
      title: "Лобби",
    },
    component: () => import("@/pages/main"),
  },
];
