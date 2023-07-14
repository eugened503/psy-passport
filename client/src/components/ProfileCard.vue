<template>
  <div class="profile-card">
    <div class="profile-card__image-prewrapper">
      <div class="profile-card__image-wrapper">
        <img
          src="../assets/images/962178.jpg"
          alt="avatar"
          class="profile-card__image"
        />
      </div>
    </div>
    <div class="profile-card__info">
      <p class="profile-card__name ellipsis">{{ name }}</p>
      <p class="profile-card__text ellipsis">Full Stack Developer</p>
      <p class="profile-card__text ellipsis">Bay Area, San Francisco, CA</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  name: String,
});
</script>

<style lang="scss" scoped>
.profile-card {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 33%;
  padding: 24px;
  background-color: $clr-white;
  border-radius: 8px;
  @include _424 {
    width: 100%;
  }

  &__image-prewrapper {
    width: 100%;
    height: 100%;
    max-width: 150px;
    max-height: 150px;
  }

  &__image-wrapper {
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  &__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  &__name {
    font-size: 20px;
    font-weight: 600;
    color: $clr-slate-grey;
    width: 100%;
    text-align: center;
    @include _424 {
      font-size: 18px;
    }
  }

  &__text {
    font-size: 16px;
    font-weight: 400;
    color: $clr-manatee;
    width: 100%;
    text-align: center;
    @include _424 {
      font-size: 14px;
    }
  }
}
</style>
