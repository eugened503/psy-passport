<template>
  <div>
    <div class="btn-group">
      <button @click="save" v-show="!lie" class="btn mt-2">Сохранить</button>
      <button @click="beginAgain" class="btn mt-2">Eще раз</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lie: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["reset", "sendResults"]);

const beginAgain = () => {
  emit("reset");
};
const save = () => {
  emit("sendResults");
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
