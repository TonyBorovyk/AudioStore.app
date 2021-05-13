<template>
  <div class="home-wrapper">
    <router-link v-if="!isLoggedIn" to="/signup">
      <h1 class="sign-up-link">SignUp</h1>
    </router-link>
    <h1 class="text">Recently Added</h1>
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
      @click="moreSongs({ order_by: 'time_added', asc: true })"
    >
      Show More
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseSongItem from "@/components/BaseSongItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    BaseSongItem
  },
  computed: {
    ...mapGetters(["getSongs", "isLoggedIn"]),
    ...mapGetters("page", ["getTotalPages"])
  },
  methods: {
    ...mapActions(["fetchSongs", "moreSongs"])
  },
  created() {
    this.fetchSongs({ order_by: "time_added", asc: true });
  }
};
</script>

<style>
a .sign-up-link {
  margin: 10px;
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
