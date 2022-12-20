<template>
  <div class="spinner">
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
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

<style lang="scss" scoped>
.spinner {
  z-index: 3;
}
</style>
