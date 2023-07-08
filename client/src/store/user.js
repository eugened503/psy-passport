import axios from "axios";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || null,
    user: null,
    error: null,
  },

  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/signup",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            resolve(resp);
            router.push({ name: "login" });
          })
          .catch((err) => {
            commit("error", err.response.data.message);
            reject(err.response.data.message);
          });
      });
    },

    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/signin",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            localStorage.setItem("token", token);
            commit("login_success", token);
            resolve(resp);
            router.push({ name: "home" });
          })
          .catch((err) => {
            localStorage.removeItem("token");
            if (err.response.status === 400) {
              commit("error", "Пользователь с таким email не найден");
              reject("Пользователь с таким email не найден");
            } else {
              commit("error", err.response.data.message);
              reject(err.response.data.message);
            }
          });
      });
    },

    logout({ commit, getters }) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/exit",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getters.getToken}`,
          },
        })
          .then((resp) => {
            commit("logout");
            localStorage.removeItem("token");
            resolve(resp);
            router.push({ name: "home" });
          })
          // .catch((err) => {
          //   commit("error", err.response.data.message);
          //   localStorage.removeItem("token");
          //   reject(err.response.data.message);
          // });
      });
    },

    profile({ commit, getters }) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/users/me",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getters.getToken}`,
          },
        })
          .then((resp) => {
            const user = resp.data;
            commit("user_success", user);
            resolve(resp);
            if (
              router.isReady() &&
              router.currentRoute.value.path === "/login"
            ) {
              router.push("/");
            }
          })
          .catch((err) => {
            commit("error", err.response.data.message);
            console.log("error", err.response.data.message);
            localStorage.removeItem("token");
            reject(err.response.data.message);
          });
      });
    },
  },

  mutations: {
    login_success(state, token) {
      state.token = token;
    },

    logout(state) {
      state.token = null;
    },

    user_success(state, user) {
      state.user = user;
    },

    error(state, error) {
      state.error = error;
    },

    clear_error(state) {
      state.error = null;
    },
  },

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.token,
    getToken: (state) => state.token,
    getError: (state) => state.error,
  },
};
