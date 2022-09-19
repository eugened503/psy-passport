<template>
  <div class="register">
    <form
      @submit.prevent="register"
      class="w-50 mt-5 mx-auto p-4 border border-primary"
    >
      <h2 class="text-uppercase">Register</h2>
      <div class="form-group">
        <label for="exampleInputName1">Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputName1"
          aria-describedby="namelHelp"
          placeholder="Введите имя"
          v-model="name"
        />
      </div>

      <div class="form-group mt-2">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group mt-2">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Submit</button>
      <router-link class="d-block p-2 mt-2" to="/login"> login </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterBlock",
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    register() {
      console.log({
        name: this.name,
        email: this.email,
        password: this.password,
      });

      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      //this.name = this.desc = this.link = this.price = "";
      this.$store
        .dispatch("register", data)
        .then((obj) => console.log(obj))
        .then(() => this.$router.push("/login"))
        .then(() => (this.showModal = false))
        .catch((err) => console.log(err));
    },
  },
};
</script>
