<template>
  <header class="header">
    <h2>
      <router-link
        class="header__link"
        :class="{ userLink: styleLink }"
        :to="{ name: 'home' }"
      >
        <img class="header__logo" src="../assets/images/logo.png" alt="" />
      </router-link>
    </h2>
    <nav>
      <li>
        <router-link
          class="header__link"
          :class="{ userLink: styleLink }"
          :to="{ name: 'home' }"
          >Главная</router-link
        >
      </li>
      <li>
        <router-link
          class="header__link"
          :class="{ userLink: styleLink }"
          :to="{ name: 'user' }"
          >Мой&nbsp;паспорт</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <a
          class="header__link"
          :class="{ userLink: styleLink }"
          href="#"
          @click="logout"
          >Logout</a
        >
      </li>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HeaderBlock",

  computed: {
    ...mapGetters("user", { isLoggedIn: "isLoggedIn" }),
    styleLink() {
      console.log(this.$route.name);
      return this.$route.name != "home";
    },
  },

  methods: {
    // logout() {
    //   this.$store.dispatch("user/logout").then(() => {
    //     this.$router.push({ name: "login" });
    //   });
    // },
    ...mapActions({
      logout: "user/logout",
    }),
  },
};
</script>

<style lang="scss">
.header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 35px 100px 0;

  &__logo {
    width: 234px;
  }

  @media (max-width: 1000px) {
    padding: 20px 50px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }

  &__link {
    color: #fff;
    font-size: 19px;
    text-decoration: none;

    @media (max-width: 700px) {
      font-size: 16px;
    }
  }

  h2 {
    font-family: "Roboto", sans-serif;
    @media (max-width: 700px) {
      margin-bottom: 15px;
    }
  }
  nav {
    display: flex;
  }
  nav li {
    margin: 0 15px;
  }
  nav li:first-child {
    margin-left: 0;
  }
  nav li:last-child {
    margin-right: 0;
  }

  .userLink {
    color: $color-black;

    &:hover {
      color: #0a58ca;
    }
  }
}
</style>
