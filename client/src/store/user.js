import axios from "axios";
import router from "@/router";
//import * as res from "./results";

export default {
  namespaced: true,
  state: {
    //status: "",
    token: localStorage.getItem("token") || null,
    user: null,
    error: null,
  },

  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        //commit("request");
        axios({
          url: "http://localhost:3000/signup",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            //console.log("resp", resp);
            //const token = resp.data.token;
            //const user = resp.data.user;
            //localStorage.setItem("token", token);
            //axios.defaults.headers.common["Authorization"] = token;
            //commit("register_success");
            resolve(resp);
            router.push({ name: "login" });
          })
          .catch((err) => {
            commit("error", err.response.data.message);
            //localStorage.removeItem("token");
            reject(err.response.data.message);
          });
      });
    },

    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        //commit("request");
        axios({
          url: "http://localhost:3000/signin",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            localStorage.setItem("token", token);
            //axios.defaults.headers.common["Authorization"] = token;
            commit("login_success", token);
            resolve(resp);
            router.push({ name: "home" });
          })
          .catch((err) => {
            console.log(err);
            //console.log(err.response.data.validation.body.message);
            //console.log(err.response.status);
            if (err.response.status === 400) {
              commit("error", "Пользователь с таким email не найден");
              //localStorage.removeItem("token");
              reject("Пользователь с таким email не найден");
            } else {
              commit("error", err.response.data.message);
              //localStorage.removeItem("token");
              reject(err.response.data.message);
            }
          });
      });
    },

    logout({ commit, getters }) {
      // return new Promise((resolve) => {
      //   commit("logout");
      //   localStorage.removeItem("token");
      //   //delete axios.defaults.headers.common["Authorization"];
      //   resolve();
      // });
      return new Promise((resolve, reject) => {
        //commit("request");
        axios({
          url: "http://localhost:3000/exit",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getters.getToken}`,
          },
        })
          .then((resp) => {
            //console.log(resp);
            commit("logout");
            localStorage.removeItem("token");
            resolve(resp);
            router.push({ name: "home" });
          })
          .catch((err) => {
            commit("error", err.response.data.message);
            //localStorage.removeItem("token");
            reject(err.response.data.message);
          });
      });
    },

    profile({ commit, getters }) {
      //console.log("profile");
      return new Promise((resolve, reject) => {
        //commit("request");
        axios({
          url: "http://localhost:3000/users/me",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getters.getToken}`,
          },
        })
          .then((resp) => {
            //const token = resp.data.token;
            const user = resp.data;
            commit("user_success", user);
            resolve(resp);
            if (
              router.isReady() &&
              router.currentRoute.value.path === "/login"
            ) {
              //console.log("123");
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
    // request(state) {
    //   //state.status = "loading";
    // },

    // register_success(state) {
    //   //state.status = "success";
    // },

    login_success(state, token) {
      //state.status = "success";
      state.token = token;
    },

    logout(state) {
      //state.status = "";
      state.token = null;
    },

    user_success(state, user) {
      //console.log("user_success");
      //state.status = "success";
      state.user = user;
    },

    error(state, error) {
      //state.status = "error";
      state.error = error;
    },
    clearError(state) {
      //state.status = "error";
      state.error = null;
    },
  },

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.token,
    //authStatus: (state) => state.status,
    getToken: (state) => state.token,
    getError: (state) => state.error,
  },
};
