<template>
  <div class="breadcrumb">
    <nav class="breadcrumb__nav">
      <ol class="breadcrumb__list">
        <li class="breadcrumb__item">
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li class="breadcrumb__item item-active">User</li>
      </ol>
    </nav>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.breadcrumb {
  padding: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.6px;
  text-align: left;
  background-color: $clr-white;
  border-radius: 8px;

  &__list {
    display: flex;
  }

  &__item {
    padding: 0 0 0 8px;
    color: $clr-manatee;

    &:not(:nth-child(1)) {
      &::before {
        padding: 0 8px 0 0;
        float: left;
        color: $clr-manatee;
        content: "/";
      }
    }

    &:not(.item-active) {
      color: $clr-aqua;
    }
  }
  &__item a {
    color: inherit;
  }
}
</style>
