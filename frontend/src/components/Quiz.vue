<template>
  <div class="mt-5 mx-auto p-4">
    <div class="d-flex">
      <div position-absolute class="pe-4">
        <div v-for="(question, index) in questions" :key="question.id">
          <div v-if="index === questionIndex">
            <h4>{{ index + 1 }}. {{ question.text }}</h4>
            <ul class="p-0">
              <li v-for="(item, indexRes) in question.responses" :key="item.id">
                <button
                  style="width: 23%"
                  class="btn btn-primary mt-2 w-40"
                  :class="{
                    'btn-success': answers[questionIndex] === item.response,
                  }"
                  @click="addRes(index, item.response)"
                >
                  {{ indexRes + 1 }}
                  {{ item.text }}
                </button>
              </li>
            </ul>
            <button
              class="btn btn-warning mt-1 me-2"
              v-if="questionIndex > 0"
              @click="prev"
            >
              Предыдущий
            </button>
            <button
              v-show="questionIndex + 1 != questions.length"
              class="btn btn-warning mt-1"
              :disabled="questionIndex >= isDisabled"
              @click="next"
            >
              Следующий
            </button>
            <button
              v-show="questionIndex + 1 === questions.length"
              class="btn btn-danger mt-1"
              :disabled="questionIndex >= isDisabled"
              @click="next"
            >
              Показать результаты
            </button>
          </div>
        </div>
      </div>
      <div v-show="questionIndex === questions.length">
        <h2>Тест завершен</h2>
        <div>
          <div>
            <span>Экстраверсия: </span>{{ scaleExtra }}
            <span>Интроверсия: </span>{{ scaleIntro }}
            <span>Нестабильность: </span>{{ scaleInstab }}
            <span>Стабильность: </span>{{ scaleStab }}
            <hr class="border border-primary border-2 opacity-75" />
          </div>
          <div>
            <div>
              <span>Экстраверсия - интроверсия. </span>
              <span>Результат: </span>{{ pointsExtroIntro }} |
              {{ textExtroIntro }}
            </div>
            <div>
              <span>Нейротизм. </span>
              <span> Результат: </span>{{ pointsNeuro }} | {{ textNeuro }}
            </div>
            <div>
              <span>Шкала лжи. </span>
              <span> Результат:</span>
              {{ pointsLie }} | {{ textLie }}
            </div>
            <hr class="border border-primary border-2 opacity-75" />
          </div>
          <div>
            <span>Экстраверсия: </span>{{ scaleExtra }}
            <span>Интроверсия: </span>{{ scaleIntro }}
            <span>Нестабильность: </span>{{ scaleInstab }}
            <span>Стабильность: </span>{{ scaleStab }}
            <hr class="border border-primary border-2 opacity-75" />
          </div>
          <DescTemp :activeName="temperament" />
          <DescEI />
          <DescNeuro />
          <Highcharts :options="options" />
          <TableQuiz :answers="answers" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import questions from "../data/questions.json";
