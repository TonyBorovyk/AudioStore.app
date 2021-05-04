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
        @ended="nextSong()"
      ></audio>
      <div class="buttons-play-block flex-row">
        <button class="btn btn-action" v-if="list" @click="prevSong()">
          <img class="img-btn-prev" src="../assets/icons/next_song.png" />
        </button>
        <button class="btn btn-action btn-action-big" @click="PlayPauseSong">
          <img v-if="play_now" src="../assets/icons/pause.png" /><img
            v-if="!play_now"
            src="../assets/icons/play.png"
          />
        </button>
        <button class="btn btn-action" v-if="list" @click="nextSong()">
          <img src="../assets/icons/next_song.png" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "BasePlayer",
  props: ["song_id", "songs", "song_exist", "autoplay", "list"],
  data() {
    return {
      song_id_now: this.song_id,
      song: {},
      play_now: false
    };
  },
  methods: {
    ...mapActions(["changeSongId"]),
    nextSong() {
      for (let i = 0; i < this.songs.length; i++) {
        if (
          i < this.songs.length - 1 &&
          this.songs[i].track_id === this.song_id_now
        ) {
          this.getSongById(this.songs[i + 1].track_id);
          break;
        }
        if (
          i === this.songs.length - 1 &&
          this.songs[i].track_id === this.song_id_now
        ) {
          i = 0;
          this.getSongById(this.songs[i].track_id);
          break;
        }
      }
    },
    prevSong() {
      for (let i = 0; i < this.songs.length; i++) {
        if (i > 0 && this.songs[i].track_id === this.song_id_now) {
          this.getSongById(this.songs[i - 1].track_id);
          break;
        }
        if (i === 0 && this.songs[i].track_id === this.song_id_now) {
          i = this.songs.length - 1;
          this.getSongById(this.songs[i].track_id);
          break;
        }
      }
    },
    getSongById(id) {
      this.song = this.songs.filter(song => song.track_id === +id)[0];
      this.song_id_now = id;
    },
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
      const clientWidth = 376; //container has fixed with
      const clickX = e.offsetX;
      const duration = this.$refs.audio.duration;
      this.$refs.audio.currentTime = (clickX / clientWidth) * duration;
    }
  },
  watch: {
    song_exist() {
      if (!this.song_exist) this.play_now = false;
    },
    song_id() {
      this.getSongById(this.song_id);
      if (this.list) {
        this.play_now = true;
      }
    },
    song_id_now() {
      if (this.list) {
        this.changeSongId(this.song_id_now);
        if (!this.play_now) this.PlayPauseSong();
      }
    },
    songs() {
      this.getSongById(this.song_id);
    }
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
    align-items: center;
    justify-content: space-between;
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
