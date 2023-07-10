<template>
  <section class="leary">
    <div v-if="!getLearyRes" class="container py-5">
      <div class="desc" v-show="isActive">
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
            Подчиняемый (покорно-застенчивый)
            {{ octantPoints.octantFifthPoints }}
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
        <HCLeary :dataArr="options" />
        <BtnGroup
          @reset="reset"
          @sendResults="sendResults(allResults)"
          class="mt-4"
        />
      </div>
      <div v-show="!isActive" class="mark">
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
            {{ index + 1 }}.
            {{ question.text }}
          </li>
        </ul>
        <button class="btn mt-2" @click="isActive = true">
          Посмотреть результаты
        </button>
      </div>
    </div>
    <div v-else>
      <div class="desc">
        <div>
          <h4>Тест межличностных отношений Лири</h4>
          <div>Доминирование {{ getLearyRes.domination }}</div>
          <div>Дружелюбие {{ getLearyRes.benevolence }}</div>
          <br />
          <div>
            Авторитарный (властный-лидирующий)
            {{ getLearyRes.octantPoints.octantFirstPoints }}
          </div>
          <div>
            Эгоистичный (независимый-доминирующий)
            {{ getLearyRes.octantPoints.octantSecondPoints }}
          </div>
          <div>
            Агрессивный (прямолинейный-агрессивный)
            {{ getLearyRes.octantPoints.octantThirdPoints }}
          </div>
          <div>
            Подозрительный (недоверчивый-скептический)
            {{ getLearyRes.octantPoints.octantFourthPoints }}
          </div>
          <div>
            Подчиняемый (покорно-застенчивый)
            {{ getLearyRes.octantPoints.octantFifthPoints }}
          </div>
          <div>
            Зависимый (зависимый-послушный)
            {{ getLearyRes.octantPoints.octantSixthPoints }}
          </div>
          <div>
            Дружелюбный (сотрудничающий-конвенциальный)
            {{ getLearyRes.octantPoints.octantSeventhPoints }}
          </div>
          <div>
            Альтруистический (ответственно-великодушный)
            {{ getLearyRes.octantPoints.octantEighthPoints }}
          </div>
        </div>
        <HCLeary :dataArr="getLearyRes?.options" />
        <button @click="deleteData" class="btn mt-2">Удалить</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import learyQuestions from "@/data/leary/questions.json";
import HCLeary from "@/components/HCLeary.vue";
import BtnGroup from "@/components/BtnGroup.vue";
import { ref, computed, onMounted } from "vue";
import { useStoreResults } from "@/stores/storeResults";
const { sendResults, deleteResults, getTest, getTestRecords } = useStoreResults();

const keysAll = ref([]);
const subarray = ref([]);
const subarrayClone = ref([]);
const octantAll = ref([]);
const isActive = ref(false);
const questions = ref(learyQuestions);

questions.value.forEach((question, i) => {
  question.status = false;
  question.id = i + 1;
});

onMounted(() => {
  shuffle(questions.value);
  questions.value.forEach((question, i) => {
    keysAll.value.push(i + 1);
  });
  subarray.value = splitSubArrays(keysAll.value, 16);
  subarray.value.map((arr) => {
    subarrayClone.value.push(splitSubArrays(arr, 4));
  });
  octantAll.value = getKeys(subarrayClone.value);
});

const getItem = computed(() => getTest("leary"));
const getLearyRes = computed(() => getTestRecords("leary"));

const responsesID = computed(() =>
  questions.value.filter((x) => x.status === true)
);
const octantPoints = computed(() => {
  return {
    octantFirstPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantFirst
    ),
    octantSecondPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantSecond
    ),
    octantThirdPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantThird
    ),
    octantFourthPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantFourth
    ),
    octantFifthPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantFifth
    ),
    octantSixthPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantSixth
    ),
    octantSeventhPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantSeventh
    ),
    octantEighthPoints: getCommonElements(
      responsesID.value,
      octantAll.value.octantEighth
    ),
  };
});

const benevolence = computed(() => {
  return Math.round(
    octantPoints.value.octantSeventhPoints -
      octantPoints.value.octantThirdPoints +
      0.7 *
        (octantPoints.value.octantEighthPoints -
          octantPoints.value.octantSecondPoints -
          octantPoints.value.octantFourthPoints +
          octantPoints.value.octantSixthPoints)
  );
});

const domination = computed(() => {
  return Math.round(
    octantPoints.value.octantFirstPoints -
      octantPoints.value.octantFifthPoints +
      0.7 *
        (octantPoints.value.octantEighthPoints +
          octantPoints.value.octantSecondPoints -
          octantPoints.value.octantFourthPoints -
          octantPoints.value.octantSixthPoints)
  );
});

const options = computed(() => {
  return [
    octantPoints.value.octantFirstPoints,
    octantPoints.value.octantEighthPoints,
    octantPoints.value.octantSeventhPoints,
    octantPoints.value.octantSixthPoints,
    octantPoints.value.octantFifthPoints,
    octantPoints.value.octantFourthPoints,
    octantPoints.value.octantThirdPoints,
    octantPoints.value.octantSecondPoints,
  ];
});

const allResults = computed(() => {
  return {
    name: "leary",
    records: {
      octantPoints: octantPoints.value,
      domination: domination.value,
      benevolence: benevolence.value,
      options: options.value,
    },
  };
});

const shuffle = (array) => {
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
};

const splitSubArrays = (array, size) => {
  const subarray = [];
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    subarray[i] = array.slice(i * size, i * size + size);
  }

  return subarray;
};

const getKeys = (array) => {
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
};

const selectItem = ({ status, id }) => {
  status = !status;
  questions.value.filter((x) => x.id === id).map((x) => (x.status = status));
};

const getCommonElements = (array1, array2) => {
  const array = [];

  for (let i = 0; i < array1.length; i += 1) {
    if (array2.includes(array1[i].id)) {
      array.push(array1[i].id);
    }
  }

  return array.length;
};

const reset = () => {
  isActive.value = false;
};

const deleteData = () => {
  let id = getItem.value._id;
  deleteResults(id);
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
      //width: 60%;
    }
  }
  .mark {
    padding: 0;
    background-color: inherit;
    //width: 60%;
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
