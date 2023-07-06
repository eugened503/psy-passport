<template>
  <div class="progress-wrapper">
    <span> Результат:</span>
    {{ pointsLie }} | {{ textLie }}
    <div class="d-flex justify-content-between align-items-center mt-2">
      <span>Min</span>
      <div class="progress">
        <div
          class="progress-bar bg-danger bg-gradient"
          role="progressbar"
          :style="progressStyle"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span>Max</span>
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
.progress {
  width: 90%;

  @media (max-width: 800px) {
    width: 77%;
  }
}
</style>
