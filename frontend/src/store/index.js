import { createStore } from "vuex";
import axios from "axios";
//import vuexPersist from "vuex-persist";

export default createStore({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
  },

  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("request");
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
            commit("register_success");
            resolve(resp);
          })
          .catch((err) => {
            commit("error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },

    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("request");
        axios({
          url: "http://localhost:3000/signin",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            //console.log("login", resp.data);
            const token = resp.data.token;
            //const user = resp.data.user;
            localStorage.setItem("token", token);
            //axios.defaults.headers.common["Authorization"] = token;
            commit("login_success", token);
            resolve(resp);
          })
          .catch((err) => {
            commit("error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        //delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },

    profile({ commit }) {
      return new Promise((resolve, reject) => {
        commit("request");
        axios({
          url: "http://localhost:3000/users/me",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.token}`,
          },
        })
          .then((resp) => {
            //console.log("profile", resp.data);
            //const token = resp.data.token;
            const user = resp.data;
            //localStorage.setItem("token", token);
            //axios.defaults.headers.common["Authorization"] = token;
            commit("user_success", user);
            resolve(resp);
          })
          .catch((err) => {
            commit("error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
  },

  mutations: {
    request(state) {
      state.status = "loading";
    },

    register_success(state) {
      state.status = "success";
    },

    login_success(state, token) {
      state.status = "success";
      state.token = token;
    },

    logout(state) {
      state.status = "";
      state.token = "";
    },

    user_success(state, user) {
      state.status = "success";
      state.user = user;
    },

    error(state) {
      state.status = "error";
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },

    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },

  // plugins: [
  //   new vuexPersist({
  //     storage: window.localStorage,
  //   }).plugin,
  // ],
});
