import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import "./main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Highcharts from "highcharts";
import hcMore from "highcharts/highcharts-more";
import HighchartsVue from "highcharts-vue";

hcMore(Highcharts);

const app = createApp(App);
app.use(router).use(store).use(HighchartsVue).mount("#app");
