<template>
  <div class="spinner">
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpinnerBlock",
};
</script>

<style lang="scss">
.spinner {
  z-index: 1;
}
</style>
