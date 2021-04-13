<template>
  <div class="list-margin list-container">
    <div
      class="list-item flex-row"
      v-for="artist in artists"
      :key="artist.artist_id"
    >
      <router-link :to="`/artists/${artist.artist_id}`"
        ><h3>{{ artist.artist_name }}</h3></router-link
      >
      <p>Songs: {{ artist.count_of_songs }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistsList",
  props: ["artists"]
};
</script>
