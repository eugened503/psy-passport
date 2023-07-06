<template>
  <div class="high-charts">
    <div class="eysenck-circle" />
    <highcharts class="hc" :options="chartOptions" />
  </div>
</template>

<script setup>
import { toRefs, ref, onMounted } from "vue";

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
      data: [],
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
  //display: flex;
  //align-items: center;
  //justify-content: center;
  width: 40%;
  @media (max-width: 1040px) {
    width: 100%;
  }

  .eysenck-circle {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: url(../assets/images/eysenck-circle3.svg) no-repeat;
    background-position: center;
    //background-size: contain;
  }
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
