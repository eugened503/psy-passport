<template>
  <section class="hero">
    <div class="background-image"></div>
    <h1>Создай свой Пси Паспорт</h1>
    <h3>И поделись с друзьями</h3>
    <router-link :to="{ name: 'eysenck' }" class="btn"
      >Пройти тест Айзенка</router-link
    >
  </section>
</template>

<script>
export default {
  name: "HeroBlock",
};
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  justify-content: center;
  min-height: 100vh;
  color: #fff;
  text-align: center;

  @media (max-width: 800px) {
    min-height: 600px;
  }
  @media (max-width: 600px) {
    padding-top: 158px;
  }

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
  h1 {
    font: bold 60px "Roboto", sans-serif;
    margin-bottom: 15px;
    @media (max-width: 800px) {
      font-size: 48px;
    }
  }
  h3 {
    font: normal 28px "Roboto", sans-serif;
    margin-bottom: 40px;
    @media (max-width: 800px) {
      font-size: 24px;
    }
  }
  a.btn {
    padding: 20px 46px;
    @media (max-width: 800px) {
      padding: 15px 40px;
    }
  }
}
</style>
