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
          //polar: true,
          //type: "line",
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
            data: this.arr,
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
  flex: 1;
}
</style>
