<template>
  <div class="artist-wrapper">
    <h1>{{ getArtistDetails.artist_name }}</h1>
    <SongsList :songs="getSongs" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SongsList from "@/components/SongsList.vue";

export default {
  name: "ArtistDetails",
  components: {
    SongsList
  },
  computed: {
    ...mapGetters(["getArtistDetails", "getSongs"])
  },
  methods: {
    ...mapActions(["fetchArtistDetails", "fetchSongsByArtistId"])
  },
  created() {
    this.fetchArtistDetails(this.$route.params.artist_id);
    this.fetchSongsByArtistId(this.$route.params.artist_id);
  },
  beforeRouteUpdate(to, next) {
    if (to.name == "ArtistDetails") {
      this.fetchArtistDetails(this.$route.params.artist_id);
      this.fetchRecAddedSongs();
      next();
    }
  }
};
</script>

<style></style>
