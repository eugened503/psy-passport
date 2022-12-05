<template>
  <section class="leary">
    <h1>Тест межличностных отношений Лири</h1>
    <ul>
      <!-- {{
        questions
      }} -->
      {{
        octantAll
      }}
      <li v-for="question in questions" :key="question.id">
        {{ question.id }}
        {{ question.text }}
      </li>
    </ul>
  </section>
</template>
<script>
import questions from "@/data/leary/questions.json";
export default {
  name: "QuizBlock",
  data() {
    return {
      questions,
      keysAll: [],
      subarray: [],
      subarrayClone: [],
      octantAll: {},
    };
  },
  created() {
    this.questions.forEach((question, i) => {
      question.status = false;
      question.id = i + 1;
    });
  },
  mounted() {
    this.shuffle(this.questions);
    this.questions.forEach((question, i) => {
      this.keysAll.push(i + 1);
    });
    this.subarray = this.splitSubArrays(this.keysAll, 16);
    this.subarray.map((arr) => {
      this.subarrayClone.push(this.splitSubArrays(arr, 4));
    });
    //console.log(this.subarrayClone);
    this.octantAll = this.getKeys(this.subarrayClone);
  },
  methods: {
    randomKey() {
      return (
        new Date().getTime() + Math.floor(Math.random() * 10000).toString()
      );
    },
    shuffle(array) {
      let currentIndex = array.length;
      let randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
    splitSubArrays(array, size) {
      let subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }

      return subarray;
    },
    getKeys(array) {
      let evenArr = [];
      let oddArr = [];

      //evenArr
      let octantFirst = [];
      let octantSecond = [];
      let octantThird = [];
      let octantFourth = [];

      //oddArr
      let octantFifth = [];
      let octantSixth = [];
      let octantSeventh = [];
      let octantEighth = [];
      for (let i = 0; i < array.length; i++) {
        if (i % 2 === 0) {
          evenArr.push(array[i]);
        } else {
          oddArr.push(array[i]);
        }
      }

      for (let i = 0; i < evenArr.length; i++) {
        for (let j = 0; j < evenArr[i].length; j++) {
          if (j === 0) {
            octantFirst.push(...evenArr[i][j]);
          } else if (j === 1) {
            octantSecond.push(...evenArr[i][j]);
          } else if (j === 2) {
            octantThird.push(...evenArr[i][j]);
          } else {
            octantFourth.push(...evenArr[i][j]);
          }
        }
      }
      for (let i = 0; i < oddArr.length; i++) {
        for (let j = 0; j < oddArr[i].length; j++) {
          if (j === 0) {
            octantFifth.push(...oddArr[i][j]);
          } else if (j === 1) {
            octantSixth.push(...oddArr[i][j]);
          } else if (j === 2) {
            octantSeventh.push(...oddArr[i][j]);
          } else {
            octantEighth.push(...oddArr[i][j]);
          }
        }
      }

      return {
        octantFirst,
        octantSecond,
        octantThird,
        octantFourth,
        octantFifth,
        octantSixth,
        octantSeventh,
        octantEighth,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
