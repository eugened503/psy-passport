<template>
  <section class="user">
    <Breadcrumb />
    <div class="user__container">
      <ProfileCard :name="getUser?.name" />
      <div class="user__right-block">
        <UserInfo
          :name="getUser?.name"
          :email="getUser?.email"
          :id="getUser?._id"
        />
        <div class="user__cards">
          <Card title="Пройденные тесты" />
          <Card title="Непройденные тесты" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Card from "@/components/Card.vue";
import UserInfo from "@/components/UserInfo.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { onBeforeMount } from "vue";
import { useStoreUser } from "@/stores/storeUser";
import { storeToRefs } from "pinia";

const { profile } = useStoreUser();
const { getUser } = storeToRefs(useStoreUser());

onBeforeMount(() => profile());
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
    @include _424 {
      flex-direction: column;
    }
  }

  &__right-block {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 0 0 auto;
    width: calc(67% - 24px);
    @include _424 {
      width: 100%;
    }
  }

  &__cards {
    display: flex;
    gap: 24px;
  }
}
</style>
