<template>
  <div class="playlist-container">
    <h1>{{ getPlaylist.playlist_title }}</h1>
    <div class="list-margin list-container">
      <div
        class="list-item playlist-item"
        v-for="track in getPlaylist.tracks"
        :key="track.track_id"
      >
        <div class="play" @click="changeSong(track.track_id)">
          <img src="../assets/icons/play.png" />
        </div>
        <div class="song-name text">{{ track.track_name }}</div>
        <div class="song-artists text">
          {{ trackArtists(track.artists) }}
        </div>
      </div>
    </div>
    <BasePlayer
      :song_id="song_id"
      :songs="getPlaylist.tracks"
      :song_exist="song_exist"
      :list="true"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BasePlayer from "@/components/BasePlayer.vue";
export default {
  name: "Playlist",
  data() {
    return {
      song_id: "",
      song_exist: false
    };
  },
  components: {
    BasePlayer
  },
  computed: {
    ...mapGetters(["getPlaylist"])
  },
  methods: {
    ...mapActions(["fetchPlaylist"]),
    trackArtists(artists) {
      let artists_string = "";
      artists.forEach(artist => {
        artists_string = artists_string + artist.artist_name + " ";
      });
      return artists_string;
    },
    changeSong(track_id) {
      this.song_id = track_id;
      this.song_exist = true;
    }
  },
  created() {
    this.fetchPlaylist(this.$route.params.playlist_id);
  }
};
</script>

<style lang="scss">
.playlist-container {
  position: relative;
  height: 100%;
  .playlist-item {
    justify-content: flex-start !important;
    .play {
      width: 30px;
      margin-right: 20px;
      cursor: pointer;
      img {
        height: 26px;
        width: 26px;
      }
    }
    .song-name {
      text-align: left;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .song-artists {
      width: 200px;
      text-overflow: ellipsis;
      text-align: left;
      flex-wrap: nowrap;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .player-container {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
