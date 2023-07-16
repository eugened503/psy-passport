<template>
  <section class="leary container">
    <p class="title">Тест межличностных отношений Лири</p>
    <div v-if="!getLearyRes">
      <div class="container-result" v-if="isActive">
        <Test
          v-if="isActive"
          :result="false"
          :results="results"
          :chartOptions="chartOptions"
          :dataArr="options"
          :answers="answers"
          :reset="reset"
          :sendResults="sendResults"
          :allResults="allResults"
        >
          <template v-slot:test-background>
            <div class="leary__circle"></div>
          </template>
        </Test>
      </div>
      <div class="container-result" v-else>
        <p class="subtitle">
          Отметьте (кликните) те суждения, которые соответствуют вашему
          представлению о себе:
        </p>
        <ul class="leary__list">
          <li
            v-for="(question, index) in questions"
            :key="question.id"
            @click="selectItem(question)"
            :class="{ active: question.status }"
          >
            {{ index + 1 }}.
            {{ question.text }}
          </li>
        </ul>
        <button class="container-button button" @click="isActive = true">
          Результаты
        </button>
      </div>
    </div>
    <div class="container-result" v-else>
      <Test
        :result="false"
        :results="getLearyRes?.test"
        :chartOptions="chartOptions"
        :dataArr="getLearyRes?.options"
        :answers="getLearyRes?.answers"
        :deleteData="deleteData"
      >
        <template v-slot:test-background>
          <div class="leary__circle"></div>
        </template>
      </Test>
    </div>
  </section>
</template>

<script setup>
import learyQuestions from "@/data/leary/questions.json";
import Test from "@/components/Test.vue";
import { ref, computed, onMounted } from "vue";
import { useStoreResults } from "@/stores/storeResults";

const { sendResults, deleteResults, getTest, getTestRecords } =
  useStoreResults();

const chartOptions = ref({
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
const keysAll = ref([]);
const subarray = ref([]);
const subarrayClone = ref([]);
const octantAll = ref([]);
const isActive = ref(false);
const questions = ref(learyQuestions);

const answers = computed(() => questions.value.map((x) => x.status));
const getItem = computed(() => getTest("leary"));
const getLearyRes = computed(() => getTestRecords("leary"));
const responsesID = computed(() =>
  questions.value.filter((x) => x.status === true)
);
const octantPoints = computed(() => {
  return {
    octantFirstPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantFirst
    ),
    octantSecondPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantSecond
    ),
    octantThirdPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantThird
    ),
    octantFourthPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantFourth
    ),
    octantFifthPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantFifth
    ),
    octantSixthPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantSixth
    ),
    octantSeventhPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantSeventh
    ),
    octantEighthPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantEighth
    ),
  };
});
const benevolence = computed(() => {
  return Math.round(
    octantPoints.value.octantSeventhPoints -
      octantPoints.value.octantThirdPoints +
      0.7 *
        (octantPoints.value.octantEighthPoints -
          octantPoints.value.octantSecondPoints -
          octantPoints.value.octantFourthPoints +
          octantPoints.value.octantSixthPoints)
  );
});
const domination = computed(() => {
  return Math.round(
    octantPoints.value.octantFirstPoints -
      octantPoints.value.octantFifthPoints +
      0.7 *
        (octantPoints.value.octantEighthPoints +
          octantPoints.value.octantSecondPoints -
          octantPoints.value.octantFourthPoints -
          octantPoints.value.octantSixthPoints)
  );
});
const options = computed(() => {
  return [
    octantPoints.value.octantFirstPoints,
    octantPoints.value.octantEighthPoints,
    octantPoints.value.octantSeventhPoints,
    octantPoints.value.octantSixthPoints,
    octantPoints.value.octantFifthPoints,
    octantPoints.value.octantFourthPoints,
    octantPoints.value.octantThirdPoints,
    octantPoints.value.octantSecondPoints,
  ];
});

