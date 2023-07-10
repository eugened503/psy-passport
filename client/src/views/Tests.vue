<template>
  <div class="tests">
    <router-view />
  </div>
</template>
<script setup>
import { onBeforeMount } from "vue";
//import { useStore } from "vuex";
import { useStoreResults } from "@/stores/storeResults";
const { loadResults } = useStoreResults();

//const store = useStore();
//const loadResults = () => store.dispatch("results/getResults");
onBeforeMount(() => loadResults());
</script>
<style lang="scss"></style>
