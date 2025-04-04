import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import App from "./App.vue";
import { router } from "./providers/router";
import { store } from "./providers/store";

const app = createApp(App);

app.use(Antd).use(router).use(store);
app.mount("#app");
