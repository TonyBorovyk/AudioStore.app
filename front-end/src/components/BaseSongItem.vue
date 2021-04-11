<template>
  <div class="item-container">
    <img :src="song.song_cover" />
    <router-link :to="`/songs/${song.track_id}`">
      <h3 class="song-name">{{ song.track_name }}</h3>
    </router-link>
    <ArtistsContainer :song="song" />
    <span>{{ song.duration }}</span>
    <ButtonMore :route="`/songs/${song.track_id}`" />
    <AddSongPlaylist :song="song.track_id" />
  </div>
</template>

<script>
import ArtistsContainer from "./ArtistsContainer.vue";
import ButtonMore from "./ButtonMore.vue";
import AddSongPlaylist from "./AddSongPlaylist.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BaseSongItem",
  props: ["song"],
  components: {
    ButtonMore,
    AddSongPlaylist,
    ArtistsContainer
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
