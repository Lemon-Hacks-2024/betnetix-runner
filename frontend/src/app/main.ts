import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";
import { router } from "./providers/router";
import { store } from "./providers/store";
import VueTheMask from "vue-the-mask";

const app = createApp(App);

app
  .use(Antd)
  .use(router)
  .use(store)
  .use(VueTheMask as any);

app.mount("#app");
