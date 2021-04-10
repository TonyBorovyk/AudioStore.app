<template>
  <div class="items-container">
    <BaseItem v-for="song in songs" :key="song.track_id" :song="song" />
  </div>
</template>

<script>
import BaseItem from "@/components/BaseItem.vue";

export default {
    name: "BaseSongsGridContainer",
    props:["songs"],
    components:{
      BaseItem,
    }

}
</script>

<style>

</style>