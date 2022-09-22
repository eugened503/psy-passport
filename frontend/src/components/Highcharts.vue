<template>
  <div class="high-charts">
    <highcharts class="hc" :options="chartOptions" />
  </div>
</template>

<script>
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
HighchartsMore(Highcharts);
export default {
  name: "HighchartsBlock",
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      //counter: 2,
      chartOptions: Highcharts.merge(this.options, {
        chart: {
          polar: true,
          type: "line",
        },

        accessibility: { enabled: false },

        title: {
          text: "Айзенка личностный опросник",
          //x: -80,
        },

        pane: {
          size: "80%",
        },

        xAxis: {
          categories: [
            "Нестабильность",
            "Экстраверсия",
            "Стабильность",
            "Интроверсия",
          ],
          tickmarkPlacement: "on",
          lineWidth: 0,
        },

        yAxis: {
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          min: 0,
        },

        // tooltip: {
        //   shared: true,
        //   pointFormat:
        //     '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>',
        // },

        // legend: {
        //     align: "right",
        //     verticalAlign: "middle",
        //     layout: "vertical",
        // },

        series: [
          //   {
          //     name: "Allocated",
          //     data: this.optionsData,
          //     pointPlacement: "on",
          //   },
          {
            name: "",
            data: [0, 0, 0, 0],
            pointPlacement: "on",
          },
        ],

        // responsive: {
        //   rules: [
        //     {
        //       condition: {
        //         maxWidth: 500,
        //       },
        //       chartOptions: {
        //         legend: {
        //           align: "center",
        //           verticalAlign: "bottom",
        //           layout: "horizontal",
        //         },
        //         pane: {
        //           size: "70%",
        //         },
        //       },
        //     },
        //   ],
        // },
      }),
    };
  },
  watch: {
    options: {
      handler(newOpt) {
        console.log(newOpt);
        this.chartOptions.series = newOpt;
      },
      deep: true,
    },
  },
  //   computed: {
  //     getOptionsData() {
  //       return this.optionsData;
  //     },
  //   },
};
</script>
<style lang="scss">
.highcharts-legend-item,
.highcharts-credits {
  display: none;
}
</style>
