<template>
  <div class="search-wrapper">
    <h1>Results</h1>
    <SongsList :songs="getSongs" />
    <h3>Artists</h3>
    <ArtistsList :artists="getArtists" />
    <h3>Albums</h3>
    <AlbumsList :albums="getAlbums" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SongsList from "@/components/SongsList.vue";
import ArtistsList from "@/components/ArtistsList.vue";
import AlbumsList from "@/components/AlbumsList.vue";

export default {
  name: "Search",
  components: {
    SongsList,
    ArtistsList,
    AlbumsList
  },
  computed: {
    ...mapGetters(["getArtists", "getSongs", "getAlbums"])
  },
  methods: {
    ...mapActions([
      "fetchAlbumDetails",
      "fetchRecAddedSongs",
      "fetchAllAlbums",
      "fetchAllArtists"
    ])
  },
  created() {
    this.fetchAlbumDetails(this.$route.params.album_id);
    this.fetchRecAddedSongs();
    this.fetchAllAlbums();
    this.fetchAllArtists();
  }
};
</script>

<style></style>
