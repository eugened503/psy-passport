<template>
  <div>
    <div class="btn-group">
      <button @click="beginAgain" class="btn mt-2">Eще раз</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BtnGroupBlock",

  methods: {
    beginAgain() {
      this.$emit("reset");
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-group {
  width: 250px;
  display: flex;
  justify-content: space-between;

  .btn {
    flex: 0 0 48%;
    border-radius: 0.375rem !important;
  }
}
</style>
