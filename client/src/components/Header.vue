<template>
  <header class="header">
    <div class="container d-flex justify-content-between">
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
        <li v-if="isLoggedIn">
          <router-link
            class="header__link"
            :class="{ userLink: styleLink }"
            :to="{ name: 'user' }"
            >Мой&nbsp;паспорт</router-link
          >
        </li>
        <li v-if="isLoggedIn" class="nav-item dropdown test-text">
          <a
            class="header__link nav-link dropdown-toggle"
            :class="{ userLink: styleLink }"
            href="#"
            id="navbarDarkDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Тесты
          </a>
          <ul
            class="dropdown-menu dropdown-menu-dark"
            aria-labelledby="navbarDarkDropdownMenuLink"
          >
            <li>
              <router-link
                class="dropdown-item"
                :class="{ userLink: styleLink }"
                :to="{ name: 'eysenck' }"
                >Тест&nbsp;Айзенка</router-link
              >
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :class="{ userLink: styleLink }"
                :to="{ name: 'leary' }"
                >Тест Лири</router-link
              >
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :class="{ userLink: styleLink }"
                :to="{ name: 'shmishek' }"
                >Тест Шмишека и Леонгарда</router-link
              >
            </li>
          </ul>
        </li>
        <li v-if="!isLoggedIn">
          <router-link
            class="header__link"
            :class="{ userLink: styleLink }"
            :to="{ name: 'login' }"
            >Войти</router-link
          >
        </li>
        <li v-if="isLoggedIn">
          <a
            class="header__link"
            :class="{ userLink: styleLink }"
            href="#"
            @click="logout"
            >Выход</a
          >
        </li>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const isLoggedIn = computed(() => !!store.state.user.token);
const styleLink = computed(() => route.name != "home");


const logout = () => {
  this.$store.dispatch("user/logout").then(() => {
    this.$router.push({ name: "login" });
  });
};
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  //padding: 35px 100px 0;
  padding: 35px 0 0;

  @media (max-width: 1000px) {
    //padding: 20px 50px;
    padding: 20px 0 0;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }

  // @media (max-width: 375px) {
  //   padding-left: 0;
  //   padding-right: 0;
  // }

  .container {
    @media (max-width: 992px) {
      //flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      //padding: 20px 50px;
    }
  }

  &__logo {
    width: 234px;
  }

  &__link {
    color: #fff;
    font-size: 19px;
    text-decoration: none;

    &.userLink {
      color: $color-black;

      &:hover {
        color: #0a58ca;
      }
    }

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
    @media (max-width: 500px) {
      //width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      column-gap: 20px;
      //padding: 10px;
      //flex-direction: column;
      //justify-content: center;
      //align-items: center;
      //text-align: center;
    }
  }
  nav li {
    margin: 0 15px;
    @media (max-width: 500px) {
      margin: 0 0 5px;
    }
  }
  nav li:first-child {
    margin-left: 0;
  }
  nav li:last-child {
    margin-right: 0;
  }
  .dropdown-item.active {
    background: transparent;
  }

  .test-text li {
    margin: 0;
  }

  // .userLink {
  //   color: $color-black;

  //   &:hover {
  //     color: #0a58ca;
  //   }
  // }
}
</style>
