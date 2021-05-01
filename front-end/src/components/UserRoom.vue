<template>
  <div class="room-container">
    <h1 class="room-name">{{ getRoomData.room_name }}</h1>
    <div class="room-data">
      <h1 class="song-title">Playing now {{ getSongDetails.track_name }}</h1>
      <SongArtists :song="getSongDetails" />
    </div>
    <BasePlayer
      :song_id="getSongDetails.track_id"
      :songs="[getSongDetails]"
      :song_exist="song_exist"
      :list="false"
      :autoplay="autoplay"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BasePlayer from "@/components/BasePlayer.vue";
import SongArtists from "@/components/SongArtists.vue";

export default {
  name: "AdminRoom",
  components: {
    SongArtists,
    BasePlayer
  },
  data() {
    return {
      song_exist: false,
      autoplay: false
    };
  },
  computed: {
    ...mapGetters(["getSongDetails", "getRoomData"])
  },
  watch: {
    getSongDetails() {
      this.song_exist = true;
      this.autoplay = true;
    }
  }
};
</script>

<style lang="scss">
.room-container {
  .room-name {
    padding-top: 50px;
  }
  .room-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .player-container {
    margin-left: 70px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
