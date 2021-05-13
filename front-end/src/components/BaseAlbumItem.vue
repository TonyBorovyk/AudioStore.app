<template>
  <div class="album-item">
    <img :src="album.album_cover" alt="" />
    <router-link :to="`/albums/${album.album_id}`"
      ><h3 class="album-name">{{ album.album_name }}</h3></router-link
    >
    <SongArtists :song="album" />

    <div class="buttons flex-row">
      <ButtonMore :route="`/albums/${album.album_id}`" />
    </div>
  </div>
</template>

<script>
import SongArtists from "@/components/SongArtists.vue";
import ButtonMore from "@/components/ButtonMore.vue";

export default {
  name: "BaseAlbumItem",
  props: ["album"],
  components: {
    SongArtists,
    ButtonMore
  }
};
</script>

<style lang="scss">
.album-item {
  position: relative;
  height: 350px;
  width: 200px;
  overflow: hidden;
  margin: 20px 20px;
  background: #293a4b;
  img {
    width: 100%;
    height: 200px;
    margin-bottom: 5px;
  }
  .album-name {
    margin-bottom: 5px;
  }
  .buttons {
    position: absolute;
    bottom: 0px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
}
</style>
