<template>
  <div class="item-container">
      <img :src="song.song_cover" >
      <router-link :to="`/songs/${song.track_id}`">
        <h3 class="song-name">{{song.track_name}}</h3>
      </router-link>
      <div class="artists-item-container">
          <router-link :to="`/artists/${artist.id}`" v-for="artist in song.artist" :key="artist.id"><p>{{artist.artist_name}}</p></router-link>
      </div>
      <span>{{song.duration}}</span>
      <ButtonMore :route="`/songs/${song.track_id}`" />
      <button @click="Playlist_checked=!Playlist_checked">Add to Playlist {{Playlist_checked}}</button>
      
      
  </div>
</template>

<script>
import ButtonMore from './ButtonMore.vue'
export default {
    name:"BaseItem",
    props:["song"],
    components:{
        ButtonMore,
    },
    data(){
        return{
            Playlist_checked: false,
        }
    }

}
</script>

<style>

</style>
