<template>
  <div class="container">
    <Swiper
      class="slider"
      :breakpoints="breakpoints"
      :loop="true"
      :watch-slides-visibility="true"
      :autoplay="{
        delay: 1000,
        disableOnInteraction: false,
      }"
      :speed="2000"
    >
      <SwiperSlide
        class="slide"
        :class="['child-' + item.id]"
        v-for="item in dataSlider"
        :key="item.id"
      >
        <router-link :to="{ name: item.link }" class="slide__body">
          <span class="slide__category ellipsis">{{ item.name }}</span>
          <span class="slide__name ellipsis">{{ item.desc }}</span>
          <img :src="getImgUrl(item.image)" alt="image" />
        </router-link>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script setup>
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.min.css";
SwiperCore.use(Navigation).use(Autoplay);
import dataSlider from "@/data/slider";
import { reactive } from "vue";

const getImgUrl = (pic) => {
  return new URL("../assets/images/slider/" + pic, import.meta.url);
};

const breakpoints = reactive({
  0: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  424: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  767: {
    slidesPerView: 3,
    spaceBetween: 15,
  },
  1023: {
    slidesPerView: 4,
    spaceBetween: 32,
  },
  1439: {
    slidesPerView: 5,
    spaceBetween: 42,
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  height: 100%;
  max-width: 100%;
  padding: 0 64px;
  overflow: hidden;
}
.slider {
  width: 100%;
  height: 100%;
  overflow: visible;
  z-index: 0;
}
.slider .slide {
  position: relative;
  &__category {
    display: block;
    opacity: 0.6;
    font-size: 11px;
    color: $clr-white;
    letter-spacing: 0.7px;
    text-align: left;
  }

  &__body {
    display: block;
    height: 326px;
    padding: 44px 33px 0 33px;
    @include _767 {
      padding: 44px 20px 0 20px;
    }

    @include _424 {
      padding: 44px 15px 0 15px;
    }

    img {
      position: absolute;
      right: 0;
      bottom: -11px;
      width: 100%;
      max-width: 200px;
    }
  }

  &__name {
    display: block;
    font-weight: normal;
    font-size: 20px;
    line-height: 1.1;
    color: $clr-white;
    letter-spacing: 0;
    text-align: left;
    margin-top: 14px;
  }
}
</style>

<style lang="scss">
.swiper-slide {
  border-radius: 5px;
}
.child-1 {
  background: #565488;
}
.child-2 {
  background: linear-gradient(-45deg, #3b3154 0%, #64508a 100%);
}
.child-3 {
  background: linear-gradient(62deg, #fb9f6c 0%, #ffcf58 100%);
}
.child-4 {
  background: linear-gradient(-45deg, #ffb7d6 0%, #ba68c8 100%);
}
.child-5 {
  background: linear-gradient(-45deg, #346ad0 0%, #29519e 100%);
}
.child-6 {
  background: linear-gradient(-45deg, #cbe994 0%, #55cf88 100%);
  a img {
    bottom: -16px !important;
  }
}
.child-7 {
  background: linear-gradient(-45deg, #96edff 0%, #02a0ea 100%);
}
</style>
