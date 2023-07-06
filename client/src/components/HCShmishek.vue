<template>
  <div class="high-charts">
    <highcharts class="hc" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  dataArr: Array,
});

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
      "Демонстративность",
      "Застревание",
      "Педантичность",
      "Неуравновешенность",
      "Гипертимность",
      "Дистимичность",
      "Тревожность",
      "Циклотимичность",
      "Аффективность",
      "Эмотивность",
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
onMounted(() => {
  chartOptions.value.series[0].data = dataArr;
});
</script>
<style lang="scss" scoped>
.high-charts {
  flex: 1;
}
</style>
