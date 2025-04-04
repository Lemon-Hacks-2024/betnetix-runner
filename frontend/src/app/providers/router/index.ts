import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = !!localStorage.getItem("token");
  const isRequireAuth = to.meta?.auth || false;
  const isRequireNoAuth = to.meta?.noAuth || false;

  if (isRequireAuth && !token) {
    next("/login");
  } else if (isRequireNoAuth && token) {
    next("/");
  } else {
    next();
  }
});

export { router };
