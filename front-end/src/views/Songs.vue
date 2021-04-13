<template>
  <div class="songs-wrapper">
    <h1>Songs</h1>
    <div class="sort-block">
      <label for="sort">Sort by:</label>
      <select id="sort" name="sort_type" v-model="sort" @change="sendSort">
        <option value="time_added">Time added</option>
        <option value="genre">Genre</option>
        <option value="year">Year</option>
      </select>
    </div>
    <div class="items-container grid">
      <BaseSongItem
        v-for="song in getSongs"
        :key="song.track_id"
        :song="song"
      />
    </div>
    <ButtonTenMore :AskMore="moreRecAddedSongs" />
  </div>
</template>

<script>
import BaseSongItem from "@/components/BaseSongItem.vue";
import ButtonTenMore from "@/components/ButtonTenMore.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Songs",
  data() {
    return {
      sort: "time_added"
    };
  },
  components: {
    BaseSongItem,
    ButtonTenMore
  },
  computed: {
    ...mapGetters(["getSongs"])
  },
  methods: {
    ...mapActions(["fetchRecAddedSongs", "moreRecAddedSongs"]),
    sendSort() {
      console.log(this.sort);
    }
  },
  created() {
    this.fetchRecAddedSongs();
  }
};
</script>

<style lang="scss">
.songs-wrapper {
  .sort-block {
    margin-bottom: 20px;
    label {
      margin-right: 5px;
    }
    #sort {
      outline: none;
      border: none;
      padding: 5px 10px;
      background: var(--third-button-color);
      color: var(--first-text-color);
    }
  }
}
</style>
