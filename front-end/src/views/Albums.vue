<template>
  <div class="albums-container">
    <h1>Albums</h1>
    <div class="items-container grid">
      <BaseAlbumItem
        v-for="album in getAlbums"
        :key="album.album_id"
        :album="album"
      />
    </div>
    <ButtonTenMore v-if="getTotalPages" :AskMore="moreAlbums" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseAlbumItem from "@/components/BaseAlbumItem.vue";
import ButtonTenMore from "@/components/ButtonTenMore.vue";

export default {
  name: "Albums",
  components: {
    BaseAlbumItem,
    ButtonTenMore
  },
  computed: {
    ...mapGetters(["getAlbums"]),
    ...mapGetters("page", ["getTotalPages"])
  },
  methods: {
    ...mapActions(["fetchAlbums", "moreAlbums"])
  },
  created() {
    this.fetchAlbums();
  }
};
</script>
