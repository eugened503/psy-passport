<template>
  <div class="about">
    <div
      class="container"
      v-for="description in descriptions"
      :key="description.id"
    >
      <div v-if="description.name === activeName">
        <h2 class="text-center color-primary">{{ description.name }}</h2>
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-12 wrapper">
            <img :src="getImgUrl(description.image)" />
          </div>
          <div class="col-lg-8 col-md-8 col-sm-12 desc wrapper">
            <h3>Описание</h3>
            <p>
              {{ description.text }}
            </p>
          </div>
        </div>

        <div v-if="description.add">
          <h2 class="text-center color-primary">Смежные типы:</h2>
          <div v-for="(descriptionAdd, index) in description.add" :key="index">
            <div
              class="container"
              v-for="description in descriptions"
              :key="description.id"
            >
              <div v-if="description.name === descriptionAdd">
                <h2 class="text-center color-primary">
                  {{ description.name }}
                </h2>
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <img
                      :src="getImgUrl(description.image)"
                      class="img-fluid"
                    />
                  </div>
                  <div class="col-lg-8 col-md-8 col-sm-12 desc">
                    <h3>Описание</h3>
                    <p>
                      {{ description.text }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import descriptions from "@/data/eysenck/descriptions.json";
export default {
  name: "DescTempBlock",
  props: {
    activeName: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      descriptions,
    };
  },
  methods: {
    randomKey() {
      return (
        new Date().getTime() + Math.floor(Math.random() * 10000).toString()
      );
    },

    getImgUrl(pic) {
      //return require("@/assets/images/" + pic);
    },
  },
  created() {
    this.descriptions.forEach((description) => {
      description.id = this.randomKey();
    });
  },
};
</script>

<style lang="scss" scoped>
.about {
  //margin: 4em 0;
  //padding: 1em;
  position: relative;

  h1 {
    color: #0d6efd;
    //margin: 2em;
  }
  img {
    height: auto;
    width: 100%;
    border-radius: 50%;

    @media (max-width: 765px) {
      margin: 10px 0;
    }
  }

  span {
    display: block;
    color: #888;
    position: absolute;
    left: 12%;
  }

  .row {
    @media (max-width: 767px) {
      margin: 0;
    }
  }

  .wrapper {
    padding: 2em;

    @media (max-width: 765px) {
      border-left: none;
      padding: 0;
    }

    h3 {
      @media (max-width: 765px) {
        text-align: center;
      }
    }
  }

  .desc {
    border-left: 4px solid #0d6efd;

    @media (max-width: 765px) {
      border-left: none;
    }

    p {
      line-height: 2;
      color: #888;
      text-align: left;
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>
