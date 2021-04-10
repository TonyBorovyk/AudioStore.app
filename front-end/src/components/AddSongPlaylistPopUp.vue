<template>
  <div class="pop-up-playlist-menu">
      <h4>Choose playlist</h4>
      <div class="pop-up-playlist-container" v-for="playlist in playlists" :key="playlist.playlist_id">
          <input type="checkbox" :id="playlist.playlist_id" :value="playlist.playlist_id" v-model="checked_playlists">
          <label :for="playlist.playlist_id">{{playlist.playlist_name}}</label>
      </div>
        <button @click="AddSongToPlaylists">Add</button>
  </div>
</template>

<script>
export default {
    name:"AddSongPlaylistPopUp",
    props:["song_id"],
    methods:{
        AddSongToPlaylists(){
            //type code here
        }
    }
}
</script>

<style>
    .pop-up-playlist-menu{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>