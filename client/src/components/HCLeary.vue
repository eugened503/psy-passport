<template>
  <div class="high-charts">
    <div class="leary-circle" />
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

        title: {
          text: "",
          //y: 0,
          //x: -80,
          //x: 0,
        },

        subtitle: {
          //text: "Н-нестабильность, Э-экстраверсия, С-стабильность, И-интроверсия",
          //y: 0,
          //y: -0.3,
        },

        pane: {
          size: "100%",
        },

        // xAxis: {
        //   //visible: false,
        //   labels: {
        //     enabled: false,
        //     X: 0,
        //     y: 0,
        //   },
        //   categories: ["Н", "Э", "С", "И"],
        //   tickmarkPlacement: "on",
        //   lineWidth: 0,
        // },
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

        // tooltip: {
        //   shared: true,
        //   pointFormat:
        //     '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>',
        // },

        legend: {
          enabled: false,
          align: "right",
          verticalAlign: "middle",
          layout: "vertical",
        },

        series: [
          {
            name: "Allocated Budget",
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            pointPlacement: "on",
            color: "#ffff01",
            lineColor: "#ffff01",
          },
          // {
          //   name: "Actual Spending",
          //   data: [50, 39, 42, 31, 26, 14, 46, 13],
          //   pointPlacement: "on",
          // },
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
<style lang="scss" scoped>
.high-charts {
  position: relative;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 1040px) {
    //width: 100%;
  }

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
  //position: absolute;
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
