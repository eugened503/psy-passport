<template>
  <div>
    <span>Шкала лжи. </span>
    <span> Результат:</span>
    {{ pointsLie }} | {{ textLie }}
    <div class="d-flex">
      <span class="p-4">Min</span>
      <div class="progress" ref="progress">
        <div
          class="progress-bar bg-danger bg-gradient"
          role="progressbar"
          :style="progressStyle"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span class="p-4">Max</span>
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
