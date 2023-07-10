<template>
  <section class="vh-100 bg-image">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 15px">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-4">Войти</h2>
                <form @submit.prevent="submitForm">
                  <div class="form-outline">
                    <input
                      type="email"
                      id="form3Example3cg"
                      class="form-control form-control-lg"
                      v-model="form.email"
                      :class="{ error: v$.email.$errors.length }"
                      autocomplete="chrome-off"
                    />
                    <label class="form-label" for="form3Example3cg"
                      >Email</label
                    >
                    <div class="form-errors">
                      <div
                        v-for="(error, index) of v$.email.$errors"
                        :key="index"
                      >
                        <p class="form-error">{{ error.$message }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="form-outline">
                    <input
                      type="password"
                      id="form3Example4cg"
                      class="form-control form-control-lg"
                      v-model="form.password"
                      :class="{ error: v$.password.$errors.length }"
                      autocomplete="chrome-off"
                    />
                    <label class="form-label" for="form3Example4cg"
                      >Пароль</label
                    >
                    <div class="form-errors">
                      <div
                        v-for="(error, index) of v$.password.$errors"
                        :key="index"
                      >
                        <p class="form-error">{{ error.$message }}</p>
                      </div>
                    </div>
                    <div class="form-errors">
                      <p class="form-error">{{ getError }}</p>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button
                      :disabled="v$.$errors.length > 0"
                      type="submit"
                      class="btn btn-block btn-lg"
                    >
                      Отправить
                    </button>
                  </div>
                  <p class="text-center text-muted mt-4 mb-0">
                    Нет учетной записи?
                    <router-link
                      :to="{ name: 'register' }"
                      class="fw-bold text-body"
                      ><u>Регистрация</u></router-link
                    >
                    <br />
                    <router-link
                      :to="{ name: 'home' }"
                      class="fw-bold text-body"
                      ><u>На главную</u></router-link
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import useFormContent from "@/composables/useFormContent";
const { form, getError, getLoaded, submitForm, clearError, v$ } =
  useFormContent("login");

onMounted(() => clearError());
</script>

<style lang="scss">
.bg-image {
  padding: 0;
  position: relative;
  background: url("../assets/images/altai.jpg");
  z-index: 2;

  p {
    max-width: none;
    text-align: left;
    margin-bottom: 0;
    padding: 0;
    line-height: 24px;
  }
}

.mask {
  //position: fixed;
  width: 100%;
  //z-index: 2;
}

.card-body {
  //position: relative;
}

.card {
  background: $color-white;
}

.gradient-custom-3 {
  background: #84fab0;
  background: linear-gradient(
    to right,
    rgba(132, 250, 176, 0.5),
    rgba(143, 211, 244, 0.5)
  );
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: transparent;

  img {
    width: 25px;
    height: 25px !important;
  }
}

.form-errors {
  min-height: 24px;
  margin: 0 0 10px;
}
.form-error {
  //font-size: 8px;
  //@debugline-height: 7px;
  margin: 0;
  color: red;
  animation: fade-in 0.7s ease-in;
  &.active {
    display: block;
  }
}

.error {
  border: 1px solid red !important;
  //box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  //border-radius: 4px;
  animation: fade-in 0.7s ease-in;
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
