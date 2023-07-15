<template>
  <section class="eysenck">
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
        class="eysenck__result"
        v-if="questionIndex === questions.length && pointsLie <= 4"
      >
        <p class="eysenck__result-title">
          Тест завершен, но данные не сохранены
        </p>
        <div class="eysenck__result-head">
          <TableResults :results="results" />
          <Highcharts :dataArr="options" />
        </div>
        <DescTemp :activeName="temperament" />
        <DescNeuro />
        <DescEI />
        <TableQuiz :answers="answers" />
        <BtnGroup @reset="reset" @sendResults="sendResults(allResults)" />
      </div>
      <div v-if="questionIndex === questions.length && pointsLie > 4">
        <p class="eysenck__result-title text-danger">
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
    <div class="eysenck__result" v-else>
      <p class="eysenck__result-title">Тест завершен</p>
      <div class="eysenck__result-head">
        <TableResults :results="getEysenckRes?.test" />
        <Highcharts :dataArr="getEysenckRes?.options" />
      </div>
      <p class="eysenck__result-title">Данные сохранены</p>
      <DescTemp :activeName="getEysenckRes?.temperament" />
      <DescNeuro />
      <DescEI />
      <button @click="showTable = !showTable" class="eysenck__link button">
        Tаблица ответов
        <span v-if="!showTable">↓</span>
        <span v-else>↑</span>
      </button>
      <Transition name="fade">
        <TableQuiz v-if="showTable" :answers="getEysenckRes?.answers" />
      </Transition>
      <button @click="deleteData" class="eysenck__button button">
        Удалить
      </button>
    </div>
  </section>
</template>
<script setup>
import questions from "@/data/eysenck/questions.json";
import Highcharts from "@/components/Highcharts.vue";
import TableQuiz from "@/components/tableComponents/TableQuiz.vue";
import DescTemp from "@/components/descComponents/DescTemp.vue";
import DescEI from "@/components/descComponents/DescEI.vue";
import DescNeuro from "@/components/descComponents/DescNeuro.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import Question from "@/components/Question.vue";
import TableResults from "@/components/tableComponents/TableResults.vue";
import BtnGroup from "@/components/BtnGroup.vue";
import { ref, computed } from "vue";
import { useStoreResults } from "@/stores/storeResults";
const { sendResults, deleteResults, getTest, getTestRecords } =
  useStoreResults();

const showTable = ref(false);
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
  // if (pointsExtroIntro.value < 5 && pointsExtroIntro.value > 0)
  //   return "глубокий интроверт";
  return "Глубокий интроверт";
});
const textNeuro = computed(() => {
  if (pointsNeuro.value > 19) return "Очень высокий уровень";
  if (pointsNeuro.value > 13 && pointsNeuro.value <= 19)
    return "Высокий уровень";
  if (pointsNeuro.value >= 9 && pointsNeuro.value <= 13)
    return "Среднее значение";
  // if (pointsNeuro.value < 9 && pointsNeuro.value > 0)
  //   return "низкий уровень нейротизма";
  return "Низкий уровень";
});
const textLie = computed(() => {
  if (pointsLie.value > 4) return "Неискренность в ответах";
  if (pointsLie.value === 4) return "Критический показатель";
  // if (pointsLie.value < 4 && pointsLie.value > 0) return "норма";
  return "Норма";
});
const temperament = computed(() => {
  // if (
  //   scalePhlegmatic(pointsExtroIntro) &&
  //   scalePhlegmatic(pointsNeuro)
  // )
  //   return "флегматик";

  if (
    scalePhlegmatic(pointsExtroIntro.value) &&
    pointsNeuro.value > averageValue.value
  )
    return "Меланхолик"; // "меланхолик"

  if (
    pointsExtroIntro.value > averageValue.value &&
    pointsNeuro.value > averageValue.value
  )
    return "Холерик"; // "холерик"

  if (
    pointsExtroIntro.value > averageValue.value &&
    scalePhlegmatic(pointsNeuro.value)
  )
    return "Сангвиник"; // "сангвиник"

  if (
    pointsExtroIntro.value === averageValue.value &&
    pointsNeuro.value === averageValue.value
  )
    return "Пограничный тип: все 4 типа темперамента"; // "пограничный тип: все 4 типа темперамента"

  if (
    pointsExtroIntro.value === averageValue.value &&
    pointsNeuro.value > averageValue.value
  )
    return "Пограничный тип: меланхолик-холерик"; // "пограничный тип: меланхолик-холерик"
  if (
    pointsExtroIntro.value > averageValue.value &&
    pointsNeuro.value === averageValue.value
  )
    return "Пограничный тип: холерик-сангвиник"; // "пограничный тип: холерик-сангвиник"
  if (
    pointsExtroIntro.value === averageValue.value &&
    scalePhlegmatic(pointsNeuro.value)
  )
    return "Пограничный тип: сангвиник-флегматик"; // "пограничный тип: сангвиник-флегматик"

  if (
    pointsNeuro.value === averageValue.value &&
    scalePhlegmatic(pointsExtroIntro.value)
  )
    return "Пограничный тип: флегматик-меланхолик"; // "пограничный тип: флегматик-меланхолик"

  return "Флегматик"; // "флегматик"
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
const randomKey = () => {
  return new Date().getTime() + Math.floor(Math.random() * 10000).toString();
};
const next = () => questionIndex.value++;
const prev = () => questionIndex.value--;
const reset = () => (questionIndex.value = 0);
const addRes = ({ index, res }) => (answers.value[index] = res);
const points = (arr) => {
  return arr.reduce((accumulator, current, index) => {
    if (answers.value[index] === current) {
      accumulator.push(index);
    }
    return accumulator;
  }, []);
};
const keys = (arrInTrue, arrInFalse, arr) => {
  arrInTrue.forEach((i) => {
    arr[i - 1] = true;
  });
  arrInFalse.forEach((i) => {
    arr[i - 1] = false;
  });
};
const deleteData = () => {
  let id = getItem.value._id;
  deleteResults(id);
  questionIndex.value = 0;
  answers.value = [];
};

questions.forEach((question) => {
  question.responses = [
    { text: "Да", response: true },
    { text: "Нет", response: false },
  ];
  question.id = randomKey();
  question.responses.forEach((res) => {
    res.id = randomKey();
  });
});

keys(extroIntroIndexTrue.value, extroIntroIndexFalse.value, extroIntro.value);
keys(lieIndexTrue.value, lieIndexFalse.value, lie.value);
keys(neuroIndexTrue.value, [], neuro.value);
</script>

<style lang="scss" scoped>
.eysenck {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 10px;

  &__result {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__result-title {
    @include banner-subtitle;
    margin: 0;
    &.text-danger {
      color: $clr-carrot;
    }
  }

  &__result-head {
    display: flex;
    gap: 16px;
    @include _1023 {
      flex-direction: column;
    }
  }

  &__button {
    width: 100px;
  }

  &__link {
    display: flex;
    gap: 5px;
    border-bottom: 2px solid $clr-aqua;
    width: 134px;
    background-color: unset;
    border-radius: unset;
    padding: 0;
    color: $clr-slate-grey;
    span {
      font-weight: 700;
    }
  }
}
</style>
