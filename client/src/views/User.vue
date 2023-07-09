<template>
  <section class="profile" style="background-color: #eee">
    <div class="container py-5">
      <UserRow />

      <div class="row">
        <div class="col-lg-4">
          <ProfileCard :name="getUser?.name" />
          <SocialCard />
        </div>
        <div class="col-lg-8">
          <UserInfo
            :name="getUser?.name"
            :email="getUser?.email"
            :id="getUser?._id"
          />
          <div class="row">
            <Card title="Пройденные тесты" />
            <Card title="Непройденные тесты" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Card from "@/components/Card.vue";
import UserInfo from "@/components/UserInfo.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import SocialCard from "@/components/SocialCard.vue";
import UserRow from "@/components/UserRow.vue";
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

const store = useStore();

const getUser = computed(() => store.state.user.user);
const fetchUser = () => store.dispatch("user/profile");

onBeforeMount(() => fetchUser());
</script>

<style lang="scss" scoped>
.profile {
  @media (max-width: 600px) {
    padding-top: 158px;
  }
}

.col-lg-8 hr {
  width: 100%;
  border: none;
  opacity: 1;
}
</style>
