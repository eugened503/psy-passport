<template>
  <div class="home">
    <form class="w-50 mt-5 mx-auto">
      <div class="form-group">
        <label for="exampleInputName1">Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputName1"
          aria-describedby="namelHelp"
          placeholder="Введите имя"
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
        />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
