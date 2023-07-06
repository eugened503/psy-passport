<template>
  <table class="table align-middle">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Шкала</th>
        <th scope="col">Баллы</th>
        <th scope="col">Результат</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(result, index) in results" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ result.scale }}</td>
        <td>{{ result.total }}</td>
        <td>{{ result.desc }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  results: Array,
});
</script>

<style lang="scss" scoped>
.table {
  width: 50%;

  @media (max-width: 1040px) {
    width: 100%;
  }
}
</style>
