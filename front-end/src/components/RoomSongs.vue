<template>
  <div>
    <h2>Songs</h2>
    <div class="items-continer">
      <div class="list-margin list-container">
        <div
          class="list-item playlist-item"
          v-for="track in getSongs"
          :key="track.track_id"
        >
          <div class="play" @click="changeSongId(track.track_id)">
            <img src="../assets/icons/play.png" />
          </div>
          <div class="song-name text">{{ track.track_name }}</div>
          <div class="song-artists text">
            {{ trackArtists(track.artists) }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <button
        v-if="getTotalPages"
        class="btn btn-ten-more"
        @click="moreSongs({ order_by: 'time_added', asc: true })"
      >
        Show More
      </button>
      <button
        v-if="getTotalPages"
        class="btn btn-ten-more"
        @click="fetchSongs({ order_by: 'time_added', asc: true })"
      >
        Refresh songs
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RoomPlaylists",
  methods: {
    ...mapActions([
      "changeSongId",
      "changeSongList",
      "moreSongs",
      "fetchSongs"
    ]),
    trackArtists(artists) {
      let artists_string = "";
      artists.forEach(artist => {
        artists_string = artists_string + artist.artist_name + " ";
      });
      return artists_string;
    }
  },
  computed: {
    ...mapGetters(["getSongs"]),
    ...mapGetters("page", ["getTotalPages"])
  },
  watch: {
    getSongs() {
      this.changeSongList(this.getSongs);
    }
  }
};
</script>

<style lang="scss">
.items-continer {
  height: 50vh;
  overflow-y: scroll;
  margin-top: 40px;
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
}
</style>
