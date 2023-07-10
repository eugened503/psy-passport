import { createRouter, createWebHistory } from "vue-router";
import { useStoreUser } from "@/stores/storeUser";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/FormLogin.vue";
import Register from "@/views/FormRegister.vue";
import User from "@/views/User.vue";
import PageError from "@/views/PageError.vue";
import EysenckTest from "@/views/EysenckTest.vue";
import LearyTest from "@/views/LearyTest.vue";
import ShmishekTest from "@/views/ShmishekTest.vue";
import Tests from "@/views/Tests.vue";

const routes = [
  {  
    path: "/",
    name: "home",
    component: HomeView,
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
    path: "/tests",
    name: "tests",
    component: Tests,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "eysenck",
        name: "eysenck",
        component: EysenckTest,
      },
      {
        path: "leary",
        name: "leary",
        component: LearyTest,
      },
      {
        path: "shmishek",
        name: "shmishek",
        component: ShmishekTest,
      },
    ],
  },
  {
    path: "/:any(.*)",
    component: PageError,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const { getToken } = useStoreUser();
  const token = getToken;

  if (to.path === "/login" && token) {
    next("/");
    return;
  }

  if (to.path === "/register" && token) {
    next("/");
    return;
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next("/login");
    return;
  }

  next();
});

export default router;
