<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="row">
        <div class="col-sm-3">
          <p class="mb-0">Full Name</p>
        </div>
        <div class="col-sm-9">
          <p class="text-muted mb-0">{{ name }}</p>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-3">
          <p class="mb-0">Email</p>
        </div>
        <div class="col-sm-9">
          <p class="text-muted mb-0">{{ email }}</p>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-3">
          <p class="mb-0">ID</p>
        </div>
        <div class="col-sm-9">
          <p class="text-muted mb-0">{{ id }}</p>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-3">
          <p class="mb-0">Mobile</p>
        </div>
        <div class="col-sm-9">
          <p class="text-muted mb-0">(098) 765-4321</p>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-3">
          <p class="mb-0">Address</p>
        </div>
        <div class="col-sm-9">
          <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserInfoBlock",
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
    id: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  hr {
    border: 0;
    opacity: 1;
    width: 100%;
  }
}
</style>
