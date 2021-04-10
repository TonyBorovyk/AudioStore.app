<template>
  <div class="main-wrapper">
    <h1>Recently Added</h1>
    <BaseSongsGridContainer :songs="getRecentlyAddedSongs" />
  </div>
</template>

<script>
// @ is an alias to /src
import BaseSongsGridContainer from "@/components/BaseSongsGridContainer.vue";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Home",
  components: {
    BaseSongsGridContainer,
  },
  computed:{
    ...mapGetters(["getRecentlyAddedSongs"]),
  },
  methods:{
    ...mapActions(["fetchRecAddedSongs"]),
  },
  created(){
    this.fetchRecAddedSongs();
  }
};
</script>
