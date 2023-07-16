<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Шкала</th>
        <th>Баллы</th>
        <th v-if="result">Результат</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(result, index) in results" :key="index">
        <th>{{ index + 1 }}</th>
        <td>{{ result.scale }}</td>
        <td>{{ result.total }}</td>
        <td v-if="result && result.desc">{{ result.desc }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  results: Array,
  result: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
@import "./table.scss";
</style>
