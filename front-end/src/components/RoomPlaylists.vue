<template>
  <div class="items-continer">
    <div
      class="playlist-block"
      v-for="playlist in getPlaylists"
      :key="playlist.playlist_id"
    >
      <h2
        @click="active = playlist.playlist_id"
        :class="active === playlist.playlist_id ? 'active' : ''"
      >
        {{ playlist.playlist_title }}
      </h2>
      <div
        class="playlist-content"
        :class="active === playlist.playlist_id ? '' : 'hiden'"
      >
        <div class="list-margin list-container">
          <div
            class="list-item playlist-item"
            v-for="track in getPlaylist.tracks"
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RoomPlaylists",
  data() {
    return {
      active: "",
    };
  },
  methods: {
    ...mapActions([
      "changeSongId",
      "changeSongList",
      "fetchPlaylist",
      "fetchAllUserPlaylists",
    ]),
    trackArtists(artists) {
      let artists_string = "";
      artists.forEach((artist) => {
        artists_string = artists_string + artist.artist_name + " ";
      });
      return artists_string;
    },
  },
  computed: {
    ...mapGetters(["getPlaylist", "getPlaylists"]),
  },
  watch: {
    active() {
      this.fetchPlaylist(this.active);
    },
    getPlaylist() {
      this.changeSongList(this.getPlaylist.tracks);
    },
  },
};
</script>

<style lang="scss">
.items-continer {
  height: 50vh;
  overflow-y: scroll;
  margin-top: 40px;
  .playlist-block {
    .hiden {
      display: none;
    }
    .active {
      color: white;
    }
    .playlist-content {
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
  }
}
</style>
