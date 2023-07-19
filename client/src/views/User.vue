<template>
  <section class="user">
    <Breadcrumb />
    <div class="user__container">
      <ProfileCard
        :name="getUser?.name"
        :avatar="getUser?.avatar"
        :temperament="temperament"
        :desc="test"
      />
      <div class="user__right-block">
        <UserInfo
          :name="getUser?.name"
          :email="getUser?.email"
          :id="getUser?._id"
        />
        <div class="user__cards">
          <Card title="Пройденные тесты" :namesTests="passed" />
          <Card title="Непройденные тесты" :namesTests="missed" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeMount, ref } from "vue";
import Card from "@/components/Card.vue";
import UserInfo from "@/components/UserInfo.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import allTests from "@/data/allTests.json"
import { useStoreUser } from "@/stores/storeUser";
import { useStoreResults } from "@/stores/storeResults";
import { storeToRefs } from "pinia";

const { profile } = useStoreUser();
const { getUser } = storeToRefs(useStoreUser());
const { getResults } = storeToRefs(useStoreResults());
const { getTestRecords, loadResults } = useStoreResults();

const getEysenckRes = computed(() => getTestRecords("eysenck"));
const test = computed(() => getEysenckRes.value?.test[0].desc);
const temperament = computed(() => getEysenckRes.value?.temperament);
const passed = computed(() =>
  getResults.value?.map((item) => ({
    id: item._id,
    name: item.name,
    title: item.title,
  }))
);
const passedTitle = computed(() => passed.value?.map((item) => item.title));
const missed = computed(() => {
  return allTests.filter((item) => {
    return !passedTitle.value?.includes(item.title);
  });
});

onBeforeMount(() => {
  profile();
  loadResults();
});
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 10px;

  &__container {
    display: flex;
    gap: 24px;
    @include _1023 {
      flex-direction: column;
    }
  }

  &__right-block {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 0 0 auto;
    width: calc(67% - 24px);
    @include _1023 {
      width: 100%;
    }
  }

  &__cards {
    display: flex;
    gap: 24px;
  }
}
</style>
