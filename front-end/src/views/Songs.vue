<template>
  <div class="songs-wrapper">
    <h1>Songs</h1>
    <div class="sort-block">
      <label for="sort">Sort by:</label>
      <select id="sort" name="sort_type" v-model="value" @change="sendSort">
        <option value="time_added up">Time added Up</option>
        <option value="time_added down">Time added Down</option>
        <option value="duration up">Duration Up</option>
        <option value="duration down">Duration Down</option>
        <option value="release_year up">Year Up</option>
        <option value="release_year down">Year Down</option>
      </select>
    </div>
    <div class="items-container grid">
      <BaseSongItem
        v-for="song in getSongs"
        :key="song.track_id"
        :song="song"
      />
    </div>
    <button
      v-if="getTotalPages"
      class="btn btn-ten-more"
      @click="moreSongs({ order_by: this.sort, asc: this.asc })"
    >
      Show More
    </button>
  </div>
</template>

<script>
import BaseSongItem from "@/components/BaseSongItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Songs",
  data() {
    return {
      value: "time_added up",
      sort: "time_added",
      asc: true
    };
  },
  components: {
    BaseSongItem
  },
  computed: {
    ...mapGetters(["getSongs"]),
    ...mapGetters("page", ["getTotalPages"])
  },
  methods: {
    ...mapActions(["fetchSongs", "moreSongs"]),
    sendSort() {
      this.splitSort();
      this.fetchSongs({ order_by: this.sort, asc: this.asc });
    },
    splitSort() {
      const splited = this.value.split(" ");
      if (splited[1] == "up") {
        this.asc = true;
      }
      if (splited[1] == "down") {
        this.asc = false;
      }
      this.sort = splited[0];
    }
  },
  created() {
    this.fetchSongs({ order_by: this.sort, asc: this.asc });
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
.btn-ten-more {
  height: 50px;
  width: 150px;
  color: white;
  background-color: var(--second-button-color);
  margin: 20px;
}
.btn-ten-more:hover {
  background: var(--second-button-hover-color);
}
</style>
