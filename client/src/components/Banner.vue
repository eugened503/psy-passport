<template>
  <section class="banner">
    <h1>Создай свой <span>Psy Passport</span></h1>
    <h2>И узнай себя</h2>
    <router-link v-if="getToken" :to="{ name: 'eysenck' }" class="banner__btn"
      >Пройти тест Айзенка</router-link
    >
    <router-link v-else :to="{ name: 'login' }" class="banner__btn"
      >Войти</router-link
    >
  </section>
</template>

<script setup>
import { useStoreUser } from "@/stores/storeUser";

const { getToken } = useStoreUser();
</script>

<style lang="scss" scoped>
.banner {
  justify-content: center;
  color: $clr-white;
  text-align: center;

  h1 {
    @include banner-title;
  }

  h2 {
    @include banner-subtitle;
  }

  &__btn {
    display: block;
    background-color: $clr-aqua;
    color: $clr-white;
    width: 250px;
    font-weight: 700;
    padding: 16px 32px;
    margin: 30px auto 0;
    border-radius: 8px;
    text-transform: uppercase;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: $clr-saturated-blue;
    }
  }
}
</style>
