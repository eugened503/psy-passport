<template>
  <div class="card">
    <p class="card__title ellipsis">
      {{ title }}
    </p>
    <div class="card__body">
      <p class="card__test ellipsis">Тест Айзенка</p>
      <hr />
      <p class="card__test ellipsis">Тест Айзенка</p>
      <hr />
      <p class="card__test ellipsis">Тест Айзенка</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
});
</script>

<style lang="scss" scoped>
.card {
  flex: 0 0 auto;
  width: calc(50% - 12px);
  padding: 24px;
  background-color: $clr-white;
  color: $clr-manatee;
  border-radius: 8px;

  &__title {
    color: $clr-slate-grey;
    font-size: 16px;
    @include _424 {
      font-size: 14px;
    }
  }

  &__body {
    margin: 16px 0 0;
  }

  &__test {
    color: $clr-manatee;
    font-size: 12px;
    font-weight: 400;
  }

  hr {
    height: 1px;
    border: 0;
    width: 100%;
    margin: 16px 0;
    background-color: $clr-aqua;
  }
}
</style>
