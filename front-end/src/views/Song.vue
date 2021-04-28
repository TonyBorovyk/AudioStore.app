<template>
  <div class="song-wrapper">
    <div class="main-song-info grid">
      <div class="left-song-info">
        <img :src="getSongDetails.song_cover" />
      </div>
      <div class="right-song-info">
        <h2 class="track-name">{{ getSongDetails.track_name }}</h2>
        <SongArtists :song="getSongDetails" />
        <div class="song-details">
          <p class="genre">Genre: {{ getSongDetails.category }}</p>
          <span class="duration">Duration {{ getSongDetails.duration }}</span>
          <p class="song-release-year">{{ getSongDetails.release_year }}</p>
        </div>
      </div>
    </div>
    <div class="button-player-container flex-row">
      <AddSongPlaylist :song="getSongDetails.track_id" />
      <BasePlayer
        :song_id="getSongDetails.track_id"
        :songs="[getSongDetails]"
        :song_exist="true"
        :autoplay="false"
        :list="false"
      />
    </div>
    <div class="another-song-info grid">
      <div class="song-album-info">
        <img :src="getSongAlbum.album_cover" />
        <router-link :to="`/albums/${getSongAlbum.album_id}`"
          ><h4 class="song-album-name">
            {{ getSongAlbum.album_name }}
          </h4></router-link
        >
      </div>
      <div class="song-lyrics">
        <h3>Lyrics</h3>
        <p @click="changeShowMorePopUpActivity">{{ getSongDetails.lyrics }}</p>
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
import BasePlayer from "@/components/BasePlayer.vue";

export default {
  name: "Songs",
  components: {
    SongArtists,
    AddSongPlaylist,
    ShowMorePopUp,
    BasePlayer
  },
  computed: {
    ...mapGetters(["getSongDetails", "getSongAlbum", "isShowMorePopUpActive"])
  },
  methods: {
    ...mapActions(["fetchSongDetails", "changeShowMorePopUpActivity"])
  },
  created() {
    this.fetchSongDetails(this.$route.params.track_id);
  },
  beforeRouteUpdate(to, next) {
    if (to.name == "Song") {
      this.fetchSongDetails(this.$route.params.track_id);
      next();
    }
  }
};
</script>

<style lang="scss">
.song-wrapper {
  position: relative;
  padding: 20px 20px;
  .main-song-info {
    grid-template-columns: 2fr 1fr;
    grid-gap: 10px;
    img {
      height: 300px;
      width: 300px;
    }
    .right-song-info {
      text-align: left;
      h2 {
        margin-bottom: 20px;
        font-size: 45px;
      }
      .artists-item-container {
        margin-bottom: 10px;
      }
      .song-details {
        line-height: 20px;
      }
    }
  }
  .button-player-container {
    justify-content: center;
    flex-wrap: wrap;
    margin: 30px;
    align-items: center;
    .player-container {
      margin-left: 20px;
    }
  }
  .another-song-info {
    grid-template-columns: 2fr 1fr;
    grid-gap: 10px;
    margin-bottom: 0px;
    .song-lyrics {
      text-align: left;
    }
    img {
      height: 300px;
      width: 300px;
    }
  }
}
</style>