import Highcharts from "./Highcharts.vue";
import TableQuiz from "./TableQuiz.vue";
import DescTemp from "./DescTemp.vue";
import DescEI from "./DescEI.vue";
import DescNeuro from "./DescNeuro.vue";
export default {
  name: "QuizBlock",
  components: { Highcharts, TableQuiz, DescTemp, DescEI, DescNeuro },
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
      averageValue: 12,
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
      return this.pointsNeuro > this.averageValue
        ? Math.abs(this.averageValue - this.pointsNeuro)
        : 0;
    },

    scaleStab() {
      if (this.pointsNeuro > 0 && this.pointsNeuro < this.averageValue)
        return Math.abs(this.pointsNeuro - this.averageValue);
      if (this.pointsNeuro >= this.averageValue) return 0;
      return this.averageValue;
    },

    scaleIntro() {
      if (
        this.pointsExtroIntro > 0 &&
        this.pointsExtroIntro < this.averageValue
      )
        return Math.abs(this.pointsExtroIntro - this.averageValue);
      if (this.pointsExtroIntro >= this.averageValue) return 0;
      return this.averageValue;
    },

    scaleExtra() {
      return this.pointsExtroIntro > this.averageValue
        ? Math.abs(this.averageValue - this.pointsExtroIntro)
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

    textExtroIntro() {
      if (this.pointsExtroIntro > 19) return "яркий экстраверт";
      if (this.pointsExtroIntro > 14 && this.pointsExtroIntro <= 19)
        return "экстраверт";
      if (this.pointsExtroIntro > 12 && this.pointsExtroIntro <= 14)
        return "склонность к экстраверсии";
      if (this.pointsExtroIntro === 12) return "среднее значение";
      if (this.pointsExtroIntro >= 9 && this.pointsExtroIntro < 12)
        return "склонность к интроверсии";
      if (this.pointsExtroIntro >= 5 && this.pointsExtroIntro < 9)
        return "интроверт";
      // if (this.pointsExtroIntro < 5 && this.pointsExtroIntro > 0)
      //   return "глубокий интроверт";
      return "глубокий интроверт";
    },

    textNeuro() {
      if (this.pointsNeuro > 19) return "очень высокий уровень нейротизма";
      if (this.pointsNeuro > 13 && this.pointsNeuro <= 19)
        return "высокий уровень нейротизма";
      if (this.pointsNeuro >= 9 && this.pointsNeuro <= 13)
        return "среднее значение";
      // if (this.pointsNeuro < 9 && this.pointsNeuro > 0)
      //   return "низкий уровень нейротизма";
      return "низкий уровень нейротизма";
    },

    textLie() {
      if (this.pointsLie > 4) return "неискренность в ответах";
      if (this.pointsLie === 4) return "критический показатель лжи";
      // if (this.pointsLie < 4 && this.pointsLie > 0) return "норма";
      return "норма";
    },

    temperament() {
      // if (
      //   this.scalePhlegmatic(this.pointsExtroIntro) &&
      //   this.scalePhlegmatic(this.pointsNeuro)
      // )
      //   return "флегматик";

      if (
        this.scalePhlegmatic(this.pointsExtroIntro) &&
        this.pointsNeuro > this.averageValue
      )
        return "Меланхолик"; // "меланхолик"

      if (
        this.pointsExtroIntro > this.averageValue &&
        this.pointsNeuro > this.averageValue
      )
        return "Холерик"; // "холерик"

      if (
        this.pointsExtroIntro > this.averageValue &&
        this.scalePhlegmatic(this.pointsNeuro)
      )
        return "Сангвиник"; // "сангвиник"

      if (
        this.pointsExtroIntro === this.averageValue &&
        this.pointsNeuro === this.averageValue
      )
        return "Пограничный тип: все 4 типа темперамента"; // "пограничный тип: все 4 типа темперамента"

      if (
        this.pointsExtroIntro === this.averageValue &&
        this.pointsNeuro > this.averageValue
      )
        return "Пограничный тип: меланхолик-холерик"; // "пограничный тип: меланхолик-холерик"
      if (
        this.pointsExtroIntro > this.averageValue &&
        this.pointsNeuro === this.averageValue
      )
        return "Пограничный тип: холерик-сангвиник"; // "пограничный тип: холерик-сангвиник"
      if (
        this.pointsExtroIntro === this.averageValue &&
        this.scalePhlegmatic(this.pointsNeuro)
      )
        return "Пограничный тип: сангвиник-флегматик"; // "пограничный тип: сангвиник-флегматик"

      if (
        this.pointsNeuro === this.averageValue &&
        this.scalePhlegmatic(this.pointsExtroIntro)
      )
        return "Пограничный тип: флегматик-меланхолик"; // "пограничный тип: флегматик-меланхолик"

      return "Флегматик"; // "флегматик"
    },
  },
  methods: {
    scalePhlegmatic(points) {
      if (points >= 0 && points < this.averageValue) return true;
      return false;
    },

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
li {
  list-style-type: none;
}
h4 {
  min-height: 87px;
  width: 80%;
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
