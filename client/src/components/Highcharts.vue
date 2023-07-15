<template>
  <div class="high-charts">
    <div class="eysenck-circle"></div>
    <highcharts class="highcharts" :options="chartOptions" />
  </div>
</template>

<script setup>
import { toRefs, ref, onMounted, reactive } from "vue";

const props = defineProps({
  dataArr: Array,
});

const { dataArr } = toRefs(props);

const chartOptions = ref({
  chart: {
    polar: true,
    type: "line",
  },

  accessibility: { enabled: false },

  title: {
    text: "",
  },

  pane: {
    size: "100%",
  },

  xAxis: {
    labels: {
      enabled: false,
      X: 0,
      y: 0,
    },
    categories: ["Н", "Э", "С", "И"],
    tickmarkPlacement: "on",
    lineWidth: 0,
  },

  yAxis: {
    gridLineInterpolation: "polygon",
    lineWidth: 0,
    min: 0,
  },

  legend: {
    enabled: false,
    align: "center",
    verticalAlign: "middle",
    layout: "vertical",
  },

  series: [
    {
      type: "area",
      name: "Area",
      data: [0, 0, 0, 0],
      pointPlacement: "on",
      maxWidth: 100,
    },
  ],
});

onMounted(() => {
  chartOptions.value.series[0].data = dataArr;
});
</script>
<style lang="scss" scoped>
.high-charts {
  position: relative;
  .eysenck-circle {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: url(../assets/images/eysenck-circle3.svg) no-repeat;
    background-position: center;
    background-size: contain;
  }
}
</style>

<style lang="scss">
.highcharts-background {
  fill: $clr-smoky-whitey;
}

.highcharts-credits {
  display: none;
}
</style>
