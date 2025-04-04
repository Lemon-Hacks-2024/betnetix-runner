import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach(async (to) => {
  if (to.meta.title) document.title = (to.meta.title as string) + " | LemonBet";
});

export { router };
