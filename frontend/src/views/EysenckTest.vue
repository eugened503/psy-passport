<template>
  <div class="mt-5 mx-auto p-4">
    <div class="d-flex">
      <div position-absolute class="pe-4">
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
        />
      </div>
      <div v-if="questionIndex === questions.length && pointsLie <= 4">
        <div>
          <h2>Тест завершен</h2>
          <div>
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
              <ProgressBar
                :pointsLie="pointsLie"
                :textLie="textLie"
                :lieIndexTrue="lieIndexTrue.length"
                :lieIndexFalse="lieIndexFalse.length"
              />
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
      <div v-if="questionIndex === questions.length && pointsLie > 4">
        <h3>
          Высокий показатель по шкале лжи. Результаты теста рассматриваются как
          недостоверные.
        </h3>
        <ProgressBar
          :pointsLie="pointsLie"
          :textLie="textLie"
          :lieIndexTrue="lieIndexTrue.length"
          :lieIndexFalse="lieIndexFalse.length"
        />
      </div>
    </div>
  </div>
</template>
<script>
import questions from "@/data/questions.json";
import Highcharts from "@/components/Highcharts.vue";
import TableQuiz from "@/components/TableQuiz.vue";
import DescTemp from "@/components/DescTemp.vue";
import DescEI from "@/components/DescEI.vue";
import DescNeuro from "@/components/DescNeuro.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import Question from "@/components/Question.vue";
export default {
  name: "QuizBlock",
  components: {
    Highcharts,
    TableQuiz,
    DescTemp,
    DescEI,
    DescNeuro,
    ProgressBar,
    Question,
  },
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

    addRes({ index, res }) {
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

    keys(arrInTrue, arrInFalse, arr) {
      arrInTrue.forEach((i) => {
        arr[i - 1] = true;
      });
      arrInFalse.forEach((i) => {
        arr[i - 1] = false;
      });
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

    this.keys(
      this.extroIntroIndexTrue,
      this.extroIntroIndexFalse,
      this.extroIntro
    );
    this.keys(this.lieIndexTrue, this.lieIndexFalse, this.lie);
    this.keys(this.neuroIndexTrue, [], this.neuro);
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

.progress {
  flex: 1;
  align-self: center;
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
