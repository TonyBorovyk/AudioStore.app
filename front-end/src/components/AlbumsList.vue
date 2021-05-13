<template>
  <div>
    <div v-if="albums.length == 0">No Songs Found</div>
    <div class="list-margin list-container" v-if="albums.length != 0">
      <div
        class="list-item flex-row"
        v-for="album in albums"
        :key="album.album_id"
      >
        <router-link :to="`/artists/${album.album_id}`"
          ><h3>{{ album.album_name }}</h3></router-link
        >
      </div>
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
