<template>
  <div class="home">
    <LeadSlider />
    <Banner class="banner-mt" />
  </div>
</template>

<script setup>
import Banner from "../components/Banner.vue";
import LeadSlider from "../components/LeadSlider.vue";
</script>

<style lang="scss" scoped>
.home {
  &.banner-mt {
    margin: 40px 0 0;
  }
}
</style>
