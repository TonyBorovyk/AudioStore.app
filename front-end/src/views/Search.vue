<template>
  <div class="search-wrapper">
    <h1>Results</h1>
    <SongsList :songs="tracks" />
    <h3>Artists</h3>
    <ArtistsList :artists="artists" />
    <h3>Albums</h3>
    <AlbumsList :albums="albums" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
  data() {
    return {
      tracks: [],
      artists: [],
      albums: []
    };
  },
  methods: {
    ...mapActions(["searchAll"]),
    async handleData() {
      const { tracks, albums, artists } = await this.searchAll();
      this.tracks = tracks;
      this.albums = albums;
      this.artists = artists;
    }
  },
  computed: {
    ...mapGetters(["getSearchRequest"])
  },
  watch: {
    getSearchRequest() {
      this.handleData();
    }
  },
  mounted() {
    this.handleData();
  },
  created() {
    if (this.getSearchRequest === "") {
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
