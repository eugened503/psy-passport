<template>
  <table class="table table-bordered text-center">
    <thead>
      <tr>
        <th scope="col">Номер</th>
        <th scope="col" colspan="2">Ответы</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">№ п/п</th>
        <td>да</td>
        <td>нет</td>
      </tr>
      <tr v-for="(answer, index) in answers" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td v-if="answer">
          <img src="../assets/images/mark.svg" alt="mark" />
        </td>
        <td v-if="answer"></td>
        <td v-if="!answer"></td>
        <td v-if="!answer">
          <img src="../assets/images/mark.svg" alt="mark" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  answers: Array,
});
</script>

<style lang="scss" scoped>
table {
  td {
    max-width: 240px;

    img {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
