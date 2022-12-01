<template>
  <div>
    <div class="btn-group">
      <button @click="save" v-show="!lie" class="btn mt-2">Сохранить</button>
      <button @click="beginAgain" class="btn mt-2">Eще раз</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BtnGroupBlock",
  props: {
    lie: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    beginAgain() {
      this.$emit("reset");
    },
    save() {
      this.$emit("sendResults");
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
