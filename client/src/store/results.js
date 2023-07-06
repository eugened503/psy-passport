import axios from "axios";
import * as user from "./user";

export default {
  namespaced: true,
  state: {
    results: null,
    error: null,
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
          Authorization: `Bearer ${user.default.state.token}`,
        },
      })
        .then((resp) => {
          let results = resp.data.data;
          commit("send_results", [results]);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            commit("error", err.response.data.validation.body.message);
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
          Authorization: `Bearer ${user.default.state.token}`,
        },
      })
        .then((resp) => {
          let results = resp.data;
          commit("send_results", results);
        })
        .catch((err) => {
          commit("error", err.response.data.message);
          console.log(err.response.data.message);
          localStorage.removeItem("token");
        });
    },

    deleteResults({ commit, getters }, id) {
      return axios({
        url: `http://localhost:3000/results/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.default.state.token}`,
        },
      })
        .then(() => {
          commit("send_results", undefined);
        })
        .catch((err) => {
          commit("error", err.response.data.message);
        });
    },
  },

  mutations: {
    send_results(state, resp) {
      state.results = resp;
    },
    error(state, error) {
      state.error = error;
    },
  },

  getters: {
    getStateResults: (state) => state.results,
    getError: (state) => state.error,
  },
};
