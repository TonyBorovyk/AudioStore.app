<template>
  <div class="room-container">
    <h1 class="room-name">{{ getRoomData.room_name }}</h1>
    <div class="room-data">
      <button class="btn btn-margin" @click="changeMute()">
        {{ MuteText }}
      </button>
      <h1 class="song-title">{{ playNow }} {{ getSongDetails.track_name }}</h1>
      <SongArtists :song="getSongDetails" />
    </div>
    <audio
      @canplay="canPlay()"
      ref="audio"
      :src="getSongDetails.track_url"
      muted
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SongArtists from "@/components/SongArtists.vue";
export default {
  name: "UserRoom",
  components: {
    SongArtists
  },
  data() {
    return {
      is_muted: true,
      play_now: false
    };
  },
  methods: {
    changeMute() {
      this.$refs.audio.muted = !this.$refs.audio.muted;
      this.is_muted = this.$refs.audio.muted;
    },
    canPlay() {
      if (this.getPlay) {
        this.$refs.audio.play();
      }
    }
  },
  computed: {
    ...mapGetters(["getSongDetails", "getRoomData", "getPlay", "getSongTime"]),
    playNow() {
      if (this.play_now) {
        return "Playing now";
      }
      return "Paused";
    },
    MuteText() {
      if (this.is_muted) {
        return "Unmute";
      }
      return "Mute";
    }
  },
  watch: {
    getPlay() {
      if (this.getPlay) {
        this.$refs.audio.play();
        this.play_now = true;
      }
      if (!this.getPlay) {
        this.$refs.audio.pause();
        this.play_now = false;
      }
      this.$refs.audio.muted = false;
    },
    getSongTime() {
      this.$refs.audio.currentTime = this.getSongTime;
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
