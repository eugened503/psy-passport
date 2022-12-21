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
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far, fab);
dom.watch();
library.add(fas, far, fab);
hcMore(Highcharts);

const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(HighchartsVue)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");