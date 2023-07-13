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
  padding: 120px 0 0;

  &.banner-mt {
    margin: 40px 0 0;
  }
}
</style>
