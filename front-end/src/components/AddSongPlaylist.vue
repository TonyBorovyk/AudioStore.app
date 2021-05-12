<template>
  <div class="pop-up-playlist-container" v-if="isLoggedIn">
    <button class="btn btn-playlist-pop-up" @click="handleClick">
      <img src="../assets/icons/plus.png" />
    </button>
    <AddSongPlaylistPopUp v-if="isPlaylistPopUpActive" />
  </div>
</template>

<script>
import AddSongPlaylistPopUp from "./AddSongPlaylistPopUp.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BaseSongItem",
  props: ["song"],
  components: {
    AddSongPlaylistPopUp
  },
  methods: {
    ...mapActions(["changePlaylistPopUpActivity", "changePlaylistId"]),
    handleClick() {
      this.changePlaylistId(this.song);
      this.changePlaylistPopUpActivity();
    }
  },
  computed: {
    ...mapGetters(["isPlaylistPopUpActive", "isLoggedIn"])
  }
};
</script>

<style lang="scss">
.pop-up-playlist-container {
  .btn-playlist-pop-up {
    border-radius: 50%;
    background: var(--first-button-color);
    img {
      height: 16px;
      width: 16px;
      margin: 0;
    }
  }
  .btn-playlist-pop-up:hover {
    background: var(--first-button-color);
  }
}
</style>
