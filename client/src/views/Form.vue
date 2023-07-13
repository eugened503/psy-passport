<template>
  <section class="form">
    <div class="form__container">
      <p class="form__title">{{ title }}</p>
      <form @submit.prevent="submitForm">
        <div v-if="action === 'register'" class="form__input-wrapper">
          <input
            type="text"
            class="form__input"
            v-model="form.name"
            :class="{ error: v$.name.$errors.length }"
            placeholder="Name"
            autocomplete="on"
          />
          <div class="form__errors">
            <div v-for="(error, index) of v$.name.$errors" :key="index">
              <p class="form__error">{{ error.$message }}</p>
            </div>
          </div>
        </div>

        <div class="form__input-wrapper">
          <input
            type="email"
            class="form__input"
            v-model="form.email"
            :class="{ error: v$.email.$errors.length }"
            placeholder="Email"
            autocomplete="on"
          />
          <div class="form__errors">
            <div v-for="(error, index) of v$.email.$errors" :key="index">
              <p class="form__error">{{ error.$message }}</p>
            </div>
          </div>
        </div>

        <div class="form__input-wrapper">
          <input
            type="password"
            class="form__input"
            v-model="form.password"
            :class="{ error: v$.password.$errors.length }"
            autocomplete="on"
            placeholder="Password"
          />
          <div class="form__errors">
            <div v-for="(error, index) of v$.password.$errors" :key="index">
              <p class="form__error">{{ error.$message }}</p>
            </div>
          </div>
          <div class="form__errors">
            <p class="form__error">{{ getError }}</p>
          </div>
        </div>

        <button
          :disabled="v$.$errors.length > 0"
          type="submit"
          class="form__button"
        >
          Отправить
        </button>
        <router-link :to="{ name: link }" class="form__link">
          {{ titleLink }}
        </router-link>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import useFormContent from "@/composables/useFormContent";
const porps = defineProps({
  title: String,
  action: String,
  link: String,
  titleLink: String,
});

const { form, getError, getLoaded, submitForm, clearError, v$ } =
  useFormContent(porps.action);

onMounted(() => clearError());
</script>

<style lang="scss">
.form {
  display: flex;
  justify-content: center;

  &__container {
    background-color: $clr-white;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.02);
    transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    font-size: 16px;
    line-height: 1.7;
    font-style: normal;
    font-weight: 400;
    color: $clr-manatee;
    width: 570px;
    padding: 30px;
    margin: 80px 0 0;

    @include _600 {
      width: 90%;
    }
  }

  &__title {
    text-align: center;
    color: $clr-manatee;
    font-weight: 600;
    font-size: 24px;
    padding: 20px 0;
  }

  &__input {
    width: 100%;
    margin: 8px 0;
    height: 50px;
    line-height: 40px;
    padding: 0 15px;
    border: 1px solid $clr-smoky-whitey;
    background-color: $clr-smoky-whitey;
    border-radius: 5px;
    font-weight: 300;
    color: $clr-manatee;
    font-size: 17px;
  }

  &__errors {
    min-height: 28px;
  }

  &__error {
    margin: 0;
    color: $clr-carrot;
    animation: fade-in 0.7s ease-in;
    &.active {
      display: block;
    }
  }

  &__input {
    &.error {
      border: 1px solid $clr-carrot !important;
      animation: fade-in 0.7s ease-in;
    }
  }

  &__button {
    color: $clr-white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 22px;
    height: 58px;
    margin: 10px 0;
    border-radius: 5px;
    font-size: 18px;
    line-height: 1;
    font-weight: 600;
    text-align: center;
    background-color: $clr-aqua;
  }

  &__link {
    display: block;
    margin: 30px 0 0;
    color: $clr-aqua;
    text-align: center;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
