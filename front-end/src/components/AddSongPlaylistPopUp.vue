<template>
  <div class="pop-up-playlist-menu">
    <h4>Choose playlist</h4>
    <div
      class="pop-up-playlist-container"
      v-for="playlist in getPlaylists"
      :key="playlist.playlist_id"
    >
      <input
        type="checkbox"
        :id="playlist.playlist_id"
        :value="playlist.playlist_id"
        v-model="checked_playlists"
      />
      <label :for="playlist.playlist_id">{{ playlist.playlist_title }}</label>
    </div>
    <button @click="AddSongToPlaylists">Add</button>
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

<style>
.pop-up-playlist-menu {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
