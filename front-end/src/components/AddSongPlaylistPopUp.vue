<template>
  <teleport to="#pop-up">
    <div class="pop-up">
      <div class="pop-up-content-container">
        <button
          class="btn close-pop-btn btn-margin"
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
  </teleport>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddSongPlaylistPopUp",
  data() {
    return {
      checked_playlists: []
    };
  },
  computed: {
    ...mapGetters(["getPlaylists", "getPlaylistId"])
  },
  methods: {
    ...mapActions(["changePlaylistPopUpActivity", "addSongPlaylist"]),
    async AddSongToPlaylists() {
      if (this.checked_playlists.length == 0) {
        return;
      }
      const res = await this.addSongPlaylist({
        playlists: this.checked_playlists,
        track_id: this.getPlaylistId
      });
      if (res == true) {
        alert("Song successfully added in playlist!");
      }
      this.changePlaylistPopUpActivity();
    }
  }
  /*created(){
    this.fetchAllUserPlaylists();
  }*/
};
</script>

<style lang="scss">
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
</style>
