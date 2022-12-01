import axios from "axios";

export default {
  namespaced: true,
  state: {
    //status: "",
    token: localStorage.getItem("token") || "",
    results: {},
    error: "",
    resultsStatus: false,
  },

  actions: {
    sendResults({ commit, getters }, results) {
      return axios({
        url: "http://localhost:3000/results",
        data: results,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getters.getToken}`,
        },
      })
        .then((resp) => {
          //const results = resp.data;
          if (resp) {
            commit("load_results");
          }
          //console.log("results", results);
          //commit("send_results", results);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log(err.response.data.validation.body.message);
          } else {
            commit("error", err.response.data.message);
          }
        });
    },

    getResults({ commit, getters }) {
      return axios({
        url: "http://localhost:3000/results",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getters.getToken}`,
        },
      })
        .then((resp) => {
          const results = resp;
          //console.log("results", results);
          commit("send_results", results);
        })
        .catch((err) => {
          commit("error", err.response.data.message);
        });
    },
  },

  mutations: {
    load_results(state) {
      state.resultsStatus = true;
    },

    send_results(state, resp) {
      state.results = resp;
    },

    user_success(state, user) {
      state.user = user;
    },

    error(state, error) {
      state.error = error;
    },
  },

  getters: {
    getResults: (state) => state.results,
    //isLoggedIn: (state) => !!state.token,
    //authStatus: (state) => state.status,
    getResultsStatus: (state) => state.resultsStatus,
    getToken: (state) => state.token,
    getError: (state) => state.error,
  },
};
