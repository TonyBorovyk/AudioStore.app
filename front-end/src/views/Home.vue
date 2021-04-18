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
    <ButtonTenMore :AskMore="moreRecAddedSongs" />
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
    ...mapGetters(["getSongs", "isLoggedIn"])
  },
  methods: {
    ...mapActions(["fetchRecAddedSongs", "moreRecAddedSongs"])
  },
  created() {
    this.fetchRecAddedSongs();
  }
};
</script>

<style>
a .sign-up-link {
  margin: 10px;
}
</style>
