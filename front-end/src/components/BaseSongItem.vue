<template>
  <div class="item-container">
    <img :src="song.cover" />
    <router-link :to="`/songs/${song.track_id}`">
      <h3 class="song-name">{{ song.track_name }}</h3>
    </router-link>
    <SongArtists :song="song" />
    <div class="buttons flex-row">
      <ButtonMore :route="`/songs/${song.track_id}`" />
      <AddSongPlaylist :song="song.track_id" :key="song.track_id" />
    </div>
  </div>
</template>

<script>
import SongArtists from "./SongArtists.vue";
import ButtonMore from "./ButtonMore.vue";
import AddSongPlaylist from "./AddSongPlaylist.vue";

export default {
  name: "BaseSongItem",
  props: ["song"],
  components: {
    ButtonMore,
    AddSongPlaylist,
    SongArtists
  }
};
</script>

<style lang="scss">
.item-container {
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
  .song-name {
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
