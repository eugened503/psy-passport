<template>
  <Header></Header>
  <!-- <router-view /> -->
</template>
<script setup>
import axios from "axios";
import Header from "@/components/Header.vue";
import { useStoreUser } from "@/stores/storeUser";

const { logout } = useStoreUser();

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
axios.interceptors.response.use(undefined, function (err) {
  return new Promise(function () {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      logout();
    }
    throw err;
  });
});
</script>
