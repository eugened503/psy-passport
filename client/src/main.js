import "./main.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Highcharts from "highcharts";
import VueHighcharts from "highcharts-vue";
import highchartsMore from "highcharts/highcharts-more";
highchartsMore(Highcharts);

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).use(VueHighcharts, { Highcharts }).mount("#app");
