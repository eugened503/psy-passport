import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//import axios from "axios";

const app = createApp(App);
//app.config.globalProperties.$axios = axios;
// app.provide("$http", axios);
// const token = localStorage.getItem("token");
// if (token) {
//   app.$http.defaults.headers.common["Authorization"] = token;
// }

app.use(router).use(store).mount("#app");
