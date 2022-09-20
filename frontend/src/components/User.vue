<template>
  <div class="card w-50 mt-5 mx-auto">
    {{ getUser }}
    <img
      class="card-img-top rounded d-block"
      src="../assets/images/martin.jpg"
      alt=""
    />
    <div class="card-body">
      <h5 class="card-title">{{ getUser.name }}</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ getUser._id }}</li>
      <li class="list-group-item">{{ getUser.email }}</li>
      <li class="list-group-item">A third item</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserBlock",
  computed: {
    getUser() {
      //console.log(this.$store.getters.getUser);
      return this.$store.getters.getUser;
    },
  },

  created() {
    // загружаем данные, когда представление создано
    // и данные реактивно отслеживаются
    this.fetchUser();
  },

  watch: {
    // при изменениях маршрута запрашиваем данные снова
    $route: "fetchUser",
  },

  methods: {
    fetchUser() {
      this.$store
        .dispatch("profile")
        .then((user) => console.log(user.data))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.card img {
  height: 280px;
  object-fit: cover;
}
</style>