const results = computed(() => {
  return [
    {
      scale: "Доминирование",
      total: domination.value,
    },
    {
      scale: "Дружелюбие",
      total: benevolence.value,
    },
    {
      scale: "Авторитарный (властный-лидирующий)",
      total: octantPoints.value.octantFirstPoints,
    },
    {
      scale: "Эгоистичный (независимый-доминирующий)",
      total: octantPoints.value.octantSecondPoints,
    },
    {
      scale: "Агрессивный (прямолинейный-агрессивный)",
      total: octantPoints.value.octantThirdPoints,
    },
    {
      scale: "Подозрительный (недоверчивый-скептический)",
      total: octantPoints.value.octantFourthPoints,
    },
    {
      scale: "Подчиняемый (покорно-застенчивый)",
      total: octantPoints.value.octantFifthPoints,
    },
    {
      scale: "Зависимый (зависимый-послушный)",
      total: octantPoints.value.octantSixthPoints,
    },
    {
      scale: "Дружелюбный (сотрудничающий-конвенциальный)",
      total: octantPoints.value.octantSeventhPoints,
    },
    {
      scale: "Альтруистический (ответственно-великодушный)",
      total: octantPoints.value.octantEighthPoints,
    },
  ];
});
const allResults = computed(() => {
  return {
    name: "leary",
    records: {
      test: results.value,
      options: options.value,
      answers: answers.value,
    },
  };
});

const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
const splitSubArrays = (array, size) => {
  const subarray = [];
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    subarray[i] = array.slice(i * size, i * size + size);
  }

  return subarray;
};
const getKeys = (array) => {
  const evenArr = [];
  const oddArr = [];

  //evenArr
  const octantFirst = [];
  const octantSecond = [];
  const octantThird = [];
  const octantFourth = [];

  //oddArr
  const octantFifth = [];
  const octantSixth = [];
  const octantSeventh = [];
  const octantEighth = [];
  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      evenArr.push(array[i]);
    } else {
      oddArr.push(array[i]);
    }
  }

  for (let i = 0; i < evenArr.length; i++) {
    for (let j = 0; j < evenArr[i].length; j++) {
      if (j === 0) {
        octantFirst.push(...evenArr[i][j]);
      } else if (j === 1) {
        octantSecond.push(...evenArr[i][j]);
      } else if (j === 2) {
        octantThird.push(...evenArr[i][j]);
      } else {
        octantFourth.push(...evenArr[i][j]);
      }
    }
  }
  for (let i = 0; i < oddArr.length; i++) {
    for (let j = 0; j < oddArr[i].length; j++) {
      if (j === 0) {
        octantFifth.push(...oddArr[i][j]);
      } else if (j === 1) {
        octantSixth.push(...oddArr[i][j]);
      } else if (j === 2) {
        octantSeventh.push(...oddArr[i][j]);
      } else {
        octantEighth.push(...oddArr[i][j]);
      }
    }
  }

  return {
    octantFirst,
    octantSecond,
    octantThird,
    octantFourth,
    octantFifth,
    octantSixth,
    octantSeventh,
    octantEighth,
  };
};
const selectItem = ({ status, id }) => {
  questions.value.filter((x) => x.id === id).map((x) => (x.status = !status));
};
const getCommonElements = (array1, array2) => {
  const array = [];

  for (let i = 0; i < array1.length; i += 1) {
    if (array2.includes(array1[i].id)) {
      array.push(array1[i].id);
    }
  }

  return array.length;
};
const reset = () => {
  isActive.value = false;
};
const deleteData = () => {
  const id = getItem.value._id;
  deleteResults(id);
};

questions.value.forEach((question, i) => {
  question.status = false;
  question.id = i;
});

onMounted(() => {
  shuffle(questions.value);
  questions.value.forEach((question, i) => {
    keysAll.value.push(i + 1);
  });
  subarray.value = splitSubArrays(keysAll.value, 16);
  subarray.value.map((arr) => {
    subarrayClone.value.push(splitSubArrays(arr, 4));
  });
  octantAll.value = getKeys(subarrayClone.value);
});
</script>

<style lang="scss" scoped>
.leary {
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    li {
      cursor: pointer;
    }
    li.active {
      color: $clr-aqua;
      font-weight: normal;
      &::after {
        display: none;
      }
    }
  }
  &__circle {
    position: absolute;
    top: -31px;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: url(../assets/images/profile-leary.png) no-repeat;
    filter: invert(5%);
    background-position: center;
    background-size: contain;
    @include _1023 {
      top: -4px;
    }
  }
  .container-button {
    width: 150px;
  }
}
</style>
