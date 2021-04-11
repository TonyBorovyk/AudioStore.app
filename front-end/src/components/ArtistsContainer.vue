<template>
  <div class="artists-item-container">
    <router-link
      :to="`/artists/${artist.id}`"
      v-for="artist in song.artists"
      :key="artist.id"
      ><p>{{ artist.artist_name }}</p></router-link
    >
  </div>
</template>

<script>
export default {
  name: "ArtistsContainer",
  props: ["song"]
};
</script>

<style></style>
