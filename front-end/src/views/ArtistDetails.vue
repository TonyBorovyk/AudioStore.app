<template>
  <div class="artist-wrapper">
    <h1>{{ getArtistDetails.artist_name }}</h1>
    <SongsList :songs="getSongs" />
    <button class="ten-more">10 More</button>
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
    ...mapActions(["fetchArtistDetails", "fetchRecAddedSongs"])
  },
  created() {
    this.fetchArtistDetails(this.$route.params.artist_id);
    this.fetchRecAddedSongs();
  }
};
</script>

<style></style>
