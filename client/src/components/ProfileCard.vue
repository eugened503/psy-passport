<template>
  <div class="profile-card">
    <div class="profile-card__image-prewrapper">
      <div class="profile-card__image-wrapper">
        <img
          v-if="!avatar"
          src="../assets/images/users.svg"
          alt="avatar"
          class="profile-card__image"
        />
        <img
          v-else
          :src="baseUrl + '/public/' + userId.slice(0, 12) + '/' + avatar"
          alt="avatar"
          class="profile-card__image"
        />
      </div>
      <form class="profile-card__form" enctype="multipart/form-data">
        <label
          class="profile-card__label"
          data-title="Максимальный размер файла: 2Mb."
          for="upload-photo"
        ></label>
        <input
          class="profile-card__input"
          type="file"
          name="image"
          id="upload-photo"
          accept="image/*"
          @change="fotoChange"
        />
      </form>
    </div>
    <div class="profile-card__info">
      <p class="profile-card__name ellipsis">{{ name }}</p>
      <p class="profile-card__text ellipsis">
        Темперамент:
        <span v-if="temperament">&nbsp;{{ temperament }}</span>
        <span v-else>&nbsp;не определен</span>
      </p>
      <p class="profile-card__text ellipsis">
        Психический склад:
        <span v-if="desc">&nbsp;{{ desc }}</span>
        <span v-else>&nbsp;не определен</span>
      </p>
    </div>
  </div>
</template>
<script setup>
import { useStoreUser } from "@/stores/storeUser";
import baseUrl from "@/utils/baseUrl"
import { ref } from "vue";
const props = defineProps({
  name: String,
  temperament: String,
  desc: String,
  avatar: String,
  userId: String,
});

const image = ref();

const { upload } = useStoreUser();

const fotoChange = (e) => {
  const file = e.target.files[0];
  create(file);
};

const create = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    image.value = e.target.result;
    uploadImage();
  };
  reader.readAsDataURL(file);
};

const uploadImage = () => {
  upload(image.value);
};
</script>

<style lang="scss" scoped>
.profile-card {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 33%;
  padding: 24px;
  background-color: $clr-white;
  border-radius: 8px;
  @include _1023 {
    width: 100%;
  }

  &__image-prewrapper {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 150px;
    max-height: 150px;
  }

  &__image-wrapper {
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  &__form {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__label {
    position: absolute;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.2s ease-in-out;
    background: url("../assets/images/pencil.png") no-repeat center;
    cursor: pointer;

    &:hover {
      opacity: 1;
      &::after {
        display: block;
        text-align: center;
        font-size: 16px;
        color: $clr-slate-grey;
        font-weight: 600;
        content: attr(data-title);
      }
    }
  }

  &__input {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  &__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  &__name {
    font-size: 20px;
    font-weight: 600;
    color: $clr-slate-grey;
    width: 100%;
    text-align: center;
  }

  p,
  span {
    font-size: 16px;
    font-weight: 400;
    color: $clr-manatee;
    width: 100%;
    text-align: center;
  }

  span {
    font-weight: 700;
    color: $clr-aqua;
  }
}
</style>
