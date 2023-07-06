<template>
  <section class="shmishek">
    <div class="container py-5">
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
        <!-- <HCShmishek :dataArr="options" /> -->
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";
import questions from "@/data/shmishek/questions.json";
import HCShmishek from "@/components/HCShmishek.vue";
import Question from "@/components/Question.vue";
export default {
  name: "ShmishekPage",
  components: {
    Question,
    HCShmishek,
  },
  data() {
    return {
      questionIndex: 0,
      questions,
      answers: [],
      demoTrue: [7, 19, 22, 29, 41, 44, 63, 66, 73, 85, 88],
      demoFalse: [51],
      jamTrue: [2, 15, 24, 34, 37, 56, 68, 78, 81],
      jamFalse: [12, 46, 59],
      pedTrue: [4, 14, 17, 26, 39, 48, 58, 61, 70, 80, 83],
      pedFalse: [36],
      instaTrue: [8, 20, 30, 42, 52, 64, 74, 86],
      hyperTrue: [1, 11, 23, 33, 45, 55, 67, 77],
      dysthyTrue: [9, 21, 43, 75, 87],
      dysthyFalse: [31, 53, 65],
      anxietyTrue: [16, 27, 38, 49, 60, 71, 82],
      anxietyFalse: [5],
      cycloTrue: [6, 18, 18, 40, 50, 62, 72, 84],
      affectTrue: [10, 32, 54, 76],
      emoTrue: [3, 13, 35, 47, 57, 69, 79],
      emoFalse: [25],
      demo: [],
      jam: [],
      ped: [],
      insta: [],
      hyper: [],
      dysthy: [],
      anxiety: [],
      cyclo: [],
      affect: [],
      emo: [],
    };
  },
  computed: {
    isDisabled() {
      return this.answers.length;
    },
    pointsDemo() {
      return this.points(this.demo).length;
    },
    pointsJam() {
      return this.points(this.jam).length;
    },
    pointsPed() {
      return this.points(this.ped).length;
    },
    pointsInsta() {
      return this.points(this.insta).length;
    },
    pointsHyper() {
      return this.points(this.hyper).length;
    },
    pointsDysthy() {
      return this.points(this.dysthy).length;
    },
    pointsAnxiety() {
      return this.points(this.anxiety).length;
    },
    pointsCyclo() {
      return this.points(this.cyclo).length;
    },
    pointsAffect() {
      return this.points(this.affect).length;
    },
    pointsEmo() {
      return this.points(this.emo).length;
    },
    options() {
      return [
        {
          data: [
            this.pointsDemo,
            this.pointsJam,
            this.pointsPed,
            this.pointsInsta,
            this.pointsHyper,
            this.pointsDysthy,
            this.pointsAnxiety,
            this.pointsCyclo,
            this.pointsAffect,
            this.pointsEmo,
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

    //...mapActions({ sendResults: "results/sendResults" }),
    ...mapActions({ loadResults: "results/getResults" }),
    //...mapActions({ deleteResults: "results/deleteResults" }),
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

    this.keys(this.demoTrue, this.demoFalse, this.demo);
    this.keys(this.jamTrue, this.jamFalse, this.jam);
    this.keys(this.pedTrue, this.pedFalse, this.ped);
    this.keys(this.instaTrue, [], this.insta);
    this.keys(this.hyperTrue, [], this.hyper);
    this.keys(this.dysthyTrue, this.dysthyFalse, this.dysthy);
    this.keys(this.anxietyTrue, this.anxietyFalse, this.anxiety);
    this.keys(this.cycloTrue, [], this.cyclo);
    this.keys(this.affectTrue, [], this.affect);
    this.keys(this.emoTrue, this.emoFalse, this.emo);

    this.loadResults();
  },
};
</script>

<style lang="scss" scoped>
.shmishek {
}
</style>
