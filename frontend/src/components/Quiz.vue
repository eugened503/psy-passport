<template>
  <div class="mt-5 mx-auto p-4 border border-primary">
    <div class="d-flex">
      <div position-absolute class="pe-4">
        <div v-for="(question, index) in questions" :key="question.id">
          <div v-if="index === questionIndex">
            <h4>{{ index + 1 }}. {{ question.text }}</h4>
            <ul class="p-0">
              <li
                v-for="(response, indexRes) in question.responses"
                :key="response.id"
              >
                <button
                  style="width: 23%"
                  class="btn btn-primary mt-2 w-40"
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
      </div>
      <div>
        <span>Экстраверсия: </span>{{ scaleExtra }} <span>Интроверсия: </span
        >{{ scaleIntro }} <span>Нестабильность: </span>{{ scaleInstab }}
        <span>Стабильность: </span>{{ scaleStab }}
        <hr class="border border-primary border-2 opacity-75" />
        <Highcharts :options="options" />
      </div>
      <div v-show="questionIndex === questions.length">
        <h2>Викторина завершена</h2>
        <!-- <p>Счет: {{ score }} / {{ questions.length }}</p> -->
      </div>
    </div>
    <table-quiz :answers="answers" />
  </div>
</template>
<script>
import questions from "../data/questions.json";
import Highcharts from "@/components/Highcharts.vue";
import TableQuiz from "./TableQuiz.vue";
export default {
  name: "QuizBlock",
  components: { Highcharts, TableQuiz },
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

    scaleInstab() {
      return this.pointsNeuro > 12 ? Math.abs(12 - this.pointsNeuro) : 0;
    },

    scaleStab() {
      return this.pointsNeuro > 0 && this.pointsNeuro < 12
        ? Math.abs(this.pointsNeuro - 12)
        : 0;
    },

    scaleIntro() {
      return this.pointsExtroIntro > 0 && this.pointsExtroIntro < 12
        ? Math.abs(this.pointsExtroIntro - 12)
        : 0;
    },

    scaleExtra() {
      return this.pointsExtroIntro > 12
        ? Math.abs(12 - this.pointsExtroIntro)
        : 0;
    },

    options() {
      return [
        {
          data: [
            this.scaleInstab,
            this.scaleExtra,
            this.scaleStab,
            this.scaleIntro,
          ],
        },
      ];
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
.quiz-enter-active {
  animation: iconIn 0.3s;
}
.quiz-leave-active {
  animation: iconOut 0.3s;
}
@keyframes quizIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes quizOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
