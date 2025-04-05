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
  {
    path: "/group/:groupId",
    name: "group",
    meta: {
      layout: "main",
      title: "Группа",
    },
    component: () => import("@/pages/group"),
  },
];
