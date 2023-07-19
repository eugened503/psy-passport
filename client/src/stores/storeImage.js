import { defineStore } from "pinia";
import axios from "axios";
const baseUrl = "http://localhost:3000";
import { useStoreUser } from "@/stores/storeUser";

export const useStoreImage = defineStore("storeImage", {
  state: () => {
    return {
      image: null,
    };
  },

  actions: {
    async upload(image) {
      this.loaded = true;
      const { getToken } = useStoreUser();
      try {
        const res = await axios({
          method: "post",
          url: baseUrl + "/uploads",
          data: { image },
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });
        this.image = [res.data];
      } catch (error) {
        this.error = error.response.data.message;
      }
      this.loaded = false;
    },

    async getUpload() {
      this.loaded = true;
      const { getToken } = useStoreUser();
      try {
        const res = await axios({
          method: "get",
          url: baseUrl + "/uploads",
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });
        this.image = res.data;
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
  },

  getters: {
    getError: (state) => {
      return state.error;
    },
    getImage: (state) => {
      return state.image;
    },
  },
});
