<template>
  <div class="player-container">
    <div class="progress-container" @click="setProgress">
      <div ref="progress" class="progress"></div>
    </div>
    <div class="player-data-block flex-row">
      <div class="music-info" v-if="song_exist">
        <h3>{{ song.track_name }}</h3>
        <div class="song-artists">
          <div
            class="song-artist"
            v-for="artist in song.artists"
            :key="artist.artist_id"
          >
            <p>{{ artist.artist_name }}</p>
          </div>
        </div>
      </div>
      <div class="music-info" v-if="!song_exist">
        <h4>Choose track</h4>
        <p>Undefined</p>
      </div>
      <audio
        @timeupdate="updateProgress"
        v-if="song_exist"
        ref="audio"
        :src="song.track_url"
        :autoplay="play_now"
      ></audio>
      <div class="buttons-play-block flex-row">
        <button class="btn btn-action" v-if="list">
          <img class="img-btn-prev" src="../assets/icons/next_song.png" />
        </button>
        <button class="btn btn-action btn-action-big" @click="PlayPauseSong">
          <img v-if="play_now" src="../assets/icons/pause.png" /><img
            v-if="!play_now"
            src="../assets/icons/play.png"
          />
        </button>
        <button class="btn btn-action" v-if="list">
          <img src="../assets/icons/next_song.png" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasePlayer",
  props: ["song", "song_exist", "autoplay", "list"],
  data() {
    return {
      play_now: false
    };
  },
  methods: {
    PlayPauseSong() {
      if (this.song_exist) {
        if (this.play_now) {
          this.play_now = !this.play_now;
          this.$refs.audio.pause();
        } else {
          this.play_now = !this.play_now;
          this.$refs.audio.play();
        }
      }
    },
    updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      const progPercent = (currentTime / duration) * 100;
      this.$refs.progress.style.width = `${progPercent}%`;
    },
    setProgress(e) {
      const clientWidth = 376; //container has fiwed with
      const clickX = e.offsetX;
      const duration = this.$refs.audio.duration;
      this.$refs.audio.currentTime = (clickX / clientWidth) * duration;
    }
  },
  mounted() {
    this.play_now = this.autoplay;
  }
};
</script>

<style lang="scss">
.player-container {
  position: relative;
  height: 100px;
  width: 400px;
  border: solid 2px var(--third-button-color);
  padding: 20px 10px;
  .progress-container {
    width: 100%;
    height: 4px;
    border-radius: 5px;
    margin-bottom: 5px;
    background: white;
    cursor: pointer;
    .progress {
      background: #42b883;
      border-radius: 5px;
      height: 100%;
      width: 0%;
      transition: width 0.1s linear;
    }
  }
  .player-data-block {
    position: absolute;
    bottom: 10px;
    align-items: center;
    .music-info {
      text-align: left;
      max-width: 220px;
      h4 {
        overflow: hidden;
      }
      .song-artists {
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow: hidden;
        p {
          line-height: normal;
          margin-right: 5px;
        }
      }
    }
    .buttons-play-block {
      width: 140px;
      justify-content: center;
      text-align: center;
      align-items: center;
      margin-left: 10px;
      .btn-action {
        background: inherit;
        color: white;
        margin: 3px;
        img {
          height: 20px;
        }
        .img-btn-prev {
          transform: rotate(180deg);
        }
      }

      .btn-action-big {
        img {
          height: 25px;
        }
      }
    }
  }
}
</style>
