<template>
  <div class="container">
    <swiper
      class="swiper-container"
      :slides-per-view="3"
      :space-between="25"
      :loop="true"
      :autoplay="{
        delay: 1000,
        disableOnInteraction: false,
      }"
      :speed="2000"
    >
      <swiper-slide v-for="item in dataSlider" :key="item.id">
        <div class="inside-wrapper">
          <!-- Slide {{ item }} -->
          <img :src="getImgUrl(item.image)" alt="" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.min.css";
SwiperCore.use(Navigation).use(Autoplay);
import dataSlider from "@/data/slider";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      dataSlider,
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("@/assets/images/slider/" + pic);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  height: 100%;
  max-width: 100%;
  padding: 0 4em;
  overflow: hidden;
}
.slider-wrap {
  overflow: hidden;
  height: 100%;
  width: 100%;
  //background: red;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
// .swiper-slide {
//   text-align: center;
//   font-size: 18px;
//   background: #fff;
// }
.swiper-container {
  overflow: visible;
}

:deep(.swiper-slide) {
  // так как scoped глушит тили для лупа
  text-align: center;
  font-size: 18px;
  background: #fff;
}

.inside-wrapper {
  height: 200px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

// /* if 1 slide */
// @media (max-width: 480px) {
//   .swiper-slide-next {
//     opacity: 0.25;
//   }
// }

// /* if 3 slides */
// @media (min-width: 480px) and (max-width: 1028px) {
//   .swiper-slide-next + .swiper-slide {
//     opacity: 0.25;
//   }
// }

// /* if 5 slides */
// @media (min-width: 1028px) {
//   .swiper-slide-next + .swiper-slide + .swiper-slide {
//     opacity: 0.25;
//   }
// }
</style>
