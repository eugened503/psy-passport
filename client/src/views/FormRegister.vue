<template>
  <section class="vh-100 bg-image">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 15px">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-4">Регистрация</h2>
                <form @submit.prevent="submitForm">
                  <div class="form-outline">
                    <input
                      type="text"
                      id="form3Example1cg"
                      class="form-control form-control-lg"
                      v-model="form.name"
                      :class="{ error: v$.name.$errors.length }"
                    />
                    <label class="form-label" for="form3Example1cg">Имя</label>
                    <div class="form-errors">
                      <div
                        v-for="(error, index) of v$.name.$errors"
                        :key="index"
                      >
                        <p class="form-error">{{ error.$message }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="form-outline">
                    <input
                      type="email"
                      id="form3Example3cg"
                      class="form-control form-control-lg"
                      v-model="form.email"
                      :class="{ error: v$.email.$errors.length }"
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
                      autocomplete="on"
                      id="form3Example4cg"
                      class="form-control form-control-lg"
                      v-model="form.password"
                      :class="{ error: v$.password.$errors.length }"
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
                  </div>
                  <div class="form-errors">
                    <p class="form-error">{{ getError }}</p>
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
                    Есть учетная запись?
                    <router-link
                      :to="{ name: 'login' }"
                      class="fw-bold text-body"
                      ><u>Войти</u></router-link
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
import useFormContent from "@/composables/useFormContent";
import { onMounted } from "vue";

const { form, getError, submitForm, clearError, v$ } =
  useFormContent("user/register");

onMounted(() => clearError());
</script>
