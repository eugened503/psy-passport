<template>
  <div class="about">
    <div v-for="description in descriptions" :key="description.id">
      <div v-if="description.name === activeName">
        <p class="about__title">
          Ваш темперамент: <span>{{ description.name }}</span>
        </p>
        <div class="about__desc">
          <p class="about__desc-title">Описание</p>
          <p class="about__desc-text">
            {{ description.text }}
          </p>
        </div>

        <div v-if="description.add">
          <p class="about__title">Смежные типы:</p>
          <div v-for="(descriptionAdd, index) in description.add" :key="index">
            <div v-for="description in descriptions" :key="description.id">
              <div v-if="description.name === descriptionAdd">
                <p class="about__title color">
                  {{ description.name }}
                </p>
                <div class="about__desc">
                  <p class="about__desc-title">Описание</p>
                  <p class="about__desc-text">
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
</template>
<script setup>
import descriptions from "@/data/eysenck/descriptions.json";
import randomKey from "@/utils/randomKey"
const props = defineProps({
  activeName: String,
});

descriptions.forEach((description) => {
  description.id = randomKey();
});
</script>

<style lang="scss" scoped>
@import "./desc.scss";
</style>
