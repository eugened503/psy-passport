<template>
  <div class="tests">
    <router-view />
  </div>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { useStoreResults } from "@/stores/storeResults";

const { loadResults } = useStoreResults();

onBeforeMount(() => loadResults());
</script>
<style lang="scss"></style>
