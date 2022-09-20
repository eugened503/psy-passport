<template>
  <div class="quiz w-50 mt-5 mx-auto p-4 border border-primary">
    <div v-for="(question, index) in questions" :key="question.id">
      <div v-show="index === questionIndex">
        <h2>{{ question.text }}</h2>
        <ul class="p-0">
          <li
            v-for="(response, indexRes) in question.responses"
            :key="response.id"
          >
            <button
              class="btn btn-primary mt-2"
              @click="addRes(index, response.correct)"
            >
              {{ indexRes + 1 }}
              {{ response.text }}
            </button>
          </li>
        </ul>
        <hr class="border border-primary border-2 opacity-75" />
        <button
          class="btn btn-warning m-1"
          v-if="questionIndex > 0"
          @click="prev"
        >
          Предыдущий
        </button>
        <button
          class="btn btn-warning m-1"
          :disabled="questionIndex >= isDisabled"
          @click="next"
        >
          Следующий
        </button>
      </div>
    </div>
    <div v-show="questionIndex === questions.length">
      <h2>Викторина завершена</h2>
      <p>Счет: {{ score }} / {{ questions.length }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuizBlock",
  data() {
    return {
      questionIndex: 0,
      answers: [],
      questions: [
        {
          text: "Вопрос 1",
          responses: [
            { text: "Неправильно, очень плохо.", correct: false },
            { text: "Правильно!", correct: true },
          ],
        },
        {
          text: "Вопрос 2",
          responses: [
            { text: "Правильный ответ", correct: true },
            { text: "Неправильный ответ", correct: false },
          ],
        },
        {
          text: "Вопрос 3",
          responses: [
            { text: "Правильный ответ", correct: true },
            { text: "Неправильный ответ", correct: false },
          ],
        },
      ],
    };
  },
  computed: {
    score() {
      return this.answers.filter((i) => i).length;
    },
    isDisabled() {
      return this.answers.length;
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

    addRes(index, res) {
      this.answers[index] = res;
    },
  },
  created() {
    this.questions.forEach((question) => {
      question.id = this.randomKey();
      question.responses.forEach((res) => {
        res.id = this.randomKey();
      });
    });
  },
};
</script>

<style lang="scss">
.quiz {
  li {
    list-style-type: none;
  }
}
</style>
