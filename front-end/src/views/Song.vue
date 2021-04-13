<template>
  <div class="song-wrapper">
    <div class="main-song-info">
      <div class="left-song-info">
        <img :src="getSongDetails.song_cover" />
      </div>
      <div class="right-song-info">
        <h2 class="track-name">{{ getSongDetails.track_name }}</h2>
        <SongArtists :song="getSongDetails" />
        <p class="genre">Genre: {{ getSongDetails.category }}</p>
        <span class="duration">Duration {{ getSongDetails.duration }}</span>
        <div class="raiting">Raiting: {{ getSongDetails.raiting }}</div>
        <p class="song-release-year">{{ getSongDetails.release_year }}</p>
      </div>
    </div>
    <div class="song-buttons-container">
      <button class="play-song" @click="listen = !listen">
        Listen {{ listen }}
      </button>
      <AddSongPlaylist :song="getSongDetails.track_id" />
    </div>
    <!--song player to do-->
    <div class="another-song-info">
      <div class="song-album-info">
        <img :src="getSongAlbum.album_cover" />
        <router-link :to="`/albums/${getSongAlbum.album_id}`"
          ><h4 class="song-album-name">
            {{ getSongAlbum.album_name }}
          </h4></router-link
        >
      </div>
      <div class="song-lyrics" @click="changeShowMorePopUpActivity">
        {{ getSongDetails.lyrics }}
        <ShowMorePopUp
          :data="getSongDetails.lyrics"
          v-if="isShowMorePopUpActive"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SongArtists from "@/components/SongArtists.vue";
import AddSongPlaylist from "@/components/AddSongPlaylist.vue";
import ShowMorePopUp from "@/components/ShowMorePopUp.vue";

export default {
  name: "Songs",
  data() {
    return {
      listen: false
    };
  },
  components: {
    SongArtists,
    AddSongPlaylist,
    ShowMorePopUp
  },
  computed: {
    ...mapGetters(["getSongDetails", "getSongAlbum", "isShowMorePopUpActive"])
  },
  methods: {
    ...mapActions(["fetchSongDetails", "changeShowMorePopUpActivity"])
  },
  created() {
    this.fetchSongDetails();
  }
};
</script>

<style></style>
