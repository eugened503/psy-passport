<template>
  <div class="login">
    <form
      @submit.prevent="login"
      class="w-50 mt-5 mx-auto p-4 border border-primary"
    >
      <h2 class="text-uppercase">Login</h2>
      <div class="form-group mt-2">
        <label for="exampleInputEmail2">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group mt-2">
        <label for="exampleInputPassword2">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword2"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Submit</button>
      <router-link class="d-block p-2 mt-2" to="/register"
        >register</router-link
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginBlock",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("login", data)
        .then((obj) => console.log(obj))
        .then(() => this.$router.push("/secure"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
