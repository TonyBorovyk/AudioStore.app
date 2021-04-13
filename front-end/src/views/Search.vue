<template>
  <div class="search-wrapper">
    <h1>Results</h1>
    <SongsList :songs="getSongs" />
    <h3>Artists</h3>
    <ArtistsList :artists="getArtists" />
    <h3>Albums</h3>
    <AlbumsList :albums="getAlbums" />
    <h3>Rooms</h3>
    <RoomsList :rooms="rooms_temp" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SongsList from "@/components/SongsList.vue";
import ArtistsList from "@/components/ArtistsList.vue";
import AlbumsList from "@/components/AlbumsList.vue";
import RoomsList from "@/components/RoomsList.vue";

export default {
  name: "Search",
  components: {
    SongsList,
    ArtistsList,
    AlbumsList,
    RoomsList
  },
  data() {
    return {
      rooms_temp: [
        {
          room_id: 1,
          room_name: "Temp",
          count_of_users: 3
        }
      ]
    };
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
