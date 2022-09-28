<template>
  <div>
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
