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

<script>
export default {
  name: "ProgressBarBlock",
  props: {
    pointsLie: {
      type: Number,
      required: true,
    },
    textLie: {
      type: String,
      required: true,
    },
    lieIndexTrue: {
      type: Number,
      required: true,
    },
    lieIndexFalse: {
      type: Number,
      required: true,
    },
  },
  computed: {
    progressStyle() {
      return {
        width:
          (this.pointsLie / (this.lieIndexTrue + this.lieIndexFalse)) * 100 +
          "%",
      };
    },
  },
};
</script>

<style lang="scss">
.progress {
  width: 90%;

  @media (max-width: 800px) {
    width: 77%;
  }
}
</style>
