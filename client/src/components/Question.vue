<template>
  <div v-if="index === questionIndex" class="questions">
    <div class="container-item col-md-10 col-lg-10">
      <div class="border">
        <div class="question bg-white p-3 border-bottom">
          <div class="d-flex flex-row flex-wrap justify-content-between mcq">
            <h4>Тест {{ name }}</h4>
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
          <div class="ans ml-2" v-for="item in responses" :key="item.id">
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
          </div>
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
          <button
            v-show="questionIndex + 1 === questions.length"
            :disabled="questionIndex >= isDisabled"
            @click="next"
            class="btn btn-danger"
            type="button"
          >
            Показать результаты<i class="fa fa-angle-right mt-1 ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  index: Number,
  text: String,
  responses: Array,
  answers: Array,
  questions: Array,
  isDisabled: Number,
  questionIndex: Number,
});

const emit = defineEmits(["next", "prev", "addRes"]);

const next = () => {
  emit("next");
};

const prev = () => {
  emit("prev");
};

const addRes = (index, res) => {
  emit("addRes", { index, res });
};
</script>

<style lang="scss" scoped>
.questions {
  width: 100%;
  .btn {
    border: none;
    outline: none;

    &:nth-child(2),
    &:nth-child(3) {
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
