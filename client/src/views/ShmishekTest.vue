<template>
  <section class="shmishek">
    <div v-if="!getShmishekRes" class="container py-5">
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
      <div class="mt-4" v-if="questionIndex === questions.length">
        <h2>Тест завершен</h2>
        <div class="results-head d-flex justify-content-between">
          <HCShmishek class="mt-4" :dataArr="options" />
        </div>
        <div>
          <h3>Данные не сохранены</h3>
        </div>

        <div class="d-flex">
          <div>
            <span>Демонстративность: {{ pointsDemo }}</span> <br />
            <span>Застревание: {{ pointsJam }}</span> <br />
            <span>Педантичность: {{ pointsPed }}</span> <br />
            <span>Неуравновешенность: {{ pointsInsta }}</span> <br />
            <span>Гипертимность: {{ pointsHyper }}</span> <br />
            <span>Дистимичность: {{ pointsDysthy }}</span> <br />
            <span>Тревожность: {{ pointsAnxiety }}</span> <br />
            <span>Циклотимичность: {{ pointsCyclo }}</span> <br />
            <span>Аффективность: {{ pointsAffect }}</span> <br />
            <span>Эмотивность: {{ pointsEmo }}</span> <br />
          </div>
        </div>

        <TableQuiz :answers="answers" />
        <BtnGroup @reset="reset" @sendResults="sendResults(allResults)" class="mt-4" />
      </div>
    </div>
    <div v-else class="container py-5">
      <div class="mt-4">
        <h2>Тест завершен</h2>
        <div class="results-head d-flex justify-content-between">
          <HCShmishek class="mt-4" :dataArr="getShmishekRes?.options" />
        </div>
        <div>
          <div>
            <h3>Данные сохранены</h3>
          </div>
        </div>
        <div class="d-flex">
          <div>
            <span>Демонстративность: {{ getShmishekRes?.pointsDemo }}</span>
            <br />
            <span>Застревание: {{ getShmishekRes?.pointsJam }}</span> <br />
            <span>Педантичность: {{ getShmishekRes?.pointsPed }}</span> <br />
            <span>Неуравновешенность: {{ getShmishekRes?.pointsInsta }} </span>
            <br />
            <span>Гипертимность: {{ getShmishekRes?.pointsHyper }}</span> <br />
            <span>Дистимичность: {{ getShmishekRes?.pointsDysthy }} </span>
            <br />
            <span>Тревожность: {{ getShmishekRes?.pointsAnxiety }} </span>
            <br />
            <span>Циклотимичность: {{ getShmishekRes?.pointsCyclo }} </span>
            <br />
            <span>Аффективность: {{ getShmishekRes?.pointsAffect }} </span>
            <br />
            <span>Эмотивность: {{ getShmishekRes?.pointsEmo }} </span> <br />
          </div>
          <TableQuiz :answers="getShmishekRes?.answers" />
          <button @click="deleteData" class="btn mt-2">Удалить</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import questions from "@/data/shmishek/questions.json";
import HCShmishek from "@/components/HCShmishek.vue";
import TableQuiz from "@/components/tableComponents/TableQuiz.vue";
import Question from "@/components/Question.vue";
import BtnGroup from "@/components/BtnGroup.vue";
import { ref, computed } from "vue";
import { useStoreResults } from "@/stores/storeResults";
const { sendResults, deleteResults, getTest, getTestRecords } = useStoreResults();

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
const pointsDemo = computed(() => points(demo.value).length);
const pointsJam = computed(() => points(jam.value).length);
const pointsPed = computed(() => points(ped.value).length);
const pointsInsta = computed(() => points(insta.value).length);
const pointsHyper = computed(() => points(hyper.value).length);
const pointsDysthy = computed(() => points(dysthy.value).length);
const pointsAnxiety = computed(() => points(anxiety.value).length);
const pointsCyclo = computed(() => points(cyclo.value).length);
const pointsAffect = computed(() => points(affect.value).length);
const pointsEmo = computed(() => points(emo.value).length);
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
const allResults = computed(() => {
  return {
    name: "shmishek",
    records: {
      pointsDemo: pointsDemo.value,
      pointsJam: pointsJam.value,
      pointsPed: pointsPed.value,
      pointsInsta: pointsInsta.value,
      pointsHyper: pointsHyper.value,
      pointsDysthy: pointsDysthy.value,
      pointsAnxiety: pointsAnxiety.value,
      pointsCyclo: pointsCyclo.value,
      pointsAffect: pointsAffect.value,
      pointsEmo: pointsEmo.value,
      options: options.value,
      answers: answers.value,
    },
  };
});

const randomKey = () => {
  return new Date().getTime() + Math.floor(Math.random() * 10000).toString();
};
const next = () => {
  questionIndex.value++;
};

const prev = () => {
  questionIndex.value--;
};

const reset = () => {
  questionIndex.value = 0;
};

const addRes = ({ index, res }) => {
  answers.value[index] = res;
};
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

<style lang="scss" scoped>
.shmishek {
}
</style>
