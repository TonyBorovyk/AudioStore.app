<template>
  <div class="songs-wrapper">
    <label for="sort">Sort by:</label>
    <select id="sort" name="sort_type" v-model="sort" @change="sendSort">
      <option value="time_added">Time added</option>
      <option value="genre">Genre</option>
      <option value="year">Year</option>
    </select>
    <BaseSongsGridContainer :songs="getSongs" />
    <button class="more-songs">10 More</button>
  </div>
</template>

<script>
import BaseSongsGridContainer from "@/components/BaseSongsGridContainer.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Songs",
  data() {
    return {
      sort: "time_added"
    };
  },
  components: {
    BaseSongsGridContainer
  },
  computed: {
    ...mapGetters(["getSongs"])
  },
  methods: {
    ...mapActions(["fetchRecAddedSongs"]),
    sendSort() {
      console.log(this.sort);
    }
  },
  created() {
    this.fetchRecAddedSongs();
  }
};
</script>

<style></style>
