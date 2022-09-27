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
          <div class="col-lg-4 col-md-4 col-sm-12">
            <img :src="getImgUrl(description.image)" class="img-fluid" />
          </div>
          <div class="col-lg-8 col-md-8 col-sm-12 desc">
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
import descriptions from "../data/descriptions.json";
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
      return require("../assets/images/" + pic);
    },
  },
  created() {
    this.descriptions.forEach((description) => {
      description.id = this.randomKey();
    });
  },
};
</script>

<style lang="scss">
.about {
  //margin: 4em 0;
  padding: 1em;
  position: relative;
}
.about h1 {
  color: #0d6efd;
  //margin: 2em;
}
.about img {
  //flex: 0 0 270px;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  //object-fit: contain;
}
.about span {
  display: block;
  color: #888;
  position: absolute;
  left: 12%;
}
.about .desc {
  padding: 2em;
  border-left: 4px solid #0d6efd;
}
.about .desc h3 {
  color: #0d6efd;
}
.about .desc p {
  line-height: 2;
  color: #888;
}
</style>
