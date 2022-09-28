<template>
  <div class="p-5">
    <div class="mt-5 mx-auto">
      {{ getUser }}
      <router-link class="d-inline p-2 mt-2" :to="{ name: 'eysenck' }">
        пройти тест Айзенка
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UserBlock",
  computed: {
    ...mapGetters("user", { getUser: "getUser" }),
  },

  created() {
    this.fetchUser();
  },

  watch: {
    $route: "fetchUser",
  },

  methods: {
    // fetchUser() {
    //   this.$store
    //     .dispatch("user/profile")
    //     .then((user) => console.log(user.data))
    //     .catch((err) => console.log(err));
    // },
    ...mapActions({
      fetchUser: "user/profile",
    }),
  },
};
</script>

<style lang="scss">
.card img {
  height: 280px;
  object-fit: cover;
}
</style>
