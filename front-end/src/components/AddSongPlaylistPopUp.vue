<template>
  <div class="background-visible pop-up">
    <div class="playlist-menu">
      <button
        class="btn btn-playlist-pop-up btn-margin"
        @click="changePlaylistPopUpActivity"
      >
        <img src="../assets/icons/close.png" />
      </button>
      <h4>Choose playlist</h4>
      <div class="pop-up-playlists-block">
        <div
          class="pop-up-playlist-block"
          v-for="playlist in getPlaylists"
          :key="playlist.playlist_id"
        >
          <input
            type="checkbox"
            :id="playlist.playlist_id"
            :value="playlist.playlist_id"
            v-model="checked_playlists"
          />
          <label :for="playlist.playlist_id">{{
            playlist.playlist_title
          }}</label>
        </div>
      </div>
      <button class="btn add-song-playlist" @click="AddSongToPlaylists">
        Add
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddSongPlaylistPopUp",
  props: ["song_id"],
  data() {
    return {
      checked_playlists: []
    };
  },
  computed: {
    ...mapGetters(["getPlaylists"])
  },
  methods: {
    ...mapActions(["changePlaylistPopUpActivity"]),
    AddSongToPlaylists() {
      //type code here
      if (this.checked_playlists.length == 0) {
        return;
      }
      console.log(this.checked_playlists);
      this.changePlaylistPopUpActivity();
    }
  }
  /*created(){
    this.fetchAllUserPlaylists();
  }*/
};
</script>

<style lang="scss">
.playlist-menu {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  background: var(--second-button-color);
  h4 {
    margin-bottom: 5px;
  }
  .pop-up-playlists-block {
    text-align: left;
    padding: 20px;
    margin: 10px 20px;
    background: var(--third-button-color);
    color: var(--first-text-color);
    label {
      margin-left: 10px;
    }
  }
  .add-song-playlist {
    color: white;
    background: var(--first-button-color);
    margin-bottom: 10px;
  }
}
</style>
