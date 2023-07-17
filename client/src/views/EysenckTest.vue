<template>
  <section class="eysenck container">
    <p class="title">Тест Айзенка</p>
    <div v-if="!getEysenckRes">
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
          name="тест Айзенка"
        />
      </div>
      <div
        class="container-result"
        v-if="questionIndex === questions.length && pointsLie <= 4"
      >
        <Test
          :results="results"
          :chartOptions="eysenckChartOptions"
          :dataArr="options"
          :answers="answers"
          :reset="reset"
          :sendResults="sendResults"
          :allResults="allResults"
        >
          <template v-slot:test-background>
            <div class="eysenck__circle"></div>
          </template>
          <template v-slot:body>
            <DescTemp :activeName="temperament" />
            <DescNeuro />
            <DescEI />
          </template>
        </Test>
      </div>
      <div v-if="questionIndex === questions.length && pointsLie > 4">
        <p class="subtitle text-danger">
          Высокий показатель по шкале лжи. Результаты теста рассматриваются как
          недостоверные.
        </p>
        <ProgressBar
          :pointsLie="pointsLie"
          :textLie="textLie"
          :lieIndexTrue="lieIndexTrue.length"
          :lieIndexFalse="lieIndexFalse.length"
        />
        <BtnGroup @reset="reset" :lie="true" />
      </div>
    </div>
    <div class="container-result" v-else>
      <Test
        :results="getEysenckRes?.test"
        :chartOptions="eysenckChartOptions"
        :dataArr="getEysenckRes?.options"
        :answers="getEysenckRes?.answers"
        :deleteData="deleteData"
      >
        <template v-slot:test-background>
          <div class="eysenck__circle"></div>
        </template>
        <template v-slot:body>
          <DescTemp :activeName="getEysenckRes?.temperament" />
          <DescNeuro />
          <DescEI />
        </template>
      </Test>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from "vue";
import questions from "@/data/eysenck/questions.json";
import DescTemp from "@/components/descComponents/DescTemp.vue";
import DescEI from "@/components/descComponents/DescEI.vue";
import DescNeuro from "@/components/descComponents/DescNeuro.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import Question from "@/components/Question.vue";
import BtnGroup from "@/components/BtnGroup.vue";
import Test from "@/components/Test.vue";
import { useStoreResults } from "@/stores/storeResults";
import useTestContent from "@/composables/useTestContent";
import useChartOptions from "@/composables/useChartOptions";

const { sendResults, deleteResults, getTest, getTestRecords } =
  useStoreResults();

const { eysenckChartOptions } = useChartOptions();

const extroIntroIndexTrue = ref([
  1, 3, 8, 10, 13, 17, 22, 25, 27, 39, 44, 46, 49, 53, 56,
]);
const extroIntroIndexFalse = ref([5, 15, 20, 29, 32, 34, 37, 41, 51]);
const neuroIndexTrue = ref([
  2, 4, 7, 9, 11, 14, 16, 19, 21, 23, 26, 28, 31, 33, 35, 38, 40, 43, 45, 47,
  50, 52, 55, 57,
]);
const lieIndexTrue = ref([6, 24, 36]);
const lieIndexFalse = ref([12, 18, 30, 42, 48, 54]);
const extroIntro = ref([]);
const neuro = ref([]);
const lie = ref([]);
const questionIndex = ref(0);
const answers = ref([]);
const averageValue = ref(12);

