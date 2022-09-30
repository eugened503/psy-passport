import axios from "axios";

export default {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    error: "",
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
            commit("error", err.response.data.message);
            localStorage.removeItem("token");
            reject(err.response.data.message);
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
            const token = resp.data.token;
            localStorage.setItem("token", token);
            //axios.defaults.headers.common["Authorization"] = token;
            commit("login_success", token);
            resolve(resp);
          })
          .catch((err) => {
            //console.log(err.response.data.validation.body.message);
            //console.log(err.response.status);
            if (err.response.status === 400) {
              commit("error", "Пользователь с таким email не найден");
              localStorage.removeItem("token");
              reject("Пользователь с таким email не найден");
            } else {
              commit("error", err.response.data.message);
              localStorage.removeItem("token");
              reject(err.response.data.message);
            }
          });
      });
    },

    // async login({ commit }, user) {
    // commit("request");
    // let resp = await axios({
    //   url: "http://localhost:3000/signin",
    //   data: user,
    //   method: "POST",
    // }).catch((err) => {
    //   console.log(err);
    //   commit("error");
    // });
    // if (resp) {
    //   console.log(resp);
    //   const token = resp.data.token;
    //   localStorage.setItem("token", token);
    //   commit("login_success", token);
    // }

    //   try {
    //     commit("request");
    //     const resp = await axios({
    //       url: "http://localhost:3000/signin",
    //       data: user,
    //       method: "POST",
    //     });
    //     if (!resp) {
    //       throw new Error("Неправильные почта или пароль");
    //     }
    //     const token = resp.data.token;
    //     localStorage.setItem("token", token);
    //     commit("login_success", token);
    //   } catch (e) {
    //     console.log(e);
    //     commit("error");
    //   }
    // },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        //delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },

    profile({ commit, getters }) {
      return new Promise((resolve, reject) => {
        commit("request");
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

    error(state, error) {
      state.status = "error";
      state.error = error;
    },
  },

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    getToken: (state) => state.token,
    getError: (state) => state.error,
  },
};
