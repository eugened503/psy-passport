<template>
  <div class="high-charts">
    <div class="leary-circle" />
    <highcharts class="hc" :options="chartOptions" />
  </div>
</template>

<script setup>
import { watch, toRefs, ref, nextTick, onUpdated, onMounted } from "vue";
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
    categories: [
      "Властный",
      "Великодушный",
      "Сотрудничающий",
      "Зависимый",
      "Покорный",
      "Недоверчивый",
      "Агрессивный",
      "Независимый",
    ],
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
    align: "right",
    verticalAlign: "middle",
    layout: "vertical",
  },

  series: [
    {
      name: "Allocated Budget",
      data: [],
      pointPlacement: "on",
      color: "#ffff01",
      lineColor: "#ffff01",
    },
  ],
});

// watch(
//   dataArr,
//   (newValue) => {
//     chartOptions.value.series[0].data = newValue;
//   },
//   { deep: true }
// );

onMounted(() => {
    chartOptions.value.series[0].data = dataArr;
});

// setTimeout(() => {
//   chartOptions.value.series[0].data = dataArr;
// }, 0);

</script>
<style lang="scss" scoped>
.high-charts {
  position: relative;
  width: 100%;
  height: 100%;

  .leary-circle {
    position: absolute;
    top: -2px;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: url(../assets/images/profile-leary.png) no-repeat;
    background-position: center;
    background-size: contain;
  }
}
:deep(.hc) {
  width: 100%;
  background: transparent;
  svg rect {
    fill: none;
  }
}

:deep(.hc div) {
  width: 100% !important;
  height: 100% !important;
  background: transparent;
  svg {
    width: 100% !important;
    height: 100% !important;
  }
}

:deep(.highcharts-series path) {
  fill: rgba(255, 255, 1, 0.3);
}

:deep(.highcharts-grid path) {
  stroke: none;
}

:deep(.highcharts-yaxis-labels text) {
  opacity: 0;
}

:deep(.highcharts-xaxis-labels text) {
  opacity: 0;
}

.highcharts-legend-item,
.highcharts-credits {
  display: none;
}

.highcharts-axis-labels text {
  opacity: 0;
}

.highcharts-plot-border {
  //width: auto;
}

.highcharts-background,
.highcharts-plot-background {
  //width: 100%;
}
.highcharts-plot-background {
  //margin: 0 auto;
}

.highcharts-background {
  //width: auto;
  //display: flex;
  //align-items: center;
  //justify-content: center;
}

.highcharts-axis-labels text {
  //transform: translate(5px, -40px);
  //transform: translate(50px, -140px);
  &:nth-child(1) {
    //transform: rotate(45deg);
    //position: relative;
    //top: 10px;
  }
}
</style>
