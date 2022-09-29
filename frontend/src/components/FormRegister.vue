<template>
  <section class="vh-100 bg-image" v-if="isOpen">
    <div
      v-if="isOpen"
      class="mask d-flex align-items-center h-100 gradient-custom-3"
    >
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 15px">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-4">Регистрация</h2>
                <!-- <button class="close-button" @click="isOpen = !isOpen">
                <img src="../assets/images/btn-close.svg" alt="button-image" />
              </button> -->
                <form @submit.prevent="register">
                  <div class="form-outline">
                    <input
                      type="text"
                      id="form3Example1cg"
                      class="form-control form-control-lg"
                      v-model="name"
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
                      v-model="email"
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
                      id="form3Example4cg"
                      class="form-control form-control-lg"
                      v-model="password"
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
                  <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-block btn-lg">
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

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
export default {
  name: "FormRegisterBlock",
  data() {
    return {
      isOpen: true,
      name: "",
      email: "",
      password: "",
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      name: {
        required,
        min: minLength(2),
        max: maxLength(30),
        $autoDirty: true,
      },
      password: {
        required,
        min: minLength(8),
        $autoDirty: true,
      },
      email: {
        required,
        email,
        $autoDirty: true,
      },
    };
  },
  methods: {
    register() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      //this.name = this.desc = this.link = this.price = "";
      this.$store
        .dispatch("user/register", data)
        .then(() => this.$router.push({ name: "login" }))
        .catch((err) => console.log(err));
    },
  },
};
</script>
