import { defineStore } from "pinia";
import axios from "axios";
const baseUrl = "http://localhost:3000/results";
import { useStoreUser } from "@/stores/storeUser";

export const useStoreResults = defineStore("storeResults", {
  state: () => {
    return {
      results: null,
      error: null,
      loaded: false,
    };
  },

  actions: {
    async sendResults(results) {
      this.loaded = true;
      const { getToken } = useStoreUser();
      try {
        const res = await axios({
          method: "post",
          url: baseUrl,
          data: results,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        });
        this.results.push(res.data.data);
      } catch (error) {
        if (error.response.status === 400) {
          this.error = error.response.data.validation.body.message;
        } else {
          this.error = error.response.data.message;
        }
      }
      this.loaded = false;
    },

    async loadResults() {
      this.loaded = true;
      const { getToken } = useStoreUser();
      try {
        const res = await axios({
          method: "get",
          url: baseUrl,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        });
        this.results = res.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
      this.loaded = false;
    },

    async deleteResults(id) {
      this.loaded = true;
      const { getToken } = useStoreUser();
      try {
        const res = await axios({
          method: "delete",
          url: `${baseUrl}/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        });
        this.results = this.results.filter(
          (item) => item.name !== res.data.name
        );
      } catch (error) {
        this.error = error.response.data.message;
      }
      this.loaded = false;
    },
  },

  getters: {
    getLoaded: (state) => {
      return state.loaded;
    },

    getResults: (state) => {
      return state.results;
    },

    getError: (state) => {
      return state.error;
    },

    getTest: (state) => {
      return (name) => state.results?.find((item) => item.name === name);
    },

    getTestRecords: (state) => {
      return (name) =>
        state.results?.find((item) => item.name === name)?.records;
    },
  },
});
