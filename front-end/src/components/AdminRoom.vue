<template>
  <div class="room-container">
    <RoomSearch />
    <button class="btn btn-margin" @click="playlist = !playlist">
      {{ activeTabName }}
    </button>
    <RoomPlaylists v-if="playlist" />
    <RoomSongs v-if="!playlist" />
    <BasePlayer
      :song_id="getSongId"
      :songs="getSongList"
      :song_exist="song_exist"
      :list="true"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RoomSearch from "../components/RoomSearch.vue";
import RoomPlaylists from "../components/RoomPlaylists.vue";
import RoomSongs from "../components/RoomSongs.vue";
import BasePlayer from "@/components/BasePlayer.vue";

export default {
  name: "AdminRoom",
  components: {
    RoomSearch,
    RoomPlaylists,
    BasePlayer,
    RoomSongs
  },
  data() {
    return {
      song_exist: false,
      playlist: false
    };
  },
  methods: {
    ...mapActions(["fetchRecAddedSongs", "fetchAllUserPlaylists"])
  },
  computed: {
    ...mapGetters(["getSongs", "getSongId", "getSongList"]),
    activeTabName() {
      if (this.playlist) {
        return "Songs";
      }
      return "Playlist";
    }
  },
  watch: {
    playlist() {},
    getSongId() {
      this.song_exist = true;
    },
    getSongList() {
      this.song_exist = false;
    }
  },
  created() {
    this.fetchRecAddedSongs();
    this.fetchAllUserPlaylists();
  }
};
</script>

<style lang="scss">
.room-container {
  .player-container {
    margin-left: 70px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
