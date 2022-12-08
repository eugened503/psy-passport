<template>
  <section class="leary">
    <div class="desc">
      <div>
        <h4>Тест межличностных отношений Лири</h4>
        <div>Доминирование {{ domination }}</div>
        <div>Дружелюбие {{ benevolence }}</div>
        <br />
        <div>
          Авторитарный (властный-лидирующий)
          {{ octantPoints.octantFirstPoints }}
        </div>
        <div>
          Эгоистичный (независимый-доминирующий)
          {{ octantPoints.octantSecondPoints }}
        </div>
        <div>
          Агрессивный (прямолинейный-агрессивный)
          {{ octantPoints.octantThirdPoints }}
        </div>
        <div>
          Подозрительный (недоверчивый-скептический)
          {{ octantPoints.octantFourthPoints }}
        </div>
        <div>
          Подчиняемый (покорно-застенчивый) {{ octantPoints.octantFifthPoints }}
        </div>
        <div>
          Зависимый (зависимый-послушный) {{ octantPoints.octantSixthPoints }}
        </div>
        <div>
          Дружелюбный (сотрудничающий-конвенциальный)
          {{ octantPoints.octantSeventhPoints }}
        </div>
        <div>
          Альтруистический (ответственно-великодушный)
          {{ octantPoints.octantEighthPoints }}
        </div>
      </div>
      <HCLeary :options="options" />
    </div>
    <div class="mark">
      <h4>
        Отметьте (кликните) те суждения, которые соответствуют вашему
        представлению о себе
      </h4>
      <ul>
        <li
          v-for="(question, index) in questions"
          :key="question.id"
          @click="selectItem(question)"
          :class="{ active: question.status }"
        >
          <!-- {{ question.id }} -->
          {{ index + 1 }}.
          {{ question.text }}
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import questions from "@/data/leary/questions.json";
import HCLeary from "@/components/HCLeary.vue";
export default {
  name: "QuizBlock",
  components: {
    HCLeary,
  },
  data() {
    return {
      questions,
      keysAll: [],
      subarray: [],
      subarrayClone: [],
      octantAll: {},
      responses: [],
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
    this.octantAll = this.getKeys(this.subarrayClone);
  },
  computed: {
    responsesID() {
      return this.questions.filter((x) => x.status === true);
    },
    octantPoints() {
      return {
        octantFirstPoints: this.getCommonElements(
          this.responsesID,
          this.octantAll.octantFirst
        ),
        octantSecondPoints: this.getCommonElements(
          this.responsesID,
          this.octantAll.octantSecond
        ),
        octantThirdPoints: this.getCommonElements(
          this.responsesID,
          this.octantAll.octantThird
        ),
        octantFourthPoints: this.getCommonElements(
          this.responsesID,
          this.octantAll.octantFourth
        ),
        octantFifthPoints: this.getCommonElements(
          this.responsesID,
          this.octantAll.octantFifth
        ),
        octantSixthPoints: this.getCommonElements(
          this.responsesID,
          this.octantAll.octantSixth
        ),
        octantSeventhPoints: this.getCommonElements(
          this.responsesID,
          this.octantAll.octantSeventh
        ),
        octantEighthPoints: this.getCommonElements(
          this.responsesID,
          this.octantAll.octantEighth
        ),
      };
    },
    benevolence() {
      return Math.round(
        this.octantPoints.octantSeventhPoints -
          this.octantPoints.octantThirdPoints +
          0.7 *
            (this.octantPoints.octantEighthPoints -
              this.octantPoints.octantSecondPoints -
              this.octantPoints.octantFourthPoints +
              this.octantPoints.octantSixthPoints)
      );
    },
    domination() {
      return Math.round(
        this.octantPoints.octantFirstPoints -
          this.octantPoints.octantFifthPoints +
          0.7 *
            (this.octantPoints.octantEighthPoints +
              this.octantPoints.octantSecondPoints -
              this.octantPoints.octantFourthPoints -
              this.octantPoints.octantSixthPoints)
      );
    },
    options() {
      return [
        {
          data: [
            this.octantPoints.octantFirstPoints,
            this.octantPoints.octantEighthPoints,
            this.octantPoints.octantSeventhPoints,
            this.octantPoints.octantSixthPoints,
            this.octantPoints.octantFifthPoints,
            this.octantPoints.octantFourthPoints,
            this.octantPoints.octantThirdPoints,
            this.octantPoints.octantSecondPoints,
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
      const subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }

      return subarray;
    },
    getKeys(array) {
      const evenArr = [];
      const oddArr = [];

      //evenArr
      const octantFirst = [];
      const octantSecond = [];
      const octantThird = [];
      const octantFourth = [];

      //oddArr
      const octantFifth = [];
      const octantSixth = [];
      const octantSeventh = [];
      const octantEighth = [];
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
    selectItem({ status, id }) {
      status = !status;
      this.questions.filter((x) => x.id === id).map((x) => (x.status = status));
    },
    getCommonElements(array1, array2) {
      const array = [];

      for (let i = 0; i < array1.length; i += 1) {
        if (array2.includes(array1[i].id)) {
          array.push(array1[i].id);
        }
      }
      return array.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.leary {
  flex-direction: row;
  align-items: flex-start;
  //justify-content: space-between;
  //gap: 10px;
  gap: 10px;
  .active {
    color: blue;
  }
  div {
    //flex: 1;
  }
  .desc {
    flex: 1;
    //width: 40%;
    //display: flex;
    //flex-direction: column;
    .high-charts {
      width: 60%;
    }
  }
  .mark {
    padding: 0;
    background-color: inherit;
    width: 60%;
  }
  ul {
    padding: 0;
    display: flex;
    //justify-content: space-between;
    //flex-direction: column;
    //align-items: flex-start;
    flex-wrap: wrap;
    gap: 10px;
  }

  ul li {
    cursor: pointer;
    transition: 0.4s color;
    &:hover {
      color: blueviolet;
    }
  }
}
</style>
