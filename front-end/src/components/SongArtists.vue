<template>
  <div class="artists-item-container" :class="flex ? 'flex-row' : ''">
    <router-link
      :to="`/artists/${artist.artist_id}`"
      v-for="artist in song.artists"
      :key="artist.artist_id"
      ><p>{{ artist.artist_name }}</p></router-link
    >
  </div>
</template>

<script>
export default {
  name: "SongArtists",
  props: ["song", "flex"]
};
</script>

<style lang="scss">
.artists-item-container {
  justify-content: center;
  a {
    p {
      font-size: 14px;
      line-height: 20px;
    }
  }
  overflow: hidden;
}
</style>
