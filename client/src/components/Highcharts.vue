<template>
  <div class="high-charts">
    <div class="eysenck-circle" />
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
    arr: {
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

        xAxis: {
          //visible: false,
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

        // tooltip: {
        //   shared: true,
        //   pointFormat:
        //     '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>',
        // },

        legend: {
          enabled: false,
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
            type: "area",
            name: "Area",
            data: this.arr,
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
