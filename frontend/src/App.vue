<template>
  <main class="main position-relative">
    <!-- <Spinner
      v-if="isStatus === 'loading'"
      class="position-absolute top-50 start-50 translate-middle"
    /> -->
    <Header />
    <router-view />
  </main>
</template>
<script>
//import { mapGetters } from "vuex";
//import Spinner from "@/components/Spinner.vue";
import axios from "axios";
import Header from "@/components/Header.vue";

export default {
  components: { Header },
  name: "App",
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.logout();
        }
        throw err;
      });
    });
  },

  computed: {
    //...mapGetters("user", { isLoggedIn: "isLoggedIn" }),
    //...mapGetters("user", { isStatus: "authStatus" }),
  },

  // methods: {
  //   logout() {
  //     this.$store.dispatch("user/logout").then(() => {
  //       this.$router.push({ name: "login" });
  //     });
  //   },
  // },
};
</script>

<style lang="scss">
#app {
  //max-width: 1440px;
  min-width: 320px;
  //min-height: 100vh;
  margin: 0 auto;
}

.main {
  min-height: 100vh;
}
</style>
