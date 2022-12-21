<template>
  <div class="home">
    <div class="background-image"></div>
    <LeadSlider />
    <Hero />
  </div>
</template>

<script>
import Hero from "../components/Hero.vue";
import LeadSlider from "../components/LeadSlider.vue";
export default {
  components: { Hero, LeadSlider },
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
.home {
  padding: 125px 0 0;
  position: relative;
  min-height: 100vh;
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/altai.jpg);
    background-size: cover;
    background-color: #2196f3;
    z-index: -1;
  }
  .background-image:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #414a4f;
    opacity: 0.75;
  }
}
</style>
