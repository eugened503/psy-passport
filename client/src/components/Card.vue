<template>
  <div class="col-md-6">
    <div class="card mb-4 mb-md-0">
      <div class="card-body">
        <p class="mb-4">
          <span class="text-primary font-italic me-1">{{ title }}</span>
        </p>
        <router-link
          :to="{ name: 'eysenck' }"
          class="card-link mb-1"
          style="font-size: 0.77rem"
          >Тест Айзенка</router-link
        >
        <div class="progress rounded" style="height: 5px">
          <div
            class="progress-bar"
            role="progressbar"
            style="width: 100%"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p class="mt-4 mb-1" style="font-size: 0.77rem">Website Markup</p>
        <div class="progress rounded" style="height: 5px">
          <div
            class="progress-bar"
            role="progressbar"
            style="width: 100%"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p class="mt-4 mb-1" style="font-size: 0.77rem">One Page</p>
        <div class="progress rounded" style="height: 5px">
          <div
            class="progress-bar"
            role="progressbar"
            style="width: 100%"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p class="mt-4 mb-1" style="font-size: 0.77rem">Mobile Template</p>
        <div class="progress rounded" style="height: 5px">
          <div
            class="progress-bar"
            role="progressbar"
            style="width: 100%"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p class="mt-4 mb-1" style="font-size: 0.77rem">Backend API</p>
        <div class="progress rounded mb-2" style="height: 5px">
          <div
            class="progress-bar"
            role="progressbar"
            style="width: 100%"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <script>
export default {
  name: "CardBlock",
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script> -->

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.card-link {
  display: block;
  text-decoration: none;
  text-align: center;
  //color: rgb(33, 37, 41);
}
</style>
