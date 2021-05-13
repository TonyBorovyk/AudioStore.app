<template>
  <div class="artists-wrapper">
    <h1>Artists</h1>
    <ArtistsList :artists="getArtists" />
    <ButtonTenMore v-if="getTotalPages" :AskMore="moreArtists" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ArtistsList from "@/components/ArtistsList.vue";
import ButtonTenMore from "../components/ButtonTenMore.vue";

export default {
  name: "Artists",
  components: {
    ArtistsList,
    ButtonTenMore
  },
  methods: {
    ...mapActions(["fetchArtists", "moreArtists"])
  },
  computed: {
    ...mapGetters(["getArtists"]),

    ...mapGetters("page", ["getTotalPages"])
  },
  created() {
    this.fetchArtists();
  }
};
</script>

<style></style>
