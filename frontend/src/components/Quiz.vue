<template>
  <div class="quiz w-50 mt-5 mx-auto p-4 border border-primary">
    <div v-for="(question, index) in questions" :key="question.id">
      <div v-show="index === questionIndex">
        <h2>{{ index + 1 }}. {{ question.text }}</h2>
        <ul class="p-0">
          <li
            v-for="(response, indexRes) in question.responses"
            :key="response.id"
          >
            <button
              class="btn btn-primary mt-2"
              @click="addRes(index, response.response)"
            >
              {{ indexRes + 1 }}
              {{ response.text }}
            </button>
          </li>
        </ul>
        <hr class="border border-primary border-2 opacity-75" />
        <div>
          <span>Экстраверсия - интроверсия: </span>{{ pointsExtroIntro }}
        </div>
        <div><span>Нейротизм </span>{{ pointsNeuro }}</div>
        <div><span>Шкала лжи </span>{{ pointsLie }}</div>
        <hr class="border border-primary border-2 opacity-75" />
        <button
          class="btn btn-warning mt-1 me-2"
          v-if="questionIndex > 0"
          @click="prev"
        >
          Предыдущий
        </button>
        <button
          class="btn btn-warning mt-1"
          :disabled="questionIndex >= isDisabled"
          @click="next"
        >
          Следующий
        </button>
      </div>
    </div>
    <div v-show="questionIndex === questions.length">
      <h2>Викторина завершена</h2>
      <!-- <p>Счет: {{ score }} / {{ questions.length }}</p> -->
    </div>
  </div>
</template>
<script>
import questions from "../data/questions.json";
export default {
  name: "QuizBlock",
  data() {
    return {
      extroIntroIndexTrue: [
        1, 3, 8, 10, 13, 17, 22, 25, 27, 39, 44, 46, 49, 53, 56,
      ],
      extroIntroIndexFalse: [5, 15, 20, 29, 32, 34, 37, 41, 51],
      neuroIndexTrue: [
        2, 4, 7, 9, 11, 14, 16, 19, 21, 23, 26, 28, 31, 33, 35, 38, 40, 43, 45,
        47, 50, 52, 55, 57,
      ],
      lieIndexTrue: [6, 24, 36],
      lieIndexFalse: [12, 18, 30, 42, 48, 54],
      extroIntro: [],
      neuro: [],
      lie: [],
      questionIndex: 0,
      answers: [],
      questions,
    };
  },
  computed: {
    pointsExtroIntro() {
      return this.points(this.extroIntro).length;
    },

    pointsNeuro() {
      return this.points(this.neuro).length;
    },

    pointsLie() {
      return this.points(this.lie).length;
    },

    isDisabled() {
      return this.answers.length;
    },
  },
  methods: {
    randomKey() {
      return (
        new Date().getTime() + Math.floor(Math.random() * 10000).toString()
      );
    },

    next() {
      this.questionIndex++;
    },

    prev() {
      this.questionIndex--;
    },

    addRes(index, res) {
      this.answers[index] = res;
    },

    points(arr) {
      return arr.reduce((accumulator, current, index) => {
        if (this.answers[index] === current) {
          accumulator.push(index);
        }
        return accumulator;
      }, []);
    },
  },

  created() {
    this.questions.forEach((question) => {
      question.responses = [
        { text: "Да", response: true },
        { text: "Нет", response: false },
      ];
      question.id = this.randomKey();
      question.responses.forEach((res) => {
        res.id = this.randomKey();
      });
    });

    this.extroIntroIndexTrue.forEach((i) => {
      this.extroIntro[i - 1] = true;
    });

    this.extroIntroIndexFalse.forEach((i) => {
      this.extroIntro[i - 1] = false;
    });

    this.neuroIndexTrue.forEach((i) => {
      this.neuro[i - 1] = true;
    });

    this.lieIndexTrue.forEach((i) => {
      this.lie[i - 1] = true;
    });

    this.lieIndexFalse.forEach((i) => {
      this.lie[i - 1] = false;
    });
  },
};
</script>

<style lang="scss">
.quiz {
  li {
    list-style-type: none;
  }
}
</style>
