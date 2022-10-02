<template>
  <div>
    <h5>Пройти тест еще раз?</h5>
    <div class="btn-group">
      <button class="btn mt-2">Да</button>
      <button class="btn mt-2">Нет</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BtnGroupBlock",
};
</script>
<style lang="scss" scoped>
.btn-group {
  width: 250px;
  display: flex;
  justify-content: space-between;

  .btn {
    flex: 0 0 48%;
    border-radius: 0.375rem !important;
  }
}
</style>
