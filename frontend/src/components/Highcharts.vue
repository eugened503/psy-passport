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
          //backgroundColor: "#FCFFC5",
        },
        accessibility: { enabled: false },

        //colors: ["#32700d"],
        title: {
          text: "Диаграмма результатов",
          //x: -80,
          x: 0,
        },

        pane: {
          size: "100%",
        },

        xAxis: {
          //visible: false,
          // labels: {
          //   enabled: false,
          // },
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

        legend: {
          align: "center",
          verticalAlign: "middle",
          layout: "vertical",
        },

        series: [
          //   {
          //     name: "Allocated",
          //     data: this.optionsData,
          //     pointPlacement: "on",
          //   },
          {
            name: "",
            data: [0, 0, 12, 12],
            pointPlacement: "on",
            maxWidth: 100,
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
        //console.log(newOpt);
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
.high-charts {
  //display: flex;
  //align-items: center;
  //justify-content: center;
  width: 40%;
  @media (max-width: 1040px) {
    width: 100%;
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
</style>
