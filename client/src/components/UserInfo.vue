<template>
  <div class="user-info">
    <div class="user-info__row">
      <p class="user-info__key ellipsis">Full Name</p>
      <p class="user-info__value ellipsis">{{ name }}</p>
    </div>
    <hr />

    <div class="user-info__row">
      <p class="user-info__key ellipsis">Email</p>
      <p class="user-info__value ellipsis">{{ email }}</p>
    </div>
    <hr />

    <div class="user-info__row">
      <p class="user-info__key ellipsis">ID</p>
      <p class="user-info__value ellipsis">{{ id }}</p>
    </div>
    <hr />

    <div class="user-info__row">
      <p class="user-info__key ellipsis">Mobile</p>
      <p class="user-info__value ellipsis">(098) 765-432</p>
    </div>
    <hr />

    <div class="user-info__row">
      <p class="user-info__key ellipsis">Address</p>
      <p class="user-info__value ellipsis">Bay Area, San Francisco, CA</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  email: String,
  id: String,
});
</script>

<style lang="scss" scoped>
.user-info {
  padding: 24px;
  background-color: $clr-white;
  color: $clr-manatee;
  border-radius: 8px;

  &__row {
    display: flex;
    p {
      font-size: 16px;
      @include _424 {
        font-size: 14px;
      }
    }
  }

  hr {
    height: 1px;
    border: 0;
    width: 100%;
    margin: 16px 0;
    background-color: $clr-aqua;
  }

  &__key {
    flex: 0 0 auto;
    width: 25%;
    color: $clr-slate-grey;
    font-weight: 600;
  }

  &__value {
    flex: 0 0 auto;
    width: 75%;
    color: $clr-manatee;
    font-weight: 400;
    padding: 0 12px;
  }
}
</style>
