<template>
  <div>
    <div class="btn-group">
      <button @click="save" v-show="!lie" class="button">Сохранить</button>
      <button @click="beginAgain" class="button">Eще раз</button>
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
  display: flex;
  gap: 10px;
}
</style>
