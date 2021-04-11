<template>
  <div class="pop-up-playlist-container">
    <button @click="changePlaylistPopUpActivity" v-if="isLoggedIn">
      Add to Playlist {{ isPlaylistPopUpActive }}
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
    ...mapActions(["changePlaylistPopUpActivity"])
  },
  computed: {
    ...mapGetters(["isPlaylistPopUpActive", "isLoggedIn"])
  }
};
</script>

<style></style>
