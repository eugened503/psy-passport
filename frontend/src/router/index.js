import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Login from "@/components/FormLogin.vue";
import Register from "@/components/FormRegister.vue";
import User from "@/views/User.vue";
import PageError from "@/components/PageError.vue";
import EysenckTest from "@/views/EysenckTest.vue";
import store from "@/store/index";
//console.log(store.getters["user/isLoggedIn"]);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/user",
    name: "user",
    component: User,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/eysenck",
    name: "eysenck",
    component: EysenckTest,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:any(.*)",
    component: PageError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["user/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
