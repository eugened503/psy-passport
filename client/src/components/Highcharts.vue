<template>
  <div class="high-charts">
    <slot name="background"></slot>
    <highcharts class="highcharts" :options="chartOptions" />
  </div>
</template>

<script setup>
import { toRefs, onMounted } from "vue";

const props = defineProps({
  dataArr: Array,
  chartOptions: Object,
});

const { dataArr, chartOptions } = toRefs(props);

onMounted(() => {
  chartOptions.value.series[0].data = dataArr;
});
</script>
<style lang="scss" scoped>
.high-charts {
  position: relative;
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
