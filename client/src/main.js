import "./main.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import HighchartsVue from "highcharts-vue";


const pinia = createPinia();
const app = createApp(App);

app
  .use(router)
  .use(pinia)
  .use(HighchartsVue)
  .mount("#app");
