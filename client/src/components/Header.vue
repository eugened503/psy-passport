<template>
  <header class="header">
    <router-link class="header__link link-line" :to="{ name: 'home' }">
      <img
        class="header__logo desktop"
        src="../assets/images/logo.png"
        alt="logo"
      />
      <img
        class="header__logo mobile"
        src="../assets/images/logo-mobile.png"
        alt="logo"
      />
    </router-link>
    <nav class="header__nav-link">
      <li>
        <router-link class="header__link" :to="{ name: 'home' }"
          >Главная</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <router-link class="header__link" :to="{ name: 'user' }"
          >Мой&nbsp;паспорт</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <DropdownMenu></DropdownMenu>
      </li>
      <li v-if="!isLoggedIn">
        <router-link v-if="path" class="header__link" :to="{ name: 'login' }"
          >Войти</router-link
        >
        <router-link v-else class="header__link" :to="{ name: 'register' }"
          >Регистрация</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <a class="header__link" href="#" @click="exit">Выход</a>
      </li>
    </nav>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useStoreUser } from "@/stores/storeUser";
import DropdownMenu from "@/components/DropdownMenu.vue";

const { logout } = useStoreUser();
const { getToken } = storeToRefs(useStoreUser());
const route = useRoute();

const isLoggedIn = computed(() => getToken.value);
const path = computed(() => route.name != "login");

const exit = () => {
  logout();
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 1;
  top: 0;
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  padding: 10px 15px;
  background-color: $clr-white;
  box-shadow: 0px 2px 2px rgba(118, 117, 144, 0.12);
  @include _424 {
    padding: 10px 10px;
  }

  &__nav-link {
    display: flex;
    align-items: center;
    gap: 20px;
    @include _424 {
      gap: 10px;
    }
  }

  &__link {
    display: flex;
    @include link-item;
    color: $clr-manatee;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: $clr-slate-grey;
    }
  }

  &__logo {
    height: 100%;
    object-fit: cover;
    @include _767 {
      display: none;
    }
    &.desktop {
      @include _767 {
        display: none;
      }
    }

    &.mobile {
      display: none;
      @include _767 {
        display: block;
        width: 50px;
        object-fit: contain;
      }
    }
  }
}
</style>
