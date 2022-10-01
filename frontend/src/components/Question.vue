<template>
  <!-- <div>
    <div v-if="index === questionIndex">
      <h4>{{ index + 1 }}. {{ text }}</h4>
      <ul class="p-0">
        <li v-for="(item, indexRes) in responses" :key="item.id">
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
  </div> -->
  <div v-if="index === questionIndex" class="container mt-5 py-5 questions">
    <div class="container-item col-md-10 col-lg-10">
      <div class="border">
        <div class="question bg-white p-3 border-bottom">
          <div class="d-flex flex-row flex-wrap justify-content-between mcq">
            <h4>Тест Айзенка</h4>
            <span>({{ index + 1 }} из {{ questions.length }})</span>
          </div>
        </div>
        <div class="question bg-white p-3 border-bottom">
          <div class="d-flex flex-row align-items-center question-title">
            <!-- <h3 class="text-danger">Q.</h3> -->
            <h5 class="mt-1 ml-2">
              {{ text }}
            </h5>
          </div>
          <li class="ans ml-2" v-for="item in responses" :key="item.id">
            <button
              style="width: 100px"
              class="btn mt-2"
              :class="{
                'btn-success': answers[questionIndex] === item.response,
              }"
              @click="addRes(index, item.response)"
            >
              {{ item.text }}
            </button>
          </li>
        </div>
        <div class="button-wrapper d-flex flex-wrap p-3 bg-white">
          <button
            class="btn btn-primary"
            type="button"
            v-if="questionIndex > 0"
            @click="prev"
          >
            <i class="fa fa-angle-left mt-1 mr-1"></i>&nbsp;Предыдущий</button
          ><button
            v-show="questionIndex + 1 != questions.length"
            :disabled="questionIndex >= isDisabled"
            @click="next"
            class="btn btn-primary"
            type="button"
          >
            Следующий<i class="fa fa-angle-right mt-1 ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionBlock",
  props: {
    index: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    responses: {
      type: Array,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
    isDisabled: {
      type: Number,
      required: true,
    },
    questionIndex: {
      type: Number,
      required: true,
    },
  },

  methods: {
    next() {
      this.$emit("next");
    },

    prev() {
      this.$emit("prev");
    },

    addRes(index, res) {
      this.$emit("addRes", { index, res });
    },
  },
};
</script>

<style lang="scss">
.questions {
  width: 100%;
  .btn {
    border: none;
    outline: none;

    &:nth-child(2) {
      margin-left: 10px;

      @media (max-width: 410px) {
        margin: 10px 0 0;
      }
    }
  }

  .button-wrapper {
    @media (max-width: 410px) {
      flex-direction: column;
    }
  }

  .container-item {
    width: 100%;
  }

  .btn-success {
    color: $color-white !important;
    background-color: #146c43 !important;
    border: none;
    outline: none;
    &:first-child:hover {
      color: $color-white !important;
      background-color: #146c43 !important;
    }
  }
}
</style>
