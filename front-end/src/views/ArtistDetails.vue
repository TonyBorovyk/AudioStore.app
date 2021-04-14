<template>
  <div class="artist-wrapper">
    <h1>{{ getArtistDetails.artist_name }}</h1>
    <SongsList :songs="getSongs" />
    <ButtonTenMore />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SongsList from "@/components/SongsList.vue";
import ButtonTenMore from "@/components/ButtonTenMore.vue";

export default {
  name: "ArtistDetails",
  components: {
    SongsList,
    ButtonTenMore
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
