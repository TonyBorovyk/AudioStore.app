<template>
  <div class="list-margin list-container">
    <div
      class="list-item flex-row"
      v-for="album in albums"
      :key="album.album_id"
    >
      <router-link :to="`/artists/${album.album_id}`"
        ><h3>{{ album.album_name }}</h3></router-link
      >
      <p>Songs: {{ album.songs_list.length }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumsList",
  props: ["albums"]
};
</script>

<style></style>
