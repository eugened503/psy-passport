<template>
  <div class="progress-bar">
    <p> Результат:</p>
    <p>{{ pointsLie }} | {{ textLie }}</p>
    <div class="progress-bar__body">
      <p>Min</p>
      <div class="progress-bar__item">
        <div
          class="progress-bar__inner"
          :style="progressStyle"
        ></div>
      </div>
      <p>Max</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  pointsLie: Number,
  textLie: String,
  lieIndexTrue: Number,
  lieIndexFalse: Number,
});

const progressStyle = computed(() => {
  return {
    width:
      (props.pointsLie / (props.lieIndexTrue + props.lieIndexFalse)) * 100 +
      "%",
  };
});
</script>

<style lang="scss" scoped>
.progress-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 16px;
  line-height: 24px;

  &__body {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  &__item {
    display: flex;
    flex: 1;
    height: 16px;
    overflow: hidden;
    font-size: 12px;
    background-color: $clr-gray;
    border-radius: 4px;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    color: $clr-white;
    text-align: center;
    white-space: nowrap;
    background-color: $clr-carrot;
    transition: width 0.6s ease;
  }
}
</style>
