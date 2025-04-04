export const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      noAuth: true,
      layout: "auth",
    },
    component: () => import("@/pages/login"),
  },
];
