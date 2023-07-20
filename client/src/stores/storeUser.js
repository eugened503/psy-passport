import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import baseUrl from "@/utils/baseUrl"

export const useStoreUser = defineStore("storeUser", {
  state: () => {
    return {
      user: null,
      token: localStorage.getItem("token") || null,
      loaded: false,
      error: null,
    };
  },

  actions: {
    async register(details) {
      this.loaded = true;
      try {
        const res = await axios({
          method: "post",
          url: baseUrl + "/signup",
          data: details,
        });

        this.user = res.data;
        this.error = null;
        router.push({ name: "login" });
      } catch (error) {
        this.error = error.response.data.message;
      }
      this.loaded = false;
    },

    async login(details) {
      this.loaded = true;
      try {
        const res = await axios({
          method: "post",
          url: baseUrl + "/signin",
          data: details,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
        this.token = token;
        this.error = null;
        router.push({ name: "home" });
      } catch (error) {
        console.log("error", error);
        if (error.response.status === 400) {
          this.error = "Пользователь с таким email не найден";
        } else {
          this.error = error.response.data.message;
        }
      }
      this.loaded = false;
    },

    async logout() {
      this.loaded = true;
      try {
        const res = await axios({
          method: "post",
          url: baseUrl + "/exit",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.token = null;
        localStorage.removeItem("token");
        router.push({ name: "login" });
      } catch (error) {
        this.error = error.response.data.message;
      }
      this.loaded = false;
    },

    async profile() {
      this.loaded = true;
      try {
        const res = await axios({
          method: "get",
          url: baseUrl + "/users/me",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = res.data;
        if (router.isReady() && router.currentRoute.value.path === "/login") {
          router.push("/");
        }
      } catch (error) {
        this.error = error.response.data.message;
      }
      this.loaded = false;
    },

    async upload(avatar) {
      this.loaded = true;
      try {
        const res = await axios({
          method: "patch",
          url: baseUrl + "/users/me/avatar",
          data: { avatar },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = res.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
      this.loaded = false;
    },


    clearError() {
      this.error = null;
    },
  },

  getters: {
    getLoaded: (state) => {
      return state.loaded;
    },
    getToken: (state) => {
      return state.token;
    },
    getError: (state) => {
      return state.error;
    },
    getUser: (state) => {
      return state.user;
    },
  },
});
