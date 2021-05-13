<template>
  <div>
    <div v-if="artists.length == 0">No Songs Found</div>
    <div class="list-margin list-container" v-if="artists.length != 0">
      <div
        class="list-item flex-row"
        v-for="artist in artists"
        :key="artist.artist_id"
      >
        <router-link :to="`/artists/${artist.artist_id}`"
          ><h3>{{ artist.artist_name }}</h3></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistsList",
  props: ["artists"]
};
</script>
