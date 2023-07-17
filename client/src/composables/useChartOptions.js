import { ref } from "vue";

export default function useChartOptions() {
  const shmishekChartOptions = ref({
    chart: {
      type: "spline",
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
      title: {
        text: "",
      },
      labels: {
        format: "{value}",
      },
    },

    legend: {
      enabled: false,
    },

    series: [
      {
        type: "area",
        data: [],
        pointPlacement: "on",
        maxWidth: 100,
      },
    ],
  });

  const learyChartOptions = ref({
    chart: {
      polar: true,
    },

    accessibility: { enabled: false },

    title: {
      text: "",
    },

    xAxis: {
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
    },

    series: [
      {
        type: "area",
        data: [],
        pointPlacement: "on",
        maxWidth: 100,
      },
    ],
  });

  const eysenckChartOptions = ref({
    chart: {
      polar: true,
    },

    accessibility: {
      enabled: false,
    },

    title: {
      text: "",
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

    legend: {
      enabled: false,
    },

    series: [
      {
        type: "area",
        data: [0, 0, 0, 0],
        pointPlacement: "on",
        maxWidth: 100,
      },
    ],
  });

  return { shmishekChartOptions, learyChartOptions, eysenckChartOptions };
}
