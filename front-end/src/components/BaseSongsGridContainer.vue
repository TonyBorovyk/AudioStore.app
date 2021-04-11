<template>
  <div class="items-container">
    <BaseSongItem v-for="song in songs" :key="song.track_id" :song="song" />
  </div>
</template>

<script>
import BaseSongItem from "@/components/BaseSongItem.vue";

export default {
  name: "BaseSongsGridContainer",
  props: ["songs"],
  components: {
    BaseSongItem
  }
};
</script>

<style></style>
