<template>
  <div class="list-margin list-container">
    <h3>Songs</h3>
    <div class="list-item flex-row" v-for="song in songs" :key="song.track_id">
      <router-link :to="`/songs/${song.track_id}`"
        ><h3>{{ song.track_name }}</h3></router-link
      >
      <p>Duration: {{ song.duration }}</p>
      <AddSongPlaylist :song="song.track_id" />
    </div>
  </div>
</template>

<script>
import AddSongPlaylist from "@/components/AddSongPlaylist.vue";

export default {
  name: "ArtistList",
  props: ["songs"],
  components: {
    AddSongPlaylist
  }
};
</script>
