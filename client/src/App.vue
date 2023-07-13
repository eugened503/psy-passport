<template>
  <div class="page">
    <Header></Header>
    <main class="page__body">
      <router-view />
    </main>
    <Footer class="page__footer"></Footer>
  </div>
</template>
<script setup>
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
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

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__body {
    flex: 1;
  }

  &__footer {
    flex-shrink: 0;
    margin: 40px 0 0;
  }
}
</style>
