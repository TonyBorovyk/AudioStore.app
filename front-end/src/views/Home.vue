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
    <ButtonTenMore v-if="getTotalPages" :AskMore="moreSongs" />
  </div>
</template>

<script>
// @ is an alias to /src
import BaseSongItem from "@/components/BaseSongItem.vue";
import ButtonTenMore from "@/components/ButtonTenMore.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    BaseSongItem,
    ButtonTenMore
  },
  computed: {
    ...mapGetters(["getSongs", "getTotalPages", "isLoggedIn"])
  },
  methods: {
    ...mapActions(["fetchSongs", "moreSongs"])
  },
  created() {
    this.fetchSongs('Time_added');
  }
};
</script>

<style>
a .sign-up-link {
  margin: 10px;
}
</style>
