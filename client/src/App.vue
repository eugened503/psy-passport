<template>
  <main class="main">
    <Header />
    <router-view />
  </main>
</template>
<script setup>
import axios from "axios";
import Header from "@/components/Header.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

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

const logout = () => {
  store.dispatch("user/logout").then(() => {
   router.push({ name: "login" });
  });
};

</script>

<style lang="scss">
#app {
  min-width: 320px;
  margin: 0 auto;
}

.main {
  min-height: 100vh;
  position: relative;
}
</style>
