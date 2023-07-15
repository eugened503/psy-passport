<template>
  <div v-if="index === questionIndex" class="question">
    <div class="question__header">
      <p class="question__title">{{ name }}</p>
      <p class="question__num">({{ index + 1 }} из {{ questions.length }})</p>
    </div>
    <div class="question__body">
      <p class="question__title">
        <span>{{ index + 1 }}. </span>
        {{ text }}
      </p>
      <div class="question__buttons">
        <div
          class="question__container-button"
          v-for="item in responses"
          :key="item.id"
        >
          <button
            class="question__button button checkbox"
            :class="{
              'button-success': answers[questionIndex] === item.response,
            }"
            @click="addRes(index, item.response)"
          ></button>
          <span class="question__title">&nbsp;&nbsp;{{ item.text }}</span>
        </div>
      </div>
    </div>
    <div class="question__footer">
      <button
        class="question__button button"
        type="button"
        v-if="questionIndex > 0"
        @click="prev"
      >
        Предыдущий</button
      ><button
        v-show="questionIndex + 1 != questions.length"
        :disabled="questionIndex >= isDisabled"
        @click="next"
        class="question__button button"
        type="button"
      >
        Следующий
      </button>
      <button
        v-show="questionIndex + 1 === questions.length"
        :disabled="questionIndex >= isDisabled"
        @click="next"
        class="question__button button"
        type="button"
      >
        Показать результаты
      </button>
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
.question {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: $clr-white;
  border-radius: 8px;
  border: 1px solid $clr-smog;

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 3px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $clr-mineshaft;
    span {
      font-weight: 600;
    }
  }

  &__num {
    font-size: 16px;
    font-weight: normal;
    line-height: 24px;
    color: $clr-slate-grey;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__container-button {
    transition: opacity 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  &__button {
    &.checkbox {
      border-radius: 50%;
      border: 1px solid $clr-manatee;
      width: 30px;
      height: 30px;
      padding: 0;
      background-color: $clr-white;

      &.button-success {
        color: $clr-white;
        border: 10px solid $clr-aqua;
        outline: none;
      }
    }
  }

  &__footer {
    button:not(:nth-child(1)) {
      margin: 0 0 0 16px;
    }
  }
}
</style>