const getItem = computed(() => getTest("eysenck"));
const getEysenckRes = computed(() => getTestRecords("eysenck"));
const pointsExtroIntro = computed(() => points(extroIntro.value).length);
const pointsNeuro = computed(() => points(neuro.value).length);
const pointsLie = computed(() => points(lie.value).length);
const isDisabled = computed(() => answers.value.length);
const scaleInstab = computed(() => {
  return pointsNeuro.value > averageValue.value
    ? Math.abs(averageValue.value - pointsNeuro.value)
    : 0;
});
const scaleStab = computed(() => {
  if (pointsNeuro.value > 0 && pointsNeuro.value < averageValue.value)
    return Math.abs(pointsNeuro.value - averageValue.value);
  if (pointsNeuro.value >= averageValue.value) return 0;
  return averageValue.value;
});
const scaleIntro = computed(() => {
  if (pointsExtroIntro.value > 0 && pointsExtroIntro.value < averageValue.value)
    return Math.abs(pointsExtroIntro.value - averageValue.value);
  if (pointsExtroIntro.value >= averageValue.value) return 0;
  return averageValue.value;
});
const scaleExtra = computed(() => {
  return pointsExtroIntro.value > averageValue.value
    ? Math.abs(averageValue.value - pointsExtroIntro.value)
    : 0;
});
const options = computed(() => {
  return [
    scaleInstab.value,
    scaleExtra.value,
    scaleStab.value,
    scaleIntro.value,
  ];
});
const textExtroIntro = computed(() => {
  if (pointsExtroIntro.value > 19) return "Яркий экстраверт";
  if (pointsExtroIntro.value > 14 && pointsExtroIntro.value <= 19)
    return "Экстраверт";
  if (pointsExtroIntro.value > 12 && pointsExtroIntro.value <= 14)
    return "Склонность к экстраверсии";
  if (pointsExtroIntro.value === 12) return "среднее значение";
  if (pointsExtroIntro.value >= 9 && pointsExtroIntro.value < 12)
    return "Склонность к интроверсии";
  if (pointsExtroIntro.value >= 5 && pointsExtroIntro.value < 9)
    return "Интроверт";
  return "Глубокий интроверт"; //pointsExtroIntro.value < 5 && pointsExtroIntro.value > 0
});
const textNeuro = computed(() => {
  if (pointsNeuro.value > 19) return "Очень высокий уровень";
  if (pointsNeuro.value > 13 && pointsNeuro.value <= 19)
    return "Высокий уровень";
  if (pointsNeuro.value >= 9 && pointsNeuro.value <= 13)
    return "Среднее значение";
  return "Низкий уровень"; //pointsNeuro.value < 9 && pointsNeuro.value > 0
});
const textLie = computed(() => {
  if (pointsLie.value > 4) return "Неискренность в ответах";
  if (pointsLie.value === 4) return "Критический показатель";
  return "Норма"; //pointsLie.value < 4 && pointsLie.value > 0
});
const temperament = computed(() => {
  if (
    scalePhlegmatic(pointsExtroIntro.value) &&
    pointsNeuro.value > averageValue.value
  )
    return "Меланхолик";
  if (
    pointsExtroIntro.value > averageValue.value &&
    pointsNeuro.value > averageValue.value
  )
    return "Холерик";
  if (
    pointsExtroIntro.value > averageValue.value &&
    scalePhlegmatic(pointsNeuro.value)
  )
    return "Сангвиник";
  if (
    pointsExtroIntro.value === averageValue.value &&
    pointsNeuro.value === averageValue.value
  )
    return "Пограничный тип: все 4 типа темперамента";
  if (
    pointsExtroIntro.value === averageValue.value &&
    pointsNeuro.value > averageValue.value
  )
    return "Пограничный тип: меланхолик-холерик";
  if (
    pointsExtroIntro.value > averageValue.value &&
    pointsNeuro.value === averageValue.value
  )
    return "Пограничный тип: холерик-сангвиник";
  if (
    pointsExtroIntro.value === averageValue.value &&
    scalePhlegmatic(pointsNeuro.value)
  )
    return "Пограничный тип: сангвиник-флегматик";
  if (
    pointsNeuro.value === averageValue.value &&
    scalePhlegmatic(pointsExtroIntro.value)
  )
    return "Пограничный тип: флегматик-меланхолик";
  return "Флегматик"; // scalePhlegmatic(pointsExtroIntro) && scalePhlegmatic(pointsNeuro)
});
const results = computed(() => {
  return [
    {
      scale: "Экстра - интро",
      total: pointsExtroIntro.value,
      desc: textExtroIntro.value,
    },
    {
      scale: "Нейротизм",
      total: pointsNeuro.value,
      desc: textNeuro.value,
    },
    {
      scale: "Ложь",
      total: pointsLie.value,
      desc: textLie.value,
    },
  ];
});
const allResults = computed(() => {
  return {
    name: "eysenck",
    records: {
      test: results.value,
      options: options.value,
      temperament: temperament.value,
      answers: answers.value,
    },
  };
});

const scalePhlegmatic = (points) => {
  if (points >= 0 && points < averageValue.value) return true;
  return false;
};

const { next, prev, reset, addRes, points, keys, deleteData } = useTestContent(
  questionIndex,
  answers,
  deleteResults,
  getItem,
  questions
);

keys(extroIntroIndexTrue.value, extroIntroIndexFalse.value, extroIntro.value);
keys(lieIndexTrue.value, lieIndexFalse.value, lie.value);
keys(neuroIndexTrue.value, [], neuro.value);
</script>

<style lang="scss" scoped>
.eysenck {
  &__circle {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: url(../assets/images/eysenck-circle.svg) no-repeat;
    background-position: center;
    background-size: contain;
  }
}
</style>
