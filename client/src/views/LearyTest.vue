<template>
  <section class="leary container">
    <p class="title">Тест межличностных отношений Лири</p>
    <div v-if="!getLearyRes">
      <div class="container-result" v-if="isActive">
        <Test
          v-if="isActive"
          :results="results"
          :chartOptions="learyChartOptions"
          :dataArr="options"
          :answers="answers"
          :reset="reset"
          :sendResults="sendResults"
          :allResults="allResults"
        >
          <template v-slot:test-background>
            <div class="leary__circle"></div>
          </template>
          <template v-slot:body>
            <DescLeary />
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
        :results="getLearyRes?.test"
        :chartOptions="learyChartOptions"
        :dataArr="getLearyRes?.options"
        :answers="getLearyRes?.answers"
        :deleteData="deleteData"
      >
        <template v-slot:test-background>
          <div class="leary__circle"></div>
        </template>
        <template v-slot:body>
          <DescLeary />
        </template>
      </Test>
    </div>
  </section>
</template>

<script setup>
import learyQuestions from "@/data/leary/questions.json";
import Test from "@/components/Test.vue";
import DescLeary from "@/components/descComponents/DescLeary.vue";
import useChartOptions from "@/composables/useChartOptions";
import { ref, computed, onMounted } from "vue";
import { useStoreResults } from "@/stores/storeResults";
import objectConstructor from "@/utils/objectConstructor";

const { sendResults, deleteResults, getTest, getTestRecords } =
  useStoreResults();

const { learyChartOptions } = useChartOptions();

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

const arr = computed(() => {
  return [
    ["Доминирование", domination.value],
    ["Дружелюбие", benevolence.value],
    [
      "Авторитарный (властный-лидирующий)",
      octantPoints.value.octantFirstPoints,
    ],
    [
      "Эгоистичный (независимый-доминирующий)",
      octantPoints.value.octantSecondPoints,
    ],
    [
      "Агрессивный (прямолинейный-агрессивный)",
      octantPoints.value.octantThirdPoints,
    ],
    [
      "Подозрительный (недоверчивый-скептический)",
      octantPoints.value.octantFourthPoints,
    ],
    ["Подчиняемый (покорно-застенчивый)", octantPoints.value.octantFifthPoints],
    ["Зависимый (зависимый-послушный)", octantPoints.value.octantSixthPoints],
    [
      "Дружелюбный (сотрудничающий-конвенциальный)",
      octantPoints.value.octantSeventhPoints,
    ],
    [
      "Альтруистический (ответственно-великодушный)",
      octantPoints.value.octantEighthPoints,
    ],
  ];
});
const results = computed(() => objectConstructor(arr.value, textPoint));
const allResults = computed(() => {
  return {
    name: "leary",
    title: "Тест межличностных отношений Лири",
    records: {
      test: results.value,
      options: options.value,
      answers: answers.value,
    },
  };
});

const textPoint = (point) => {
  if (point <= 4) return "Низкая";
  if (point >= 5 && point <= 8) return "Умеренная (адаптивное поведение)";
  if (point >= 9 && point <= 12) return "Высокая (экстремальное поведение)";
  return "Экстремальная (до патологии)"; //point >= 13 && point <= 16
};

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

  :deep(
      .highcharts-axis-labels,
      .highcharts-xaxis-labels,
      .highcharts-radial-axis-labels
    ) {
    text {
      display: none;
    }
  }

  :deep(
      .highcharts-grid,
      .highcharts-xaxis-grid,
      .highcharts-radial-axis-grid
    ) {
    path {
      display: none;
    }
  }
}
</style>
