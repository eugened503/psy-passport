<template>
  <section class="container">
    <p class="title">Опросник Леонгарда, Шмишека</p>
    <div v-if="!getShmishekRes">
      <div v-if="questionIndex < questions.length">
        <Question
          v-for="(question, index) in questions"
          :key="question.id"
          :index="index"
          :text="question.text"
          :responses="question.responses"
          :answers="answers"
          @addRes="addRes"
          @next="next"
          @prev="prev"
          :isDisabled="isDisabled"
          :questions="questions"
          :questionIndex="questionIndex"
          name="Шмишека и Леонгарда"
        />
      </div>
      <div class="container-result" v-if="questionIndex === questions.length">
        <Test
          :results="results"
          :chartOptions="chartOptions"
          :dataArr="options"
          :answers="answers"
          :reset="reset"
          :sendResults="sendResults"
          :allResults="allResults"
        >
          <template v-slot:body>
            <DescShmishek />
          </template>
        </Test>
      </div>
    </div>
    <div class="container-result" v-else>
      <Test
        :results="getShmishekRes?.test"
        :chartOptions="chartOptions"
        :dataArr="getShmishekRes?.options"
        :answers="getShmishekRes?.answers"
        :deleteData="deleteData"
      >
        <template v-slot:body>
          <DescShmishek />
        </template>
      </Test>
    </div>
  </section>
</template>

<script setup>
import questions from "@/data/shmishek/questions.json";
import Question from "@/components/Question.vue";
import Test from "@/components/Test.vue";
import DescShmishek from "@/components/descComponents/DescShmishek.vue";
import { ref, computed } from "vue";
import { useStoreResults } from "@/stores/storeResults";
import useTestContent from "@/composables/useTestContent";
import objectConstructor from "@/utils/objectConstructor";

const { sendResults, deleteResults, getTest, getTestRecords } =
  useStoreResults();

const chartOptions = ref({
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

const questionIndex = ref(0);
const answers = ref([]);
const demoTrue = ref([7, 19, 22, 29, 41, 44, 63, 66, 73, 85, 88]);
const demoFalse = ref([51]);
const jamTrue = ref([2, 15, 24, 34, 37, 56, 68, 78, 81]);
const jamFalse = ref([12, 46, 59]);
const pedTrue = ref([4, 14, 17, 26, 39, 48, 58, 61, 70, 80, 83]);
const pedFalse = ref([36]);
const instaTrue = ref([8, 20, 30, 42, 52, 64, 74, 86]);
const hyperTrue = ref([1, 11, 23, 33, 45, 55, 67, 77]);
const dysthyTrue = ref([9, 21, 43, 75, 87]);
const dysthyFalse = ref([31, 53, 65]);
const anxietyTrue = ref([16, 27, 38, 49, 60, 71, 82]);
const anxietyFalse = ref([5]);
const cycloTrue = ref([6, 18, 18, 40, 50, 62, 72, 84]);
const affectTrue = ref([10, 32, 54, 76]);
const emoTrue = ref([3, 13, 35, 47, 57, 69, 79]);
const emoFalse = ref([25]);
const demo = ref([]);
const jam = ref([]);
const ped = ref([]);
const insta = ref([]);
const hyper = ref([]);
const dysthy = ref([]);
const anxiety = ref([]);
const cyclo = ref([]);
const affect = ref([]);
const emo = ref([]);

const getItem = computed(() => getTest("shmishek"));
const getShmishekRes = computed(() => getTestRecords("shmishek"));
const isDisabled = computed(() => answers.value.length);
const pointsDemo = computed(() => points(demo.value).length * 2);
const pointsJam = computed(() => points(jam.value).length * 2);
const pointsPed = computed(() => points(ped.value).length * 2);
const pointsInsta = computed(() => points(insta.value).length * 3);
const pointsHyper = computed(() => points(hyper.value).length * 3);
const pointsDysthy = computed(() => points(dysthy.value).length * 3);
const pointsAnxiety = computed(() => points(anxiety.value).length * 3);
const pointsCyclo = computed(() => points(cyclo.value).length * 3);
const pointsAffect = computed(() => points(affect.value).length * 6);
const pointsEmo = computed(() => points(emo.value).length * 3);
const options = computed(() => {
  return [
    pointsDemo.value,
    pointsJam.value,
    pointsPed.value,
    pointsInsta.value,
    pointsHyper.value,
    pointsDysthy.value,
    pointsAnxiety.value,
    pointsCyclo.value,
    pointsAffect.value,
    pointsEmo.value,
  ];
});
const arr = computed(() => {
  return [
    ["Демонстративность", pointsDemo.value],
    ["Застревание", pointsJam.value],
    ["Педантичность", pointsPed.value],
    ["Неуравновешенность", pointsInsta.value],
    ["Гипертимность", pointsHyper.value],
    ["Дистимичность", pointsDysthy.value],
    ["Тревожность", pointsAnxiety.value],
    ["Циклотимичность", pointsCyclo.value],
    ["Аффективность", pointsAffect.value],
    ["Эмотивность", pointsEmo.value],
  ];
});
const results = computed(() => objectConstructor(arr.value, textPoint));
const allResults = computed(() => {
  return {
    name: "shmishek",
    records: {
      test: results.value,
      options: options.value,
      answers: answers.value,
    },
  };
});

const textPoint = (point) => {
  if (point <= 12) return "Cвойство не выражено";
  if (point >= 13 && point <= 18)
    return "Cредняя степень выраженности свойства (тенденция к тому или иному типу акцентуации личности)";
  return "Признак акцентуации"; //point >= 19 && point <= 24
};

const { next, prev, reset, addRes, points, keys, deleteData } = useTestContent(
  questionIndex,
  answers,
  deleteResults,
  getItem,
  questions
);

keys(demoTrue.value, demoFalse.value, demo.value);
keys(jamTrue.value, jamFalse.value, jam.value);
keys(pedTrue.value, pedFalse.value, ped.value);
keys(instaTrue.value, [], insta.value);
keys(hyperTrue.value, [], hyper.value);
keys(dysthyTrue.value, dysthyFalse.value, dysthy.value);
keys(anxietyTrue.value, anxietyFalse.value, anxiety.value);
keys(cycloTrue.value, [], cyclo.value);
keys(affectTrue.value, [], affect.value);
keys(emoTrue.value, emoFalse.value, emo.value);
</script>
