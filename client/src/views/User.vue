<template>
  <!-- <div class="p-5">
    <div class="mt-5 mx-auto">
      {{ getUser }}
      <router-link class="d-inline p-2 mt-2" :to="{ name: 'eysenck' }">
        пройти тест Айзенка
      </router-link>
    </div>
  </div> -->
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
<script>
import { mapGetters, mapActions } from "vuex";
import Card from "@/components/Card.vue";
import UserInfo from "@/components/UserInfo.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import SocialCard from "@/components/SocialCard.vue";
import UserRow from "@/components/UserRow.vue";
export default {
  name: "UserBlock",
  components: { Card, UserInfo, ProfileCard, SocialCard, UserRow },
  computed: {
    ...mapGetters("user", { getUser: "getUser" }),
  },

  created() {
    this.fetchUser();
  },

  // watch: {
  //   $route: "fetchUser",
  // },

  methods: {
    ...mapActions({
      fetchUser: "user/profile",
    }),
  },
};
</script>

<style lang="scss" scoped>
// .card img {
//   height: 280px;
//   object-fit: cover;
// }
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
