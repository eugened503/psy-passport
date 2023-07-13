<template>
  <nav class="dropdown-menu">
    <button
      class="dropdown-menu__button"
      :class="{ active: path }"
      @click="isOpen"
    >
      Тесты
    </button>
    <Transition name="fade">
      <ul class="dropdown-menu__body" v-if="show">
        <li>
          <router-link
            class="dropdown-menu__item ellipsis link-line"
            @click="isOpen"
            :to="{ name: 'eysenck' }"
            >Тест&nbsp;Айзенка</router-link
          >
        </li>
        <li>
          <router-link
            class="dropdown-menu__item ellipsis link-line"
            @click="isOpen"
            :to="{ name: 'leary' }"
            >Тест Лири</router-link
          >
        </li>
        <li>
          <router-link
            class="dropdown-menu__item ellipsis link-line"
            @click="isOpen"
            :to="{ name: 'shmishek' }"
            >Тест Шмишека и Леонгарда</router-link
          >
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const show = ref(false);

const isOpen = () => (show.value = !show.value);

const path = computed(() => route.matched[0]?.name === "tests");
</script>

<style lang="scss" scoped>
.dropdown-menu {
  position: relative;

  &__body {
    position: absolute;
    max-width: 100px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: $clr-white;
    top: 50px;
    border-radius: 0 0 10px 10px;
  }

  &__button,
  &__item {
    color: $clr-manatee;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: $clr-slate-grey;
    }
  }

  &__button {
    display: flex;
    @include link-item;
  }

  &__item {
    display: block;
    font-size: 14px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
