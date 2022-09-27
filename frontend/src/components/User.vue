<template>
  <div class="p-5">
    <div class="mt-5 mx-auto">
      {{ getUser }}
      <hr class="border border-primary border-3 opacity-75" />
      <Quiz />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Quiz from "@/components/Quiz.vue";
export default {
  components: { Quiz },
  name: "UserBlock",
  computed: {
    // getUser() {
    //   return this.$store.getters.getUser;
    // },
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
