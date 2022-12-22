<template>
  <section class="eysenck">
    <div v-if="!getEysenckRes" class="container py-5">
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
          name="Айзенка"
        />
      </div>
      <div
        class="mt-4"
        v-show="questionIndex === questions.length && pointsLie <= 4"
      >
        <h2>Тест завершен</h2>
        <div class="results-head d-flex justify-content-between">
          <TableResults class="mt-4" :results="results" />
          <Highcharts class="mt-4" :options="options" :arr="[0, 0, 12, 12]" />
        </div>
        <div>
          <h3>Данные не сохранены</h3>
        </div>
        <DescTemp :activeName="temperament" />
        <DescNeuro />
        <DescEI />
        <TableQuiz :answers="answers" />
        <BtnGroup
          @reset="reset"
          @sendResults="sendResults(allResults)"
          class="mt-4"
        />
      </div>
      <div v-if="questionIndex === questions.length && pointsLie > 4">
        <h3 class="text-danger">
          Высокий показатель по шкале лжи. Результаты теста рассматриваются как
          недостоверные.
        </h3>
        <ProgressBar
          :pointsLie="pointsLie"
          :textLie="textLie"
          :lieIndexTrue="lieIndexTrue.length"
          :lieIndexFalse="lieIndexFalse.length"
        />
        <BtnGroup @reset="reset" :lie="true" class="mt-4" />
      </div>
    </div>
    <div v-else class="container py-5">
      <div class="mt-4">
        <h2>Тест завершен</h2>
        <div class="results-head d-flex justify-content-between">
          <TableResults class="mt-4" :results="getEysenckRes?.test" />
          <Highcharts
            class="mt-4"
            :options="[]"
            :arr="getEysenckRes?.options[0].data"
          />
        </div>
        <div>
          <div>
            <h3>Данные сохранены</h3>
          </div>
        </div>
        <DescTemp :activeName="getEysenckRes?.temperament" />
        <DescNeuro />
        <DescEI />
        <TableQuiz :answers="getEysenckRes?.answers" />
        <button @click="deleteData" class="btn mt-2">Удалить</button>
      </div>
    </div>
  </section>
</template>
<script>
import questions from "@/data/eysenck/questions.json";
import Highcharts from "@/components/Highcharts.vue";
import TableQuiz from "@/components/TableQuiz.vue";
import DescTemp from "@/components/DescTemp.vue";
import DescEI from "@/components/DescEI.vue";
import DescNeuro from "@/components/DescNeuro.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import Question from "@/components/Question.vue";
import TableResults from "@/components/TableResults.vue";
import BtnGroup from "@/components/BtnGroup.vue";
import { mapGetters, mapActions } from "vuex";
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
    TableResults,
    BtnGroup,
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
      if (this.pointsExtroIntro > 19) return "Яркий экстраверт";
      if (this.pointsExtroIntro > 14 && this.pointsExtroIntro <= 19)
        return "Экстраверт";
      if (this.pointsExtroIntro > 12 && this.pointsExtroIntro <= 14)
        return "Склонность к экстраверсии";
      if (this.pointsExtroIntro === 12) return "среднее значение";
      if (this.pointsExtroIntro >= 9 && this.pointsExtroIntro < 12)
        return "Склонность к интроверсии";
      if (this.pointsExtroIntro >= 5 && this.pointsExtroIntro < 9)
        return "Интроверт";
      // if (this.pointsExtroIntro < 5 && this.pointsExtroIntro > 0)
      //   return "глубокий интроверт";
      return "Глубокий интроверт";
    },

    textNeuro() {
      if (this.pointsNeuro > 19) return "Очень высокий уровень";
      if (this.pointsNeuro > 13 && this.pointsNeuro <= 19)
        return "Высокий уровень";
      if (this.pointsNeuro >= 9 && this.pointsNeuro <= 13)
        return "Среднее значение";
      // if (this.pointsNeuro < 9 && this.pointsNeuro > 0)
      //   return "низкий уровень нейротизма";
      return "Низкий уровень";
    },

    textLie() {
      if (this.pointsLie > 4) return "Неискренность в ответах";
      if (this.pointsLie === 4) return "Критический показатель";
      // if (this.pointsLie < 4 && this.pointsLie > 0) return "норма";
      return "Норма";
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

    results() {
      return [
        {
          scale: "Экстра - интро",
          total: this.pointsExtroIntro,
          desc: this.textExtroIntro,
        },
        {
          scale: "Нейротизм",
          total: this.pointsNeuro,
          desc: this.textNeuro,
        },
        {
          scale: "Ложь",
          total: this.pointsLie,
          desc: this.textLie,
        },
      ];
    },
    allResults() {
      return {
        name: "eysenck",
        records: {
          test: this.results,
          options: this.options,
          temperament: this.temperament,
          answers: this.answers,
        },
      };
    },
    ...mapGetters("results", { getResults: "getResults" }),
    // ...mapGetters("results", { getResultsStatus: "getResultsStatus" }),
    getItem() {
      return this.getResults?.filter((item) => item.name === "eysenck")[0];
    },
    getEysenckRes() {
      return this.getItem?.records;
    },
  },

  watch: {
    //$route: "loadResults",
    // getResultsStatus() {
    //   this.loadResults();
    // },
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

    reset() {
      this.questionIndex = 0;
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
    // sendResults() {
    //   let results = {
    //     test: this.results,
    //     options: this.options,
    //     temperament: this.temperament,
    //     answers: this.answers,
    //   };
    //   this.$store
    //     .dispatch("results/sendResults", results)
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
    // },
    ...mapActions({ sendResults: "results/sendResults" }),
    //...mapActions({ loadResults: "results/getResults" }),
    ...mapActions({ deleteResults: "results/deleteResults" }),
    deleteData() {
      let id = this.getItem._id;
      this.deleteResults(id);
      this.questionIndex = 0;
      this.answers = [];
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

<style lang="scss" scoped>
.eysenck {
  display: block;

  @media (max-width: 600px) {
    padding-top: 158px;
  }

  @media (max-width: 375px) {
    padding-left: 0;
    padding-right: 0;
  }

  li {
    list-style-type: none;
  }
  h4 {
    min-height: 87px;
    width: 80%;
  }

  h2 {
    text-align: center;
    // @media (max-width: 765px) {
    //   text-align: center;
    // }
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

  .results-head {
    @media (max-width: 1040px) {
      flex-direction: column;
    }
  }
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
