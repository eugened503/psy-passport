<template>
  <div class="card mb-4">
    <div class="card-body text-center">
      <img
        src="../assets/images/altai.jpg"
        alt="avatar"
        class="rounded-circle img-fluid"
        style="width: 150px; height: 150px"
      />
      <h5 class="my-3">{{ name }}</h5>
      <p class="text-muted mb-1">Full Stack Developer</p>
      <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
      <!-- <div class="d-flex justify-content-center mb-2">
        <button type="button" class="btn btn-primary">Follow</button>
        <button type="button" class="btn btn-outline-primary ms-1">
          Message
        </button>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "ProfileCardBlock",
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style lang="scss"></style>
