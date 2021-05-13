<template>
  <div class="album-wrapper">
    <img :src="getAlbumDetails.album_cover" alt="" />
    <h1>{{ getAlbumDetails.album_name }}</h1>
    <SongArtists :song="getAlbumDetails" :flex="true" />
    <SongsList :songs="getSongs" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SongsList from "@/components/SongsList.vue";
import SongArtists from "@/components/SongArtists.vue";

export default {
  name: "AlbumDetails",
  components: {
    SongsList,
    SongArtists
  },
  computed: {
    ...mapGetters(["getAlbumDetails", "getSongs"])
  },
  methods: {
    ...mapActions(["fetchAlbumDetails", "fetchSongsByAlbumId"])
  },
  created() {
    this.fetchAlbumDetails(this.$route.params.album_id);
    this.fetchSongsByAlbumId(this.$route.params.album_id);
  },
  beforeRouteUpdate(to, next) {
    if (to.name == "AlbumDetails") {
      this.fetchAlbumDetails(this.$route.params.album_id);
      this.fetchRecAddedSongs();
      next();
    }
  }
};
</script>

<style lang="scss">
.album-wrapper {
  img {
    height: 500px;
    width: 500px;
    margin: 15px;
  }
}
</style>
