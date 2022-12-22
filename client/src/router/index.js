import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/FormLogin.vue";
import Register from "@/views/FormRegister.vue";
import User from "@/views/User.vue";
import PageError from "@/views/PageError.vue";
import EysenckTest from "@/views/EysenckTest.vue";
import LearyTest from "@/views/LearyTest.vue";
import ShmishekTest from "@/views/ShmishekTest.vue";
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
    // children: [
    //   {
    //     path: "/user/eysenck",
    //     name: "eysenck",
    //     component: EysenckTest,
    //     meta: {
    //       requiresAuth: true,
    //     },
    //   },
    // ],
  },
  {
    path: "/eysenck",
    name: "eysenck",
    component: EysenckTest,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: () => {
      return store.dispatch("results/getResults");
    },
  },
  {
    path: "/leary",
    name: "leary",
    component: LearyTest,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: () => {
      return store.dispatch("results/getResults");
    },
  },
  {
    path: "/shmishek",
    name: "shmishek",
    component: ShmishekTest,
    meta: {
      requiresAuth: true,
    },
    // beforeEnter: () => {
    //   return store.dispatch("results/getResults");
    // },
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
