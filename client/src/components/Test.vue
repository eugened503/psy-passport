<template>
  <div class="test">
    <div class="test__result">
      <div class="test__container">
        <TableResults :result="result" :results="results" />
        <Highcharts
          class="highcharts"
          :chartOptions="chartOptions"
          :dataArr="dataArr"
        >
          <template v-slot:background>
            <slot name="test-background"></slot>
          </template>
        </Highcharts>
      </div>
      <slot name="body"></slot>
      <button @click="showTable = !showTable" class="button-link button">
        Tаблица ответов
        <span v-if="!showTable">↓</span>
        <span v-else>↑</span>
      </button>
      <Transition name="fade">
        <TableQuiz v-if="showTable" :answers="answers" />
      </Transition>
      <BtnGroup
        v-if="allResults"
        @reset="reset"
        @sendResults="sendResults(allResults)"
      />
      <button v-else @click="deleteData" class="container-button button">
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup>
import Highcharts from "@/components/Highcharts.vue";
import TableQuiz from "@/components/tableComponents/TableQuiz.vue";
import TableResults from "@/components/tableComponents/TableResults.vue";
import BtnGroup from "@/components/BtnGroup.vue";

const props = defineProps({
  result: Boolean,
  results: Array,
  chartOptions: Object,
  dataArr: Array,
  showTable: Boolean,
  answers: Array,
  sendResults: Function,
  reset: Function,
  deleteData: Function,
  allResults: {
    type: Object,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.test {
  &__result {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    @include _1023 {
      flex-direction: column;
    }
    .highcharts {
      width: 600px;
      @include _1023 {
        width: 100%;
      }

      :deep(.highcharts-background) {
        fill: transparent;
      }

      // :deep(
      //     .highcharts-axis-labels,
      //     .highcharts-xaxis-labels,
      //     .highcharts-radial-axis-labels
      //   ) {
      //   text {
      //     display: none;
      //   }
      // }

      // :deep(
      //     .highcharts-grid,
      //     .highcharts-xaxis-grid,
      //     .highcharts-radial-axis-grid
      //   ) {
      //   path {
      //     display: none;
      //   }
      // }
    }
  }
}
</style>
